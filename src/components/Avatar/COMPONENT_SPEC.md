# Avatar

**Figma:** [Component Library → Avatar (275-16494)](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=275-16494)

## Overview

Circular avatar used for user identity: profile image, initials, or a default person icon.

## Variants

- **Image** – `src` + `alt`: circular crop of the image, `object-fit: cover`.
- **Initials** – `initials`: primary blue background, white text (e.g. "JP", "User").
- **Icon fallback** – no `src` or `initials`: primary blue circle with white person (User) icon.

## Sizes (from Figma 275-16494)

| Size | Dimension | Token / note   |
|------|-----------|----------------|
| xs   | 24px      | scale-600 |
| sm   | 32px      | scale-800 |
| md   | 40px      | scale-900 |
| lg   | 48px      | scale-1000 |
| xl   | 56px      | (no scale token) |

## Props

- `src?: string` – Image URL.
- `alt?: string` – Alt text for image (recommended when `src` is set).
- `initials?: string` – Text shown when no image (e.g. "JP", "User").
- `size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'` – Default `md`.

## Tokens

- Background (non-image): `--color-primary`
- Text/icon: `--color-white`
- Border radius: `--radius-full`
- Sizes: `--scale-600` (xs), `--scale-800` (sm), `--scale-900` (md), `--scale-1000` (lg), 56px (xl)
