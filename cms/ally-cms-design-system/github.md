repo: Digital-Allies/da-platform
branch: main
path: packages/20260722-da-design-system

## Sync history
- 2026-07-26T08:39:57Z — Created AllyCMS design system: token CSS, foundation cards, 3 core components, CMS admin UI kit; generated README + SKILL.md

## Last sync
date: 2026-07-26T09:15:00Z
commit: (tree hash only, exact commit unknown)

### Updated in this project
- Audit pass: archived 8 stray planning docs (unrelated `da-platform`/Atomic Finds monorepo notes) and the superseded `ui_kits/` mockup to `_archive/`
- Removed dead `@startingPoint` tags from Button/Card/Input `.d.ts` (mechanism is gone; templates are the starting points now)
- Rebuilt `thumbnail.html` as a proper small homepage tile (was misused as a content index)
- Rewrote README file structure + inventory sections to match what's actually on disk

## Screen map
| Screen | Source Files |
|--------|-------------|
| Design Tokens | `tokens/*.css` (colors, typography, spacing, effects) |
| Foundation Cards | `guidelines/*.html` (brand, colors, neutrals, typography, spacing) |
| Core Components | `components/core/*.jsx`, `*.d.ts`, `*.prompt.md` (Button, Input, Card) |
| CMS Admin Dashboard | `ui_kits/cms-admin/index.html` |
| Design System Thumbnail | `thumbnail.html` |
| Documentation | `README.md`, `SKILL.md` |
