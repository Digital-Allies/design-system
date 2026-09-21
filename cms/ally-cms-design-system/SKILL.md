---
name: allycms-design
description: AllyCMS design system for building consistent, accessible admin interfaces and CMS applications. Contains typography, colors, spacing tokens, core components (Button, Input, Card), and complete CMS admin UI kit. Use to generate branded interfaces, components, and full screens for the Digital Allies CMS platform.
user-invocable: true
---

# AllyCMS Design System Skill

This is the official design system for the Digital Allies CMS Platform. Use it to create branded interfaces, admin dashboards, and client-facing applications with consistent styling, typography, and components.

## What's Included

- **Design Tokens** — CSS custom properties for colors, typography, spacing, shadows
- **Foundation Cards** — Visual reference for colors, type scale, spacing, and brand guidelines
- **Core Components** — Button, Input, Card (React-compatible with TypeScript definitions)
- **UI Kit** — Complete CMS admin dashboard demonstrating layout patterns and component usage
- **Dark Mode** — Full dark variant of all styles and components
- **Accessibility** — WCAG 2.1 AA baseline with high-contrast color options

## Brand Essentials

**AllyCMS** is the admin interface for the Digital Allies platform. The visual language is:
- Clear and practical with no decorative flourishes
- Uses Signal Red (#C5301A) for primary CTAs
- Bone White backgrounds with Charcoal text
- Lexend Deca for headers, JetBrains Mono for body
- Minimal, 2px-radius modernism

## Getting Started

Read `README.md` in this system for:
- Complete token reference (colors, typography, spacing)
- Visual foundations (backgrounds, shadows, animations, hover states)
- Component inventory and usage
- Layout and structural patterns
- Accessibility guidelines
- File structure and how to consume the system

## Common Tasks

### Creating a New Page / Screen

1. Use the CMS admin UI kit (`ui_kits/cms-admin/index.html`) as a structural template
2. Copy the shell (top bar, sidebar, main area)
3. Build your content using the core components and CSS custom properties
4. Link `styles.css` to load all tokens
5. Test at 375px, 768px, 1024px, 1280px breakpoints

### Adding a New Component

1. Create `components/<group>/<Name>.jsx` with the component logic
2. Create `components/<group>/<Name>.d.ts` with TypeScript props interface
3. Create `components/<group>/<Name>.prompt.md` with usage examples
4. Create or update `components/<group>/<group>.card.html` to showcase the component
5. Tag the card with `<!-- @dsCard group="Components" … -->`

### Using Dark Mode

Add the `dark` class to a container to enable dark mode:

```html
<div class="cms-desktop dark">
  <!-- All children inherit dark mode styles -->
</div>
```

Dark mode tokens are defined as scoped CSS variables in the stylesheet.

### Respecting Accessibility

- Use `--color-pulse-blue-dark` (#1D5FAD) for link text on light backgrounds (AA contrast)
- Always include `tabindex` and focus indicators on interactive elements
- Test with screen readers (NVDA, JAWS, VoiceOver)
- Minimum font size: 12px; minimum line-height: 1.5
- Test at 200% zoom and with reduced motion enabled

## Customization

All design tokens are CSS custom properties on `:root`, so you can override them in consuming projects:

```css
:root {
  --color-signal-red: #E53935;    /* Override primary color */
  --font-headers: "Inter", sans-serif;  /* Override header font */
}
```

Never hardcode colors or sizing; always use `var(--*)` to ensure consistency and enable future theming.

## Questions or Issues?

Refer to the detailed `README.md` for:
- Complete color palette with usage guidelines
- Font pairing and sizing rationale
- Spacing scale derivation
- Component API documentation
- Responsive breakpoint strategy

---

**Version:** 1.0  
**Last updated:** July 26, 2026  
**Maintained by:** Digital Allies Design System Team
