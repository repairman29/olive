import { NextRequest, NextResponse } from 'next/server'

const KROGER_CLIENT_ID = process.env.KROGER_CLIENT_ID || 'jarvisshopping-bbccng3h'
const KROGER_CLIENT_SECRET = process.env.KROGER_CLIENT_SECRET || ''

async function getKrogerToken() {
  const auth = Buffer.from(`${KROGER_CLIENT_ID}:${KROGER_CLIENT_SECRET}`).toString('base64')
  const tokenRes = await fetch('https://api.kroger.com/v1/connect/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${auth}`,
    },
    body: 'grant_type=client_credentials&scope=product.compact',
  })
  const tokenData = await tokenRes.json()
  if (!tokenRes.ok) throw new Error('Failed to get Kroger token')
  return tokenData.access_token as string
}

async function fetchLocations(token: string, params: URLSearchParams) {
  const res = await fetch(`https://api.kroger.com/v1/locations?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  })
  const data = await res.json()
  if (!res.ok) {
    return {
      ok: false as const,
      status: res.status,
      error: (data as { errorDescription?: string }).errorDescription || 'Location lookup failed',
      data,
    }
  }
  return { ok: true as const, data }
}

/**
 * GET /api/kroger/locations?zip=80904&chain=King Soopers
 * Returns Kroger/King Soopers locations near the zip. Use locationId in KROGER_LOCATION_ID for product search and your store.
 */
export async function GET(request: NextRequest) {
  if (!KROGER_CLIENT_SECRET) {
    return NextResponse.json(
      { error: 'Kroger credentials not configured' },
      { status: 503 }
    )
  }

  const zip = request.nextUrl.searchParams.get('zip') || '80904'
  const chain = request.nextUrl.searchParams.get('chain') || 'King Soopers'

  try {
    const token = await getKrogerToken()
    const params = new URLSearchParams({
      'filter.zipCode.near': zip,
      'filter.limit': '10',
    })
    if (chain) params.set('filter.chain', chain)

    let result = await fetchLocations(token, params)
    if (!result.ok) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status }
      )
    }
    let locations = (result.data as { data?: Array<{ locationId: string; name?: string; address?: { addressLine1?: string; city?: string; state?: string; zipCode?: string } }> }).data ?? []
    if (!locations.length && chain) {
      const retryParams = new URLSearchParams({
        'filter.zipCode.near': zip,
        'filter.limit': '10',
      })
      result = await fetchLocations(token, retryParams)
      if (result.ok) {
        locations = (result.data as { data?: Array<{ locationId: string; name?: string; address?: { addressLine1?: string; city?: string; state?: string; zipCode?: string } }> }).data ?? []
      }
    }
    return NextResponse.json({
      zip,
      chain,
      locations: locations.map((loc) => ({
        locationId: loc.locationId,
        name: loc.name,
        address: loc.address,
      })),
    })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Location lookup failed'
    return NextResponse.json({ error: message }, { status: 503 })
  }
}
