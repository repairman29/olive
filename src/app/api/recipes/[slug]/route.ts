import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer, isSupabaseServerConfigured } from '@/lib/supabaseServer'

const SPOONACULAR_API = 'https://api.spoonacular.com'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug

  // Spoonacular recipe by id (slug = spoonacular-123)
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
      const recipe = (await res.json()) as { title: string; servings?: number }
      return NextResponse.json({
        name: recipe.title,
        slug,
        variants: [],
        servings: Math.max(1, Number(recipe.servings) || 4),
      })
    } catch {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 })
    }
  }

  if (!isSupabaseServerConfigured() || !supabaseServer) {
    return NextResponse.json({ error: 'Recipes not configured' }, { status: 503 })
  }
  const { data: recipe, error: recipeError } = await supabaseServer
    .from('recipes')
    .select('id, name, slug')
    .eq('slug', slug)
    .single()
  if (recipeError || !recipe) {
    return NextResponse.json({ error: 'Recipe not found' }, { status: 404 })
  }
  const { data: ingredients, error: ingError } = await supabaseServer
    .from('recipe_ingredients')
    .select('term, quantity_per_serving, variant_key, variant_value')
    .eq('recipe_id', recipe.id)
  if (ingError) {
    return NextResponse.json({ error: ingError.message }, { status: 500 })
  }
  const rows = ingredients ?? []
  const variantKeys = [...new Set(rows.map((r: { variant_key: string | null }) => r.variant_key).filter(Boolean))] as string[]
  const variants = variantKeys.map((key) => {
    const options = [...new Set(rows.filter((r: any) => r.variant_key === key).map((r: any) => r.variant_value))]
    return {
      key,
      label: key.replace(/^./, (c) => c.toUpperCase()),
      options: options.map((value) => ({ value, label: String(value).replace(/^./, (c: string) => c.toUpperCase()) })),
    }
  })
  return NextResponse.json({
    name: recipe.name,
    slug: recipe.slug,
    variants,
  })
}
