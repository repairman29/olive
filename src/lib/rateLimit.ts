/**
 * In-memory rate limiter (sliding window per identifier).
 * Used by API routes to throttle by IP. For production multi-instance limits, use Upstash (see docs/ABUSE_PREVENTION.md).
 */

type Entry = { count: number; windowStart: number }

const store = new Map<string, Entry>()

/** Max age of an entry before we forget it (ms). */
const TTL_MS = 60_000

function prune() {
  const now = Date.now()
  for (const [key, entry] of store.entries()) {
    if (now - entry.windowStart > TTL_MS) store.delete(key)
  }
}

/**
 * Check whether the request is within the rate limit.
 * @param identifier - e.g. IP from x-forwarded-for or x-real-ip
 * @param limit - max requests allowed in the window
 * @param windowMs - window length in ms
 * @returns { allowed: true } or { allowed: false, retryAfterSeconds: number }
 */
export function checkRateLimit(
  identifier: string,
  limit: number,
  windowMs: number = TTL_MS
): { allowed: true } | { allowed: false; retryAfterSeconds: number } {
  if (!identifier) return { allowed: true }

  const now = Date.now()
  if (store.size > 10_000) prune()

  let entry = store.get(identifier)
  if (!entry) {
    store.set(identifier, { count: 1, windowStart: now })
    return { allowed: true }
  }

  if (now - entry.windowStart >= windowMs) {
    entry = { count: 1, windowStart: now }
    store.set(identifier, entry)
    return { allowed: true }
  }

  entry.count += 1
  if (entry.count <= limit) return { allowed: true }

  const retryAfterSeconds = Math.ceil((entry.windowStart + windowMs - now) / 1000)
  return { allowed: false, retryAfterSeconds: Math.max(1, retryAfterSeconds) }
}

/** Get client IP from NextRequest (Vercel/proxy headers). */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  const real = request.headers.get('x-real-ip')
  if (real) return real.trim()
  return ''
}
