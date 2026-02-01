# Abuse prevention & input validation

This doc describes limits and safeguards for parser and API abuse.

---

## 1. Recipe extract (`POST /api/recipes/extract`)

**Risks:** Spoonacular quota burn, SSRF (sending arbitrary URLs to Spoonacular), spam.

**Measures:**

| Control | Limit | Purpose |
|--------|--------|--------|
| URL scheme | `https` only | Avoid protocol abuse |
| URL length | ≤ 2048 chars | Bounded input |
| Domain allowlist | Recipe sites only | Restrict to intended use; reduces SSRF surface |
| Rate limit | 15 requests / minute per IP | Protect Spoonacular quota |

**Allowed domains** (Spoonacular extract supports these; we allow a fixed set):

- `allrecipes.com`, `foodnetwork.com`, `food.com`, `epicurious.com`, `bbcgoodfood.com`, `delish.com`, `tasteofhome.com`, `eatingwell.com`, `bonappetit.com`, `seriouseats.com`, `thekitchn.com`, `marthastewart.com`, `bettycrocker.com`, `pillsbury.com`, `spoonacular.com`

Add more in `src/app/api/recipes/extract/route.ts` if needed.

---

## 2. Add-to-cart (`POST /api/kroger/add-to-cart`)

**Risks:** Huge payloads, runaway Kroger API usage, cost.

**Measures:**

| Control | Limit | Purpose |
|--------|--------|--------|
| Max items per request | 100 | Cap batch size |
| Max length per item term | 200 chars | Reasonable search terms |
| Rate limit | 30 requests / minute per IP | Throttle burst |

---

## 3. Rate limiting

- **Implementation:** `src/lib/rateLimit.ts` — in-memory sliding window per IP (from `x-forwarded-for` or `x-real-ip`). Works per serverless instance; for multi-instance limits use [Upstash Redis](https://upstash.com/) (see below).
- **Applied in:** extract and add-to-cart route handlers before doing work.
- **Response when over limit:** `429 Too Many Requests` with `Retry-After` header.

**Optional production (global) rate limit:** Set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`. If both are set, the rate limiter uses Upstash instead of in-memory so limits apply across all instances. Free tier is sufficient for moderate traffic.

---

## 4. Parser (client-side list / blob)

List and blob parsing run in the browser (`src/app/dashboard/page.tsx`). No server-side blob endpoint, so no extra abuse surface there. Client already:

- Trims and normalizes lines
- Drops “fluff” lines
- Parses quantity/unit/notes with bounded logic

No changes required for parser abuse; API hardening above covers server-side.

---

## 5. Env vars (optional)

| Variable | Required | Purpose |
|----------|----------|---------|
| `UPSTASH_REDIS_REST_URL` | No | When set with token, use Upstash for rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | No | When set with URL, use Upstash for rate limiting |

Without these, rate limiting is in-memory per instance only.
