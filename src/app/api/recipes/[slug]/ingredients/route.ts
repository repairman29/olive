import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer, isSupabaseServerConfigured } from '@/lib/supabaseServer'

const SPOONACULAR_API = 'https://api.spoonacular.com'

type SpoonacularIngredient = { name: string; original?: string; amount: number; unit?: string }

const normalizeIngredient = (value: string) =>
  value
    .toLowerCase()
    .replace(/\([^)]*\)/g, ' ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug
  const body = await request.json().catch(() => ({}))
  const servings = Math.max(1, Math.min(50, Number(body.servings) || 4))

  // Spoonacular: fetch recipe and scale ingredients
  if (slug.startsWith('spoonacular-')) {
    const key = process.env.SPOONACULAR_API_KEY
    if (!key) {
      return NextResponse.json({ error: 'Recipe search not configured' }, { status: 503 })
    }
    const id = slug.replace(/^spoonacular-/, '')
    if (!/^\d+$/.test(id)) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 })
    }
    try {
      const url = new URL(`${SPOONACULAR_API}/recipes/${id}/information`)
      url.searchParams.set('apiKey', key)
      const res = await fetch(url.toString())
      if (!res.ok) {
        return NextResponse.json({ error: 'Recipe not found' }, { status: 404 })
      }
      const recipe = (await res.json()) as {
        servings?: number
        extendedIngredients?: SpoonacularIngredient[]
      }
      const recipeServings = Math.max(1, Number(recipe.servings) || 4)
      const multiplier = servings / recipeServings
      const ingredients = recipe.extendedIngredients ?? []
      const byTerm: Record<string, { term: string; quantity: number }> = {}
      for (const ing of ingredients) {
        const amount = (Number(ing.amount) || 0) * multiplier
        const term = (ing.name || ing.original || 'ingredient').trim()
        if (!term) continue
        const qty = Math.max(0.25, Math.round(amount * 4) / 4)
        const key = normalizeIngredient(term)
        if (!key) continue
        if (!byTerm[key]) {
          byTerm[key] = { term, quantity: 0 }
        }
        byTerm[key].quantity += qty
      }
      const items = Object.values(byTerm).map(({ term, quantity }) => ({
        term,
        quantity: quantity <= 1 && quantity >= 0.25 ? quantity : Math.round(quantity),
      }))
      return NextResponse.json({ items })
    } catch {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 })
    }
  }

  if (!isSupabaseServerConfigured() || !supabaseServer) {
    return NextResponse.json({ error: 'Recipes not configured' }, { status: 503 })
  }
  const choices: Record<string, string> = typeof body.choices === 'object' && body.choices !== null ? body.choices : {}

  const { data: recipe, error: recipeError } = await supabaseServer
    .from('recipes')
    .select('id')
    .eq('slug', slug)
    .single()
  if (recipeError || !recipe) {
    return NextResponse.json({ error: 'Recipe not found' }, { status: 404 })
  }

  const { data: rows, error } = await supabaseServer
    .from('recipe_ingredients')
    .select('term, quantity_per_serving, variant_key, variant_value')
    .eq('recipe_id', recipe.id)
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const filtered = (rows ?? []).filter((r: any) => {
    if (!r.variant_key) return true
    const chosen = choices[r.variant_key]
    return chosen && String(r.variant_value) === String(chosen)
  })

  const byTerm: Record<string, number> = {}
  for (const r of filtered) {
    const qty = Math.max(0.25, Math.round((Number(r.quantity_per_serving) * servings) * 4) / 4)
    byTerm[r.term] = (byTerm[r.term] ?? 0) + qty
  }
  const items = Object.entries(byTerm).map(([term, quantity]) => ({
    term,
    quantity: quantity <= 1 && quantity >= 0.25 ? quantity : Math.round(quantity),
  }))

  return NextResponse.json({ items })
}
