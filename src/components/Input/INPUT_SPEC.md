# Input Component Spec

**Figma:** [Input field (466-2643)](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=466-2643) — single default size only.

## Variant Structure

| Property | Options | Default |
|----------|---------|---------|
| **Label** | On, Off | Off |
| **Required** | On, Off | Off |
| **Info** | On, Off | Off |
| **Prefix** | None, Icon | None |
| **Suffix** | None, Icon, Password | None |
| **Message** | None, Helper, Error, Success | None |

## Exposed Properties

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Field label |
| `required` | `boolean` | `false` | Show required asterisk (*) |
| `infoTooltip` | `string` | — | Info icon tooltip |
| `prefix` | `ReactNode` | — | Left slot (e.g. Search icon) |
| `suffix` | `ReactNode` | — | Right slot (e.g. ChevronDown) |
| `helperText` | `string` | — | Neutral helper message |
| `error` | `string` | — | Error message (error state) |
| `successMessage` | `string` | — | Success message (success state) |
| `showPasswordToggle` | `boolean` | `true` | Show eye toggle for password |
| `disabled` | `boolean` | `false` | Disabled state |
| `placeholder` | `string` | — | Placeholder text |
| `value` | `string` | — | Controlled value |
| `type` | `string` | `'text'` | Input type (text, password, etc.) |
| ... | `InputHTMLAttributes` | — | Native input props |

## States

| State | Border | Background | Notes |
|-------|--------|------------|-------|
| **Default** | `#d1d5db` | `#ffffff` | Rest state |
| **Hover** | `#9ca3af` | `#ffffff` | Pointer over |
| **Focus** | `#3165ad` | `#ffffff` | Focus ring 4px |
| **Disabled** | `#e5e7eb` | `#f9fafb` | cursor: not-allowed |
| **Error** | `#e61c1d` | `#ffffff` | Error message + icon |
| **Success** | `#15803d` | `#ffffff` | Success message + icon |

## Default size (Figma 466-2643)

Single size only: field padding `8px 12px` (--scale-200, --scale-300), 14px font, 20px line-height. No size prop.

## Design Tokens

- **Border:** `--border-width-sm` (1px), default `--color-grey-200`, hover `--color-grey-300`, focus `--color-primary`, disabled `--color-grey-100`, error `--color-error`, success `--color-success`
- **Radius:** `--radius-md` (4px)
- **Text/body:** `--color-grey-600`, placeholder `--color-grey-400`, icons `--color-grey-400`
- **Error/Success:** `--color-error`, `--color-success`
