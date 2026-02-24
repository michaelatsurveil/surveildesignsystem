# Radio Component Spec

**Figma:** [Component Library → node-id=382-1585](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=382-1585)

## Size

Single size: 18px circle, 8px dot

## State Matrix

|           | Unselected | Selected |
|-----------|------------|----------|
| **Default** | Border #d1d5db, bg #ffffff | Border #3165ad, dot #3165ad |
| **Hover** | Border #9ca3af | Border #27518c, dot #27518c |
| **Pressed** | Border #9ca3af | Border #234674, dot #234674 |
| **Focus** | Focus ring | Focus ring |
| **Disabled** | Border #e5e7eb, bg #f7f7f7 | Border #95bfeb, dot #95bfeb |

## Design Tokens

- **primary:** #3165ad
- **Border/border:** #d1d5db
- **Border/border-light:** #e5e7eb
- **Grey/25:** #f7f7f7 (disabled unselected bg)
- **Text/Body:** #3a3a3a
- **Text/Disabled:** #818181
- **primary-bg-color-hover:** #27518c
- **primary-bg-color-pressed:** #234674
- **primary-bg-color-disabled:** #95bfeb
- **$shadow-focus-ring2:** 4px primary + 2px white
