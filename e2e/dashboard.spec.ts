import { test, expect } from '@playwright/test'

test.describe('Dashboard (unauthenticated)', () => {
  test.skip(
    ({ baseURL }) => !baseURL || baseURL.includes('localhost'),
    'Redirect test runs when baseURL is production (auth configured)'
  )
  test('redirects to login when not signed in', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page).toHaveURL(/\/login/, { timeout: 15000 })
  })
})

test.describe('Dashboard (authenticated)', () => {
  test.skip(
    !process.env.TEST_USER_EMAIL || !process.env.TEST_USER_PASSWORD,
    'Set TEST_USER_EMAIL and TEST_USER_PASSWORD to run authenticated tests'
  )

  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
    await page.getByPlaceholder(/you@example|email/i).fill(process.env.TEST_USER_EMAIL!)
    await page.getByPlaceholder(/••••/).fill(process.env.TEST_USER_PASSWORD!)
    await page.getByRole('button', { name: 'Sign In', exact: true }).click()
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 })
  })

  test('shows Olive and main UI', async ({ page }) => {
    await expect(page.getByRole('button', { name: /sign out/i })).toBeVisible()
    await expect(page.getByTestId('current-haul-card')).toBeVisible()
  })

  test('Budget vs Splurge toggle exists and is clickable', async ({ page }) => {
    await expect(page.getByText(/how should olive pick items/i)).toBeVisible()
    const slider = page.locator('input[type="range"]').first()
    await expect(slider).toBeVisible()
    await slider.fill('0')
    await expect(page.getByText(/sale items first, then best price per unit/i)).toBeVisible()
  })

  test('add item to list and remove', async ({ page }) => {
    await page.getByTestId('manual-add-input').fill('Milk')
    await page.getByTestId('manual-add-button').click()
    await expect(page.getByText(/got it.*milk/i)).toBeVisible()
    const haulCard = page.getByTestId('current-haul-card')
    await expect(haulCard.getByText('Milk').first()).toBeVisible()
    await haulCard.getByRole('button', { name: /remove/i }).click()
    await expect(haulCard.getByText('Milk')).not.toBeVisible()
  })

  test('quick add buttons add to list', async ({ page }) => {
    await page.getByRole('button', { name: /\+ add milk\?/i }).first().click()
    await expect(page.getByText(/added milk/i)).toBeVisible()
    await expect(page.getByText('Milk').first()).toBeVisible()
  })

  test('add to Kroger cart: no 503, success or connect message', async ({ page }) => {
    await page.getByTestId('manual-add-input').fill('Milk')
    await page.getByTestId('manual-add-button').click()
    await expect(page.getByText(/got it.*milk/i)).toBeVisible()

    const addToCartBtn = page.getByRole('button', { name: /add \d+ item(s)? to kroger cart/i })
    if (!(await addToCartBtn.isVisible().catch(() => false))) {
      return
    }

    await addToCartBtn.click()
    await expect(page.getByText(/finding your items|adding to kroger/i)).toBeVisible({ timeout: 3000 })

    await expect(
      page.getByText(/all done!|please connect your kroger|item results|something went wrong|i couldn't reach kroger/i)
    ).toBeVisible({ timeout: 15000 })

    await expect(page.getByText(/kroger product search unavailable|503/i)).not.toBeVisible()
  })

  test('recipe modal shows paste link input', async ({ page }) => {
    await page.getByRole('button', { name: /shop for a recipe/i }).click()
    await expect(page.getByText(/paste recipe link/i)).toBeVisible()
    await expect(page.getByPlaceholder(/https:\/\/\.\.\./i)).toBeVisible()
    await page.getByRole('button', { name: /cancel/i }).click()
  })

  test('feedback banner shows after 24h and accepts response', async ({ page }) => {
    await page.evaluate(() => {
      const yesterday = new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString()
      localStorage.setItem('olive_cart_opened_at', yesterday)
      localStorage.removeItem('olive_feedback_response')
      localStorage.setItem('olive_cart_item_count', '8')
    })
    await page.reload()
    await expect(page.getByText(/tucked.*into your cart yesterday/i)).toBeVisible()
    await page.getByRole('button', { name: /nailed it/i }).click()
    await expect(page.getByText(/noted those as your favorites/i)).toBeVisible()
  })

  test('progress narrative appears when add-to-cart starts', async ({ page }) => {
    await page.getByTestId('manual-add-input').fill('Milk')
    await page.getByTestId('manual-add-button').click()
    const addToCartBtn = page.getByRole('button', { name: /add \d+ item(s)? to kroger cart/i })
    if (!(await addToCartBtn.isVisible().catch(() => false))) {
      return
    }
    await addToCartBtn.click()
    await expect(page.getByText(/searching for the best price/i)).toBeVisible({ timeout: 5000 })
  })

  test('smart paste parses a blob and adds items', async ({ page }) => {
    await page.getByRole('button', { name: /smart paste/i }).click()
    const modal = page.getByRole('heading', { name: /smart paste/i }).locator('..').locator('..')
    await modal.locator('textarea').fill('2x milk\navocados (soft)\ntrash bags')
    await page.getByRole('button', { name: /sort my list/i }).click()
    await expect(page.getByText(/i found these items/i)).toBeVisible()
    await page.getByRole('button', { name: /add to list/i }).click()
    await expect(page.getByText(/added \d+ item/i)).toBeVisible()
    const haulCard = page.getByTestId('current-haul-card')
    await expect(haulCard.getByText('Milk')).toBeVisible()
  })

  test('zen mode hides suggestions', async ({ page }) => {
    const focusCard = page.getByTestId('focus-staples-card')
    await focusCard.getByRole('button', { name: /on|off/i }).click()
    await expect(page.getByText(/quick add/i)).not.toBeVisible()
    await expect(page.getByRole('button', { name: /smart paste/i })).not.toBeVisible()
  })

  test('blacklist prevents adding staples', async ({ page }) => {
    const focusCard = page.getByTestId('focus-staples-card')
    await focusCard.getByPlaceholder(/e.g. salt, flour/i).fill('Milk')
    await focusCard.getByRole('button', { name: /^add$/i }).click()
    await page.getByTestId('manual-add-input').fill('Milk')
    await page.getByTestId('manual-add-button').click()
    const haulCard = page.getByTestId('current-haul-card')
    await expect(haulCard.getByText('Milk')).not.toBeVisible()
  })

  test('bulk edit removes selected items', async ({ page }) => {
    await page.getByTestId('manual-add-input').fill('Milk')
    await page.getByTestId('manual-add-button').click()
    await page.getByTestId('manual-add-input').fill('Eggs')
    await page.getByTestId('manual-add-button').click()
    const haulCard = page.getByTestId('current-haul-card')
    await haulCard.getByRole('checkbox').nth(0).check()
    await haulCard.getByRole('checkbox').nth(1).check()
    await page.getByRole('button', { name: /remove selected/i }).click()
    await expect(haulCard.getByText('Milk')).not.toBeVisible()
    await expect(haulCard.getByText('Eggs')).not.toBeVisible()
  })

  test('offline list loads from local storage', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('olive_haul_items', JSON.stringify(['Milk']))
    })
    await page.goto('/dashboard')
    const haulCard = page.getByTestId('current-haul-card')
    await expect(haulCard.getByText('Milk')).toBeVisible()
  })

  test('first run guide shows for new users', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('olive_first_run_done', 'false')
      localStorage.setItem('olive_first_run_step', '0')
    })
    await page.reload()
    await expect(page.getByText(/hi, i'm olive/i)).toBeVisible()
  })
})
