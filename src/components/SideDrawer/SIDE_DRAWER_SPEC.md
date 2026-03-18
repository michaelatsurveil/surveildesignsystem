# Side Drawer Component Spec

**Figma:** [Component Library → node-id=404-1255](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=404-1255)

## Overview

Displays temporary, important information without full page navigation. Slides in from the edge (left or right), maintains context of the current page.

## Width Variants

| Variant | Width |
|---------|-------|
| sm | 320px |
| md | 600px (default) |
| lg | 720px |

## Structure

- **Backdrop:** Semi-transparent overlay (rgba(0,0,0,0.4))
- **Panel:** White background, shadow-xl, slides in from side
- **Header:** Title (concise, action-oriented) + optional subtext + close button
- **Tabs:** Optional - when drawer contains multiple related views
- **Body:** Scrollable content, stretches vertically
- **Footer (Action bar):** Optional - fixed at bottom, buttons left-aligned

## Design Tokens

- **Surface/Background:** #ffffff
- **Border:** #dfdfdf
- **Title (H6):** Roboto 20px, Bold 700, line-height 24px, #272727 (Text/Headings)
- **Subtext:** Roboto 16px, Regular 400, line-height 24px, #818181 (Text/Subtext)
- **Body text:** Roboto 14px, #3a3a3a (Text/Body)
- **Close icon:** #616161 (Icons/Default)
- **Shadow:** shadow-xl
- **Focus ring:** $shadow-focus-ring2
