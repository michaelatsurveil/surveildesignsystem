# Statistic Card Component Spec

**Figma:** [Component Library → node-id=87-408](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=87-408)

## Overview

Displays a primary statistic with title, optional icon and badge, large value, optional comparison trend (up/down/neutral), supporting text, and footer actions (secondary left, primary right).

## Structure

- **Header:** Icon (optional) + title (left); badge (right)
- **Value row:** Large value + optional comparison (trend icon + text)
- **Supporting text:** Optional body copy
- **Footer:** Secondary button (left), primary button (right)

## Comparison trend colors

- **up:** #15803d (success)
- **down:** #e61c1d (error)
- **neutral:** #616161 (grey)

## Spacing

- Card padding: Scale/400 (16px)
- Value: 24px bold; comparison 14px
- Footer: padding-top Scale/400, gap Scale/300
