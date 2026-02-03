# Olive E2E Tests (Playwright)

## Run all tests

```bash
npm run test:e2e
```

Uses `http://localhost:3001` (starts dev server if not running). **Tip:** If the dev server is slow to start or tests time out, run against prod for quicker feedback (no local server): `PLAYWRIGHT_TEST_BASE_URL=https://shopolive.xyz npm run test:e2e`. For a fast smoke run: `npm run test:e2e:prod:smoke`.

## Run against production (shopolive.xyz)

**Smoke (no prod user required):**

```bash
npm run test:e2e:prod:smoke
```

Runs home, login, and “redirect to login when not signed in” (12 tests). No `TEST_USER_*` needed.

**Full prod (includes add-to-cart, King Soopers cart):**

```bash
npm run test:e2e:prod
```

Requires `TEST_USER_EMAIL` and `TEST_USER_PASSWORD` in `.env.test` for a user in the **same Supabase project** as shopolive.xyz (Vercel env `NEXT_PUBLIC_SUPABASE_URL`). Otherwise login stays on `/login` and authenticated tests fail.

You can also set `PLAYWRIGHT_TEST_BASE_URL=https://shopolive.xyz` and run `npx playwright test` (no local server).

## Run with UI

```bash
npm run test:e2e:ui
```

## Store picker: multi-state (IL, WI, CO, OH, AZ, TX)

**API-only (no auth):** Verifies the locations API returns stores for Colorado, Illinois, Wisconsin, Ohio, Arizona, Texas:

```bash
npm run test:locations          # local (dev server on 3001)
npm run test:locations:prod      # shopolive.xyz
```

**Full e2e (dashboard store picker):** Same regions are covered by Playwright tests that open “Set your store” / “Add another store”, select chain, enter ZIP, click Search, and assert store list or “No stores found”. These run with other authenticated dashboard tests:

```bash
# After auth-setup or with TEST_USER_* in .env.test:
npm run test:e2e:dashboard-authed
# or: npx playwright test e2e/dashboard.spec.ts -g "Store picker" --project=chromium-authed
```

**Right brand for login/cart (set store → add to cart → open cart):** E2E tests that the correct branded site comes up when the user opens the cart (where they log in or shop). Flow: set store (King Soopers CO, Kroger OH, or Fry's AZ), add Milk, click Add to Kroger Cart, click Open Cart →, assert the new tab URL is kingsoopers.com / kroger.com / frysfood.com and the page shows cart or sign-in. Use one Olive account (e.g. jeffadkins1@gmail.com) to test different stores/brands; when you pick a new place (vacation or work travel), Olive pulls you to the right brand. Kroger requires a separate login per brand, so you sign in on that brand's site when you open the cart. Requires **authenticated user with Kroger connected** (for the brand you're testing).

```bash
# 1) Save session (sign in with Google on shopolive.xyz when browser opens):
PLAYWRIGHT_TEST_BASE_URL=https://shopolive.xyz npm run test:e2e:auth-setup

# 2) Run branded flow tests:
PLAYWRIGHT_TEST_BASE_URL=https://shopolive.xyz npx playwright test e2e/dashboard.spec.ts -g "set store, add item, add to cart, open cart" --project=chromium-authed
```

Or with email/password: set `TEST_USER_EMAIL` and `TEST_USER_PASSWORD` in `.env.test` (user must have Kroger connected), then:

```bash
PLAYWRIGHT_TEST_BASE_URL=https://shopolive.xyz npx playwright test e2e/dashboard.spec.ts -g "set store, add item, add to cart, open cart" --project=chromium
```

## Toggle tests (Budget/Splurge, Exact/Grandma)

To verify the mode and quantity toggles are visible and work:

```bash
# With credentials in .env.test (or after auth-setup with --project=chromium-authed):
npm run test:e2e -- --project=chromium --grep "Mode toggle|Quantity toggle|Budget vs Splurge|Quantity Strategy"
```

Tests: both options visible and switchable for Budget/Splurge and Exact/Grandma; toggles visible in dark mode after switching theme.

## Authenticated dashboard tests (add-to-cart, King Soopers cart)

These tests need a signed-in user. **Auth/test user credentials are stored in `.env.test`** (copy from `.env.test.example`). The setup project uses them to sign in and write `.auth/user.json`; without that file, all `chromium-authed` tests fail with "Error reading storage state from .auth/user.json".

You can use **saved login (Google)** or **email/password**.

### Option A — Test user (email/password; recommended for CI and branded tests)

Use a test user so auth-setup can sign in **without** opening a browser for Google. One Olive account can test different stores/brands; when you pick a new place, Olive pulls you to the right branded site (Kroger login is per brand).

1. **Create `.env.test`** from `.env.test.example`. Set at least:
   - `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (same project as shopolive.xyz)
   - `TEST_USER_EMAIL` and `TEST_USER_PASSWORD` (default: `jeffadkins1@gmail.com` / `OliveE2eTest123!` — see `.env.test.example`)
   - For creating the user in **prod** Supabase: `SUPABASE_SERVICE_ROLE_KEY` (from Supabase Dashboard → Settings → API)

2. **Create the test user** in your Supabase (once):

   ```bash
   npm run create-test-user
   ```

   Uses `TEST_USER_EMAIL` and `TEST_USER_PASSWORD` from `.env.test`; with service role key, creates/updates the user and confirms email.

3. **Save session** (auth-setup signs in with email/password automatically; no manual login):

   ```bash
   PLAYWRIGHT_TEST_BASE_URL=https://shopolive.xyz npx playwright test --project=setup --headed
   ```

   Session is saved to `.auth/user.json` (ignored by git).

4. **Run dashboard tests (including branded cart URL):**

   ```bash
   npm run test:e2e:dashboard-authed
   ```

   For prod:

   ```bash
   PLAYWRIGHT_TEST_BASE_URL=https://shopolive.xyz npm run test:e2e:dashboard-authed
   ```

### Option B — Email/password

Set `TEST_USER_EMAIL` and `TEST_USER_PASSWORD` in `.env.test` (user must exist in the same Supabase project as the app). Then run `npm run test:e2e`; the dashboard tests will log in with the form.

**Option B2 — create a test user:** copy `.env.test.example` to `.env.test`, set Supabase URL and anon key, set `TEST_USER_EMAIL` and `TEST_USER_PASSWORD`, then:

```bash
npm run create-test-user
npm run test:e2e
```

## What’s covered

- **Home**: Olive branding, CTAs (Join the Beta, Continue with Kroger, View Kroger Cart), How it Works, FAQ, Kroger family
- **Login**: Form, Continue with Kroger link, `?then=connect` message, sign in / create account toggle, invalid creds stay on login
- **Dashboard (unauthenticated)**: Redirect to login when not signed in
- **Dashboard (authenticated, optional)**: Olive UI, Budget vs Splurge, add/remove item, quick add, add to Kroger cart (no 503; success or connect message), item results (Added / Couldn't add / Out of stock), open King Soopers cart URL and verify page loads; **branded cart URL**: set store (King Soopers CO / Kroger OH / Fry's AZ) → add item → add to cart → open cart → assert correct branded site (kingsoopers.com / kroger.com / frysfood.com)
- **Recipes**: Recipe modal shows paste-link input; paste recipe URL → Get recipe → either recipe name + "Add ingredients to list" or error; recipe search (e.g. "pasta") → "From the web" or "No results" → if results, select recipe and see "Add ingredients to list" and Servings; add ingredients from recipe to list → haul shows at least one item and "Added ingredients for" message
- **Smart Paste (paste lists)**: Paste blob (e.g. "2x milk, avocados (soft), trash bags") → "Sort my list" → modal shows exact parsed items (milk with Qty 2, avocados with Note: soft, trash bags) → "Add to list" → haul shows milk ×2, avocados, trash bags. Granny logic: "2x milk, 3x milk" merges to Milk ×5 in list
