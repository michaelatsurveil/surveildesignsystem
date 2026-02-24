# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added

- Design system best-practices improvements (accessibility, tokens, API consistency, documentation, token codegen, consumability).

### Changed

- **Input:** `required` and `aria-required` are now set on the native `<input>` when the `required` prop is true.
- **Storybook:** Added `@storybook/addon-a11y` for accessibility checks in the panel.
- **Button, Input, Modal:** Component CSS now uses design token CSS variables (e.g. `var(--color-primary)`, `var(--scale-400)`) instead of hardcoded hex/px.
- **Card, Modal, DataTable:** Optional `className` prop added to the root element.
- **Button:** Now uses `forwardRef`; ref is forwarded to the native `<button>`. Added barrel `index.ts` and `COMPONENT_SPEC.md`.
- **Token codegen:** `npm run generate:tokens` generates `src/tokens.generated.css` from `src/design-tokens.ts`.

### Added (docs / tooling)

- **README.md:** Overview, getting started, using the design system, design link, consumption, versioning.
- **CONTRIBUTING.md:** How to add a component and use design tokens.
- **Storybook:** Button and Input stories now include Figma design link and component description.
- **CHANGELOG.md:** This file.

## [0.0.1] – initial

- Component library (Button, Input, Checkbox, Radio, Card, Modal, SideDrawer, DataTable, StatisticCard, Tabs, Sidebar, Tag, Avatar, Alert, Toast, SegmentedControl, FileUpload, Logo, Icon).
- Design tokens (TS + CSS variables).
- Storybook with Foundations, Navigation, Feedback, Input, Display.
