# Tag

**Figma:** [Component Library → Tag (304-1063)](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=304-1063)

## Overview

Pill-shaped tags for semantic labels (e.g. status, counts). Two sizes: compact (`sm`) for numeric badges, larger (`md`) for text labels.

## Variants

| Variant   | Background token      | Text token           |
|----------|------------------------|----------------------|
| default  | grey-50               | grey-700             |
| info     | primary-50             | primary-700          |
| success  | success-50            | success-700          |
| critical | error-50              | error-700            |
| attention| warning-50            | warning-700          |
| warning  | warning-100           | warning-800          |

## Sizes

- **sm** – Compact (e.g. numeric "9"): padding 2px 8px, 12px font, min-height 20px.
- **md** – Text labels: padding 4px 12px, 14px font, min-height 24px.

## Props

- `variant?: 'default' | 'info' | 'success' | 'critical' | 'attention' | 'warning'` – Default `'default'`.
- `size?: 'sm' | 'md'` – Default `'md'`.
- `children: React.ReactNode` – Tag content (number or text).

## Tokens

- Border radius: `--radius-full`
- Scale: `--scale-50`, `--scale-100`, `--scale-200`, `--scale-300`
- Semantic colors from `colors.css` (e.g. `--color-grey-50`, `--color-primary-50`, …)
