# Phase 2: Mobile Responsive + Production Integration

## Current State
✅ 5 templates built (Login, Dashboard, Pages, Collections, Settings)
✅ Light/dark mode toggle on login
✅ Component showcase cards (Form Inputs, Block Panels)
✅ All tokens wired (colors, typography, spacing)
✅ Design system compiles cleanly

## Phase 2A: Mobile Responsive Updates

### Breakpoints
- Desktop: 1400px+ (current)
- Tablet: 768px–1200px
- Mobile: <768px

### Templates to Make Responsive (Priority Order)

1. **CmsLogin.dc.html** — Full-screen login
   - Mobile: Center card, full-width form, no sidebar
   - Stack inputs vertically (already does)
   - Button 100% width

2. **CmsDashboard.dc.html** — Overview dashboard
   - Desktop: Sidebar + main (current)
   - Tablet: Sidebar collapses to icon nav
   - Mobile: Bottom sheet nav or hamburger menu
   - Stats grid: 2 cols (tablet), 1 col (mobile)
   - Charts: Full width, reduce padding

3. **CmsPages.dc.html** — Page editor
   - Desktop: 3-column (sidebar/editor/panel)
   - Tablet: 2-column (sidebar/editor + stacked panel)
   - Mobile: Tabs or drawer — show one panel at a time (editor OR settings)
   - Block list: Full width, no grid
   - Block buttons: 2 cols (mobile), 3 cols (tablet)

4. **CmsCollections.dc.html** — Products manager
   - Desktop: Sidebar + grid (current)
   - Tablet: Sidebar collapses, 2-col grid
   - Mobile: 1-col grid, full-width cards, drawer sidebar

5. **CmsSettings.dc.html** — Settings form
   - Desktop: Sidebar + form (current)
   - Tablet: Sidebar collapses
   - Mobile: Single column, stacked sections

### Implementation
- Add `@media (max-width: 1200px)` and `@media (max-width: 768px)` blocks to token CSS or inline style blocks
- Use CSS Grid `auto-fit` + `minmax()` for responsive grids (already present in some templates)
- Hamburger menu component for mobile nav (toggle sidebar visibility)
- Touch-friendly hit targets: min 44px buttons/links
- Collapsible/drawer sidebars on mobile

### QA Checklist
- [ ] Login responsive at 375px (iPhone SE), 768px (iPad), 1400px (desktop)
- [ ] Dashboard stats stack to 1 col on mobile
- [ ] Page editor shows one panel at a time on mobile
- [ ] Collections grid is 1 col on mobile, 2 on tablet, 3+ on desktop
- [ ] Settings form is readable on mobile (no horizontal scroll)
- [ ] All buttons are 44px+ tap targets
- [ ] Light/dark mode works across all breakpoints

---

## Phase 2B: Logo Placeholder

The login template references `assets/ally-cms-logo-login.png` which doesn't exist yet.

**Option 1:** Placeholder SVG
```
Create assets/ally-cms-logo-login.svg — simple text logo or ghost icon
```

**Option 2:** Skip logo, use text only
```
Replace img tag with: <div style="…">ally cms</div> in Lexend Deca bold
```

Recommend: Option 2 for now (awaiting final logo from design). Remove img tag, use text.

---

## Phase 2C: Wire to Supabase (Production Integration)

Once templates are mobile-ready, wire to actual CMS data:

1. **Auth flow** — Login template → Supabase auth
2. **Pages endpoint** — Dashboard + Pages template → fetch/save pages from DB
3. **Collections endpoint** — Collections template → fetch/save products
4. **Settings endpoint** — Settings template → read/write site config
5. **Real-time sync** — Supabase subscriptions for live updates across tabs

### Files to Update
- `tools/build-workflows/src/app/admin/layout.tsx` — Responsive sidebar
- `tools/build-workflows/src/app/admin/page.tsx` — Use CmsDashboard template
- `tools/build-workflows/src/app/admin/pages/page.tsx` — Use CmsPages template
- `tools/build-workflows/src/app/admin/collections/page.tsx` — Use CmsCollections template
- `tools/build-workflows/src/app/admin/settings/page.tsx` — Use CmsSettings template

### API Integration
- Expose design system tokens in Next.js (CSS module or JSON export)
- Consume templates as React Server Components or client components
- Pass `clientId`, `isDarkMode`, `userData` as props to templates

---

## Handoff Notes

- Logo is awaited from design team — use text "ally cms" in Lexend Deca bold (weight 700) as placeholder
- All token values are final (65 tokens: colors, typography, spacing)
- Component primitives (Button, Card, Input) are starter-point ready for consumers
- Responsive design is priority before Supabase integration
- Dark mode toggle works but needs storage (localStorage or system preference sync)
- No animations beyond pulse on eye (if logo SVG added) — keep lightweight
