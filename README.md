# Surveil Design System

React-based component library and design tokens for Surveil products. Built with Vite and documented in Storybook.

## Overview

This repository contains:

- **Components** – Buttons, inputs, cards, modals, data table, sidebar, tags, avatars, and more. See [src/components/](src/components/).
- **Design tokens** – Colors, scale, typography, shadows, and radius defined in [src/design-tokens.ts](src/design-tokens.ts) and as CSS variables in [src/scale.css](src/scale.css), [src/colors.css](src/colors.css), [src/typography.css](src/typography.css), and [src/shadows.css](src/shadows.css). Run `npm run generate:tokens` to regenerate [src/tokens.generated.css](src/tokens.generated.css) from `design-tokens.ts` (single source of truth for token values).
- **Storybook** – Component documentation and visual testing.

## Getting started

### Run the app

```bash
npm install
npm run dev
```

### Run Storybook

```bash
npm run storybook
```

Storybook runs at http://localhost:6006 and lists all components by category: Foundations, Navigation, Feedback, Input, Display.

### Build

```bash
npm run build
```

## Using the design system

1. **Install dependencies** – This repo depends on `react`, `react-dom`, and `lucide-react`. Consumers need the same (or compatible) versions.

2. **Global styles** – Import the token and base styles in your app root (e.g. in your main entry or layout):

   ```ts
   import 'surveil-design-system/src/index.css';
   ```

   Or copy and import only what you need: `typography.css`, `colors.css`, `scale.css`, `shadows.css`, and your own base reset.

3. **Components** – Import from the component folder or barrel:

   ```tsx
   import { Button } from './path/to/surveil-design-system/src/components/Button';
   import { Input } from './path/to/surveil-design-system/src/components/Input';
   ```

4. **Design tokens** – For JS/TS use [src/design-tokens.ts](src/design-tokens.ts). For CSS use the variables defined in the `src/*.css` token files (e.g. `var(--color-primary)`, `var(--scale-400)`).

## Design

Component specs and Figma links are in each component folder (e.g. `COMPONENT_SPEC.md`) and in Storybook story parameters. Design library: [Figma – Component Library](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library).

## Consumption

This repo is **private** and not published to npm. To use it in another app:

- **Copy or Git** – Clone or add as a submodule, then import components and styles from `src/` as shown above. Ensure peer dependencies (`react`, `react-dom`, `lucide-react`) match.
- **Publishing (optional)** – To ship as an npm package later, add `main`/`module`/`exports` in `package.json`, a library build (e.g. Vite library mode), and `files` so only the built output and assets are published. Remove or set `private: false` when publishing.

## Versioning

Bump `version` in `package.json` when shipping meaningful changes. See [CHANGELOG.md](CHANGELOG.md) for a human-readable history.

## License

Private – Surveil.
