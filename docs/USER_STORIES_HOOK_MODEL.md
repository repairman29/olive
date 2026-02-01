# Olive — User stories by Hook Model phase

To build a truly **Indistractable** product, developers need to understand not just *what* the user is doing, but *why*. These user stories are organized by **Hook Model phases** so that every feature serves to **reduce cognitive load** or **increase long-term investment**.

---

## Story 0: The 5-second test (Landing)

**Before you build the rest, remember Story 0.**

- **As a** user  
- **I want to** understand what Olive is within 5 seconds of landing on the site  
- **So that** I don’t bounce.

This is the **Landing Page’s** primary job: one clear value prop, one clear next action (Join the Beta / Continue with Kroger).

---

## Phase 1: The Trigger (Internal & External)

*Focus: Capturing the user the moment the need arises.*

| # | Story | As a… | I want to… | So that… |
|---|--------|--------|-------------|----------|
| 1 | **The Instant Recall** | busy parent | type "milk" into a search bar the second I see the carton is empty | I don’t have to remember it later. |
| 2 | **The Recipe Spark** | home cook | paste a URL from a food blog | I don’t have to manually transcribe 15 ingredients into a list. |
| 3 | **The Tuesday Routine** | weekly shopper | see "Suggested for you" chips on my dashboard based on my history | I can build my core list in seconds. |
| 4 | **The Mobile Entry** | someone on the go | access Olive from my phone’s home screen | I can add items while standing in the actual kitchen. |

---

## Phase 2: The Action (Ability & Ease)

*Focus: Reducing "Interaction Cost" and Hick’s Law friction.*

| # | Story | As a… | I want to… | So that… |
|---|--------|--------|-------------|----------|
| 5 | **The Mode Toggle** | budget-conscious shopper | toggle "Budget Mode" | Olive automatically selects store-brand or sale items for me. |
| 6 | **The Brand Loyalty** | picky eater | toggle "Splurge Mode" | Olive prioritizes my favorite premium brands over price. |
| 7 | **The One-Tap Add** | returning user | have a "Quick Add" section of my most-purchased items | I don’t have to type common staples every week. |
| 8 | **The Recipe Customization** | cook with a stocked pantry | "uncheck" ingredients from a recipe (e.g. salt or oil) before adding the rest to my list | my cart isn’t cluttered with things I already have. |
| 9 | **The Store Context** | local shopper | set my specific King Soopers location via ZIP code | I only see items actually in stock at my store. |

---

## Phase 3: The Variable Reward (The "Aha!" Moment)

*Focus: Providing psychological "prizes" for using the app.*

| # | Story | As a… | I want to… | So that… |
|---|--------|--------|-------------|----------|
| 10 | **The Progress Narrative** | user waiting for a batch-add | see a narrative status (e.g. "Clipping coupons…") | I feel the value of the work Olive is doing for me. |
| 11 | **The Coupon Win** | value-seeker | see a "Total Savings" badge after my cart is filled | I get a dopamine hit from the deals Olive found. |
| 12 | **The "Found It" Feedback** | user | see clear green "In Cart" checkmarks next to my list items | I have visual confirmation that my mission is successful. |
| 13 | **The Substitution Suggestion** | shopper | have Olive suggest a similar item if my usual is out of stock | I don’t have to go back and search manually. |

---

## Phase 4: The Investment (Storing Value)

*Focus: Making the app "stickier" through user data.*

| # | Story | As a… | I want to… | So that… |
|---|--------|--------|-------------|----------|
| 14 | **The Preference Memory** | regular user | have Olive remember my brand choices from last week | "Action" becomes faster every time I return. |
| 15 | **The Saved Recipe Box** | meal planner | "Save" a recipe I just pasted | I can re-add its ingredients to my cart next month with one click. |
| 16 | **The Feedback Loop** | beta tester | tell Olive "You got this brand wrong" | she learns my preferences for the future. |
| 17 | **The Account Sync** | first-time user | connect my Kroger account securely via OAuth | my "Investment" (my list) is safely bridged to the store. |

---

## Phase 5: The Hand-off (Trust & Agency)

*Focus: Maintaining the user’s role as "The Pilot."*

| # | Story | As a… | I want to… | So that… |
|---|--------|--------|-------------|----------|
| 18 | **The Mission Complete** | user | see a clear "Open Kroger Cart" button after Olive is done | I can transition to the final checkout without friction. |
| 19 | **The Transparency Interstitial** | cautious user | see a reminder that "Olive never places the order" before I leave the app | I feel in control of my finances. |
| 20 | **The Multi-Cart Support** | Kroger-family shopper | have Olive recognize if I’m shopping at Ralphs vs. Fred Meyer | the hand-off takes me to the correct website. |

---

## Prioritization: V1.0 (MVP) vs V2.0 roadmap

Use this to focus **design and engineering budget** on the stories that drive the most **Hook potential** first.

### V1.0 — MVP (launch / core hook)

*Goal: Solid Trigger → Action → basic Variable Reward → Investment → Hand-off. Maximize "first run" success and "I’ll come back" feeling.*

| Story | Title | Status | Notes |
|-------|--------|--------|--------|
| **0** | 5-second Landing | ✅ Built (design sharpen) | Landing exists; design for "understand in 5 sec" and single CTA. |
| 1 | Instant Recall | ✅ Built | List input + Add. |
| 2 | Recipe Spark | ✅ Built | Paste recipe URL → extract ingredients. |
| 3 | Tuesday Routine | ⚠️ Partial | Quick add / usuals built; "Suggested for you" (predictive) = V2.0. |
| 4 | Mobile Entry | ✅ Built | PWA; add to home screen. |
| 5 | Mode Toggle | ✅ Built | Budget vs Splurge. |
| 6 | Brand Loyalty | ✅ Built | Splurge + preference memory when we have data. |
| 7 | One-Tap Add | ✅ Built | Quick add + usuals. |
| 8 | Recipe Customization | ❌ V2.0 | Uncheck ingredients before adding = next wave. |
| 9 | Store Context | ✅ Built | Set store via ZIP. |
| 10 | Progress Narrative | 📐 Designed | In design brief; implement batch-add narrative UI. |
| 11 | Coupon Win | ❌ V2.0 | Total Savings badge = next wave. |
| 12 | "Found It" Feedback | ⚠️ Polish | Green "In Cart" checkmarks / per-item success state. |
| 13 | Substitution Suggestion | ❌ V2.0 | Out-of-stock suggestion = next wave. |
| 14 | Preference Memory | ✅ Built | Usuals + prefs from add-to-cart. |
| 15 | Saved Recipe Box | ❌ V2.0 | Save pasted recipe to "Your recipes" = next wave. |
| 16 | Feedback Loop | 📐 Designed | In design brief (24h post–Open Cart, Nailed it / Not quite). Implement banner + responses. |
| 17 | Account Sync | ✅ Built | Kroger OAuth. |
| 18 | Mission Complete | ✅ Built | Open Kroger Cart button + success screen (copy in brief). |
| 19 | Transparency Interstitial | 📐 Designed | "Olive never places the order" in brief; implement pre–hand-off interstitial. |
| 20 | Multi-Cart Support | ❌ V2.0 | Ralphs / Fred Meyer / correct domain = next wave. |

**V1.0 design/implementation focus:**  
- **Story 0** — Landing clarity (copy + layout).  
- **Story 10** — Batch-add progress narrative (design + build).  
- **Story 12** — "In Cart" checkmarks / success state (design + build).  
- **Story 16** — Feedback loop (banner + Nailed it / Not quite + Basil response).  
- **Story 19** — Transparency interstitial before "Open Kroger Cart."

---

### V2.0 — Next wave (habit & scale)

*Goal: Deeper Variable Rewards, more Investment, multi-chain.*

| Story | Title | Hook phase | Rationale |
|-------|--------|------------|-----------|
| 3 (predictive) | Suggested for you | Trigger | Predictive chips = stronger internal trigger. |
| 8 | Recipe Customization | Action | Uncheck ingredients = less friction, less clutter. |
| 11 | Coupon Win | Variable Reward | Total Savings = clear dopamine moment. |
| 13 | Substitution Suggestion | Variable Reward | "Olive found an alternative" = trust + reward. |
| 15 | Saved Recipe Box | Investment | Saved recipes = data in the app, reason to return. |
| 20 | Multi-Cart Support | Hand-off | Ralphs / Fred Meyer = correct hand-off for more users. |

---

## Summary

- **Story 0** — Landing: "What is Olive in 5 seconds?"  
- **Stories 1–20** — Mapped to Trigger (1–4), Action (5–9), Variable Reward (10–13), Investment (14–17), Hand-off (18–20).  
- **V1.0** — Ship core hook: landing clarity, list/recipe/store/mode, batch add + progress narrative, "In Cart" feedback, success screen, transparency interstitial, feedback loop.  
- **V2.0** — Add predictive suggestions, recipe uncheck, Total Savings, substitutions, saved recipes, multi-cart.

Use this doc alongside the [Design Brief](OLIVE_DESIGN_BRIEF.md) and [MVP Status](MVP-STATUS.md) to align product, design, and engineering on what to build first and why.

---

# Olive — Advanced stories (Post‑honeymoon)

These additional stories focus on **edge cases, advanced planning, and long‑term maintenance** — the “Investment” hurdles that often cause users to quit after the first few uses.

## Phase 1: Advanced Planning & Social Triggers

| # | Story | As a… | I want to… | So that… |
|---|--------|--------|-------------|----------|
| 21 | **Recipe Scaling** | host | change a recipe from 4 to 10 servings | Olive adjusts ingredient quantities automatically. |
| 22 | **Collaborative List** | roommate/spouse | share my list with another user | we can both add items in real time. |
| 23 | **Multi‑Store Compare** | price‑sensitive shopper | see total cart price for two nearby stores | I can pick the cheaper one. |
| 24 | **Recurring Must‑Haves** | creature of habit | mark items as auto‑add weekly | they appear without asking. |
| 25 | **Diet Filter** | gluten‑allergic shopper | set dietary preferences | Olive flags ingredients I shouldn’t buy. |

## Phase 2: Refined Action & Conflict Resolution

| # | Story | As a… | I want to… | So that… |
|---|--------|--------|-------------|----------|
| 26 | **Blacklist Staples** | cook | blacklist staples (salt/flour) | Olive never adds them from recipes. |
| 27 | **Manual Override** | particular shopper | swap an item Olive picked | I get exactly what I want. |
| 28 | **Bulk Edit** | organized shopper | delete multiple items at once | I can clean up quickly. |
| 29 | **Unit Mismatch** | precise shopper | clarify can sizes when ambiguous | Olive doesn’t guess wrong. |
| 30 | **Non‑Food Divergence** | household manager | add paper towels / dish soap | Olive categorizes household vs food. |

## Phase 3: Indistractable Maintenance

| # | Story | As a… | I want to… | So that… |
|---|--------|--------|-------------|----------|
| 31 | **Zen Mode** | focused person | disable suggestions and predictive prompts | Olive only acts when I ask. |
| 32 | **Expiring Coupon Alert** | deal hunter | get a gentle nudge about expiring coupons | I don’t lose the reward. |
| 33 | **Privacy Wipe** | privacy‑conscious user | delete purchase history without disconnecting Kroger | I control my data. |
| 34 | **Offline List** | shopper with bad cell service | see my list offline | the app still works in‑store. |

## Phase 4: Long‑Term Investment & Legacy

| # | Story | As a… | I want to… | So that… |
|---|--------|--------|-------------|----------|
| 35 | **Seasonal Rotation** | seasonal cook | resurface “Winter Favorites” | Olive feels seasonal and smart. |
| 36 | **Nutrition Summary** | health‑conscious user | see health scores for my haul | I can decide before checkout. |
| 37 | **Fuel Point Projection** | driver | see fuel points this haul will earn | I can hit the next tier. |
| 38 | **Receipt Archive** | budgeter | see history of “Sent to Kroger” lists | I track spending trends. |
| 39 | **Olive Suggests Replacement** | busy person | get a replacement suggestion if favorite is discontinued | Olive still helps me decide. |
| 40 | **Gift List** | thoughtful friend | build a care‑package list for someone else | I can send it to their Kroger account. |

---

## High‑Impact / Low‑Effort (next sprint)

These are **fast wins** with high Hook impact and minimal new infrastructure:

1. **Recipe Scaling (21)** — Already supported in recipe flows; expose as a first‑class control and standardize copy.  
2. **Blacklist Staples (26)** — UI toggle + simple filter; high “Investment” stickiness.  
3. **Bulk Edit (28)** — Multi‑select and delete in the Current Haul list; reduces friction immediately.  
4. **Zen Mode (31)** — Single setting toggle; minimizes notification fatigue for sensitive users.  
5. **Offline List (34)** — Cache last known list in localStorage / IndexedDB; protects against dead‑zone churn.

If you want, I can break these down into **engineering tasks** or add them to the design brief’s roadmap.
