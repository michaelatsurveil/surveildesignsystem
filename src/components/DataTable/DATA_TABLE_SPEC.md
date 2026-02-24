# Data Table Component Spec

**Figma:** [Component Library → node-id=112-6099](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=112-6099)

## Overview

Data table with optional row selection (checkbox column), column headers with sort/filter affordance (ellipsis icon), and light row dividers.

## Structure

- **Container:** White background, border, shadow, rounded corners
- **Header row:** Light gray background (#f9fafb), bold text, optional sort icon per column
- **Selection column:** Checkbox per row; header “select all” with indeterminate state
- **Data rows:** White background, dark gray text; thin light gray divider between rows
- **Cells:** Padding (16px vertical, 20px horizontal)

## Status/badge cells

Use `.data-table__badge` or a custom render for pill-style cells (e.g. Status column).

## Spacing

- Cell padding: Scale/400 (16px) vertical, Scale/500 (20px) horizontal
- Header background: #f9fafb
- Border: #e5e7eb
