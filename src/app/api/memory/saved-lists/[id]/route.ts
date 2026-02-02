import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer, isSupabaseServerConfigured } from '@/lib/supabaseServer'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const userId = request.nextUrl.searchParams.get('userId')
  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
  }
  if (!isSupabaseServerConfigured() || !supabaseServer) {
    return NextResponse.json({ error: 'Saved lists not configured' }, { status: 503 })
  }

  const { data: list, error: listError } = await supabaseServer
    .from('olive_saved_lists')
    .select('id, name, created_at, updated_at')
    .eq('id', id)
    .eq('user_id', userId)
    .single()

  if (listError || !list) {
    return NextResponse.json({ error: listError?.message || 'List not found' }, { status: 404 })
  }

  const { data: items, error: itemsError } = await supabaseServer
    .from('olive_saved_list_items')
    .select('id, term, quantity, unit, notes, sort_order')
    .eq('list_id', id)
    .order('sort_order', { ascending: true })

  if (itemsError) {
    return NextResponse.json({ error: itemsError.message }, { status: 500 })
  }

  return NextResponse.json({
    list: {
      ...list,
      items: (items || []).map(({ id: _id, ...item }) => ({
        ...item,
        quantity: Number(item.quantity) || 1,
      })),
    },
  })
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  let body: { userId?: string; name?: string; items?: Array<{ term: string; quantity?: number; unit?: string | null; notes?: string | null }> }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
  const userId = body.userId || request.nextUrl.searchParams.get('userId')
  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
  }
  if (!isSupabaseServerConfigured() || !supabaseServer) {
    return NextResponse.json({ error: 'Saved lists not configured' }, { status: 503 })
  }

  const { data: existing } = await supabaseServer
    .from('olive_saved_lists')
    .select('id')
    .eq('id', id)
    .eq('user_id', userId)
    .single()

  if (!existing) {
    return NextResponse.json({ error: 'List not found' }, { status: 404 })
  }

  const now = new Date().toISOString()
  const updates: { name?: string; updated_at: string } = { updated_at: now }
  if (typeof body.name === 'string' && body.name.trim()) {
    updates.name = body.name.trim().slice(0, 200)
  }
  await supabaseServer.from('olive_saved_lists').update(updates).eq('id', id)

  if (Array.isArray(body.items)) {
    if (body.items.length > 100) {
      return NextResponse.json({ error: 'Maximum 100 items per list' }, { status: 400 })
    }
    await supabaseServer.from('olive_saved_list_items').delete().eq('list_id', id)
    if (body.items.length > 0) {
      const rows = body.items.slice(0, 100).map((item: { term: string; quantity?: number; unit?: string | null; notes?: string | null }, i: number) => ({
        list_id: id,
        term: (typeof item.term === 'string' ? item.term : '').trim().slice(0, 500) || 'Item',
        quantity: Number(item.quantity) && item.quantity! > 0 ? item.quantity! : 1,
        unit: typeof item.unit === 'string' ? item.unit.trim().slice(0, 50) : null,
        notes: typeof item.notes === 'string' ? item.notes.trim().slice(0, 200) : null,
        sort_order: i,
      }))
      await supabaseServer.from('olive_saved_list_items').insert(rows)
    }
  }

  const { data: list } = await supabaseServer
    .from('olive_saved_lists')
    .select('id, name, created_at, updated_at')
    .eq('id', id)
    .single()
  const { count } = await supabaseServer
    .from('olive_saved_list_items')
    .select('*', { count: 'exact', head: true })
    .eq('list_id', id)
  return NextResponse.json({ list: { ...list, item_count: count ?? 0 } })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const userId = request.nextUrl.searchParams.get('userId')
  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
  }
  if (!isSupabaseServerConfigured() || !supabaseServer) {
    return NextResponse.json({ error: 'Saved lists not configured' }, { status: 503 })
  }

  const { error } = await supabaseServer
    .from('olive_saved_lists')
    .delete()
    .eq('id', id)
    .eq('user_id', userId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}
