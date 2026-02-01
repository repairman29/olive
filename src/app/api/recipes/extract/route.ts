import { NextRequest, NextResponse } from 'next/server'

const SPOONACULAR_API = 'https://api.spoonacular.com'

type SpoonacularIngredient = { name?: string; original?: string; amount?: number; unit?: string }

/**
 * POST /api/recipes/extract
 * Body: { url: string } — recipe page URL (e.g. AllRecipes, Food Network)
 * Uses Spoonacular "Extract Recipe from Website". Returns name, servings, ingredients for scaling in the UI.
 */
export async function POST(request: NextRequest) {
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
