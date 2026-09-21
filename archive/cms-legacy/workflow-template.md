# Anthony's Design → Dev Workflow (portable template)

**Purpose:** the repeatable pipeline behind every client build — concept
generation through backend wiring. Copy this file into any new client's
project/folder as the starting checklist. Fill in the bracketed fields per
project; the stage order and responsibilities stay the same everywhere.

This is a **process** doc, not a brand doc — it doesn't carry Digital
Allies' voice or tokens. Pair it with that client's own brand skill/design
system once Stage 2 exists.

---

## The pipeline, end to end

```
Luma Labs  →  Canva          →  Claude (design)      →  Claude Code (build)
(concept/    (brand system     (design system,           (schema, backend,
 logo gen)    assembly)         mockups, copy, i18n,      CMS wiring, real
                                 CMS integration spec)     deploy)
                                        ↓
                              Handoff package placed
                              in the correct da-platform
                              directory
```

### Stage 1 — Concept & Brand Seed (Luma Labs)
- [ ] Generate logo concepts / visual direction seeds in Luma Labs
- [ ] Pick a direction — don't carry more than 2–3 forward
- [ ] Export the chosen concept assets (logo marks, any generated imagery)

### Stage 2 — Brand System Assembly (Canva)
- [ ] Upload Stage 1 assets into Canva
- [ ] Build the brand system doc: palette, type pairing, logo lockups,
      spacing/tone notes — whatever info is available at this point
- [ ] Export as the reference brand kit for Stage 3 (PDF/PNG/board link)

### Stage 3 — Design System & Prototyping (Claude, here)
Everything that becomes THIS project's design-system folder:
- [ ] Turn the Canva brand kit into real tokens (`colors_and_type.css`
      equivalent) — colors, type, spacing, motion, border language
- [ ] Build the website mockup — desktop AND mobile, as real HTML/DCs,
      not static images
- [ ] Build the bilingual/language-switching system if the client needs
      it (EN/ES `data-en`/`data-es` pattern, or the project's actual
      language pair)
- [ ] Generate copy documents — page copy, brand voice guide, any client
      relationship templates (welcome letter, setup instructions, etc.)
- [ ] Write the CMS integration spec — data model, schema shape, API
      surface, what modules this client needs, tier/plan gating if any
- [ ] Confirm design against the client's real content once available —
      don't ship structural mockups with placeholder copy as final

### Stage 4 — Handoff Package
- [ ] Assemble: final design system + copy docs + CMS integration spec +
      any client relationship templates, into one directory
- [ ] Place it in the correct `da-platform` location for that client
      (confirm the exact path with Anthony before assuming — sites vs.
      packages vs. tools have different homes)
- [ ] Write/update that client's own `CLAUDE.md` or `README.md` design
      reference so future sessions don't have to re-derive brand rules
- [ ] Flag anything Claude Code will need a human decision on BEFORE
      building (checkout provider, domain/DNS, real photos, etc.) —
      don't let those block the handoff, just flag them

### Stage 5 — Build & Wire (Claude Code)
- [ ] Claude Code takes the handoff package and builds the real schema,
      backend, and CMS wiring against it
- [ ] Any conflicts with existing platform-wide architecture
      (`ARCHITECTURE.md`, `THEME_ENGINE_PLAN.md`, `PIPELINE.md`, etc.)
      get reconciled here, not re-litigated
- [ ] Real content replaces mockup placeholders as it's ready

### Stage 6 — QA / Deploy
- [ ] Mobile viewport check (375px, 640px minimum) + desktop check
- [ ] Type-check + build clean
- [ ] Single batched fix pass, not fix-as-you-go (see Batch-Fix Workflow
      below) — collect issues, one commit, one deploy/test cycle
- [ ] Confirm production branch/env vars are actually pointed at what
      shipped (this has silently broken builds before — always confirm,
      never assume)

### Stage 7 — Post-launch / Decision Log
- [ ] Keep a running decision log for this client (see template below)
- [ ] Once a project is "clean and done," fold its decision log +
      learnings into the cross-project synthesis (see below)

---

## Batch-Fix Workflow (applies at every stage)
Don't fix issues one at a time as they're found mid-session:
1. Collect every issue into a single running list during the session.
2. At the end of the session, make ONE comprehensive fix pass.
3. One commit, one deploy/test cycle — not N small ones.
This keeps sessions reviewable and avoids half-fixed intermediate states.

## Decision Log template (start one per client, day one)
```
### <date> — <short title>
Decision: <what was decided>
Why: <the actual reasoning, not just the outcome>
Supersedes: <any prior decision this replaces, or "none">
```
Keep this log OPEN and update-in-place. Its whole purpose is stopping
Claude/Claude Code from re-litigating settled calls (H1 size, glow
effect definition, checkout provider, etc.) in a later session.

## Cross-project synthesis (the eventual master report)
Once a client (starting with Atomic Finds) is fully clean and shipped,
its decision log + build checklist + whatever broke/worked gets folded
into a cross-site "what we learned" report — patterns that should become
DEFAULTS in this workflow template for every future build, not just
notes for that one client. Update this file directly when that happens;
don't let learnings live only in a one-off report.
