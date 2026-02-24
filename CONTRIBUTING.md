# Contributing to Surveil Design System

## Adding a new component

1. **Folder structure** – Create a folder under `src/components/<ComponentName>/` with:
   - `ComponentName.tsx` – Component implementation
   - `ComponentName.css` – Styles (use design token CSS variables from `src/scale.css`, `src/colors.css`, etc.)
   - `ComponentName.stories.tsx` – Storybook stories
   - `index.ts` – Barrel export (component and public types)
   - `COMPONENT_SPEC.md` – Short spec: Figma link, variants, props, tokens

2. **Design tokens** – Prefer CSS variables over hardcoded values:
   - Spacing: `var(--scale-100)`, `var(--scale-200)`, etc.
   - Colors: `var(--color-primary)`, `var(--color-grey-600)`, etc.
   - Typography: `var(--font-family-body)`, `var(--font-weight-medium)`
   - Radius: `var(--radius-sm)`, `var(--radius-lg)`

3. **Storybook** – Set `title` to the right category (e.g. `Input/Button`, `Display/Card`, `Navigation/Sidebar`). Add `parameters.design.url` (Figma node) and `parameters.docs.description.component` so the story links to design and has a short description.

4. **API** – Support optional `className` on the root element when it helps layout or overrides. Use `forwardRef` for form controls (e.g. Input, Button) so parents can focus or measure the node.

## Running checks

- `npm run build` – TypeScript and Vite build
- `npm run storybook` – Visual and documentation review
- Use the Accessibility panel in Storybook (addon-a11y) when changing interactive components.
