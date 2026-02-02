import { test as setup, expect } from '@playwright/test'
import * as path from 'path'
import * as fs from 'fs'

/**
 * One-time setup: sign in and save session so e2e can run as you.
 *
 * With TEST_USER_EMAIL + TEST_USER_PASSWORD in .env.test (or env): fills form and
 * signs in automatically. Create the user first: npm run create-test-user
 * (needs SUPABASE_SERVICE_ROLE_KEY in .env.test or .env.local for prod Supabase).
 *
 * Without env credentials: opens /login and waits 2 min for you to sign in with
 * Google (or email) in the browser.
 *
 * Use one Olive account to test different stores/brands; Olive pulls you to the
 * right branded site when you open the cart (Kroger login is per brand).
 *
 * Run once:
 *   PLAYWRIGHT_TEST_BASE_URL=https://shopolive.xyz npx playwright test --project=setup --headed
 *
 * Then run branded tests: npx playwright test e2e/dashboard.spec.ts -g "open cart opens correct brand" --project=chromium-authed
 */
const authDir = path.join(__dirname, '..', '.auth')
const authFile = path.join(authDir, 'user.json')

const testEmail = process.env.TEST_USER_EMAIL
const testPassword = process.env.TEST_USER_PASSWORD

setup('save logged-in state', async ({ page }) => {
  fs.mkdirSync(authDir, { recursive: true })
  await page.goto('/login')

  if (testEmail && testPassword) {
    await page.getByPlaceholder(/you@example|email/i).fill(testEmail)
    await page.getByLabel(/password/i).fill(testPassword)
    await page.getByRole('button', { name: 'Sign In', exact: true }).click()
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 30_000 })
  } else {
    await page.waitForURL(/\/dashboard/, { timeout: 120_000 })
  }

  await page.context().storageState({ path: authFile })
})
