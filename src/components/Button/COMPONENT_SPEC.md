# Button Component Spec

**Figma:** [Component Library → Input > Buttons (153-1427)](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=153-1427)

## Overview

Action button with semantic variants (primary, secondary, tertiary, outline, danger) and three sizes. Uses design tokens for colors, spacing, and typography.

## Variants

- **primary** – Blue background (--color-primary), default for main actions
- **secondary** – White with grey border
- **tertiary** – Transparent, for low emphasis
- **outline** – White with primary border
- **danger** – Red (--color-error) for destructive actions

## Sizes (Figma 153-1427)

- **sm** – Compact: body small (14px / 16px line-height). `padding: calc(var(--scale-100) + var(--scale-50)) var(--scale-300)` (6px 12px), `min-height: var(--scale-600)` (24px)
- **md** – Default (Medium row in Figma): body small (14px / 16px line-height). `padding: var(--scale-200) var(--scale-300)` (8px 12px), `min-height: var(--scale-800)` (32px)
- **lg** – Large (Large row in Figma): `padding: calc(var(--scale-200) + var(--scale-50)) var(--scale-500)` (10px 20px), `min-height: var(--scale-900)` (40px), `font-size: var(--scale-400)` (16px), `line-height: var(--scale-600)` (24px)

## Props

- `variant?: ButtonVariant` – Default `'primary'`
- `size?: ButtonSize` – Default `'md'`
- `children: React.ReactNode` – Button label
- `className?: string` – Additional class names
- `disabled?: boolean` – Native disabled state
- All other native `<button>` attributes (e.g. `onClick`, `type`, `aria-*`) are forwarded. Ref is forwarded to the underlying `<button>`.

## Tokens

- **Small button (sm):** `--scale-50`, `--scale-100`, `--scale-300`, `--scale-600`, `--font-weight-medium`
- **Medium button (md):** `--scale-200`, `--scale-300`, `--scale-600`, `--scale-800`, `--font-weight-medium` — per Figma 153-1427 (12px left/right)
- **Large button (lg):** `--scale-50`, `--scale-200`, `--scale-400`, `--scale-500`, `--scale-600`, `--scale-900`, `--font-weight-medium` — per Figma 153-1427
- Colors: `--color-primary`, `--color-primary-600`, `--color-primary-700`, `--color-button-*` (when available), `--color-white`, `--color-grey-*`, `--color-error`, `--color-error-200`, `--color-error-300`, `--color-error-600`, `--color-error-700`
- Spacing: `--scale-200`, `--scale-300`, `--scale-400`, `--scale-500`
- Radius: `--radius-lg`
- Typography: `--font-family-body`, `--font-weight-medium`
