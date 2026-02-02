import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer, isSupabaseServerConfigured } from '@/lib/supabaseServer'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
  }

  if (!isSupabaseServerConfigured() || !supabaseServer) {
    return NextResponse.json({ lists: [] })
  }

  const db = supabaseServer
  const { data: lists, error } = await db
    .from('olive_saved_lists')
    .select('id, name, created_at, updated_at')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const withCounts = await Promise.all(
    (lists || []).map(async (list) => {
      const { count } = await db
        .from('olive_saved_list_items')
        .select('*', { count: 'exact', head: true })
        .eq('list_id', list.id)
      return { ...list, item_count: count ?? 0 }
    })
  )

  return NextResponse.json({ lists: withCounts })
}

export async function POST(request: NextRequest) {
  const userId = request.headers.get('x-user-id') || new URL(request.url).searchParams.get('userId')
  let body: { userId?: string; name: string; items: Array<{ term: string; quantity?: number; unit?: string | null; notes?: string | null }> }

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const uid = body.userId || userId
  if (!uid) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
  }
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  if (!name) {
    return NextResponse.json({ error: 'Missing or empty name' }, { status: 400 })
  }
  const items = Array.isArray(body.items) ? body.items : []
  if (items.length > 100) {
    return NextResponse.json({ error: 'Maximum 100 items per list' }, { status: 400 })
  }

  if (!isSupabaseServerConfigured() || !supabaseServer) {
    return NextResponse.json({ error: 'Saved lists not configured' }, { status: 503 })
  }

  const db = supabaseServer
  const { data: list, error: listError } = await db
    .from('olive_saved_lists')
    .insert({
      user_id: uid,
      name: name.slice(0, 200),
      updated_at: new Date().toISOString(),
    })
    .select('id, name, created_at, updated_at')
    .single()

  if (listError || !list) {
    return NextResponse.json({ error: listError?.message || 'Failed to create list' }, { status: 500 })
  }

  if (items.length > 0) {
    const rows = items.slice(0, 100).map((item, i) => ({
      list_id: list.id,
      term: (typeof item.term === 'string' ? item.term : '').trim().slice(0, 500) || 'Item',
      quantity: Number(item.quantity) && item.quantity! > 0 ? item.quantity! : 1,
      unit: typeof item.unit === 'string' ? item.unit.trim().slice(0, 50) : null,
      notes: typeof item.notes === 'string' ? item.notes.trim().slice(0, 200) : null,
      sort_order: i,
    }))
    const { error: itemsError } = await db.from('olive_saved_list_items').insert(rows)
    if (itemsError) {
      await db.from('olive_saved_lists').delete().eq('id', list.id)
      return NextResponse.json({ error: itemsError.message }, { status: 500 })
    }
  }

  return NextResponse.json({ list: { ...list, item_count: items.length } })
}
