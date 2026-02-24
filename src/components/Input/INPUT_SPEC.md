# Input Component Spec

**Figma:** [Component Library → node-id=304-3801](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=304-3801)

## Variant Structure

| Property | Options | Default |
|----------|---------|---------|
| **Label** | On, Off | Off |
| **Required** | On, Off | Off |
| **Info** | On, Off | Off |
| **Prefix** | None, Icon | None |
| **Suffix** | None, Icon, Password | None |
| **Message** | None, Helper, Error, Success | None |
| **Size** | XS, S, M, L | M |

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
| `size` | `'xs' \| 's' \| 'm' \| 'l'` | `'m'` | Input height |
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

## Size Tokens (Numbers-TC/Inputs-TC)

| Size | Height |
|------|--------|
| XS | 26px |
| S | 30px |
| M | 34px |
| L | 38px |

## Design Tokens

- **Text/Body:** `#3a3a3a`
- **Text/Subtext:** `#818181`
- **Border/border:** `#d1d5db`
- **Icons/Error:** `#e61c1d`
- **Icons/Success:** `#15803d`
- **Icon/icon-color:** `#6b7280`
- **Radius/S:** 4px
