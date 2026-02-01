import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, getClientIp } from '@/lib/rateLimit'

const SPOONACULAR_API = 'https://api.spoonacular.com'

/** Max URL length (chars). */
const MAX_URL_LENGTH = 2048

/** Allowed hostnames for recipe extract (Spoonacular supports these). */
const ALLOWED_EXTRACT_HOSTS = new Set([
  'allrecipes.com',
  'foodnetwork.com',
  'food.com',
  'epicurious.com',
  'bbcgoodfood.com',
  'delish.com',
  'tasteofhome.com',
  'eatingwell.com',
  'bonappetit.com',
  'seriouseats.com',
  'thekitchn.com',
  'marthastewart.com',
  'bettycrocker.com',
  'pillsbury.com',
  'spoonacular.com',
])

type SpoonacularIngredient = { name?: string; original?: string; amount?: number; unit?: string }

function validateExtractUrl(url: string): { ok: true } | { ok: false; error: string } {
  if (url.length > MAX_URL_LENGTH) {
    return { ok: false, error: `URL must be ${MAX_URL_LENGTH} characters or less` }
  }
  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return { ok: false, error: 'Invalid URL' }
  }
  if (parsed.protocol !== 'https:') {
    return { ok: false, error: 'Only https URLs are allowed' }
  }
  const host = parsed.hostname.toLowerCase().replace(/^www\./, '')
  if (!ALLOWED_EXTRACT_HOSTS.has(host)) {
    return { ok: false, error: 'Recipe URL must be from an allowed recipe site' }
  }
  return { ok: true }
}

/**
 * POST /api/recipes/extract
 * Body: { url: string } — recipe page URL (e.g. AllRecipes, Food Network)
 * Uses Spoonacular "Extract Recipe from Website". Returns name, servings, ingredients for scaling in the UI.
 */
export async function POST(request: NextRequest) {
  const ip = getClientIp(request)
  const limit = checkRateLimit(ip, 15, 60_000)
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Try again in a moment.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } }
    )
  }

  const key = process.env.SPOONACULAR_API_KEY
  if (!key) {
    return NextResponse.json(
      { error: 'Recipe extract not configured. Set SPOONACULAR_API_KEY.' },
      { status: 503 }
    )
  }

  const body = await request.json().catch(() => ({}))
  const url = typeof body.url === 'string' ? body.url.trim() : ''
  if (!url) {
    return NextResponse.json({ error: 'Missing url' }, { status: 400 })
  }

  const valid = validateExtractUrl(url)
  if (!valid.ok) {
    return NextResponse.json({ error: valid.error }, { status: 400 })
  }

  try {
    const apiUrl = new URL(`${SPOONACULAR_API}/recipes/extract`)
    apiUrl.searchParams.set('apiKey', key)
    apiUrl.searchParams.set('url', url)

    const res = await fetch(apiUrl.toString())
    const data = (await res.json()) as {
      title?: string
      servings?: number
      extendedIngredients?: SpoonacularIngredient[]
      message?: string
    }

    if (!res.ok) {
      return NextResponse.json(
        { error: data.message || 'Could not extract recipe from that URL.' },
        { status: res.status }
      )
    }

    const name = data.title || 'Untitled recipe'
    const servings = Math.max(1, Number(data.servings) || 4)
    const ingredients = (data.extendedIngredients ?? []).map((ing) => ({
      name: (ing.name || ing.original || 'ingredient').trim(),
      amount: Number(ing.amount) || 0,
      unit: typeof ing.unit === 'string' ? ing.unit.trim() : '',
    }))

    return NextResponse.json({
      name,
      servings,
      ingredients,
    })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Extract failed'
    return NextResponse.json({ error: message }, { status: 503 })
  }
}
