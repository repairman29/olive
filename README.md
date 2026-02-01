# Olive (CartPilot)

Your kitchen companion — taking the chore out of the grocery store. Add items to your Kroger cart from a simple list; Budget vs Splurge mode; memory for your usuals.

**Live:** [shopolive.xyz](https://shopolive.xyz)

---

## Folder structure

| Folder | Purpose |
|--------|--------|
| `src/app` | Next.js App Router: pages, layouts, API routes (auth, Kroger, memory, recipes) |
| `src/components/ui` | UI components (CommandInput, HaulItemCard, RecipeBottomSheet, etc.) |
| `src/lib` | Supabase client and server helpers |
| `public` | Static assets, PWA manifest and icons |
| `docs` | Product manual, design brief, troubleshooting, beta guide |
| `e2e` | Playwright end-to-end tests |
| `supabase` | SQL migrations (memory, settings, recipes, store preference) |
| `scripts` | Utilities (create-test-user, set-password-for-google-user) |

---

## Supabase (Olive backend)

Olive uses **one Supabase project** for auth and memory:

- **Project:** [rbfzlqmkwhbvrrfdcain](https://supabase.com/dashboard/project/rbfzlqmkwhbvrrfdcain)
- **SQL Editor:** [Open SQL](https://supabase.com/dashboard/project/rbfzlqmkwhbvrrfdcain/sql)

### 1. Run migrations in that project

In the SQL Editor for **rbfzlqmkwhbvrrfdcain**, run (in order):

1. **Memory tables:** paste and run contents of `supabase/memory.sql`
2. **User settings (Budget/Splurge):** paste and run contents of `supabase/settings.sql`

### 2. Env vars

Copy `.env.example` to `.env.local` and fill in keys from:

- [Project API settings](https://supabase.com/dashboard/project/rbfzlqmkwhbvrrfdcain/settings/api):  
  **Project URL** → `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_URL`  
  **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
  **service_role** → `SUPABASE_SERVICE_ROLE_KEY` (keep secret; server only)

## Getting started

```bash
npm install
cp .env.example .env.local   # then add your keys
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) (or the port shown).

## Scripts

- `npm run dev` – dev server
- `npm run build` / `npm run start` – production
- `npm run test:e2e` – Playwright e2e tests
- `npm run test:e2e:ui` – Playwright UI

## Deploy (Vercel)

Set the same env vars in Vercel. Olive is served at [shopolive.xyz](https://shopolive.xyz).

## Recipe search (optional)

“Shop for a recipe” uses recipes from Supabase by default. To also **search thousands of recipes from the web**, set:

- **SPOONACULAR_API_KEY** – get a free key at [spoonacular.com/food-api](https://spoonacular.com/food-api)

With this set, the recipe modal shows a “Search more recipes (Spoonacular)” box and **Paste recipe link**: paste a URL from AllRecipes, Food Network, etc., and we extract the ingredients (via Spoonacular’s extract API), let you set servings, and add them to your list.

## Docs

| Doc | Description |
|-----|-------------|
| [Troubleshooting](docs/TROUBLESHOOTING.md) | Console noise, 401, PWA icons |
| [Product Master Manual](docs/OLIVE_PRODUCT_MASTER_MANUAL.md) | North star, design tokens, ops |
| [Design Brief](docs/OLIVE_DESIGN_BRIEF.md) | UX, flows, design roadmap |
| [Add-to-cart 503 review](docs/ADD-TO-CART-503-REVIEW.md) | Debugging 503s, env-check |
| [Beta Testing Guide](docs/BETA_TESTING_GUIDE.md) | How-to for testers |
| [User Stories (Hook Model)](docs/USER_STORIES_HOOK_MODEL.md) | Stories by trigger / action / reward |
| [MVP Status](docs/MVP-STATUS.md) | Current MVP scope and status |
| [Abuse prevention](docs/ABUSE_PREVENTION.md) | Rate limits, URL validation, add-to-cart caps |
