# Statistic Card Component Spec

**Figma:** [Statistic Card exploded state (90-682)](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=90-682)

## Overview

Displays a primary statistic with title, optional icon and badge, large value, optional comparison trend (up/down/neutral), supporting text, and optional labels or footer actions. When not all pieces are used, **vertical sizing hugs content** (no extra bottom spacing).

## Structure (Figma 90-682 exploded state)

- **Header:** Icon (optional) + title (left); badge (right)
- **Value row:** Large value + optional comparison (trend icon + text)
- **Supporting text:** Optional body copy
- **Footer (optional):** Labels (e.g. Tag components) and/or actions (secondary button left, primary button right)

## Props

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Header title |
| `icon` | `ReactNode` | Optional status icon left of title |
| `badge` | `string` | Optional badge right of header (e.g. "Default") |
| `value` | `string` | Primary statistic (e.g. "£00,000.00") |
| `comparison` | `{ trend, text }` | Optional trend (up/down/neutral) + label |
| `supportingText` | `string` | Optional supporting copy |
| `labels` | `ReactNode[]` | Optional labels/tags (e.g. `<Tag>`) below supporting text |
| `primaryAction` / `secondaryAction` | `{ label, onClick? }` | Optional footer buttons |

## Vertical hug

Margins between sections are applied only when the following section exists: value-row gets bottom margin only when supporting text or footer is present; supporting text gets bottom margin only when footer is present. So a card with only title + value has no extra space below the value.

## Comparison trend colors

- **up:** `--color-success` (#15803d)
- **down:** `--color-error` (#e61c1d)
- **neutral:** `--color-grey` (#616161)

## Spacing (tokens)

- Card padding: `--scale-400` (16px)
- Value: 24px bold; comparison 14px
- Footer: padding-top `--scale-400` when present; gap `--scale-300`
