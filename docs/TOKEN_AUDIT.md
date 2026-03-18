# Design token audit – component usage

**Generated:** audit of all components for use of design system tokens (`src/design-tokens.ts` → `src/tokens.generated.css` + `src/colors.css`).

## Summary

| Component       | Status   | Notes |
|----------------|----------|--------|
| Button         | OK       | Uses `var(--color-*)`, `--scale-*`, `--radius-*` |
| Input          | OK       | Uses color, scale, radius tokens |
| Sidebar        | OK       | Uses color, scale, radius; rgba overlays intentional |
| Tag            | OK       | Uses color, scale, radius tokens |
| Avatar         | Partial  | Uses color/scale/radius; some font-size/56px hardcoded |
| Modal          | Partial  | Mostly tokens; some width/font-size px |
| **Checkbox**   | **Fixed**| Replaced hex/px with tokens |
| **Radio**      | **Fixed**| Replaced hex/px with tokens |
| **Card**       | **Fixed**| Replaced hex/px with tokens |
| **Toast**      | **Fixed**| Replaced hex/px with tokens |
| **Alert**      | **Fixed**| Replaced hex/px with tokens |
| **DataTable**  | **Fixed**| Replaced hex/px with tokens |
| **SideDrawer** | **Fixed**| Replaced hex/px with tokens |
| **Tabs**       | **Fixed**| Replaced hex/px with tokens |
| **SegmentedControl** | **Fixed** | Replaced hex/px with tokens |
| **FileUpload** | **Fixed**| Replaced hex/px with tokens |
| **StatisticCard** | **Fixed** | Replaced hex/px with tokens |

## Token mapping used

- **Colors:** `#ffffff` → `var(--color-white)`, `#3165ad` → `var(--color-primary)`, `#e61c1d` → `var(--color-error)`, `#15803d` → `var(--color-success)`, `#272727` → `var(--color-grey-700)`, etc.
- **Spacing:** `8px` → `var(--scale-200)`, `12px` → `var(--scale-300)`, `16px` → `var(--scale-400)`, `20px` → `var(--scale-500)`, `24px` → `var(--scale-600)`.
- **Radius:** `4px` → `var(--radius-md)`, `8px` → `var(--radius-lg)`.
- **Shadow:** `box-shadow: 0 1px 2px...` → `var(--shadow)` or `var(--shadow-md)` where applicable (from `shadows.css`).
- **Font:** Prefer `var(--font-family-body)`, `var(--font-weight-regular|medium|semibold|bold)` (from `typography.css`); font-size often left as px where no typography CSS var exists.
- **Background alt:** `var(--color-bg-alt)` (from `colors.css`).

## Notes

- Focus rings using `rgba(49, 101, 173, 0.2)` kept as-is (primary blue overlay); could be a token later.
- Accessibility-only values (e.g. 1px / -1px for focus trap) left as literal px.
- Where no exact token exists, nearest semantic token used (e.g. `#d1d5db` → `var(--color-grey-200)`).
