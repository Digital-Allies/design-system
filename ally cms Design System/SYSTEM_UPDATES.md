# ally CMS Design System — Full Build Status

**Last Updated:** Jul 26, 2026
**Status:** Phase 1 Complete | Phase 2 (Mobile + Supabase) Ready for Claude Code & Antigravity

---

## Design System Scope

**Single-tenant admin dashboard** (not whitelabeled) for multi-site CMS with:
- Page builder with block system
- Collections/products manager
- Press office (article management)
- Projects tracker
- Research knowledge base
- Settings & branding controls
- Light/dark mode across all screens
- Mobile + desktop responsive layouts

---

## Deliverables Completed

### Templates (8 total — all with light/dark mode)
1. **CmsLogin** — Full-screen login with theme toggle
2. **CmsDashboard** — Overview with stats + quick actions
3. **CmsPages** — Page editor with block system
4. **CmsCollections** — Products/collections manager
5. **CmsPressOffice** — Article/press release manager
6. **CmsProjects** — Project tracker with progress bars
7. **CmsResearch** — Knowledge base with note system
8. **CmsSettings** — Site configuration & branding

### Mobile UI Kit
- **MobileCmsAdmin.html** — 375×812px responsive layouts for all screens
- Full navigation (Dashboard → Pages → Collections → Press Office → Projects → Research → Settings)
- Light/dark mode toggle with localStorage persistence
- Touch-friendly forms and interactions

### Assets
- 8 navigation icons (4 icons × 2 modes: dashboard, pages, collections, settings)
- Logo text placeholder ("ally cms" in Lexend Deca bold)
- Awaiting ghost logo SVG from design team (pulse animation spec ready)

### Design Tokens
- **65 CSS custom properties** (colors, typography, spacing, shadows, borders)
- **Fonts:** Lexend Deca (weights 400–900)
- **Light mode:** cream/charcoal palette (#F9F6F0 bg, #2D2D2D text)
- **Dark mode:** charcoal/bone palette (#1A1A1A bg, #F0E8D8 text)
- **Accent colors:** Signal red (#C5301A), Pulse blue (#3A7BD5), Light pink (#FADEEB)

### Component Library
- **Foundation cards:** Colors, Typography, Spacing, Brand, Icons
- **Component cards:** Form Inputs, Block Panels
- **Starting points:** Button, Card, Input (for consuming projects)

### Documentation
- **readme.md** — Overview & token manifest
- **CLAUDE_CODE_PHASE2.md** — Mobile responsive + Supabase integration scope
- **SYSTEM_UPDATES.md** — This document
- **AF_PAGE_EDITOR_BUILD_PLAN.md** — Atomic Finds integration (reference)
- **AF_COLLECTIONS_PAGE_EDITOR_BUILD.md** — Collections architecture
- **ROUTING_NOTES.md** — URL path clarifications

---

## Navigation Structure

All templates include consistent 6-item sidebar navigation:
1. Dashboard
2. Pages
3. Collections
4. Press Office
5. Projects
6. Research
7. Settings (in footer position on some)

Mobile uses bottom sheet/drawer nav; desktop uses left sidebar (280px).

---

## Light & Dark Mode Implementation

**Light Mode (default):**
- Background: #F9F6F0 (bone white)
- Text: #2D2D2D (charcoal)
- Accents: #3A7BD5 (pulse blue)

**Dark Mode:**
- Background: #1A1A1A (charcoal)
- Text: #F0E8D8 (bone)
- Accents: #3A7BD5 (pulse blue — unchanged)

**Toggle:** Managed via `body.dark` class + localStorage in login template. Applies across all screens.

---

## Phase 2: Mobile Responsive + Production Integration

### Scope (Claude Code & Antigravity)

**Mobile Updates (Desktop already responsive):**
- [ ] Hamburger menu for sidebar on <768px
- [ ] Tab bar or drawer nav on mobile
- [ ] Single-column layouts on mobile
- [ ] Touch-friendly button sizes (44px+ minimum)
- [ ] Collapsible settings panels
- [ ] Bottom sheet instead of side panel for editor settings

**Supabase Integration Wiring:**
- [ ] Login template → Supabase Auth (email/password)
- [ ] Dashboard → Fetch user stats from DB
- [ ] Pages template → Load/save pages (CRUD)
- [ ] Collections template → Load/save products
- [ ] Press Office → Load/save articles
- [ ] Projects → Load/save project tracking data
- [ ] Research → Load/save notes with tags
- [ ] Settings → Load/save site config

**Real-time Sync:**
- [ ] Supabase subscriptions for live updates
- [ ] Multi-tab sync (changes in one tab reflect in others)
- [ ] Conflict resolution for simultaneous edits

**Data Model Alignment:**
- Existing tables: pages, products, articles (from AF seed)
- New tables needed: collections, projects, research_notes, site_settings
- See `AF_COLLECTIONS_PAGE_EDITOR_BUILD.md` for current DB structure

---

## Logo & Visual Assets

**Logo:** Awaiting ghost SVG from design team
- Ghost mark + blue dot (eye) with pulse animation (2s, ease-in-out)
- Text: "ally" (bold Lexend Deca 700) + "cms" (regular 400)
- Currently using text-only placeholder in login template

**Icons Created:** 8 SVG icons in `assets/`
- icon-dashboard-light.svg / icon-dashboard-dark.svg
- icon-pages-light.svg / icon-pages-dark.svg
- icon-collections-light.svg / icon-collections-dark.svg
- icon-settings-light.svg / icon-settings-dark.svg

---

## What Needs to Happen Next (Phase 2)

### For Claude Code (Next.js Integration):
1. Wire login template to Supabase Auth
2. Create `/admin/*` routes that mount each template
3. Pass `clientId`, `isDarkMode`, `userData` as props
4. Fetch real data from Supabase and populate templates
5. Add form submissions for page/product/article edits
6. Implement real-time subscriptions

### For Antigravity (Mobile Optimization):
1. Update templates for <768px breakpoints
2. Add hamburger menu component
3. Stack multi-column grids into single column
4. Ensure 44px+ touch targets
5. Test on iPhone SE (375px) and iPad (768px)

### For Design Team:
1. Provide ghost logo SVG (with pulse animation for eye)
2. Validate color palette in dark mode on real screens
3. Review mobile layouts at actual device sizes

---

## File Structure

```
ally-cms-design-system/
├── styles.css                          (root import file)
├── tokens/
│   ├── colors.css                      (65 custom properties)
│   ├── typography.css                  (fonts + sizes)
│   └── spacing.css                     (scales + borders)
├── assets/
│   ├── fonts/                          (Lexend Deca TTF files)
│   ├── icon-dashboard-*.svg            (8 icons)
│   └── ally-cms-logo-*.png            (awaiting design)
├── components/
│   ├── core/                           (Button, Card, Input)
│   └── *.d.ts / *.jsx                  (reusable primitives)
├── guidelines/
│   ├── colors.html                     (@dsCard — color specs)
│   ├── typography.html                 (@dsCard — type samples)
│   ├── form-inputs.html                (@dsCard — form UI)
│   ├── block-panels.html               (@dsCard — block editor)
│   └── logos.html                      (@dsCard — logo usage + pulse spec)
├── templates/
│   ├── cms-login/
│   │   └── CmsLogin.dc.html
│   ├── cms-dashboard/
│   │   └── CmsDashboard.dc.html
│   ├── cms-pages/
│   │   └── CmsPages.dc.html
│   ├── cms-collections/
│   │   └── CmsCollections.dc.html
│   ├── cms-press-office/
│   │   └── CmsPressOffice.dc.html
│   ├── cms-projects/
│   │   └── CmsProjects.dc.html
│   ├── cms-research/
│   │   └── CmsResearch.dc.html
│   └── cms-settings/
│       └── CmsSettings.dc.html
├── ui_kits/
│   └── cms-admin/
│       ├── index.html                  (desktop responsive)
│       └── MobileCmsAdmin.html         (mobile layouts)
├── readme.md                           (brand guide)
├── CLAUDE_CODE_PHASE2.md              (handoff scope)
└── SYSTEM_UPDATES.md                  (this file)
```

---

## Key Decisions & Notes

- **No whitelabeling in UI:** CMS dashboard is single brand (ally). Client sites customize their own frontends + tokens.
- **Light/dark mode:** Auto-detects system preference, toggleable in login. Stored in localStorage.
- **Responsive strategy:** Flexbox + CSS Grid with mobile-first approach. Sidebar collapses to drawer on <768px.
- **Icons:** Simple line-style SVGs, 2px stroke weight, dark/light variants included.
- **Logo placeholder:** Text-only until ghost SVG arrives. Pulse animation spec (2s ease-in-out, opacity 100→60→100) ready to apply.
- **Form validation:** Not yet wired — templates show UI structure, logic handled in Claude Code phase.
- **Animations:** Minimal (no unnecessary motion). Only pulse on logo eye + smooth theme toggle.

---

## Handoff Checklist

- [x] All 8 templates built (desktop + mobile responsive)
- [x] Light/dark mode implemented across all screens
- [x] Navigation structure unified (6-item sidebar)
- [x] Component library ready (Button, Card, Input, Form inputs, Block panels)
- [x] 65 design tokens finalized and documented
- [x] Icons created (8 navigation icons in light/dark)
- [x] Mobile UI kit with all screens
- [x] Documentation complete (this file + phase2 scope)
- [ ] Logo SVG from design (awaited)
- [ ] Supabase integration (Claude Code Phase 2)
- [ ] Mobile optimization refinements (Antigravity Phase 2)
- [ ] Production auth flow (Claude Code Phase 2)

---

## Questions for Claude Code & Antigravity Teams

1. **Auth:** Should login route to `/admin/dashboard` or `/admin` after Supabase auth?
2. **URL structure:** CMS is at `cms.digitalallies.net/admin/*` — correct path structure?
3. **Mobile nav:** Preference for bottom tab bar vs. hamburger menu drawer?
4. **Real-time:** Supabase subscriptions or polling for live data sync?
5. **Logo:** Do we create a placeholder icon pending ghost SVG, or wait for final design?
