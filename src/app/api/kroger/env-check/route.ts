import { NextResponse } from 'next/server'

/**
 * GET /api/kroger/env-check
 * Returns which Kroger-related env vars the running deployment sees (booleans only).
 * Use this on the live site (e.g. https://shopolive.xyz/api/kroger/env-check) to confirm
 * the deployment serving that domain has the right env. No secrets are exposed.
 */
export async function GET() {
  const krogerServiceUrl = !!process.env.NEXT_PUBLIC_KROGER_SERVICE_URL
  const krogerServiceSecret = !!process.env.KROGER_SERVICE_SECRET
  const krogerClientId = !!process.env.KROGER_CLIENT_ID
  const krogerClientSecret = !!process.env.KROGER_CLIENT_SECRET

  const addToCartReady =
    krogerServiceUrl && krogerServiceSecret && krogerClientId && krogerClientSecret

  let tokenCheck: { ok: boolean; krogerError?: string } = { ok: false }
  if (addToCartReady) {
    try {
      const id = process.env.KROGER_CLIENT_ID || 'jarvisshopping-bbccng3h'
      const secret = process.env.KROGER_CLIENT_SECRET || ''
      const auth = Buffer.from(`${id}:${secret}`).toString('base64')
      const res = await fetch('https://api.kroger.com/v1/connect/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${auth}`,
        },
        body: 'grant_type=client_credentials&scope=product.compact',
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.access_token) {
        tokenCheck = { ok: true }
      } else {
        tokenCheck = {
          ok: false,
          krogerError: (data as { error_description?: string }).error_description ?? (data as { error?: string }).error ?? `HTTP ${res.status}`,
        }
      }
    } catch (e) {
      tokenCheck = { ok: false, krogerError: e instanceof Error ? e.message : 'Request failed' }
    }
  }

  return NextResponse.json({
    env: {
      NEXT_PUBLIC_KROGER_SERVICE_URL: krogerServiceUrl,
      KROGER_SERVICE_SECRET: krogerServiceSecret,
      KROGER_CLIENT_ID: krogerClientId,
      KROGER_CLIENT_SECRET: krogerClientSecret,
    },
    addToCartReady,
    tokenCheck,
  })
}
