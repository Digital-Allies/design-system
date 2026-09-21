# Atomic Finds — Build Checklist & Resources

ATX-based client build, dark-theme retro/vintage-collectibles brand. This
is the project-specific instance of `docs/WORKFLOW-TEMPLATE.md` — read
that first for the general pipeline; this file is the concrete checklist
for THIS client only. Keep it updated as the build progresses; don't let
it go stale once Anthony syncs new info from the live repo/Vercel.

---

## 1 · Project Structure Map

| What | Where |
|---|---|
| Live site | https://atomic-finds-atx.vercel.app/ |
| Site source | `da-platform/sites/atomic-finds/` *(confirm exact path — fill in once verified against the live repo)* |
| Design system / handoff folder | *(fill in — this design-system project's own `cms/` folder holds the shared platform admin work; Atomic Finds' own brand tokens/design reference should live alongside its site source, not here)* |
| Specs / schema docs | `da-platform/tools/build-workflows/` (`ARCHITECTURE.md`, `PIPELINE.md`, `THEME_ENGINE_PLAN.md`) — shared platform-wide, applies to Atomic Finds too |
| Supabase migrations for this client | `supabase/migrations/20260121000000_products_commerce_fields.sql`, `20260122000000_reviews_table.sql` (+ matching seed scripts: `seed-atomic-finds-catalog.sql`, `seed-atomic-finds-reviews.sql`) |
| Figma / Claude Design links | *(none captured yet — add here once Anthony shares the Figma Make trial or any Claude Design project link for Atomic Finds)* |

## 2 · Pre-Work Checklist
Before making ANY change to Atomic Finds:
- [ ] Read `da-platform/STATUS.md` for the current, real state (not this
      file — STATUS.md is the single source of truth and changes daily)
- [ ] Check whether the change already exists in the shared design
      system (`ARCHITECTURE.md`'s `BlockRenderer.tsx` block types,
      `THEME_ENGINE_PLAN.md`'s token system) before building something
      Atomic-Finds-specific — most needs are already platform-wide
- [ ] Confirm the Vercel Production Branch is actually pointed at `main`
      before assuming what's live matches what's in the repo (this has
      been wrong before and silently served a stale build)
- [ ] Reference this file's Decision Log (§6) before re-proposing
      anything — check it's not already settled

## 3 · Batch-Fix Workflow
Per the general template: collect every issue found this session into
one list, fix once at the end, one commit, one deploy/test cycle. Do not
patch Atomic Finds issues one-by-one mid-session.

## 4 · Build Process
*(fill in exact commands once confirmed against the real repo — these
are the standard Next.js/Supabase platform commands per `ARCHITECTURE.md`,
confirm they're unmodified for this site before relying on them)*
- Type-check: `npm run typecheck` *(confirm)*
- Build: `npm run build` *(confirm)*
- Validate before pushing: no type errors, build succeeds locally,
  migrations applied to Supabase BEFORE the code that depends on them
  ships (commerce-fields + reviews migrations must land first)

## 5 · Post-Deploy Validation
- [ ] Mobile viewport check — 375px and 640px, no horizontal overflow
- [ ] Desktop check — 1024px+, consistent typography scale
- [ ] Dark theme renders correctly (this site is dark-first, not
      light-with-a-dark-mode — verify contrast, not just presence of dark bg)
- [ ] Product grid + reviews render with real seeded data, not empty states
- [ ] No console errors on the live Vercel URL specifically (not just
      local dev) — the production-branch mismatch has hidden real bugs before

## 6 · Decision Log

### Brand tokens (confirmed, in use)
- Background: `#17151c` (dark, not pure black)
- Accent: `#e8b23c` (warm gold)
- Foreground: `#f3ead8` (warm off-white, not pure white)
- Headline font: "Bagel Fat One" (display/rounded, retro-collectible feel)
- Body font: "DM Sans"
- Why: matches the vintage/collectibles retail positioning — warm,
  analog, not a typical dark-mode SaaS palette.

### Product Grid component
- Decision: built as a `shadcnblocks`-derived layout pattern, re-skinned
  onto Atomic Finds' own tokens (not the raw shadcnblocks styling).
- Why: full code ownership per the platform's component-sourcing rule —
  see `cms/PAGE_EDITOR_SPEC.md`'s "Where the library components come
  from" section.

### Open, unresolved (do not re-decide without Anthony)
- **Checkout provider** — undecided, pending a call with Jenny. Blocks
  native on-site checkout. Architecture is provider-agnostic already, so
  this doesn't block other work — just don't build checkout UI assuming
  a specific provider until this is settled.
- **5th catalog product + real photos** — blocks completing the 14-item
  catalog target. Placeholder/stock imagery should not be treated as final.
- **Figma Make design trial** — pending, blocks further component
  build-out on the frontend side until resolved.

*(Add new entries above this line as decisions get made — date them,
state the "why," and note what they supersede if anything.)*

---

## Sync note
This file was drafted from context available inside a design-system
session, without live access to the current `da-platform` repo state at
write time. Before relying on §1's paths or §4's commands, confirm them
against the real repo — then delete this note.
