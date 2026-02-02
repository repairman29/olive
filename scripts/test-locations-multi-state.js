#!/usr/bin/env node
/**
 * Test Kroger locations API for multiple states (IL, WI, CO, OH, AZ, TX).
 * Run against local or prod: BASE_URL=https://shopolive.xyz node scripts/test-locations-multi-state.js
 * Default: http://localhost:3001
 */

const BASE_URL = process.env.BASE_URL || process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3001'

const regions = [
  { state: 'Colorado', chain: 'King Soopers', zip: '80202' },
  { state: 'Colorado', chain: 'King Soopers', zip: '80904' },
  { state: 'Illinois', chain: 'Kroger', zip: '60101' },
  { state: 'Wisconsin', chain: 'Kroger', zip: '53202' },
  { state: 'Ohio', chain: 'Kroger', zip: '43215' },
  { state: 'Arizona', chain: "Fry's Food", zip: '85004' },
  { state: 'Texas', chain: 'Kroger', zip: '77001' },
]

async function main() {
  let passed = 0
  let failed = 0
  for (const { state, chain, zip } of regions) {
    const url = `${BASE_URL.replace(/\/$/, '')}/api/kroger/locations?zip=${encodeURIComponent(zip)}&chain=${encodeURIComponent(chain)}`
    try {
      const res = await fetch(url)
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        console.log(`❌ ${state} (${chain}, ${zip}): ${res.status} ${data.error || res.statusText}`)
        failed++
        continue
      }
      const locations = data.locations || []
      if (locations.length > 0) {
        console.log(`✅ ${state} (${chain}, ${zip}): ${locations.length} store(s) — e.g. ${locations[0].name || locations[0].locationId}`)
        passed++
      } else {
        console.log(`⚠️  ${state} (${chain}, ${zip}): no stores (API ok, empty list)`)
        passed++
      }
    } catch (e) {
      console.log(`❌ ${state} (${chain}, ${zip}): ${e.message}`)
      failed++
    }
  }
  console.log('')
  console.log(`Done: ${passed} passed, ${failed} failed`)
  process.exit(failed > 0 ? 1 : 0)
}

main()
