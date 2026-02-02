import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer, isSupabaseServerConfigured } from '@/lib/supabaseServer'

export type ShoppingMode = 'budget' | 'splurge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
  }

  if (!isSupabaseServerConfigured() || !supabaseServer) {
    return NextResponse.json({ shopping_mode: 'splurge' })
  }

  const { data, error } = await supabaseServer
    .from('olive_user_settings')
    .select('shopping_mode, kroger_location_id, kroger_location_name, kroger_cart_domain, quantity_strategy, active_store_id')
    .eq('user_id', userId)
    .maybeSingle()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  let locationId = data?.kroger_location_id ?? null
  let locationName = data?.kroger_location_name ?? null
  let cartDomain = data?.kroger_cart_domain ?? null
  if (data?.active_store_id) {
    const { data: store } = await supabaseServer
      .from('olive_user_stores')
      .select('location_id, location_name, cart_domain')
      .eq('id', data.active_store_id)
      .eq('user_id', userId)
      .maybeSingle()
    if (store) {
      locationId = store.location_id
      locationName = store.location_name
      cartDomain = store.cart_domain
    }
  }

  const mode = (data?.shopping_mode === 'budget' ? 'budget' : 'splurge') as ShoppingMode
  return NextResponse.json({
    shopping_mode: mode,
    quantity_strategy: data?.quantity_strategy ?? 'exact',
    kroger_location_id: locationId,
    kroger_location_name: locationName,
    kroger_cart_domain: cartDomain,
    active_store_id: data?.active_store_id ?? null,
  })
}

export async function PATCH(request: NextRequest) {
  if (!isSupabaseServerConfigured() || !supabaseServer) {
    return NextResponse.json(
      { error: 'Supabase not configured; settings cannot be saved' },
      { status: 503 }
    )
  }

  const body = await request.json().catch(() => ({}))
  const userId = body.userId
  const shopping_mode = body.shopping_mode === 'budget' ? 'budget' : 'splurge'
  const quantity_strategy = body.quantity_strategy === 'overshoot' ? 'overshoot' : 'exact'
  const kroger_location_id = typeof body.kroger_location_id === 'string' ? body.kroger_location_id : undefined
  const kroger_location_name = typeof body.kroger_location_name === 'string' ? body.kroger_location_name : undefined
  const kroger_cart_domain = typeof body.kroger_cart_domain === 'string' ? body.kroger_cart_domain.trim() || undefined : undefined
  const active_store_id = body.active_store_id === null || (typeof body.active_store_id === 'string' && body.active_store_id) ? body.active_store_id : undefined

  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
  }

  const row: Record<string, unknown> = {
    user_id: userId,
    shopping_mode,
    quantity_strategy,
    updated_at: new Date().toISOString(),
  }
  if (kroger_location_id !== undefined) row.kroger_location_id = kroger_location_id || null
  if (kroger_location_name !== undefined) row.kroger_location_name = kroger_location_name || null
  if (kroger_cart_domain !== undefined) row.kroger_cart_domain = kroger_cart_domain || null
  if (active_store_id !== undefined) row.active_store_id = active_store_id || null

  const { data, error } = await supabaseServer
    .from('olive_user_settings')
    .upsert(row, { onConflict: 'user_id' })
    .select('shopping_mode, kroger_location_id, kroger_location_name, kroger_cart_domain, quantity_strategy, active_store_id')
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  let outLocationId = data?.kroger_location_id ?? null
  let outLocationName = data?.kroger_location_name ?? null
  let outCartDomain = data?.kroger_cart_domain ?? null
  if (data?.active_store_id) {
    const { data: store } = await supabaseServer
      .from('olive_user_stores')
      .select('location_id, location_name, cart_domain')
      .eq('id', data.active_store_id)
      .eq('user_id', userId)
      .maybeSingle()
    if (store) {
      outLocationId = store.location_id
      outLocationName = store.location_name
      outCartDomain = store.cart_domain
    }
  }

  return NextResponse.json({
    shopping_mode: data?.shopping_mode ?? shopping_mode,
    quantity_strategy: data?.quantity_strategy ?? quantity_strategy,
    kroger_location_id: outLocationId,
    kroger_location_name: outLocationName,
    kroger_cart_domain: outCartDomain,
    active_store_id: data?.active_store_id ?? null,
  })
}
