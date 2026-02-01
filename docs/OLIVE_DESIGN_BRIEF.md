# Olive — Product brief for design discussion

**Live app:** [shopolive.xyz](https://shopolive.xyz)  
**One-liner:** Your kitchen companion — turn a simple list into a Kroger cart, with recipes and your store in mind.

---

## What Olive is

Olive is a **grocery list and recipe app** that connects to **Kroger (King Soopers, etc.)**. Users build a list (by typing, from recipes, or from “usual” items), choose how they shop (Budget vs Splurge), then send items into their Kroger cart in one action. The goal is to make list-building and cart-filling feel light and intentional instead of tedious.

**Current stage:** Friends-and-family beta. Core flows work; we’re ready to invest in design so the experience feels cohesive, trustworthy, and easy on phone and desktop.

---

## Who it’s for

- **Primary:** People who already shop at Kroger (or King Soopers, etc.) and want a faster way to go from “what we need” to “in my cart.”
- **Secondary:** People who plan meals from recipes and want ingredients turned into a single list and then into their Kroger cart.

We’re not trying to replace the Kroger app; we’re a **list and recipe layer** that pushes into Kroger when the user is ready.

---

## Core flows (what exists today)

1. **Landing**  
   Hero, value prop, “Join the Beta,” “Continue with Kroger,” How it Works, FAQ. Clear path to sign up or sign in.

2. **Auth**  
   Email sign up / sign in (Supabase). Optional “Continue with Kroger” from landing that leads into connect flow after login.

3. **Dashboard (main workspace)**  
   - **Message area** — short prompt (“What’s missing from the kitchen?”).  
   - **List input** — add items by typing; placeholder hints at recipes.  
   - **Shop for a recipe** — opens a modal with:  
     - Your saved recipes (with options like protein/sauce).  
     - Search more recipes (Spoonacular).  
     - Paste recipe link (extract ingredients from AllRecipes, Food Network, etc.).  
    User picks a recipe, sets servings, optionally picks variants, then adds ingredients to the list.  
   - **Your store** — set/change preferred Kroger location by ZIP; used for product search and add-to-cart.  
   - **Budget vs Splurge** — toggle: Budget = sale items and best price per unit; Splurge = preferred brands when we have data.  
   - **Current Haul** — the list; each line can be “Add to Kroger Cart” (search Kroger, pick product, add).  
   - **Add to Kroger Cart** — batch action: for each item, we search the user’s store and add a match (or show “not found”).  
   - **Quick add** — “usuals” (previously added items) and defaults for one-tap add.  
   - **Connect Kroger** — OAuth connect/reconnect.  
   - **Sign out.**

4. **Post–add to cart**  
   Link to open the user’s Kroger cart (e.g. King Soopers) in a new tab so they can checkout there. Checkout and pickup happen in Kroger; Olive does not place orders.

So the main loop is: **list (manual + recipes) → set store & mode → Add to Kroger Cart → open cart in Kroger.**

---

## Tech and UI context (for design)

- **Stack:** Next.js (App Router), Supabase (auth + DB), Vercel. Kroger OAuth and cart API via our backend.
- **Live URL:** shopolive.xyz (production).
- **UI today:** Custom CSS (no component library). Green/olive palette, rounded cards, simple forms and buttons. Functional and readable; not yet a defined design system.
- **PWA:** Basic manifest and icons; installable on mobile. We care about mobile-first and touch targets.
- **Accessibility:** Semantic HTML and form labels; no formal audit yet. We want design to support keyboard use and screen readers.

We’re open to introducing a design system, component library, or design tokens if it improves consistency and speed of future work.

---

## What we’d like from design

We’d like to work with a consulting firm to:

1. **Align on UX**  
   Review current flows (landing → auth → dashboard → recipe modal → add-to-cart) and suggest simplifications, clearer hierarchy, and fewer steps where it makes sense.

2. **Define a visual direction**  
   Evolve the current “green/olive” look into a coherent system: typography, color, spacing, components (buttons, cards, inputs, modals), and a simple pattern for empty/loading/error states.

3. **Improve the recipe experience**  
   The recipe modal does a lot (saved recipes, search, paste URL). We want a layout and interaction pattern that makes these three entry points obvious and easy, including on small screens.

4. **Strengthen trust and clarity**  
   Kroger connection, store picker, and “Add to Kroger Cart” should feel transparent and safe. We’d like guidance on copy and UI that explains what happens when users connect and add items.

5. **Plan for accessibility and mobile**  
   Ensure touch targets, contrast, and keyboard/screen-reader support are part of the design from the start, and that the dashboard and modals work well on phones.

6. **Define the dashboard empty state**  
   The first screen a user sees (or sees when the list is empty) is critical for preventing early churn. We want a single clear next action, low cognitive load, and optional outcome/social proof — see **Empty state (dashboard)** below.

We’re open to a fixed-scope engagement (e.g. audit + design system + key screen redesigns) or a phased approach (discovery → concepts → implementation-ready specs).

---

## Strategic design lens (Hook Model)

Through a **Nir Eyal Hook Model** lens, Olive is a high-value **Facilitator**. To move from functional beta to a habit-forming product, design should optimize for:

- **Cognitive Ease** — Make the tech invisible; the user should feel like they’re “just making a list” and “sending it to Kroger,” not configuring an app.
- **Variable Rewards** — Reinforce the feeling of being a **smart shopper** (savings, best match, “Olive found it”) so the loop feels rewarding, not transactional.

### Psychological “hot spots” where design has the biggest impact

**1. The “Action” phase (List → Mode → Cart)**  
- **Budget vs Splurge** shouldn’t feel like a generic toggle. In **Budget**, the UI could emphasize “Savings applied” or sale badges; in **Splurge**, “Top rated” or “Favorite brand.” The mode should change the *vibe* of the list.  
- **Batch Add to Kroger Cart** is a high-anxiety moment (“Will it work? Wrong milk?”). Don’t show only a spinner — show a **Narrative Progress Bar** so “waiting” becomes a **Variable Reward**. Example steps:  
  1. *“Searching for the best price on [current item]...”*  
  2. *“Found! Clipping your coupon...”* (when applicable)  
  3. *“Tucking items into your cart at [Store Name]...”*  
  Each item can pulse or turn from grey to green “In cart” as it’s done. The user feels like Olive is working hard for them, increasing **Investment** and perceived value.

**2. Recipe experience (reducing investment friction)**  
- Three entry points (Saved, Search, Paste URL) create a **Hick’s Law** risk: too many choices → paralysis.  
- **“Magic paste”** (paste URL → extract ingredients) is the strongest “Aha!” moment. It should be the **most prominent** entry point in the recipe flow.  
- On mobile, the recipe flow should behave like a **bottom sheet** (slide up from bottom) so the user stays grounded in the dashboard while doing the sub-task of recipe hunting.

**3. Trust & clarity (Investment phase)**  
- **Kroger Connect:** Use official Kroger/King Soopers branding where appropriate, but wrap it in Olive’s “safe space” copy, e.g. *“Olive never sees your password and never places an order without you.”*  
- **Hand-off to Kroger:** When the user clicks “Open Kroger Cart,” use a short **“See you there!”** interstitial that reminds them their list is in the cart (and that coupons are clipped in Kroger if applicable), so the transition feels intentional, not abrupt.

**4. Visual direction: “Kitchen Table” aesthetic**  
- Avoid “FinTech” or “SaaS” coldness. Olive should feel like a **kitchen companion**.  
- **Typography:** Warm, legible **serif for headings** (trustworthy, homey); **clean sans-serif for list and UI** (functional, clear).  
- **Design tokens:** Use **organic naming** in the design system so the team stays aligned with the brand. Suggested Olive token set:

| Functional role   | Technical (example) | **Olive token name** |
|------------------|---------------------|------------------------|
| Primary action   | `#556B2F`           | **Sage Advice**       |
| Success / In cart| `#8FBC8F`           | **Basil**             |
| Warning / Out of stock | `#FF6347`   | **Heirloom Tomato**   |
| Background / paper | `#FFFDD0`         | **Parchment**         |
| Text / ink       | `#2F4F4F`           | **Cast Iron**         |

**5. Predictive investment (habit formation)**  
- **Quick add / usuals** can evolve into **predictive suggestions**. If behavior shows a user often adds “Bananas” on Tuesdays, surface a “Suggested for you” chip (e.g. on Tuesday mornings). That turns Olive from a tool they have to remember into an assistant that remembers *for* them — supporting **Indistractable**-style habit design.

**6. Indistractable notifications**  
- Olive must prioritize **user-initiated triggers**, not generic pings.  
- **Avoid:** “Don’t forget to shop!” or blanket reminders.  
- **Embrace:** **Contextual pings.** Example: “A recipe you saved is on sale at your King Soopers this week.” That’s a high-value, relevant trigger that feels helpful, not naggy.

---

## Empty state (dashboard) — design spec

**Why it matters:** The dashboard **empty state** (first visit, or list just cleared) is the highest-risk moment for early churn. If the user doesn’t know what to do or feels “there’s nothing here,” they leave before the first habit loop.

**Current behavior:**  
- We show a short **message** (e.g. “What’s missing from the kitchen?” or “List is empty. What do we need?”).  
- **Current Haul** shows “Your list is empty — add something above.”  
- List input is present; “Shop for a recipe” and Quick add (usuals) appear below.

**What we want from design:**  
- **Single clear next action** — The eye and the finger should know exactly what to do first (e.g. type an item, or “Paste a recipe link,” or “Shop for a recipe”). Avoid visual clutter or competing CTAs.  
- **Low cognitive load** — No jargon. Copy should feel like a friendly nudge (“Start with one thing you need” or “Paste a recipe link and we’ll pull the ingredients”).  
- **Optional “social proof” or outcome preview** — If space allows, a one-line outcome hint (“We’ll find these at your King Soopers and add them to your cart”) can reduce uncertainty.  
- **Mobile-first** — On small screens, the empty state should still prioritize one primary action and keep “Shop for a recipe” / “Paste recipe link” discoverable without overwhelming.

**Anatomy of an “Aha!” empty state (Goal-Gradient Effect):**  
- **“Half-full” list:** Avoid a completely blank screen (cold start). Show 3 **ghost items** (low opacity), e.g. *Milk, Eggs, Bread*, each with a “+” or tap target. This signals how the app works without a word of instruction — the user feels they have a head start.  
- **Magic Paste callout:** Since URL extraction is the “wow” feature, the empty state is the place to flaunt it. Use a subtle **animation of a link transforming into a grocery list** (or a short “Paste a recipe link → we’ll pull the ingredients” visual) so the value is obvious at a glance.

**Deliverables we’d value:**  
- Empty-state wireframe or high-fidelity for **first-time user** (no list, no Kroger connected yet).  
- Empty-state for **returning user** (Kroger connected, list empty) — optionally with “Suggested for you” or usuals hint.  
- Copy recommendations for the main message and the “list is empty” line.

---

## Proposed design roadmap (phased)

| Phase | Focus | Deliverables |
|-------|--------|--------------|
| **Phase 1: Audit** | Behavioral friction points; **Hand-off to Kroger** (ensure it feels like “completing the mission,” not “leaving the app”) | UX Audit Report + “Hook” analysis |
| **Phase 2: Concept** | Visual “Olive” identity | 3 moodboards + typography/color scale + Olive token set |
| **Phase 3: Design** | Core flow high-fidelity | Redesigned dashboard, mobile views, recipe modal, empty state, **batch-add progress narrative**, **success screen** |
| **Phase 4: Library** | Long-term sustainability | Figma component library + design tokens (organic naming) |

---

## Success screen (post–batch add) — copy spec

**Context:** Immediately after Olive finishes the batch “Add to Kroger Cart,” the user sees a **success state** before they click through to Kroger. This screen should feel like **“mission complete”** — reinforcing the Reward of the Hunt and setting up a clear, confident hand-off.

**Goals:**  
- Confirm that items are in their cart (reduce anxiety).  
- Remind them what to do next (open Kroger to review/checkout).  
- Optionally mention coupons or store so the hand-off feels seamless.  
- Keep tone warm and companion-like, not transactional.

**Recommended copy (pick one or blend):**

| Variant | Headline | Subcopy / CTA |
|---------|----------|----------------|
| **A. Mission complete** | All set — your cart’s ready. | We tucked everything into your [Store Name] cart. Open Kroger to review and checkout. [Open my cart] |
| **B. See you there** | See you there! | Your list is in your King Soopers cart. Head over to add anything else or checkout. [Open my cart] |
| **C. Companion** | Olive’s done her part. | Your items are waiting in your cart at [Store Name]. Tap below when you’re ready. [Open my cart] |
| **D. Coupon-aware** | Cart’s ready — with your deals. | We added your items (and clipped coupons where we could). Open Kroger to checkout. [Open my cart] |

**Notes for design:**  
- **Headline:** Short, positive, “you’re done” feeling.  
- **Subcopy:** One sentence that confirms *where* the items went and *what* they do next. Use **[Store Name]** when we have it (e.g. “your King Soopers at 17th & Uintah”).  
- **CTA:** Single primary button: “Open my cart” or “Open Kroger cart.” Opens the Kroger cart URL in a new tab.  
- **Optional:** Small “Add more to list” or “Back to list” link so they can loop without feeling they’ve “left” Olive.

---

## Olive feedback loop (Investment phase)

To close the **Investment** phase, Olive should ask for feedback in a way that feels like a **conversation over a kitchen counter**, not a corporate survey. In *Indistractable*, Eyal emphasizes that the best products don’t just “ping” you; they ask for a **pact of mutual improvement**. If Olive asks for feedback, it should feel like she’s asking so she can be a **better helper next time**.

### Trigger and channel

- **Trigger:** 24 hours after the user clicked **“Open Kroger Cart”** (i.e. after they’ve had time to receive or pick up groceries).  
- **Channel:** A small **Parchment**-colored banner at the top of the dashboard on their next visit, or a gentle email.

### Option A: “Did I get it right?” (Variable Reward — Accuracy)

Focuses on **accuracy** and reinforces Olive’s learning.

- **Olive:** *“I tucked 8 items into your cart yesterday. Did I find the right brands for you?”*  
  - **[ Nailed it ]** — Confirms Olive’s learning is correct.  
  - **[ Not quite ]** — Opens a simple list to let them swap “Preferred brands” for next time.

### Option B: “Kitchen Helper” (Reward of the Self — Feeling heard)

Focuses on **emotional investment** and feeling heard.

- **Olive:** *“I’m still learning your kitchen’s rhythm. How did I do with your last list?”*  
  - **[ Saved me so much time ]**  
  - **[ A bit confusing ]**  
  - **[ I have an idea for you! ]**

### UI/UX: The “Basil” response (immediate reinforcement)

When the user provides feedback, Olive should respond **immediately** to reinforce the behavior.

- **If they say “Nailed it”:** Pulse **Basil** green. *“Perfect. I’ve noted those as your favorites. We’re getting good at this!”*  
- **If they say “Not quite”:** Stay **Parchment**-toned. *“Thanks for telling me. Which one should I have picked instead? I’ll remember for next time.”*

### Why this works

1. **Low friction** — One-tap interaction.  
2. **Explicit investment** — By telling Olive what she got wrong (or right), the user invests preference data into the app. Olive “knows” them better than any other tool, making it harder to leave later.  
3. **Reciprocity** — Reinforces the “Companion” persona and the pact of mutual improvement.

---

## Core component library (Core 10)

To keep the UI calm as features expand, we anchor the product on a small set of components:

1. **Command Input** — Auto-expanding text area with Smart Paste hint.  
2. **Haul Item Card** — Stable item row with state badges (pending / searching / in-cart).  
3. **Mode Slider** — Budget vs. Splurge slider (not a binary switch).  
4. **Bento Tile** — Modular card for secondary content.  
5. **Narrative Progress** — Progress bar with story text.  
6. **Recipe Bottom Sheet** — Mobile-first modal for recipe flows.  
7. **Success Interstitial** — Post–batch add confirmation screen.  
8. **Predictive Chip** — Suggestion pill with dismiss.  
9. **Confidence Badge** — Low-confidence parser flag.  
10. **Sage Advice Button** — Primary CTA styling.

---

## First run flow (onboarding)

**Goal:** deliver a quick win before asking for Kroger connection.

1. **Empty state prompt** → ask for one item.  
2. **Magic match** → show narrative progress and a smart suggestion.  
3. **Handshake** → prompt to connect Kroger after value is visible.  
4. **Success** → clear hand-off, user reviews and checks out on Kroger.

---

## Artifacts we can share

- **Live app:** shopolive.xyz (sign up or we can provide a test account).  
- **Key screens:** Landing, Login, Dashboard (including **empty state**, **feedback banner**), Recipe modal (saved / search / paste URL), Store picker, **batch-add progress** state, **success screen** (post–batch add).  
- **This brief** (including Success Screen copy spec, Olive token set, and **Olive Feedback Loop**) plus optional technical notes (stack, APIs) if useful for the design process.  
- **Beta Testing Guide** (see `docs/BETA_TESTING_GUIDE.md`) — 1-page How-To for friends and family so testers feel part of a special project and invest in Olive’s success.  
- **User Stories by Hook Model** (see `docs/USER_STORIES_HOOK_MODEL.md`) — 20 user stories + Story 0, organized by Trigger / Action / Variable Reward / Investment / Hand-off, with V1.0 (MVP) vs V2.0 prioritization for design and engineering.

---

**Contact:** [Your name / email]  
**Product name:** Olive (CartPilot)  
**Document version:** Jan 2026
