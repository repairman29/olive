import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer, isSupabaseServerConfigured } from '@/lib/supabaseServer'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const userId = request.nextUrl.searchParams.get('userId')
  let body: { userId?: string; set_active?: boolean; nickname?: string }
  try {
    body = await request.json().catch(() => ({}))
  } catch {
    body = {}
  }
  const uid = body.userId || userId
  if (!uid) return NextResponse.json({ error: 'Missing userId' }, { status: 400 })

  if (!isSupabaseServerConfigured() || !supabaseServer) {
    return NextResponse.json({ error: 'Stores not configured' }, { status: 503 })
  }

  const { data: store } = await supabaseServer
    .from('olive_user_stores')
    .select('id')
    .eq('id', id)
    .eq('user_id', uid)
    .maybeSingle()

  if (!store) return NextResponse.json({ error: 'Store not found' }, { status: 404 })

  if (body.set_active === true) {
    await supabaseServer
      .from('olive_user_settings')
      .upsert(
        { user_id: uid, active_store_id: id, updated_at: new Date().toISOString() },
        { onConflict: 'user_id' }
      )
  }

  if (typeof body.nickname === 'string') {
    await supabaseServer
      .from('olive_user_stores')
      .update({ nickname: body.nickname.trim().slice(0, 100) || null })
      .eq('id', id)
      .eq('user_id', uid)
  }

  const { data: updated } = await supabaseServer
    .from('olive_user_stores')
    .select('id, location_id, location_name, cart_domain, nickname, created_at')
    .eq('id', id)
    .single()

  return NextResponse.json({ store: updated })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const userId = request.nextUrl.searchParams.get('userId')
  if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 })

  if (!isSupabaseServerConfigured() || !supabaseServer) {
    return NextResponse.json({ error: 'Stores not configured' }, { status: 503 })
  }

  const { error } = await supabaseServer
    .from('olive_user_stores')
    .delete()
    .eq('id', id)
    .eq('user_id', userId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const { data: settings } = await supabaseServer
    .from('olive_user_settings')
    .select('active_store_id')
    .eq('user_id', userId)
    .maybeSingle()

  if (settings?.active_store_id === id) {
    await supabaseServer
      .from('olive_user_settings')
      .update({ active_store_id: null, updated_at: new Date().toISOString() })
      .eq('user_id', userId)
  }

  return NextResponse.json({ ok: true })
}
