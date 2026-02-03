# Olive — Brand Guidelines

**Live app:** [shopolive.xyz](https://shopolive.xyz)  
**Tagline:** Your kitchen companion — taking the "chore" out of the grocery store.

---

## Name & positioning

- **Name:** Olive  
- **One-liner:** Your kitchen companion — turn a simple list into a Kroger cart, with recipes and your store in mind.  
- **Short description (manifest/meta):** Taking the "chore" out of the grocery store. Tell Olive what you need, and she'll handle your Kroger cart.  
- **Positioning:** A **list and recipe layer** that connects to Kroger (King Soopers, Fry’s, etc.). We don’t replace the Kroger app; we make list-building and cart-filling feel light and intentional so users stay in control and checkout on Kroger.

---

## Persona & voice

- **Persona:** The **Intuitive Pantry-Keeper**. Calm, anticipatory, helpful.  
- **Voice:** A peer, not a platform. Speak like a friend at the kitchen counter.  
- **Avoid:** FinTech/SaaS coldness, corporate survey tone, naggy reminders.  
- **Embrace:** Warm, clear copy; “kitchen counter” conversation; contextual, high-value triggers (e.g. “A recipe you saved is on sale at your King Soopers this week”).

---

## Aesthetic: “Kitchen Table”

Olive should feel like a **kitchen companion**, not a generic app. The visual direction is **organic, warm, and expressive minimalism** — homey, trustworthy, and easy on the eye on phone and desktop.

---

## Color system

### Olive palette (base scale)

| Token    | Hex       | Use |
|----------|-----------|-----|
| olive-50 | `#f8faf5` | Lightest tint |
| olive-100| `#eef2e6` | Input/surface |
| olive-200| `#dce5cc` | Borders, subtle fills |
| olive-300| `#c2d1a3` | Muted accents |
| olive-400| `#a5b878` | Mid accent |
| olive-500| `#87a05a` | Muted text, chips |
| olive-600| `#6b8245` | |
| olive-700| `#536538` | Muted foreground |
| olive-800| `#445230` | |
| olive-900| `#3a4529` | Darkest |

### Brand tokens (organic naming)

Use these names in copy, design specs, and components so the team stays aligned with the brand.

| Role              | Token name       | Hex       | Use |
|-------------------|------------------|-----------|-----|
| Primary action    | **Sage Advice**  | `#556b2f` | CTAs, links, primary buttons, nav emphasis. Trust, wisdom, action. |
| Success / in-cart | **Basil**        | `#8fbc8f` | “In cart,” success states, positive feedback. Organic, “mission complete.” |
| Warning / error   | **Heirloom Tomato** | `#d24d33` | Low-confidence items, out-of-stock, gentle urgency. Natural, non-alarming. |
| Background        | **Parchment**    | `#fffdf0` | Main background (light). Homey, reduces eye strain. |
| Typography / ink  | **Cast Iron**    | `#2f4f4f` | Headings and body text. Grounded, high legibility. |

### Supporting tokens

- **Cream** `#fdfcf9` — PWA background, soft surfaces.  
- **Sage** `#9caf88` — Theme color (manifest), pulse animation, dark-mode primary.  
- **Terracotta** `#c4704b` — Optional accent.  
- **Hero gradient** — Radial from soft green-tint to Parchment (light) or dark charcoal (dark mode).

### Dark mode

Background and surfaces shift to deep charcoal (`#12140e`, `#1a1c16`); Cast Iron flips to light text; Sage Advice becomes the lighter Sage for primary actions. Contrast is tuned for WCAG AA (e.g. muted text on cards).

---

## Typography

- **Headings:** Warm serif — **Libre Baskerville** (CSS variable `--font-heading`). Trustworthy, homey.  
- **Body / UI:** Clean sans-serif — **Inter** (CSS variable `--font-body`). Functional, clear.  
- **Rules:** All `h1–h4` use the heading font; body and controls use the body font. Selection highlight uses a Basil-tinted overlay.

---

## Logo & mark

- **Wordmark:** “Olive” in Cast Iron, medium weight, with heading or body font as context dictates.  
- **Icon / mark:** Circular Olive logo (stylized olive with leaf on muted olive-green circle), served as `/olive-logo.png`. Used in nav, hero, dashboard “Hi, I’m Olive” area, login, help, and auth flows. Implemented as `<OliveLogo />` component (`@/components/ui`) with size variants (`sm`–`5xl`: 32px up to 128px) and optional `pulse` for loading/active states. Use larger sizes (e.g. `4xl`, `5xl`) for hero and focal areas so the olive reads clearly.  
- **PWA:** 192×192 and 512×512 PNGs; use `olive-logo.png` or export at those sizes for app icons when ready.

### Marketing & UI illustrations (optional)

- **`/olive-hero.png`**, **`/olive-empty-state.png`**, **`/olive-success.png`** — Optional AI-generated illustrations; not currently used in the UI so the Olive logo remains the primary graphic.

### Iconography (bespoke system)

Olive uses a **proprietary icon set** instead of platform emojis, for consistent rendering and alignment with the brand (organic, warm, minimal). See **[OLIVE_ICONOGRAPHY_PLAN.md](./OLIVE_ICONOGRAPHY_PLAN.md)** for the full transition plan, emoji → icon mapping, and phased implementation.

- **Pillars:** Organic (monoline / hand-drawn feel), warm (rounded caps/joins), minimal (legible at 16–24px).
- **SVG standards:** 2px stroke (or 1px thin), `stroke-linecap: round`, `stroke-linejoin: round`, 24×24 canvas, `currentColor` or brand tokens.
- **Implementation:** Lucide as baseline; `OliveIcon` wrapper component applies brand defaults; custom **Olive branch** mark (`OliveBranchIcon` / `<OliveIcon name="olive-branch" />`) and optional culinary SVGs in later phases.

**Usage rules**

| Rule | Spec |
|------|------|
| **Minimum size** | 16px for UI icons; 24px preferred for primary actions and headings. Do not scale below 16px for interactive or semantic icons. |
| **Clear space** | Allow at least the icon’s height (or width) as clear space around the mark when it stands alone (e.g. in a button or nav). |
| **Outline vs solid** | Default is **outline** (stroke, no fill). Use **solid** (fill) only for active/selected states (e.g. saved recipe, selected mode); keep stroke round and warm. |
| **Accessibility** | **Decorative** icons (next to visible text that repeats the meaning): use `aria-hidden` (OliveIcon does this when `ariaLabel` is omitted). **Standalone** or **meaningful** icons (e.g. icon-only button): provide `ariaLabel` or visible text so screen readers and keyboard users get the same meaning. |
| **Favicon & PWA** | Favicon: `/olive-branch.svg` (or `app/favicon.ico`). PWA icons: `icon-192.png` and `icon-512.png` in `public/` — should be derived from the Olive logo or olive-branch mark (Sage/Cast Iron on Cream). |

**Adding new icons (governance)**

Before adding a new icon to the Olive set, ensure:

- **Canvas:** 24×24 (or 16×16 for tiny UI); 1–2px padding; key shapes grid-aligned.
- **Stroke:** 2px default (1px for “thin”); `stroke-linecap: round`, `stroke-linejoin: round`.
- **Variants:** Prefer outline as default; use solid only for active/selected (e.g. `<OliveIcon variant="solid" />`).
- **Accessibility:** Provide `ariaLabel` when the icon is standalone or meaningful; otherwise keep decorative (`aria-hidden` via OliveIcon when no label).
- **Naming:** Use kebab-case in code (e.g. `utensils-crossed`); document in OLIVE_ICONOGRAPHY_PLAN.md if adding a new semantic category.

---

## Manifest & meta (PWA)

- **App name:** Olive  
- **Short name:** Olive  
- **Description:** Your kitchen companion — taking the "chore" out of the grocery store.  
- **Theme color:** `#9caf88` (Sage).  
- **Background color:** `#fdfcf9` (Cream).  
- **Start URL:** `/dashboard`.

---

## Key copy & CTAs

- **Hero headline:** Your Kitchen Companion  
- **Hero subcopy:** Turn messy lists and recipes into a filled Kroger cart in one tap. Olive finds the right brands, shows what you saved on sale items (and fuel points), and keeps you in control at checkout.  
- **Primary CTA:** Join the Beta →  
- **Secondary:** Continue with Kroger • View Cart  
- **Trust line:** Add Olive to your home screen for one-tap access • Olive never checks out for you.  
- **Dashboard prompt (empty):** “What’s missing from the kitchen?”  
- **Feedback tone:** “Did I find the right brands for you?” / “How did I do with your last list?” — one-tap options (e.g. Nailed it / Not quite / Saved me time / I have an idea).  
- **Hand-off to Kroger:** “Your list is in your cart at [Store Name]. Open Kroger to review and checkout.” Single primary button: “Open my cart.”

---

## Trust & transparency

- **Agency:** Olive fills the cart; you review and pay on Kroger. **Olive never places orders.**  
- **Security:** OAuth only. Olive never sees or stores your password or credit card.  
- **Savings:** We show sale savings and fuel points; we don’t clip digital coupons — users clip those on Kroger before checkout.  
- **Humility:** When Olive is unsure (e.g. low-confidence parse), she flags it (e.g. Heirloom Tomato) and asks instead of guessing.

---

## Motion & interaction

- **Olive Pulse:** Soft expanding ring animation on the Olive avatar (Sage tint) to signal “listening” or activity.  
- **Focus:** Visible focus ring (2px background + 4px Sage Advice) for buttons and controls in light and dark.  
- **Transitions:** 0.3s ease on theme (background/color); 0.5s ease on gentle fade-in.

---

## Beta badge

- **Label:** “Friends & family beta” or “Private beta • Invite-only” with a small Basil dot to indicate “live” or “active.”

---

## Summary table

| Element       | Spec |
|---------------|------|
| **Name**      | Olive |
| **Tagline**   | Your kitchen companion — taking the "chore" out of the grocery store. |
| **Primary**   | Sage Advice `#556b2f` |
| **Success**   | Basil `#8fbc8f` |
| **Background**| Parchment `#fffdf0` |
| **Ink**       | Cast Iron `#2f4f4f` |
| **Headings**  | Libre Baskerville |
| **Body**      | Inter |
| **Aesthetic** | Kitchen Table — warm, organic, minimal. |

---

*Document version: Feb 2026. Aligns with OLIVE_DESIGN_BRIEF.md and OLIVE_PRODUCT_MASTER_MANUAL.md.*
