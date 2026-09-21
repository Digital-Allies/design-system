# Claude Code Prompt: ally CMS Design System Build

## Context
You're building the ally CMS design system (stored at `ally-cms-design-system/` in the monorepo). This is the admin dashboard for a multi-tenant website builder + CMS, similar to Webflow + Duda.

## Current State
- Design tokens, colors, typography defined in `tokens/`
- Base components (Button, Card, Input) in `components/`
- Login template at `templates/cms-login/`
- Logo guidelines in `guidelines/logos.html` (awaiting new logos from design)
- Routing notes in `ROUTING_NOTES.md` (CMS and admin dashboard share same URL structure—may need separation)
- Full audit docs: `AF_COLLECTIONS_PAGE_EDITOR_BUILD.md`, `AF_PAGE_EDITOR_BUILD_PLAN.md`, `SYNC_ARCHITECTURE.md`

## Next Priority

1. Build `templates/cms-pages/` — page editor template with block system (Hero, Products, Testimonials, CTA, Contact Form, Richtext)
2. Build `templates/cms-collections/` — collections/products manager template
3. Add light + dark mode to login template
4. Create remaining admin dashboard screens as templates (Dashboard, Settings, Projects, etc.)
5. Build out component library (ensure all blocks from page editor have component counterparts)

## Key Constraints
- Single-tenant CMS UI (not whitelabeled per client—clients customize their own websites, not the dashboard)
- Use Lexend Deca fonts (files in `uploads/`)
- Follow ghost logo pulse animation spec (eye blink effect, 2s duration, ease-in-out)
- All designs must have light + dark mode variants
- Logo will be added by design later—leave placeholder zones
- Reference the audit documents for exact product field structures and UI requirements

## Sync Structure
Design system lives at monorepo root as `ally-cms-design-system/`. Consuming projects (Atomic Finds site, other client sites) will pull from `_ds_bundle.js` and token files.

Ready to start on templates?

---

## Re: packages update
No changes needed yet. The design system doesn't depend on packages; it's a design artifact that gets bundled and consumed by Next.js apps. Once templates are built, we'll surface them as starting points for consuming projects to fork.
