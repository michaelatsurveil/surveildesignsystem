# Card Component Spec

**Figma:** [Component Library → node-id=2283-10045](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=2283-10045)

## Overview

A versatile container available in five layout variants spanning list rows and stacked tiles. All variants use scale tokens for spacing and colour tokens for surface/text/border values.

## Variants

### `default` — Tile Action
Stacked tile card with shadow elevation.
- **Header:** Icon (48×48 blue-50 block) + title (bold 16px) + badge below title
- **Body:** 14px body text, grey-400
- **Footer:** Primary + secondary buttons (sm size, 32px); `footerAlign: 'right' | 'left'`
- **Shadow:** `0 2px 4px -2px rgba(0,0,0,.10), 0 4px 6px -1px rgba(0,0,0,.10)`
- **Figma:** Tile / Right Action (320:5290), Tile / Left Action (3228:24268)

### `list` — List Navigational
Compact single-row item with chevron.
- **Structure:** Icon (left) · Title + badge row · Sub-text below · ChevronRight (right)
- **Padding:** Scale/400 (16px) vertical, Scale/600 (24px) horizontal
- **Border:** Bottom 1px grey-50 (no shadow); hover = grey-50 fill; focus = 2px primary-600 border
- **Figma:** List / Navigational (2283:10046)

### `list-toggle` — List Toggle
Same as navigational but a 36px icon-only toggle button replaces the chevron.
- Pass the icon element via `toggleIcon` and a handler via `onToggle`
- Toggle button: transparent bg, grey-300 icon; hover = grey-50 bg
- **Figma:** List / Toggle (3217:21716)

### `list-action` — List Action
Compact row with content (icon + title + badge + subtext) on the left, and a secondary + primary button pair on the right.
- Container: `flex-row gap-24 items-center`
- Content: `flex-1` row of icon + text column (gap-12); subtext truncates with ellipsis
- Action bar: `flex-shrink-0 gap-8`; buttons are `size="md"` (32px)
- **Figma:** List / Action (3218:22755)

### `tile-toggle` — Tile Toggle
Narrow tile (350px default) with border (no shadow). Toggle icon top-right, badge + timestamp footer.
- **Top row:** Icon (left, `items-start`) · Toggle button (right)
- **Content:** Title (bold 16px) · Sub-text (14px grey-400)
- **Footer:** Badge (left) · Timestamp text (right, 14px grey-400)
- **Border:** 1px grey-100 (no shadow)
- **Figma:** Tile / Toggle (3218:23675)

## Spacing (scale tokens)

| Zone | Token | Value |
|---|---|---|
| Tile padding | Scale/600 | 24px |
| List padding H | Scale/600 | 24px |
| List padding V | Scale/400 | 16px |
| Header gap (icon → text) | Scale/300 | 12px |
| Title → badge gap | Scale/200 | 8px |
| Title → subtext gap | Scale/100 | 4px |
| Action bar button gap | Scale/200 | 8px |
| Tile header column gap | Scale/300 | 12px |

## Interactive states (list family)

| State | Background | Border |
|---|---|---|
| Default | white | bottom 1px grey-50 |
| Hover | grey-50 | bottom 1px grey-50 |
| Pressed | grey-25 | — |
| Focus | white | 2px all sides primary-600 |
| Disabled | grey-100 | bottom 1px grey-300; pointer-events: none |

## Props

| Prop | Type | Default | Variants |
|---|---|---|---|
| `variant` | `'default' \| 'list' \| 'list-toggle' \| 'list-action' \| 'tile-toggle'` | `'default'` | all |
| `title` | `string` | — | all |
| `icon` | `ReactNode` | — | all |
| `status` | `string` | — | all |
| `statusVariant` | `CardStatusVariant` | `'default'` | all |
| `children` | `ReactNode` | — | all (body/subtext) |
| `primaryAction` | `{ label, onClick? }` | — | `default`, `list-action` |
| `secondaryAction` | `{ label, onClick? }` | — | `default`, `list-action` |
| `footerAlign` | `'left' \| 'right'` | `'right'` | `default` |
| `toggleIcon` | `ReactNode` | — | `list-toggle`, `tile-toggle` |
| `onToggle` | `() => void` | — | `list-toggle`, `tile-toggle` |
| `timestamp` | `string` | — | `tile-toggle` |
| `onClick` | `() => void` | — | all |
| `disabled` | `boolean` | `false` | list family |
| `className` | `string` | `''` | all |
