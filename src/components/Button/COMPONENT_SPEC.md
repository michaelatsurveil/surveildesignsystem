# Button Component Spec

**Figma:** [Component Library → Buttons](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library)

## Overview

Action button with semantic variants (primary, secondary, tertiary, outline, danger) and three sizes. Uses design tokens for colors, spacing, and typography.

## Variants

- **primary** – Blue background (--color-primary), default for main actions
- **secondary** – White with grey border
- **tertiary** – Transparent, for low emphasis
- **outline** – White with primary border
- **danger** – Red (--color-error) for destructive actions

## Sizes

- **sm** – Compact (scale-300 / scale-300 padding, 14px font)
- **md** – Default (scale-200 / scale-400 padding, 16px font)
- **lg** – Large (scale-200 / scale-500 padding, 16px font)

## Props

- `variant?: ButtonVariant` – Default `'primary'`
- `size?: ButtonSize` – Default `'md'`
- `children: React.ReactNode` – Button label
- `className?: string` – Additional class names
- `disabled?: boolean` – Native disabled state
- All other native `<button>` attributes (e.g. `onClick`, `type`, `aria-*`) are forwarded. Ref is forwarded to the underlying `<button>`.

## Tokens

- Colors: `--color-primary`, `--color-primary-600`, `--color-primary-700`, `--color-white`, `--color-grey-*`, `--color-error`, `--color-error-200`, `--color-error-300`, `--color-error-600`, `--color-error-700`
- Spacing: `--scale-200`, `--scale-300`, `--scale-400`, `--scale-500`
- Radius: `--radius-lg`
- Typography: `--font-family-body`, `--font-weight-medium`
