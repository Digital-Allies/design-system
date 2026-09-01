# AllyCMS Design System

A comprehensive design system for the Digital Allies CMS Platform—a headless content management system for managing pages, design tokens, articles, and bilingual content across client websites.

## Overview

**AllyCMS** is the administrative interface for the Digital Allies platform. This design system provides the visual foundations, reusable components, and UI kits needed to build consistent, accessible admin interfaces and client-facing applications on the platform.

### Key Characteristics

- **Brand**: Digital Allies — signal red accents, bone-white backgrounds, charcoal text
- **Fonts**: Lexend Deca (headers), JetBrains Mono (body/mono)
- **Accessibility**: WCAG 2.1 AA compliance as baseline; Pulse Blue Dark (#1D5FAD) for accessible link contrast
- **Bilingual**: Designed to support English/Spanish content management
- **Dark Mode**: Included—charcoal canvas with light type hierarchy

## Sources

- **Codebase**: `da-platform-design-system/` mounted folder
  - Primary CMS dashboard: `dashboard.html` + `app.js` + `style.css`
  - Dark mode templates: `Dark mode CMS design/DesktopCmsAdmin.dc.html`, `MobileCmsAdmin.dc.html`
  - Implementation plans: `CMS_IMPLEMENTATION_PLAN.html`, `PAGE_EDITOR_SPEC.md`
- **Brand assets**: Logo system, font files (LexendDeca), color palette, and design specifications
- **Design context**: All colors, typography, and spacing derived from the working prototype

## Content Fundamentals

### Voice & Tone

Clear, direct, practical. Digital Allies retains its internal vocabulary across all surfaces:
- **Departments** — organizational units
- **Field Notes** — content research and documentation
- **Command Center** — admin hub
- **The Press Office** — publishing and article management

Copy is scannable, jargon-free to external users, but domain-accurate internally. No emoji, no cute metaphors—functionality comes first.

### Casing & Grammar

- Titles and buttons: Sentence case (e.g., "Create page", not "CREATE PAGE")
- Labels: Lowercase (e.g., "page title", "draft status")
- Acronyms: Uppercase (e.g., "WCAG 2.1", "JSON-LD")
- No contractions in UI labels; contractions okay in help text

## Visual Foundations

### Colors

The palette is minimal and intentional:

| Name | Hex | Usage |
|------|-----|-------|
| **Signal Red** | #C5301A | Primary CTAs, error states, urgency |
| **Pulse Blue** | #3A7BD5 | Links, hover states, secondary CTAs |
| **Pulse Blue Dark** | #1D5FAD | AA text contrast on light bg |
| **Light Pink** | #FADEEB | Hover wash, soft accents, alerts |
| **Bone White** | #F9F6F0 | Default background |
| **Charcoal** | #2D2D2D | Primary text, borders |
| **Pinned Note** | #FCFAED | Alternate surface (off-white) |
| **Text Muted** | #6b6b6b | Secondary text, disabled states |
| **Text Soft** | #888888 | Tertiary text, helper copy |

### Typography

Two font families deliver all hierarchy:

**Lexend Deca** (headers)
- 700 weight for headings and emphasis
- Geometric, modern, highly legible
- Used: display text, section titles, stat numbers

**JetBrains Mono** (body & mono)
- 400 weight for body copy and form labels
- Monospace fallback ensures readability at small sizes
- Used: paragraph text, input fields, code snippets, timestamps

**Scale:**
- 9px (nano) — metadata, timestamps
- 10px (micro) — helper copy, tags
- 12px (small) — labels, secondary text
- 13px (base) — body text, form fields
- 16px (lg) — section text
- 30px (3xl) — page headings
- 36px (4xl) — display/hero

### Spacing

An 8px base grid scales consistently:
- 8px (space-2) — tight gaps, nested spacing
- 12px (space-3) — padding in small components
- 16px (space-4) — standard padding, button spacing
- 20px (space-5) — card internal gaps
- 24px (space-6) — section spacing
- 32px (space-8) — large gaps between major sections
- 40px (space-10) — page margins
- 64px (space-16) — full-width page padding

### Backgrounds & Surfaces

- **Primary surface** — Bone White (#F9F6F0)
- **Secondary surface** — Pinned Note (#FCFAED, off-white)
- **Cards** — Bone White with 1px charcoal border, no shadow on base state; subtle shadow on hover
- **Hover state** — Light Pink wash or slight lift (transform: translateY(-4px))
- **Dark mode** — Charcoal canvas (#1E1D1B), light type, semi-transparent overlays

### Shadows

- **Small** — `0 4px 12px rgba(45, 45, 45, 0.05)` — hover lift on cards
- **Large** — `0 16px 32px rgba(45, 45, 45, 0.08)` — modals, dropdowns
- **Pin** — `0 2px 4px rgba(0, 0, 0, 0.2)` — floating UI elements

### Borders & Radii

- **Border** — 1px solid charcoal (`--border-1`)
- **Border hairline** — 1px solid rgba(45,45,45,0.15) for subtle dividers
- **Radius** — 2px for subtle, modern look (not rounded)
- **Pill** — 999px for fully rounded elements (avatars, badges)

### Animations & Transitions

- **Duration quick** — 180ms for hover/focus states
- **Duration base** — 300ms for component interactions
- **Easing** — `cubic-bezier(0.16, 1, 0.3, 1)` for forward motion, ease-in-out for reversals
- **Grid background** — Subtle 20px line pattern on main content area (visual texture, not decoration)

### Hover & Press States

- **Hover** — Slight color shift, background wash, or lift (transform translateY -4px with shadow)
- **Focus** — 1px border color change to accent + subtle shadow on inputs
- **Disabled** — Opacity 0.6, cursor not-allowed
- **Active** — Darker color or filled background; left border highlight for nav items

### Component Patterns

- **Nav items** — 2px left border, accent color when active, Light Pink hover
- **Buttons** — Flex center, 8px 16px padding, 2px radius; primary (accent bg), secondary (alt surface), outline (transparent)
- **Cards** — Border, padding, hover lift and shadow
- **Inputs** — 1px border (charcoal), focus border to accent with shadow
- **Status badges** — Small pill with filled background (published, draft, error variants)
- **Tabs** — Bottom border accent, no background; active tab has accent underline

### Imagery & Icons

No custom imagery in this design system—purely utilitarian. When icons are needed:
- Use a CDN icon set (Lucide, Heroicons, or similar)
- Keep stroke weight consistent with 1px charcoal
- Size to 16-24px in most contexts
- No emoji in UI; use Unicode symbols or icons only

## Layout & Structure

### Admin Shell

The CMS follows a three-part layout:

1. **Top bar (52px)** — Brand, search, sync status, user menu on dark charcoal background
2. **Sidebar (232px)** — Navigation, grouped sections, "View Site" button at foot
3. **Main area** — Scrollable content with 20px grid background, max-width 1080px, generous padding

### Page Structure

- **Header** — Section title, eyebrow (optional), subtitle
- **Stats grid** — 4-column layout for key metrics
- **Widget grid** — 2-column for activity and quick actions
- **Content list** — 3-column grid for browsable items (pages, posts, projects)

### Responsive Behavior

- Desktop (1280px+) — Full layout as specified
- Tablet (768-1279px) — Stack widgets, 2-column content grid
- Mobile (375-767px) — Single column, hamburger nav, full-width content

## Accessibility

- **Color contrast** — Pulse Blue Dark (#1D5FAD) for AA-compliant link text on light backgrounds
- **Focus indicators** — Visible 1px border + shadow on interactive elements
- **Motion** — Prefer-reduced-motion respected; no auto-playing animations
- **Semantic HTML** — Proper headings, form labels, ARIA where needed
- **Typography** — Minimum 12px for body text, 1.5 line-height minimum

## File Structure

```
├── styles.css                    # Entry point; imports all tokens
├── tokens/
│   ├── colors.css              # Color custom properties
│   ├── typography.css          # Font families, sizes, weights
│   ├── spacing.css             # Spacing scale
│   └── effects.css             # Shadows, borders, transitions
├── guidelines/                 # @dsCard reference cards (Design System tab)
│   ├── colors.html             # Primary color swatch card
│   ├── neutrals.html           # Neutrals & grays swatch card
│   ├── typography.html         # Typography scale card
│   ├── spacing.html            # Spacing scale card
│   ├── brand.html              # Brand overview
│   ├── logos.html              # Logo system + usage
│   ├── form-inputs.html        # Form input patterns
│   └── block-panels.html       # Block/panel patterns
├── components/
│   └── core/
│       ├── Button.jsx / .d.ts / .prompt.md
│       ├── Input.jsx / .d.ts / .prompt.md
│       ├── Card.jsx / .d.ts / .prompt.md
│       └── core.card.html      # Component specimen card
├── templates/                   # Full-screen starting points (see below)
│   ├── cms-login/
│   ├── cms-dashboard/
│   ├── cms-pages/
│   ├── cms-collections/
│   ├── cms-press-office/
│   ├── cms-projects/
│   ├── cms-research/
│   └── cms-settings/
├── assets/
│   └── fonts/, logos/          # LexendDeca font files, logo lockups
├── _archive/                     # Stale planning notes from an unrelated repo — kept for reference, not part of the live system
└── README.md                    # This file
```

## Component Inventory

### Core Components

Small reusable primitives — reach for a **template** first when starting a new screen; use these when building something a template doesn't cover.

All components follow these rules:
- React-compatible, inline styles only (no CSS classes)
- Reference only CSS custom properties (var(--*))
- Named exports matching PascalCase filenames
- Full TypeScript definitions in `.d.ts` sibling file
- `.prompt.md` usage guide with JSX examples

**Button** — Primary action trigger (primary, secondary, outline variants)
**Input** — Text field with optional label and error state
**Card** — Border + padding container for content grouping

## Templates

Eight full-screen Design Components, each a real CMS admin screen with light/dark mode built in. These are the starting points — copy one and edit its content directly rather than building a screen from scratch:

- **AllyCMS Login** (`templates/cms-login`)
- **AllyCMS Dashboard** (`templates/cms-dashboard`) — overview, stats, quick actions
- **AllyCMS Pages** (`templates/cms-pages`) — page editor with block system
- **AllyCMS Collections** (`templates/cms-collections`) — products/collections manager
- **AllyCMS Press Office** (`templates/cms-press-office`) — article management
- **AllyCMS Projects** (`templates/cms-projects`) — project tracker
- **AllyCMS Research** (`templates/cms-research`) — knowledge base
- **AllyCMS Settings** (`templates/cms-settings`) — site configuration

Each shares the same 232px sidebar shell, top bar, and token set described above.

## Dark Mode

A complete dark variant is scoped to `.cms-desktop.dark`:
- Canvas: #1E1D1B (charcoal)
- Text: #F9F6F0 (bone white)
- Borders: rgba(249,246,240,0.16) semi-transparent
- Surfaces: rgba(249,246,240,0.03) for subtle lift

Apply the class to the root element to enable.

## How to Use This System

### For Designers

1. Reference the **guidelines/** cards in the Design System tab to understand colors, type, and spacing
2. Start new screens from **templates/** — copy the closest match and edit its content directly
3. Use **components/** for one-off pieces a template doesn't already cover
4. Always use CSS custom properties (var(--*)) rather than hardcoded values

### Finding things in the app

- The **Design System tab** (auto-built by the platform) is the real index — it lists every `@dsCard` guideline, every component, and every template. Browse there rather than hunting through files.
- `thumbnail.html` is only this project's small homepage tile/icon — it is not a navigable index and isn't meant to list contents.

### For Developers

1. Link `styles.css` in your project head to load all tokens and base styles
2. Import components via the bundled namespace (details in component `.d.ts` files)
3. Build layouts using semantic HTML + inline styles, referencing `var(--*)` throughout
4. Respect WCAG 2.1 AA; test focus states and color contrast before shipping

### For New Projects

Copy the design system into your project's `_ds/` folder. Consuming projects read `styles.css` and load the bundled component library via the auto-generated `_ds_bundle.js`.

---

**Last updated:** July 26, 2026
**Version:** 1.0
