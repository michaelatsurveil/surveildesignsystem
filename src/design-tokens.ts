/**
 * Design tokens from Figma Component Library
 * https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library
 */

export const tokens = {
  /** Font family (Font family/Headings, Font family/Body) */
  fontFamily: {
    headings: 'Roboto, system-ui, sans-serif',
    body: 'Roboto, system-ui, sans-serif',
  },
  /** Font weight (Font Weight/Regular, Medium, Semi Bold, Bold) */
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  /** Scale - base spacing/sizing scale (Scale/0 through Scale/1000) */
  scale: {
    0: 0,
    25: 1,
    50: 2,
    100: 4,
    200: 8,
    300: 12,
    400: 16,
    500: 20,
    600: 24,
    700: 28,
    800: 32,
    900: 40,
    1000: 48,
  },
  /** Border width (Border Width: none, sm, md, lg → Scale/0, 25, 50, 100) */
  borderWidth: {
    none: 0,
    sm: 1,
    md: 2,
    lg: 4,
  },
  color: {
    // Primary / Blue palette
    primary: {
      50: '#e5eefa',
      100: '#c6d7f0',
      200: '#9fb9e0',
      300: '#81a5d9',
      400: '#527db6',
      default: '#3165ad',
      600: '#27518c',
      700: '#203b61',
      800: '#142845',
      900: '#111827',
    },
    // Grey / Neutral palette
    grey: {
      25: '#f7f7f7',
      50: '#efefef',
      100: '#dfdfdf',
      200: '#c0c0c0',
      300: '#a0a0a0',
      400: '#818181',
      default: '#616161',
      600: '#3a3a3a',
      700: '#272727',
      800: '#131313',
    },
    // Success / Green palette
    success: {
      50: '#effff5',
      100: '#daf1de',
      200: '#c0e7ce',
      300: '#76bd91',
      400: '#449964',
      default: '#15803d',
      600: '#116631',
      700: '#0d4d25',
      800: '#083318',
    },
    // Error / Red palette
    error: {
      50: '#fff3f3',
      100: '#ffe1e1',
      200: '#ffbbbc',
      300: '#f07777',
      400: '#eb494a',
      default: '#e61c1d',
      600: '#c51516',
      700: '#8a1111',
      800: '#5c0b0c',
    },
    // Warning / Yellow palette
    warning: {
      50: '#fdf9e9',
      100: '#fbf1c6',
      200: '#f8e090',
      300: '#f4c750',
      400: '#f0b537',
      default: '#db9315',
      600: '#99510f',
      700: '#7f4014',
      800: '#6c3517',
    },
    // Neutral
    neutral: {
      white: '#ffffff',
    },
    // Background
    background: {
      default: '#ffffff',
      alt: '#f9fafb',
    },

    // Icons (Lucide)
    icon: {
      default: '#616161',
      muted: '#a0a0a0',
      primary: '#3165ad',
      success: '#15803d',
      error: '#e61c1d',
      warning: '#db9315',
    },

    // Button (semantic aliases - kept for components)
    'button.primary.bg': '#3165ad',
    'button.primary.bgHover': '#27518c',
    'button.primary.bgPressed': '#203b61',
    'button.primary.bgDisabled': '#dfdfdf',
    'button.primary.text': '#ffffff',
    'button.primary.textDisabled': '#818181',
    'button.primary.border': '#3165ad',
    'button.primary.borderDisabled': '#c0c0c0',

    // Secondary button
    'button.secondary.bg': '#ffffff',
    'button.secondary.bgHover': '#f7f7f7',
    'button.secondary.bgPressed': '#dfdfdf',
    'button.secondary.bgDisabled': '#ffffff',
    'button.secondary.text': '#203b61',
    'button.secondary.textDisabled': '#a0a0a0',
    'button.secondary.border': '#dfdfdf',
    'button.secondary.borderHover': '#f7f7f7',
    'button.secondary.borderPressed': '#c0c0c0',
    'button.secondary.borderDisabled': '#dfdfdf',

    // Tertiary button
    'button.tertiary.bg': 'transparent',
    'button.tertiary.bgHover': '#f7f7f7',
    'button.tertiary.bgPressed': '#dfdfdf',
    'button.tertiary.bgDisabled': 'transparent',
    'button.tertiary.text': '#203b61',
    'button.tertiary.textDisabled': '#a0a0a0',
    'button.tertiary.border': 'transparent',

    // Danger button
    'button.danger.bg': '#e61c1d',
    'button.danger.bgHover': '#c51516',
    'button.danger.bgPressed': '#8a1111',
    'button.danger.bgDisabled': '#ffbbbc',
    'button.danger.text': '#ffffff',
    'button.danger.border': '#e61c1d',
    'button.danger.borderDisabled': '#f07777',
  },
  typography: {
    // Headings (Font family/Headings: Roboto Bold)
    h1: { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '60px', fontWeight: 700, lineHeight: '72px', letterSpacing: 0 },
    h2: { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '48px', fontWeight: 700, lineHeight: '56px', letterSpacing: 0 },
    h3: { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '40px', fontWeight: 700, lineHeight: '48px', letterSpacing: 0 },
    h4: { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '32px', fontWeight: 700, lineHeight: '40px', letterSpacing: 0 },
    h5: { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '24px', fontWeight: 700, lineHeight: '28px', letterSpacing: 0 },
    h6: { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '20px', fontWeight: 700, lineHeight: '24px', letterSpacing: 0 },

    // Body (Font family/Body: Roboto)
    'body.xsm': { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '12px', fontWeight: 400, lineHeight: '16px', letterSpacing: 0 },
    'body.sm': { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '14px', fontWeight: 400, lineHeight: '16px', letterSpacing: 0 },
    'body.md': { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '16px', fontWeight: 400, lineHeight: '24px', letterSpacing: 0 },
    'body.lg': { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '20px', fontWeight: 400, lineHeight: '28px', letterSpacing: 0 },

    // Body weight variants
    'body.xsm-medium': { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '12px', fontWeight: 500, lineHeight: '16px', letterSpacing: 0 },
    'body.sm-medium': { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: '16px', letterSpacing: 0 },
    'body.md-medium': { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '16px', fontWeight: 500, lineHeight: '24px', letterSpacing: 0 },
    'body.lg-medium': { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '20px', fontWeight: 500, lineHeight: '28px', letterSpacing: 0 },

    'body.xsm-semibold': { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '12px', fontWeight: 600, lineHeight: '16px', letterSpacing: 0 },
    'body.sm-semibold': { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '14px', fontWeight: 600, lineHeight: '16px', letterSpacing: 0 },
    'body.md-semibold': { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '16px', fontWeight: 600, lineHeight: '24px', letterSpacing: 0 },
    'body.lg-semibold': { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '20px', fontWeight: 600, lineHeight: '28px', letterSpacing: 0 },

    'body.xsm-bold': { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '12px', fontWeight: 700, lineHeight: '16px', letterSpacing: 0 },
    'body.sm-bold': { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '14px', fontWeight: 700, lineHeight: '16px', letterSpacing: 0 },
    'body.md-bold': { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '16px', fontWeight: 700, lineHeight: '24px', letterSpacing: 0 },
    'body.lg-bold': { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '20px', fontWeight: 700, lineHeight: '28px', letterSpacing: 0 },

    // Button (kept for backward compatibility)
    'button.md': { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '16px', fontWeight: 500, lineHeight: '24px' },
    'button.sm': { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: '20px' },
    'button.lg': { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '16px', fontWeight: 500, lineHeight: '24px' },
  },
  /** Border radius (Border Radius: none, sm, md, lg → Scale/0, 50, 100, 200) */
  radius: {
    none: 0,
    sm: 2,
    md: 4,
    lg: 8,
    /** For pill shapes */
    full: 9999,
  },
  focusRing: {
    primary: '0 0 0 4px rgba(39, 81, 140, 0.4), 0 0 0 2px #ffffff',
    secondary: '0 0 0 2px #d1d5db',
  },
  shadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    default: '0 1px 2px -1px rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    md: '0 2px 4px -2px rgba(0, 0, 0, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 8px 10px -6px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
  },
} as const;
