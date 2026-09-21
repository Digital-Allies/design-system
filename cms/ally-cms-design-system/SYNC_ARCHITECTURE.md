# DA Platform — Design System & Client Site Sync Architecture

## The Core Problem You're Solving

You have **one design system** (colors, typography, components, patterns) that feeds **multiple client sites** and **one admin CMS**. They all need to stay in sync — when you change a color, every site reads the same value. When you build a new component, every site can use it.

---

## The Folder Structure (Canonical)

```
da-platform/ (monorepo root)
├── packages/
│   └── 20260722-da-design-system/          ← THE DESIGN SYSTEM (canonical, source of truth)
│       ├── styles.css                       (entry point, imports all tokens)
│       ├── tokens/
│       │   ├── colors.css
│       │   ├── typography.css
│       │   ├── spacing.css
│       │   └── effects.css
│       ├── components/
│       │   ├── core/
│       │   │   ├── Button.jsx + Button.d.ts + Button.prompt.md
│       │   │   ├── Input.jsx + Input.d.ts + Input.prompt.md
│       │   │   └── Card.jsx + Card.d.ts + Card.prompt.md
│       │   └── (future: shared components)
│       ├── guidelines/                      (visual reference cards for designers)
│       │   ├── colors.html
│       │   ├── typography.html
│       │   └── ...
│       └── _ds_bundle.js                    (compiled, auto-generated)
│
├── tools/build-workflows/                  ← THE CMS ENGINE (multi-tenant)
│   ├── src/
│   │   ├── styles/
│   │   │   ├── atomic-finds-tokens.css      (client-specific overrides)
│   │   │   ├── hctc-tokens.css
│   │   │   └── da-tokens.css
│   │   ├── components/
│   │   │   ├── Button.tsx                   (consumes --tok-* vars)
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── GalaxyCard.tsx
│   │   │   └── ...
│   │   └── app/
│   │       ├── page.tsx                     (homepage router)
│   │       ├── admin/                       (all auth-gated)
│   │       │   ├── login/
│   │       │   ├── dashboard/
│   │       │   ├── pages/
│   │       │   ├── content/
│   │       │   └── ...
│   │       └── [slug]/                      (dynamic public pages)
│   └── supabase/
│       ├── seed-atomic-finds-settings.sql
│       ├── seed-atomic-finds-design-tokens.sql
│       ├── seed-atomic-finds-pages.sql
│       └── ...
│
├── sites/atomic-finds/                     ← CLIENT SITE (design reference only)
│   ├── design_handoff_homepage/            (approved hi-fi reference)
│   │   ├── index.html
│   │   ├── tokens/
│   │   │   ├── colors.css
│   │   │   └── ...
│   │   ├── components/
│   │   │   ├── ProductCard.jsx
│   │   │   └── GalaxyCard.jsx
│   │   └── assets/
│   ├── CLAUDE.md                           (brand spec for Claude Code sessions)
│   └── README.md                           (what's been built, what's pending)
│
├── sites/digitalallies/                    ← FROZEN IMPORT (for reference only)
│   └── (one-time import from live repo, not the source)
│
├── sites/healthcare-training-center/       ← CLIENT SITE (placeholder)
│
├── DA-PLATFORM-MASTER-CONTEXT.md           ← MASTER STATUS (you read this at session start)
├── BUILD-SCHEDULE.md                       ← WEEKLY ROADMAP (what's being built when)
├── STATUS.md                               ← RUNNING LOG (what changed this week)
└── AGENTS.md                               ← HOW CLAUDE CODE WORKS WITH YOU
```

---

## How Sync Works — The Flow

### 1. Design System (Your Canonical Reference)

**Location:** `packages/20260722-da-design-system/`

This is where ALL design decisions live:
- Colors: `tokens/colors.css` → `--signal-red`, `--celestial-yellow`, etc.
- Type: `tokens/typography.css` → `--fs-base`, `--font-headers`, etc.
- Spacing: `tokens/spacing.css` → `--space-4`, `--space-6`, etc.
- Components: `components/core/Button.jsx`, etc.

**What you do here:**
- Change a color? Update `colors.css` once.
- Add a new component? Write `Name.jsx` + `Name.d.ts` once.
- Update brand spec? Edit the `README.md` once.

**Auto-magic:**
- The compiler reads this folder and generates `_ds_bundle.js` + `_ds_manifest.json` automatically after every commit (no manual step).

---

### 2. Client-Specific Tokens (CMS Engine)

**Location:** `tools/build-workflows/src/styles/atomic-finds-tokens.css` (and same for other clients)

These are **overrides** for client-specific needs. They don't replace the design system — they layer on top:

```css
/* atomic-finds-tokens.css */
:root {
  /* From design system (inherited) */
  --signal-red: #C5301A;          /* ← stays as-is */
  
  /* Client override */
  --tok-primary: #F5C842;         /* Atomic Finds uses yellow, not red */
  --tok-secondary: #D4822A;       /* Atomic Finds orange */
  --tok-bg: #1E1E1E;              /* Dark for AF */
  
  /* Client-specific values */
  --tok-heading-font: 'Bagel Fat One', serif;
  --tok-body-font: 'DM Sans', sans-serif;
}
```

When you build `AtomicFindsHomepage.tsx`, it reads `--tok-*` vars. Same component used on every site, just different token values.

---

### 3. Supabase (The Runtime Data Layer)

For each client, there are **three seed files** that populate the CMS database:

```
supabase/
├── seed-atomic-finds-settings.sql       ← site_title, logo_url, colors, fonts
├── seed-atomic-finds-design-tokens.sql  ← token definitions (for theme editor)
└── seed-atomic-finds-pages.sql          ← homepage draft, about page, etc.
```

These exist as **templates**. Anthony runs them once per new client in the Supabase SQL Editor. They're **idempotent** (safe to re-run).

---

## The Sync Points (Where Things Connect)

### Sync Point 1: Design → Code (Friday afternoon)
**You:** Make design changes in Claude Design (colors, components, spacing)  
**Action:** Download the handoff to `sites/atomic-finds/design_handoff_homepage/`  
**Claude Code reads:** The handoff's `tokens/*.css` + `components/*.jsx`  
**Claude Code does:** Extracts the token values and implements the components in the CMS engine

**Example:**
- Design: "Change hero background to #1E1E1E"
- Handoff: `tokens/colors.css` has `--deep-charcoal: #1E1E1E`
- Claude Code: Reads the handoff README, finds the value, updates `atomic-finds-tokens.css` in the CMS engine

---

### Sync Point 2: Code → Supabase (Monday morning)
**Claude Code:** Builds the feature, types check (`tsc --noEmit` passes)  
**Action:** Pushes to `main` branch  
**Vercel:** Auto-deploys the CMS engine  
**Anthony:** Runs the seed files in Supabase SQL Editor (if new client)

**Example:**
- New client "XYZ Corp"
- Claude Code creates `seed-xyz-settings.sql`, `seed-xyz-design-tokens.sql`, `seed-xyz-pages.sql`
- Anthony runs them in Supabase → XYZ Corp's site is now live in the CMS

---

### Sync Point 3: Master Context (Daily)
**File:** `DA-PLATFORM-MASTER-CONTEXT.md`

This file is the **single source of truth** for the entire platform's state. Every agent reads it first.

**What it contains:**
- §3: Open bugs (P0–P6, current status)
- §4: What's been built (verified, working)
- §5: What's not built yet
- §13: Build schedule (what's happening this week)
- §11: Weekly infra checklist

**When to update it:**
- **After Claude Code finishes a session:** Claude Code appends a dated entry to `STATUS.md`
- **You weekly:** Read the STATUS.md entries, update MASTER-CONTEXT.md's §13 (done/pending) and §3 (any new bugs)
- **Before every Claude Code session:** Claude Code reads MASTER-CONTEXT.md + STATUS.md + BUILD-SCHEDULE.md

---

## How to Keep Claude Code Synced

### The Daily Protocol

**Morning (before Claude Code session):**
1. Read `DA-PLATFORM-MASTER-CONTEXT.md` (2 min)
2. Read `STATUS.md` last entry (1 min)
3. Read today's `BUILD-SCHEDULE.md` slot (1 min)
4. Tell Claude Code: "Read those three files, then confirm today's task"
5. Claude Code produces a 1-paragraph brief confirming what it's doing
6. You approve or redirect

**Evening (after Claude Code session):**
1. Claude Code updates `STATUS.md` with what changed (it does this automatically via a sync script)
2. You spot-check the live site (1 min)
3. Update `MASTER-CONTEXT.md` if any bugs are resolved or new ones found
4. Update `BUILD-SCHEDULE.md` if today's slot is done or superseded

### The Weekly Protocol

**Every Monday morning:**
1. Read the week's STATUS.md entries (what happened Fri–Sun)
2. Update MASTER-CONTEXT.md §3 (did any bugs resolve?)
3. Update MASTER-CONTEXT.md §4 (what's verified working?)
4. Confirm BUILD-SCHEDULE.md for the coming week
5. Send Claude Code a Cowork message: "Here's the master context for this week. Read it, then confirm Monday's task."

---

## Folder & File Ownership

| Folder/File | Owner | Update Frequency | Read By |
|---|---|---|---|
| `packages/20260722-da-design-system/` | You (Claude Design) | Weekly | Claude Code + all agents |
| `tools/build-workflows/src/` | Claude Code | Daily | Only Claude Code |
| `sites/atomic-finds/design_handoff_*/` | You (Claude Design) | Weekly | Claude Code reads the handoff README + tokens |
| `DA-PLATFORM-MASTER-CONTEXT.md` | You | Weekly | Every agent at session start |
| `STATUS.md` | Claude Code | Every session | You (weekday) + next agent (next session) |
| `BUILD-SCHEDULE.md` | You | Weekly | Every agent at session start |
| `AGENTS.md` | You | Once | Every agent (conventions reference) |

---

## Example Workflow: Add a New Component

### Day 1 (Friday) — Design Phase
**You → Claude Design:**
1. Design the new component (e.g., "Modal")
2. Add it to `design_handoff_homepage/components/Modal.jsx`
3. Create `design_handoff_homepage/guidelines/modal.html` (specimen card)
4. Write `design_handoff_homepage/components/Modal.d.ts` (props contract)
5. Update `design_handoff_homepage/README.md` to mention the new component

### Day 2 (Monday) — Build Phase
**You → Claude Code:**
1. Cowork message: "Read MASTER-CONTEXT.md. Today's task: build Modal component in the CMS engine. Handoff is in `sites/atomic-finds/design_handoff_homepage/components/Modal.jsx`."
2. Claude Code reads the handoff, extracts the component source and design tokens
3. Claude Code implements `src/components/Modal.tsx` using the same design
4. Claude Code adds the component to the component library
5. Claude Code runs `tsc --noEmit` to verify types
6. Claude Code pushes to `main`, Vercel deploys
7. Claude Code updates `STATUS.md`: "feat(modal): implement Modal component from handoff"

### Day 3 (Tuesday) — Sync Phase
**You:**
1. Read Claude Code's STATUS.md entry
2. Check the live CMS admin at `cms.digitalallies.net` — does the Modal work?
3. Update `MASTER-CONTEXT.md` §4: "✅ Modal component built and verified live"
4. Update `BUILD-SCHEDULE.md`: mark today's slot done

---

## The Three Document Loop

Keep these three files in sync. Everything else flows from them:

1. **`DA-PLATFORM-MASTER-CONTEXT.md`** — "What's the state of everything?"
   - Read at START of every agent session
   - Updated by you (weekly) + Claude Code (as bugs resolve/new ones appear)

2. **`STATUS.md`** — "What changed this week?"
   - Written by Claude Code (every session)
   - Read by you (end of day) to spot-check
   - Feeds into MASTER-CONTEXT updates

3. **`BUILD-SCHEDULE.md`** — "What are we building this week?"
   - Written by you (every Monday)
   - Read by Claude Code (every morning) to know what task is today
   - Updated daily as slots complete or shift

**Golden rule:** If Claude Code reads MASTER-CONTEXT + STATUS + BUILD-SCHEDULE at the start of every session, and you update them end-of-day, you will never be out of sync.

---

## Where to Store What

| What | Where | Why |
|---|---|---|
| Design tokens (colors, type, spacing) | `packages/20260722-da-design-system/tokens/*.css` | Single source of truth; auto-compiled |
| Client-specific overrides | `tools/build-workflows/src/styles/{client}-tokens.css` | Allows same components to theme per client |
| Component source code | `tools/build-workflows/src/components/` | Where Claude Code builds and maintains code |
| Design handoffs | `sites/{client}/design_handoff_*/` | Reference material for Claude Code to read; not shipped to production |
| Brand spec & decisions | `sites/{client}/CLAUDE.md` | Instructions for Claude Code on voice, colors, components |
| Runtime config (site title, logo, etc.) | Supabase `settings` table | Live admin-editable values (not hard-coded) |
| Page blocks & content | Supabase `pages` + `blocks` tables | CMS-managed, per-client data |
| Admin dashboard UI | `tools/build-workflows/src/app/admin/` | Lives in the CMS engine, auto-synced |

---

## Quick Reference: "Where Do I Make This Change?"

**"Change the primary button color"**
- Edit: `packages/20260722-da-design-system/tokens/colors.css` → `--signal-red`
- Tell Claude Code: "Rebase Button component to use the new token from the design system"
- Result: All buttons everywhere now use the new color

**"Add a new page to Atomic Finds"**
- Design phase: Create in Claude Design, add to `sites/atomic-finds/design_handoff_homepage/`
- Build phase: Tell Claude Code "Implement this page in the CMS engine"
- Deploy phase: Tell Anthony "Run the new seed file in Supabase"

**"Fix a bug in the CMS admin"**
- Claude Code: Fixes it in `tools/build-workflows/src/`
- You: Spot-check on live CMS
- Master context: Update MASTER-CONTEXT.md §3 (resolved bug)

**"Change the Atomic Finds hero background"**
- Design phase: Update in Claude Design handoff
- Build phase: Claude Code reads handoff, updates `atomic-finds-tokens.css`
- Live: Vercel redeploys, site reflects new color

---

This is the system. It works if you keep the three document loop current (MASTER-CONTEXT + STATUS + BUILD-SCHEDULE). Claude Code will stay synced as long as it reads those at session start — which it should, every time.

