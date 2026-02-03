# Olive Iconography: Strategic Transition Plan

**Purpose:** Replace platform-dependent emojis with a bespoke, cohesive iconography system aligned with Olive’s brand (organic, warm, expressive minimalism).  
**Status:** Phase 1, 2, and 3 (partial) implemented. Remaining: optional custom culinary SVGs, animated/3D (future).  
**Aligned with:** [OLIVE_BRANDING.md](./OLIVE_BRANDING.md), strategic brief (emoji → icon transition).

---

## 1. Rationale and goals

- **Consistency:** One controlled visual language across web, PWA, and future touchpoints (no iOS/Android/Windows emoji fragmentation).
- **Brand fit:** Icons that feel like an extension of the brand (Libre Baskerville, Sage Advice, Parchment, Cast Iron) — warm, organic, minimal.
- **Authority:** Proprietary icon set signals care and professionalism, especially in food/grocery tech.
- **Accessibility:** SVG icons with `aria-label`/`title` and predictable sizing for screen readers and legibility.

---

## 2. Aesthetic pillars (design constraints)

| Pillar      | Implementation |
|------------|----------------|
| **Organic** | Hand-drawn or monoline feel; avoid cold geometric perfection. |
| **Warm**    | Rounded stroke caps and joins; earthy palette (Sage, Basil, Cast Iron). |
| **Minimal** | Essential shapes only; legible at 16–24px; consistent optical weight. |

**SVG standards (brand-wide):**

| Property        | Value        | Notes |
|-----------------|-------------|-------|
| `stroke-width`  | 2px (1px for “thin”) | Consistent visual weight. |
| `stroke-linecap`| `round`      | Warm, soft ends. |
| `stroke-linejoin` | `round`   | Soft corners. |
| `paint-order`   | `stroke fill` | Stroke visible when fill used. |
| Canvas          | 24×24 (or 16×16) | 1–2px padding; grid-aligned. |
| Color           | `currentColor` or CSS vars | Inherit from UI (e.g. `--sage-advice`, `--cast-iron`). |

---

## 3. Current emoji inventory and icon mapping

All emoji usages in the app are listed below with a proposed **Olive icon metaphor** and suggested **Lucide/Phosphor baseline** (for Phase 1). Custom SVGs can replace these in Phase 2.

| Emoji | Location(s) | Semantic | Olive metaphor | Baseline icon (Phase 1) |
|-------|-------------|----------|----------------|-------------------------|
| 🛒 | `page.tsx` (Kroger, bento, View Cart); `dashboard/page.tsx` (Current Haul); `login/page.tsx`; `connect/success/page.tsx` | Cart, Kroger, haul | Minimal basket, 2px stroke | `ShoppingCart` (Lucide) |
| 🏷️ | `page.tsx` (sale savings ×3); `ModeToggle.tsx` (Budget) | Sale, tag, budget | Tag or ticket, warm line | `Tag` (Lucide) |
| ⛽ | `page.tsx` (fuel points ×2) | Fuel points / rewards | Nozzle + coin or gauge | `Fuel` (Lucide) or custom |
| 💬 | `page.tsx` (Just tell her) | Conversation, “tell Olive” | Speech/chat, friendly | `MessageCircle` (Lucide) |
| 🔔 | `page.tsx` (Never Run Out) | Reminders, nudge | Soft bell, not harsh | `Bell` (Lucide) |
| 🕒 | `page.tsx` (with 🔔) | Time, rhythm | Clock or timer | `Clock` (Lucide) |
| 📈 | `page.tsx` (with ⛽) | Progress, growth | Chart up or gauge | `TrendingUp` (Lucide) |
| ⭐ | `page.tsx` (Budget vs Splurge); `ModeToggle.tsx` (Splurge) | Splurge, favorite | Star, subtle | `Star` (Lucide) |
| 🍳 | `dashboard/page.tsx` (Shop for a recipe) | Recipe, cooking | Pan with steam or pot | `CookingPot` (Lucide) |
| 📋 | `dashboard/page.tsx` (Smart Paste) | Paste list, clipboard | Clipboard | `ClipboardList` (Lucide) |
| 🫒 | `docs/OLIVE_PRODUCT_MASTER_MANUAL.md` only | Brand | Use existing Olive logo / branch mark | OliveLogo or custom branch SVG |

**Out of scope for codebase:** `setup-domain.js` 🫒 (CLI only); can stay or become text “Olive”.

---

## 4. Technical approach

### 4.1 Baseline library: Lucide

- **Choice:** Lucide — tree-shakable, 24×24, consistent stroke, good cooking/UI coverage (`CookingPot`, `ChefHat`, `ShoppingCart`, `Tag`, etc.).
- **Alternative:** Phosphor (multiple weights, food-focused) can be added later for variety or duotone variants.
- **Usage:** Import only the icons we use; wrap in a single **Olive icon component** that applies brand defaults (size, color, stroke, `aria-hidden`/`aria-label`).

### 4.2 Olive icon component (wrapper)

- **Name:** e.g. `OliveIcon` or `Icon` from `@/components/ui`.
- **Props:** `name` (e.g. `cart` | `tag` | `fuel` | `message-circle` | …), `size` (16 | 20 | 24), `className`, `ariaLabel` (when decorative parent doesn’t provide context).
- **Behavior:** Renders Lucide SVG with `strokeWidth={2}`, `strokeLinecap="round"`, `strokeLinejoin="round"`, `className` for color (e.g. `text-[var(--sage-advice)]`), and optional `aria-label` for a11y.
- **File:** `src/components/ui/OliveIcon.tsx` (or `Icon.tsx`) with a small map of `name → LucideIcon`.

### 4.3 Custom SVG assets (later)

- **Brand mark:** Olive branch / stylized olive (fluid spiral) — for favicon, empty states, marketing. Existing `OliveLogo` stays; optional second “branch only” or “line art” variant.
- **Culinary / grocery:** Hand-drawn or curated set (prep, cooking, pantry, produce) as SVGs in `public/icons/` or `src/assets/icons/`, imported into the same `OliveIcon` system by name (e.g. `olive-branch`, `avocado`, `basket`).

### 4.4 Deployment

- **Primary:** React components (Lucide + custom SVGs) — tree-shaking, one import per icon.
- **Optional later:** SVG sprite or icon font if we need many icons on a single page and want to optimize further.

---

## 5. Phased implementation

### Phase 1 — Foundation (short term)

1. **Dependencies**
   - Add `lucide-react`.
2. **Design system**
   - Document the SVG standards above in `OLIVE_BRANDING.md` (Iconography subsection).
3. **Olive icon component**
   - Create `OliveIcon` with the 10 mappings from the table (cart, tag, fuel, message-circle, bell, clock, trending-up, star, cooking-pot, clipboard-list).
   - Apply brand stroke/round and `currentColor`; support `size` and `ariaLabel`.
4. **Replace emojis in app**
   - Replace each emoji in the inventory with `<OliveIcon name="…" />` (and optional `ariaLabel` where needed). Keep `aria-hidden` on decorative instances; add `aria-label` when icon is the only label.
5. **Export**
   - Export `OliveIcon` from `@/components/ui`.

**Deliverables:** No emojis in UI (except optional CLI); consistent icon look; a11y preserved or improved.

### Phase 2 — Brand marks and polish ✅ Done

1. **Olive branch / line-art mark**
   - Design (or source) a single-stroke or monoline “olive branch” SVG that fits the warm, organic pillar.
   - Add to `OliveIcon` as `olive-branch` (or keep as separate `OliveBranchIcon` if used only in special contexts).
2. **Favicon / PWA**
   - Ensure 16×16 and 32×32 favicons and PWA icons use the Olive mark (existing `olive-logo.png` or new branch mark), not an emoji.
3. **Documentation**
   - Add “Iconography” to the brand guide: when to use outline vs solid, clear space, min size (e.g. 16px), and a11y (pair with label or `aria-label`).

### Phase 3 — Extended set and governance ✅ Done (partial)

1. **Culinary and grocery icons** — Added to `OliveIcon`: `apple`, `carrot`, `egg`, `milk`, `salad`, `utensils-crossed`, `wheat` (Lucide baseline). **Vector-only** (no PNGs): `olive-avocado` = inline SVG `OliveAvocadoIcon`; `olive-basket` = Lucide `ShoppingBasket`. All icons use transparent backgrounds.
2. **Variants** — `variant?: 'outline' | 'solid'` on OliveIcon; default outline, solid for active/selected (e.g. ModeToggle uses solid when selected). Duotone left for future.
3. **Design governance** — “Adding new icons” checklist added to OLIVE_BRANDING.md (canvas, stroke, variants, a11y, naming).

---

## 6. Emoji → component replacement checklist

Use this as a tick list when doing Phase 1.

| File | Line (approx) | Emoji | Replace with |
|------|----------------|-------|--------------|
| `src/app/page.tsx` | 65 | 🛒 | `<OliveIcon name="cart" />` |
| `src/app/page.tsx` | 105, 144, 177 | 🏷️ | `<OliveIcon name="tag" />` |
| `src/app/page.tsx` | 110, 154 | ⛽ | `<OliveIcon name="fuel" />` |
| `src/app/page.tsx` | 115 | 🛒 | `<OliveIcon name="cart" />` |
| `src/app/page.tsx` | 129 | 💬 | `<OliveIcon name="message-circle" />` |
| `src/app/page.tsx` | 155 | 📈 | `<OliveIcon name="trending-up" />` |
| `src/app/page.tsx` | 165–166 | 🔔, 🕒 | `<OliveIcon name="bell" />`, `<OliveIcon name="clock" />` |
| `src/app/page.tsx` | 181 | ⭐ | `<OliveIcon name="star" />` |
| `src/app/dashboard/page.tsx` | 1599 | 📋 | `<OliveIcon name="clipboard-list" />` |
| `src/app/dashboard/page.tsx` | 1606 | 🍳 | `<OliveIcon name="cooking-pot" />` |
| `src/app/dashboard/page.tsx` | 1782 | 🛒 | `<OliveIcon name="cart" />` |
| `src/app/login/page.tsx` | 177 | 🛒 | `<OliveIcon name="cart" />` |
| `src/app/connect/success/page.tsx` | 21 | 🛒 | `<OliveIcon name="cart" />` |
| `src/components/ui/ModeToggle.tsx` | 29, 44 | 🏷️, ⭐ | `<OliveIcon name="tag" />`, `<OliveIcon name="star" />` |

---

## 7. Success criteria

- No emoji used for UI semantics in the app (excluding docs or CLI if desired).
- All icons use the same stroke/round and color conventions.
- Icons are accessible (decorative with `aria-hidden` or meaningful with `aria-label`/accompanying text).
- Iconography is documented in the brand guide and this plan is the single source of truth for the transition and future extensions.

---

*Document version: Feb 2026. References OLIVE_BRANDING.md and the strategic brief on emoji-to-icon transition.*
