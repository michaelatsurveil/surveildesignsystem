# IconButton Component Spec

**Figma:** [Component Library → Input > Button (Icon variant) (3104-6210)](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=3104-6210)

## Overview

Icon-only button. Same variant and size vocabulary as Button, but contains a single icon instead of a text label. Always requires `aria-label` for accessibility.

## Variants

- **primary** – Blue background (`--color-primary`), white icon
- **secondary** – White background with grey border, dark navy icon
- **tertiary** – Transparent background, dark navy icon
- **danger** – Red background (`--color-error`), white icon
- **link** – Transparent background, blue icon (`--color-primary`)

## Sizes (from Figma 3104-6210)

| Size | Height | Padding   | Icon size |
|------|--------|-----------|-----------|
| sm   | 28px   | 6px 8px   | 12px      |
| md   | 32px   | 8px 12px  | 16px      |
| lg   | 36px   | 6px 12px  | 18px      |

## Props

- `icon: LucideIcon` – Required. A Lucide icon component (not element). The component sizes it correctly per `size`.
- `variant?: IconButtonVariant` – Default `'primary'`
- `size?: IconButtonSize` – Default `'md'`
- `aria-label: string` – Required. Describes the button action for screen readers.
- `className?: string` – Additional class names
- `disabled?: boolean` – Native disabled state
- All other native `<button>` attributes are forwarded. Ref is forwarded to the underlying `<button>`.

## Tokens

- Colors: `--color-icon-button-*` (icon color per variant/state), `--color-primary`, `--color-primary-600`, `--color-primary-700`, `--color-white`, `--color-grey-*`, `--color-error`, `--color-error-200`, `--color-error-300`, `--color-error-600`, `--color-error-700`, `--color-button-secondary-border`
- Spacing: `--scale-200`, `--scale-300`, `--scale-700`, `--scale-800`, `--scale-900`
- Radius: `--radius-md`
