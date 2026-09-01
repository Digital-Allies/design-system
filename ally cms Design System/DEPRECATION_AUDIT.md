# da-platform — Deprecation Audit & Cleanup Plan

**Generated:** 2026-07-26  
**Purpose:** Identify stale docs to archive, and clarify what still needs to be done in Vercel + Supabase  
**Status:** Ready for cleanup PR

---

## DOCS TO DEPRECATE (move to `_deprecated/`)

### Root level — 6 files

| File | Why | Action |
|------|-----|--------|
| `git-history.txt` | 122KB raw git log dump — replaced by `STATUS.md` + `BUILD-SCHEDULE.md` | Archive to `_deprecated/git-history.txt` |
| `.mcp.json` | MCP connector config from early setup — superseded by current tool stack | Archive to `_deprecated/.mcp.json` |
| `AGENTS.md` | 822 bytes overview — full version is now `DA-PLATFORM-MASTER-CONTEXT.md` §7 + §8 | Keep (still brief reference), but update to cross-link to master context |
| `README.md` | 122 bytes stub — was placeholder; monorepo needs a real README | Replace with pointer to `DA-PLATFORM-MASTER-CONTEXT.md` |
| `skills-lock.json` | Claude agent tool lockfile from early setup — kept for reference but no longer generated | Archive to `_deprecated/skills-lock.json` |
| (none others at root) | — | — |

### `packages/20260722-da-design-system/` — 5 files (design system cleanup/consolidation)

| File | Why | Action |
|------|-----|--------|
| `GITHUB_CONSOLIDATION_PLAN.md` | Plan for syncing design system to GitHub — superseded by the actual implementation in this repo | Archive to `_deprecated/GITHUB_CONSOLIDATION_PLAN.md` |
| `GITHUB_CONSOLIDATION_SUMMARY.md` | Recap of the consolidation — also superseded | Archive to `_deprecated/GITHUB_CONSOLIDATION_SUMMARY.md` |
| `GITHUB_IMPLEMENTATION_GUIDE.md` | Step-by-step guide to the consolidation process — done; replaced by actual code | Archive to `_deprecated/GITHUB_IMPLEMENTATION_GUIDE.md` |
| `PUBLISHING.md` | Instructions for publishing the design system — intent is good, but the actual publish pipeline isn't fully implemented; kept for reference but mark as "aspirational" not current | Archive to `_deprecated/PUBLISHING.md` (or keep + update as "future state") |
| `uploads/Paula_Scher_Punk_Rock_Poster_Design_System.md` | Reference doc for a design direction — kept for inspiration but not the active system | Archive to `_deprecated/uploads/Paula_Scher_Punk_Rock_Poster_Design_System.md` |

### `sites/healthcare-training-center/` — 8 files (HCTC backup clutter)

| File | Why | Action |
|------|-----|--------|
| `hctc-backup/` (entire folder) | Backup copy of an old HCTC design system from a different project; predates this monorepo; zero references from current code | Archive entire folder to `_deprecated/hctc-backup/` |
| `mini-rooms/room-page-mocks/` (entire folder) | Character Bible + design specs from mini-rooms prototype; predates this monorepo; zero active use | Archive entire folder to `_deprecated/hctc-mini-rooms-prototype/` |
| `guidelines (1)/` (the folder with "(1)" in name) | Duplicate/superseded version of guidelines; naming artifact suggests it was a collision | Archive to `_deprecated/hctc-guidelines-old/` |
| `public/_ds/` (all three subdirectories) | Snapshot copies of design systems at a point in time; the actual design system is `packages/20260722-da-design-system/` | Archive entire `public/_ds/` to `_deprecated/hctc-public-ds-snapshots/` |

### `sites/atomic-finds/` — 2 files (AF cleanup from PR #5, already done)

| File | Why | Action |
|------|-----|--------|
| `Master Setup Guide_ Atomic Finds Digital Destination (1).txt` | Design setup doc from early AF design phase; 381 files were removed in PR #5 (2026-07-21) | Already handled in PR #5 — verify it's gone; if still present, archive to `_deprecated/` |
| (none others — PR #5 already cleaned up 381 files) | — | — |

### `sites/digitalallies/` — 0 files

**Status:** `sites/digitalallies` is a frozen one-time import from `Digital-Allies/DigitalAllies` (the live separate repo). All docs there are accurate to the live site; they're not stale, they're just not the source of truth. Leave unchanged. The live repo is separate and not in scope for this cleanup.

### `tools/build-workflows/` — 2 optional files (planning docs, still useful)

| File | Why | Status |
|------|-----|--------|
| `THEME_ENGINE_PLAN.md` | Plan for future per-client admin-editable theming (not yet built) | Keep — it's an open feature (listed in backlog) |
| `I18N_SYSTEM_PLAN.md` | Plan for bilingual EN/ES support (not yet built) | Keep — it's an open feature; solid spec already written |
| `PIPELINE.md` | Data-layer pipeline docs (partially implemented, under review) | Keep — still relevant, under active use |
| `web-design-platform-skill.md` | Full design system reference doc (25KB, comprehensive) | Keep — canonical reference; frequently read |

---

## VERCEL CONFIGURATION — WHAT STILL NEEDS DOING

### Per-project checklist

**`da-webwssite-build-workflows` (the CMS admin engine)**
- [ ] Confirm all env vars set (see `DA-PLATFORM-MASTER-CONTEXT.md` §2):
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` (must be `sb_publishable_...` format)
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
  - [ ] `NEXT_PUBLIC_SITE_URL` (currently missing — tracked P4 in TODO.md)
  - [ ] `CONTACT_FORM_TO_EMAIL`
  - [ ] `RESEND_API_KEY`
- [ ] Root directory: `tools/build-workflows` ✅ (verified correct)
- [ ] Production Branch: `main` ✅ (verified correct after P0 fix)
- [ ] Domains: `cms.digitalallies.net` ✅ (live, working)
- [ ] Deploy health: Green ✅ (latest commit succeeding)

**`atomic-finds-atx` (Atomic Finds live storefront)**
- [ ] Confirm all env vars set (same list as above):
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
  - [ ] `NEXT_PUBLIC_CLIENT_ID` = `443936d5-f92e-480b-b206-c65cfb52bdfc` ✅ (verified correct after P0 fix)
  - [ ] `NEXT_PUBLIC_SITE_URL`
  - [ ] `CONTACT_FORM_TO_EMAIL`
  - [ ] `RESEND_API_KEY`
- [ ] Root directory: `tools/build-workflows` ✅
- [ ] Production Branch: `main` ✅ (fixed in P0 on 2026-07-24)
- [ ] Domains: `atomicfindsatx.store` ✅ (live, working)
- [ ] Deploy health: Green ✅ (verified 2026-07-24)

**`healthcare-training-center` (HCTC placeholder site)**
- [ ] Confirm env vars (same list)
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` — currently LEGACY JWT format (not `sb_publishable_...`); may be broken. Needs verification.
- [ ] Root directory: to be determined (likely `tools/build-workflows` if it follows pattern)
- [ ] Production Branch: `main` (assumed; verify)
- [ ] Deploy health: Untested — check if it loads or throws errors

**`digital-allies` (marketing site Vercel project)**
- [ ] Env vars: Currently ZERO. Needs investigation — how does it read Supabase data? May be broken.
- [ ] Root directory: TBD
- [ ] Production Branch: TBD
- [ ] Repo connection: TBD (may not be connected to da-platform; might be old standalone)

---

## SUPABASE CONFIGURATION — WHAT STILL NEEDS DOING

### Security items (P3 in master context — still unconfirmed)

- [ ] Run `supabase/security-fixes.sql` in SQL Editor (hasn't been confirmed since 2026-07-16)
- [ ] Enable leaked-password protection in Supabase Auth → Providers → Email
- [ ] Verify Supabase key pair status:
  - [ ] `supabase_anon_new` and `supabase_service_role_new` are the active pair
  - [ ] Old "default" pair is revoked or not in use anywhere
  - [ ] Duplicate key pair problem from 2026-07-17 audit is fully cleared
- [ ] Verify HCTC Supabase keys (if HCTC has its own Supabase project):
  - [ ] Not legacy JWT format
  - [ ] Current `sb_publishable_...` format

### Data seeding (P4 in master context — pending Anthony)

**Atomic Finds** — 3 seed files written, awaiting SQL Editor run, in order:

1. `tools/build-workflows/supabase/seed-atomic-finds-settings.sql` — Sets site title, hero, about, contact, social metadata
2. `tools/build-workflows/supabase/seed-atomic-finds-design-tokens.sql` — Adds AF brand colors, fonts, type scale, spacing
3. `tools/build-workflows/supabase/seed-atomic-finds-pages.sql` — Creates `home` and `about` draft pages

**Status:** All written ✅; none yet run ❌  
**Effect of running:** "My Business" title will change to real AF name; design tokens will be available in admin theme editor; draft pages will be ready for the Aug 5–6 `/admin/pages` build slot.

---

## GITHUB — WHAT STILL NEEDS DOING

### Open issues / PRs in `Digital-Allies/da-platform`

- [ ] Review + merge PR #9 (Atomic Finds dashboard routing fix — ready, awaiting Copilot review)
- [ ] Any open PRs older than 48h? (Clean them up or close)

### `Digital-Allies/DigitalAllies` repo (the live marketing site — SEPARATE from da-platform)

- [ ] **P1 bug:** Fix `assets/js/cms-loader.js` — rename two `SUPABASE_ANON_KEY` references to `supabase_anon_new` to match the 2026-07-16 key rotation. (One-line fix, verified in STATUS.md 2026-07-23 entry.)
- [ ] **Secondary:** Add `escapeHtml()` wrapping to the same file (pattern at da-platform commit `6876c63`)
- [ ] **P2 decision:** Decide if homepage should be CMS-connected or remain static (PR #52 went static 2026-07-14; decision needed)

---

## SUMMARY — CLEANUP CHECKLIST

### Safe to do immediately (no Vercel/Supabase clicks needed)

- [ ] Create `_deprecated/` folder at repo root
- [ ] Move the 11 files/folders listed above into `_deprecated/` with a README explaining each
- [ ] Update `README.md` at root to point to `DA-PLATFORM-MASTER-CONTEXT.md`
- [ ] Update `AGENTS.md` to cross-link to master context instead of duplicating
- [ ] Delete the now-empty directories
- [ ] Commit: `chore: archive stale docs to _deprecated/`

### Requires Anthony (Vercel/Supabase dashboard clicks)

- [ ] Confirm all Vercel env vars are set correctly on all 4 projects (checklist above)
- [ ] Run the 3 Atomic Finds seed SQL files in Supabase SQL Editor (in order, P4)
- [ ] Confirm Supabase security items (P3)
- [ ] Investigate HCTC Vercel project (env vars, repo connection)
- [ ] Investigate `digital-allies` Vercel project (env vars, repo connection, why it has zero env vars)

### Requires separate repo work (`Digital-Allies/DigitalAllies`)

- [ ] Fix P1: cms-loader.js `SUPABASE_ANON_KEY` → `supabase_anon_new` (1-line fix)
- [ ] Add HTML escaping to cms-loader.js (pattern at da-platform commit `6876c63`)

### For Claude Code (next build session)

- [ ] Aug 5–6 slot: `/admin/pages` — real components + code-view + live preview
- [ ] After: Pick up backlog (i18n, theme engine, per-site document storage)

---

## NEXT STEPS

1. **Do the code cleanup first** (safe, no external dependencies) — PR with archived docs
2. **Anthony confirms Vercel/Supabase** — do the dashboard checks, run seed files
3. **Separate PR for P1 fix** — someone opens a PR against `Digital-Allies/DigitalAllies` to fix cms-loader.js
4. **Resume build schedule** — Claude Code takes Aug 5–6 `/admin/pages` slot after P4 seed files are confirmed run

