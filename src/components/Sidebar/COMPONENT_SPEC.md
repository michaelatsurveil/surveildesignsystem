# Sidebar

**Figma:** [Component Library → Sidebar (443-15372)](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=443-15372)

## Overview

Vertical app navigation sidebar: dark blue background, logo header, list of nav links (with optional icons and expand caret), user block, “Powered by Surveil”, and footer (e.g. Logout).

## Structure

- **Header** – Brand/logo (default: Surveil Logo dark variant).
- **Nav** – List of items; each can have icon, label, href or onClick, active state, and optional sub-items (expand caret).
- **Bottom** – User block (name, email, optional link), optional “Powered by Surveil”, footer slot (e.g. Logout button).

## Props

- `header?: React.ReactNode` – Defaults to `<Logo variant="dark" height={32} />`.
- `navItems: SidebarNavItem[]` – Main nav items.
- `user?: SidebarUser` – `{ name, email, href? }`.
- `poweredBy?: boolean` – Show “Powered by Surveil”; default `true`.
- `footer?: React.ReactNode` – e.g. Logout button; use class `sidebar__logout` for default styling.
- `width?: number` – Sidebar width in px; default `260`.
- `className?: string` – Extra class names.

## SidebarNavItem

- `label: string`
- `icon?: React.ReactNode`
- `href?: string` – Renders as `<a>`.
- `onClick?: () => void` – Renders as `<button>` when no href.
- `active?: boolean` – Highlights current page.
- `children?: SidebarNavItem[]` – Sub-items; shows expand caret.

## Tokens

- Background: `--color-primary-800`
- Text: `--color-white`
- Scale for padding/gaps: `--scale-200`, `--scale-300`, `--scale-400`, `--scale-500`
- Border radius: `--radius-full` (user icon), `--radius-md` (logout hover)
