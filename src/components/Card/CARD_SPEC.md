# Card Component Spec

**Figma:** [Component Library → node-id=320-5290](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=320-5290)

## Overview

A container with optional header (icon in 40×40 block, title, status badge), body content, and footer (primary + secondary buttons, or label pills). Uses scale tokens for spacing.

## Structure

- **Container:** White background, 8px radius, border, shadow, 16px padding
- **Header:** Icon in 40×40 light gray block (#eef0f3) + title (20px bold #2c3139); optional status badge below (4–8px gap)
- **Body:** 14px, #6b7480; 24px space above footer
- **Footer:** Primary button (left) + secondary button (right), or label pills

## Icon block

- 40×40px, background #eef0f3, rounded corners

## Status badge

- Pill-shaped (8px radius). Success: #e6f5ec bg, #388e3c text.

## Footer actions (node 320-5290)

- Left: Primary button (blue)
- Right: Secondary button (outline)
- Gap 8–12px; 24–32px above body

## Spacing (scale tokens)

- Card padding: Scale/400 (16px)
- Header title–status gap: Scale/200 (8px)
- Header to body: Scale/400 (16px)
- Body to footer: Scale/600 (24px) + border
- Footer button gap: Scale/300 (12px)
