import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer, isSupabaseServerConfigured } from '@/lib/supabaseServer'

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId')
  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
  }
  if (!isSupabaseServerConfigured() || !supabaseServer) {
    return NextResponse.json({ stores: [] })
  }

  const { data, error } = await supabaseServer
    .from('olive_user_stores')
    .select('id, location_id, location_name, cart_domain, nickname, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ stores: data ?? [] })
}

export async function POST(request: NextRequest) {
  let body: {
    userId: string
    location_id: string
    location_name: string
    cart_domain: string
    nickname?: string
    set_active?: boolean
  }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const userId = body.userId
  if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
  const location_id = typeof body.location_id === 'string' ? body.location_id.trim() : ''
  const location_name = typeof body.location_name === 'string' ? body.location_name.trim() : ''
  const cart_domain = typeof body.cart_domain === 'string' ? body.cart_domain.trim() : ''
  if (!location_id || !location_name || !cart_domain) {
    return NextResponse.json({ error: 'Missing location_id, location_name, or cart_domain' }, { status: 400 })
  }

  if (!isSupabaseServerConfigured() || !supabaseServer) {
    return NextResponse.json({ error: 'Stores not configured' }, { status: 503 })
  }

  const { data: store, error: insertError } = await supabaseServer
    .from('olive_user_stores')
    .insert({
      user_id: userId,
      location_id,
      location_name: location_name.slice(0, 500),
      cart_domain: cart_domain.slice(0, 100),
      nickname: typeof body.nickname === 'string' ? body.nickname.trim().slice(0, 100) : null,
    })
    .select('id, location_id, location_name, cart_domain, nickname, created_at')
    .single()

  if (insertError || !store) {
    return NextResponse.json({ error: insertError?.message || 'Failed to add store' }, { status: 500 })
  }

  const setActive = body.set_active !== false
  if (setActive) {
    await supabaseServer
      .from('olive_user_settings')
      .upsert(
        { user_id: userId, active_store_id: store.id, updated_at: new Date().toISOString() },
        { onConflict: 'user_id' }
      )
  }

  return NextResponse.json({ store })
}
