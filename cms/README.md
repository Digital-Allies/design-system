# Digital Allies CMS — Documentation

**The canonical reference is `cms-preview.html`** — one standalone file
covering every admin surface (Dashboard, Pages, Page Editor, The Press Office,
Projects, Research, Learn, The Workshop, Settings) with **light/dark** and
**desktop/mobile** as toggles rather than separate mocks. Send developers and
collaborators here first; `index.html` is the hub that links everything.

Real implementation lives in `da-platform/tools/build-workflows` (Next.js App
Router + Supabase), deployed at **cms.digitalallies.net**. This folder is the
design source of truth, not the running app.

## What the CMS must include

1. **Website page editing** — build pages by stacking blocks from a component
   library (hero, services, testimonials, rich text, contact form, CTA, …);
   reorder, edit inline, draft/publish. Blocks are stored as one `jsonb` array
   on the `pages` row — not normalized section rows.
2. **Global design-token editing** — edit the brand tokens the whole site reads
   (colors, type, spacing) from one place. Scoped in `THEME_ENGINE_PLAN.md`
   (extend `settings` with `theme_*` keys); tokens reach the public site as
   `--tok-*` variables via `SiteTheme.tsx`.
3. **Blog & article publishing** — posts live in a separate `posts` table with a
   Tiptap editor. "The Press Office" is DA's own label; client instances use
   generic module names.

## Naming rule (decided, not yet built)

Module labels ship **generic for every client** — Services, Testimonials, Blog,
Articles, Contact, Settings. DA's own vocabulary (The Departments, Field Notes,
The Press Office, Command Center) is a **per-tenant label map** over the same
nav/registry data, applied only to DA's instance. Today `AdminNav.tsx` still
shows DA jargon to every tenant — that label map is real, unbuilt code work.

## Files

```
cms/
├── cms-preview.html          # CANONICAL — all modules, light/dark, desktop/mobile
├── page-editor.html          # deep prototype: block library, tenant preview, tier gate
├── index.html                # CMS hub (links everything here)
├── anthony-tasks.html        # open dashboard-only tasks, synced from TODO.md
├── PAGE_EDITOR_SPEC.md       # data model, block registry, API surface, reconciliation
├── INTEGRATION_OVERVIEW.md   # public site / admin / database
├── WIRING_GUIDE.md           # Supabase env, queries, data flow
├── CMS Developer Handoff.html
├── dashboard.html + app.js + style.css   # legacy wired prototype
└── dashboard-dark.html                    # legacy dark-only mock
```

## Build status (repo commit `676d20d3`, synced 2026-07-29)

- Code is built through **Day 18** of the 30-day run: Next.js + Vercel + Supabase
  clients, schema + RLS, page/settings/collections fetchers, admin pages builder,
  public `BlockRenderer`, dynamic `[slug]` routes, contact-form block.
- **Two tenants live plus Atomic Finds**: DA, HCTC, and AF (settings, design
  tokens, and draft pages all seeded and verified live Jul 25).
- **Admin login works** on `cms.digitalallies.net`; per-client theming complete.
- **Open:** PR #9 (multi-tenant dashboard routing) awaiting merge;
  `security-fixes.sql` + leaked-password protection + the `clients.plan`
  migration still unapplied; Development / Projects / Content / Pages carry known
  placeholder gaps. See `anthony-tasks.html`.
- **Live bug:** `cms-loader.js` on the separate `Digital-Allies/DigitalAllies`
  repo throws a top-level `ReferenceError`, so `digitalallies.net/learn/` has
  been stuck on "Loading articles…" — one-line fix, tracked in the tracker.
