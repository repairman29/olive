import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer, isSupabaseServerConfigured } from '@/lib/supabaseServer'

const SPOONACULAR_API = 'https://api.spoonacular.com'

export async function GET(request: NextRequest) {
  const source = request.nextUrl.searchParams.get('source')
  const q = request.nextUrl.searchParams.get('q')?.trim()

  // Spoonacular search (optional): ?source=spoonacular&q=pasta
  if (source === 'spoonacular' && q) {
    const key = process.env.SPOONACULAR_API_KEY
    if (!key) {
      return NextResponse.json({ recipes: [], spoonacular: false })
    }
    try {
      const url = new URL(`${SPOONACULAR_API}/recipes/complexSearch`)
      url.searchParams.set('apiKey', key)
      url.searchParams.set('query', q)
      url.searchParams.set('number', '10')
      const res = await fetch(url.toString())
      if (!res.ok) {
        return NextResponse.json({ recipes: [], spoonacular: true })
      }
      const data = (await res.json()) as { results?: Array<{ id: number; title: string; image?: string }> }
      const results = data.results ?? []
      const recipes = results.map((r) => ({
        id: `spoonacular-${r.id}`,
        name: r.title,
        slug: `spoonacular-${r.id}`,
      }))
      return NextResponse.json({ recipes, spoonacular: true })
    } catch {
      return NextResponse.json({ recipes: [], spoonacular: true })
    }
  }

  // Supabase recipes (default)
  if (!isSupabaseServerConfigured() || !supabaseServer) {
    return NextResponse.json({ recipes: [] })
  }
  const qLower = q?.toLowerCase().trim()
  let query = supabaseServer.from('recipes').select('id, name, slug').order('name')
  if (qLower) {
    query = query.ilike('name', `%${qLower}%`)
  }
  const { data, error } = await query
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ recipes: data ?? [] })
}
