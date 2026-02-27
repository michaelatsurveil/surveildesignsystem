# Tag

**Figma:** [Component Library → Tag (304-1063)](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=304-1063) · [Default pill (465-10005)](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=465-10005) · [Tags matrix (272-16434)](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=272-16434)

## Overview

Pill-shaped tags for semantic labels (e.g. status, counts). Two sizes: compact (`sm`) for numeric badges, larger (`md`) for text labels.

## Variants

| Variant   | Background token      | Text token           | Border                |
|----------|------------------------|----------------------|------------------------|
| default  | grey-50               | grey-700             | 1px solid grey-100     |
| info     | primary-50            | primary-700          | —                      |
| success  | success-50            | success-700          | —                      |
| critical | error-50              | error-700            | —                      |
| attention| warning-50            | warning-700          | —                      |
| warning  | warning-100           | warning-800          | —                      |

## Sizes (token-based; implements Figma 465-10005)

- **sm** – Compact (e.g. numeric "9"): `padding: var(--scale-50) var(--scale-200)` (2px 8px), 12px font, `min-height: var(--scale-500)` (20px).
- **md** – Text labels: `padding: var(--scale-100) var(--scale-300)` (4px 12px), 14px font, `min-height: var(--scale-600)` (24px).

## Props

- `variant?: 'default' | 'info' | 'success' | 'critical' | 'attention' | 'warning'` – Default `'default'`.
- `size?: 'sm' | 'md'` – Default `'md'`.
- `children: React.ReactNode` – Tag content (number or text).

## Tokens (default pill from Figma 465-10005)

| Role        | Token / value |
|------------|----------------|
| Background | `--color-grey-50` |
| Text       | `--color-grey-700` |
| Border     | `--border-width-sm` solid `--color-grey-100` |
| Radius     | `--radius-full` |
| Padding (sm) | `--scale-50` `--scale-200` |
| Padding (md) | `--scale-100` `--scale-300` |
| Min-height (sm) | `--scale-500` (20px) |
| Min-height (md) | `--scale-600` (24px) |
| Font       | `--font-family-body`, `--font-weight-medium` |
