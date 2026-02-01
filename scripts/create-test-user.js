#!/usr/bin/env node
/**
 * Create a Supabase test user for e2e (dashboard, add-to-cart).
 * Loads .env.test or .env.local. Run once, then use TEST_USER_EMAIL / TEST_USER_PASSWORD in e2e.
 *
 * Usage: npm run create-test-user
 * Or:    node scripts/create-test-user.js
 */

const path = require('path')
const fs = require('fs')

function loadEnv(file) {
  const p = path.resolve(process.cwd(), file)
  if (!fs.existsSync(p)) return
  for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/)
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim()
  }
}

loadEnv('.env.test')
loadEnv('.env.local')
loadEnv('.env')

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY
const email = process.env.TEST_USER_EMAIL || 'olive-e2e@example.com'
const password = process.env.TEST_USER_PASSWORD || 'TestPassword123!'

if (!url || !key) {
  console.error('Missing Supabase config. Set in .env.test or .env.local:')
  console.error('  NEXT_PUBLIC_SUPABASE_URL')
  console.error('  NEXT_PUBLIC_SUPABASE_ANON_KEY')
  process.exit(1)
}

async function main() {
  const { createClient } = require('@supabase/supabase-js')

  // Prefer admin API so test users are email-confirmed and can sign in.
  if (serviceRole) {
    const admin = createClient(url, serviceRole)
    let created = false
    const { data, error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirmed: true,
    })
    if (error && !error.message.toLowerCase().includes('already')) {
      console.error('Admin createUser error:', error.message)
      process.exit(1)
    }
    if (!error) created = true

    if (!created) {
      // If user exists, confirm email + update password.
      const { data: listData, error: listError } = await admin.auth.admin.listUsers({
        page: 1,
        perPage: 200,
      })
      if (listError) {
        console.error('Admin listUsers error:', listError.message)
        process.exit(1)
      }
      const existing = listData?.users?.find((u) => u.email === email)
      if (existing) {
        const { error: updateError } = await admin.auth.admin.updateUserById(existing.id, {
          password,
          email_confirmed: true,
        })
        if (updateError) {
          console.error('Admin updateUser error:', updateError.message)
          process.exit(1)
        }
      }
    }

    console.log(created ? 'Test user created (admin):' : 'Test user updated (admin):')
    console.log('  TEST_USER_EMAIL=' + email)
    console.log('  TEST_USER_PASSWORD=' + password.replace(/./g, '*'))
    console.log('Add these to .env.test (or export) and run: npm run test:e2e')
    return
  }

  // Fallback: anon signUp (requires email confirmation to be disabled)
  const supabase = createClient(url, key)
  const { error } = await supabase.auth.signUp({ email, password })
  if (error) {
    if (error.message.includes('already registered')) {
      console.log('User already exists. You can use these credentials for e2e:')
      console.log('  TEST_USER_EMAIL=' + email)
      console.log('  TEST_USER_PASSWORD=' + password.replace(/./g, '*'))
      return
    }
    console.error('SignUp error:', error.message)
    process.exit(1)
  }
  console.log('Test user created:')
  console.log('  TEST_USER_EMAIL=' + email)
  console.log('  TEST_USER_PASSWORD=' + password.replace(/./g, '*'))
  console.log('Add these to .env.test (or export) and run: npm run test:e2e')
}

main()
