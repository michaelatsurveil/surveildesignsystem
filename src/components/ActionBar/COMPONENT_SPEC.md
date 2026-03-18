# Action Bar Component Spec

**Figma:** [Navigation → Action Bar (338-621)](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=338-621)

## Overview

The Action Bar is a contextual control surface that appears when one or more items are selected in a list, table, or data view. It provides quick access to batch-level actions without changing the layout. It **composes the Button component** for all actions.

## Structure

- **Left:** Optional status text (e.g. "1 item selected") and a vertical separator.
- **Right:** Action buttons (secondary by default; one can be primary). Each button can show an icon + label.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selectedLabel` | `string` | — | Status text on the left (e.g. "1 item selected"). Omit to hide status and separator. |
| `actions` | `ActionBarAction[]` | required | Buttons to show. Each has `label`, optional `icon`, optional `onClick`, optional `variant` ('secondary' \| 'primary'). |
| `className` | `string` | `''` | Additional class name for the root. |

## ActionBarAction

| Field | Type | Description |
|-------|------|-------------|
| `label` | `string` | Button label. |
| `icon` | `ReactNode` | Optional icon (e.g. Lucide icon) shown before the label. |
| `onClick` | `() => void` | Optional click handler. |
| `variant` | `'primary' \| 'secondary' \| …` | Button variant; default `'secondary'`. Use `'primary'` for the main action. |

## Tokens

- **Bar:** `--color-grey-50` (bg), `--color-grey-200` (border), `--radius-md`, `--shadow-md`
- **Status text:** `--color-grey-400`, 14px
- **Separator:** `--color-grey-200`
- **Spacing:** `--scale-200`, `--scale-300`, `--scale-400`
- **Buttons:** Uses `Button` with `size="sm"`; variants and styles come from Button.
