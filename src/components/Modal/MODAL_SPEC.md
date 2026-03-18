# Modal Component Spec

**Figma:** [Component Library → node-id=333-308](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=333-308)

## Overview

A dialog box that appears on top of the main content to capture user attention. Used for forms, alerts, or additional information.

## Size Variants

| Variant | Width |
|---------|-------|
| sm | 366px |
| md | 525px (default) |
| lg | 768px |

## Structure

- **Backdrop:** Semi-transparent overlay (rgba(0,0,0,0.4))
- **Content:** Centered panel, white background, rounded corners, shadow
- **Header:** Title (left) + close button (right)
- **Body:** Scrollable content area
- **Footer:** Optional - buttons right-aligned (secondary left, primary right)

## Design Tokens

- **Background:** #ffffff
- **Border:** #dfdfdf
- **Title:** Roboto 20px, Bold 700, line-height 24px, #272727
- **Body text:** Roboto 14px, #3a3a3a
- **Close icon:** #616161
- **Shadow:** shadow-lg
- **Border radius:** 8px
