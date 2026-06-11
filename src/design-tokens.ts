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
      default: '#ac5c11',
      600: '#99510f',
      700: '#7f4014',
      800: '#6c3517',
    },
    // Purple palette
    purple: {
      50: '#e5d8fb',
      100: '#cbb0f8',
      200: '#b089f4',
      300: '#9661f1',
      default: '#7c3aed',
      600: '#632ebe',
      700: '#4a238e',
      800: '#32175f',
    },
    // Rose palette
    rose: {
      50: '#fad7e1',
      100: '#f6aec3',
      200: '#f186a6',
      300: '#ed5d88',
      default: '#e8356a',
      600: '#ba2a55',
      700: '#8b2040',
      800: '#5d152a',
    },
    // Orange palette
    orange: {
      50: '#fce0d4',
      100: '#f9c0aa',
      200: '#f6a17f',
      300: '#f38155',
      default: '#f0622a',
      600: '#c04e22',
      700: '#903b19',
      800: '#602711',
    },
    // Jade palette
    jade: {
      50: '#d1f1e4',
      100: '#a3e3ca',
      200: '#74d4af',
      300: '#46c695',
      default: '#18b87a',
      600: '#139362',
      700: '#0e6e49',
      800: '#0a4a31',
    },
    // Teal palette
    teal: {
      50: '#ccf3f0',
      100: '#99e7e0',
      200: '#66dad1',
      300: '#33cec1',
      default: '#00c2b2',
      600: '#009b8e',
      700: '#00746b',
      800: '#004e47',
    },
    // Aqua palette
    aqua: {
      50: '#dbe9f7',
      100: '#b7d3f0',
      200: '#92bce8',
      300: '#6ea6e1',
      default: '#4a90d9',
      600: '#3b73ae',
      700: '#2c5682',
      800: '#1e3a57',
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
    // Surface
    surface: {
      page: '#ffffff',             // Neutral/White
      'page-background': '#f7f7f7', // Neutral/25
      transparent: 'transparent',  // Neutral/Transparent
      scrim: 'rgba(0,0,0,0.2)',    // Grey/Scrim
      primary: '#ffffff',          // Neutral/White
      action: '#ffffff',           // Neutral/White
      'action-hover': '#27518c',   // Primary/600
      'action-pressed': '#203b61', // Primary/700
      'action-focused': '#27518c', // Primary/600
      'action-active': '#e5eefa',  // Primary/50
      'action-hover-light': '#efefef', // Grey/50
      success: '#effff5',          // Success/50
      warning: '#fdf9e9',          // Warning/50
      information: '#e5eefa',      // Information/50
      error: '#fff3f3',            // Error/50
      disabled: '#dfdfdf',         // Neutral/100
      dark: '#272727',             // Grey/700
      light: '#f7f7f7',            // Neutral/25
      default: '#f7f7f7',          // legacy alias
    },

    // Surface / Button
    'surface-button': {
      primary: '#3165ad',               // Primary/Default
      'primary-hover': '#27518c',       // Primary/600
      'primary-pressed': '#203b61',     // Primary/700
      'primary-focused': '#27518c',     // Primary/600
      'primary-disabled': '#dfdfdf',    // Neutral/100
      secondary: '#ffffff',             // Neutral/White
      'secondary-hover': '#f7f7f7',     // Neutral/25
      'secondary-pressed': '#dfdfdf',   // Neutral/100
      'secondary-focused': '#f7f7f7',   // Neutral/25
      'secondary-disabled': '#ffffff',  // Neutral/White
      tertiary: '#ffffff',              // Neutral/White
      'tertiary-hover': '#f7f7f7',      // Neutral/25
      'tertiary-pressed': '#dfdfdf',    // Neutral/100
      'tertiary-focused': '#f7f7f7',    // Neutral/25
      'tertiary-disabled': '#ffffff',   // Neutral/White
      danger: '#e61c1d',                // Error/Default
      'danger-hover': '#c51516',        // Error/600
      'danger-pressed': '#c51516',      // Error/600
      'danger-focused': '#c51516',      // Error/600
      'danger-disabled': '#ffbbbc',     // Error/200
      'icon-button-inactive': '#dfdfdf',          // Grey/100
      'icon-button-inactive-hover': '#dfdfdf',    // Grey/100
      'icon-button-inactive-pressed': '#dfdfdf',  // Grey/100
      'icon-button-inactive-focused': '#dfdfdf',  // Grey/100
      'icon-button-inactive-disabled': '#efefef', // Grey/50
      'icon-button-active': '#3165ad',            // Blue/Default
      'icon-button-active-hover': '#3165ad',      // Blue/Default
      'icon-button-active-pressed': '#3165ad',    // Blue/Default
      'icon-button-active-focused': '#3165ad',    // Blue/Default
      'icon-button-active-disabled': '#efefef',   // Grey/50
    },

    // Surface / Table
    'surface-table': {
      default: '#ffffff',    // Neutral/White
      hover: '#f7f7f7',      // Neutral/25
      pressed: '#efefef',    // Neutral/50
      'child-cell': '#f7f7f7', // Neutral/25
      heading: '#f7f7f7',    // Neutral/25
    },
    // Text
    text: {
      headings: '#272727',       // Neutral/700
      body: '#616161',           // Neutral/Default
      subtext: '#818181',        // Neutral/400
      action: '#3165ad',           // Primary/Default
      'action-hover': '#27518c',   // Primary/600
      'action-pressed': '#203b61', // Primary/700
      'action-focused': '#27518c', // Primary/600
      'action-active': '#27518c',  // Primary/600
      disabled: '#818181',         // Neutral/400
      information: '#3165ad',    // Information/Default
      warning: '#ac5c11',        // Warning/Default
      success: '#15803d',        // Success/Default
      error: '#e61c1d',          // Error/Default
      'on-action': '#ffffff',    // Neutral/White
    },
    // Border
    border: {
      default: '#dfdfdf',          // Neutral/100
      dark: '#a0a0a0',             // Neutral/300
      light: '#efefef',            // Neutral/50
      focus: '#3165ad',            // Primary/Default
      action: '#3165ad',           // Primary/Default
      'action-hover': '#27518c',   // Primary/600
      'action-pressed': '#203b61', // Primary/700
      'action-focused': '#27518c', // Primary/600
      success: '#daf1de',          // Success/100
      warning: '#fbf1c6',          // Warning/100
      information: '#c6d7f0',      // Information/100
      error: '#ffe1e1',            // Error/100
      disabled: '#a0a0a0',         // Neutral/300
    },

    // Border / Button
    'border-button': {
      primary: '#3165ad',               // Primary/Default
      'primary-hover': '#27518c',       // Primary/600
      'primary-pressed': '#203b61',     // Primary/700
      'primary-focused': '#27518c',     // Primary/600
      'primary-disabled': '#c0c0c0',    // Neutral/200
      secondary: '#dfdfdf',             // Neutral/100
      'secondary-hover': '#f7f7f7',     // Neutral/25
      'secondary-pressed': '#c0c0c0',   // Neutral/200
      'secondary-focused': '#dfdfdf',   // Neutral/100
      'secondary-disabled': '#dfdfdf',  // Neutral/100
      tertiary: '#ffffff',              // Neutral/White
      'tertiary-hover': '#f7f7f7',      // Neutral/25
      'tertiary-pressed': '#dfdfdf',    // Neutral/100
      'tertiary-focused': '#f7f7f7',    // Neutral/25
      'tertiary-disabled': '#ffffff',   // Neutral/White
      danger: '#e61c1d',                // Error/Default
      'danger-hover': '#c51516',        // Error/600
      'danger-pressed': '#8a1111',      // Error/700
      'danger-focused': '#c51516',      // Error/600
      'danger-disabled': '#f07777',     // Error/300
    },
    // Scrim
    scrim: 'rgba(0, 0, 0, 0.2)',

    // Icons
    icon: {
      default: '#616161',            // Neutral/Default
      'default-light': '#818181',    // Neutral/400
      action: '#3165ad',               // Primary/Default
      'action-hover': '#27518c',       // Primary/600
      'action-pressed': '#203b61',     // Primary/700
      'action-focused': '#27518c',     // Primary/600
      'action-active': '#203b61',      // Primary/700
      'action-hover-light': '#616161', // Grey/Default
      disabled: '#818181',             // Neutral/400
      information: '#3165ad',        // Information/Default
      warning: '#ac5c11',            // Warning/Default
      success: '#15803d',            // Success/Default
      error: '#e61c1d',              // Error/Default
      // legacy aliases kept for components
      light: '#818181',
      muted: '#a0a0a0',
      primary: '#3165ad',
    },

    // Icon / Button
    'icon-button': {
      link: '#3165ad',               // Primary/Default
      'on-action': '#ffffff',        // Neutral/White
      'link-hovered': '#27518c',     // Primary/600
      'link-pressed': '#27518c',     // Primary/600
      'link-focused': '#27518c',     // Primary/600
      'link-disabled': '#9fb9e0',    // Primary/200
      primary: '#ffffff',            // Neutral/White
      'primary-hover': '#ffffff',    // Neutral/White
      'primary-focused': '#ffffff',  // Neutral/White
      'primary-pressed': '#ffffff',  // Neutral/White
      'primary-disabled': '#818181', // Neutral/400
      secondary: '#203b61',          // Primary/700
      'secondary-hover': '#203b61',  // Primary/700
      'secondary-pressed': '#203b61', // Primary/700
      'secondary-focused': '#203b61', // Primary/700
      'secondary-disabled': '#a0a0a0', // Neutral/300
      tertiary: '#203b61',           // Primary/700
      'tertiary-hover': '#203b61',   // Primary/700
      'tertiary-pressed': '#203b61', // Primary/700
      'tertiary-focused': '#203b61', // Primary/700
      'tertiary-disabled': '#a0a0a0', // Neutral/300
      danger: '#ffffff',             // Neutral/White
      'danger-hover': '#ffffff',     // Neutral/White
      'danger-pressed': '#ffffff',   // Neutral/White
      'danger-focused': '#ffffff',   // Neutral/White
      'danger-disabled': '#ffffff',  // Neutral/White
    },

    // Text / Button (semantic text colors for button variants)
    'text-button': {
      link: '#3165ad',               // Primary/Default
      'link-hovered': '#27518c',     // Primary/600
      'link-pressed': '#27518c',     // Primary/600
      'link-focused': '#27518c',     // Primary/600
      'link-disabled': '#9fb9e0',    // Primary/200
      primary: '#ffffff',            // Neutral/White
      'primary-hover': '#ffffff',    // Neutral/White
      'primary-focused': '#ffffff',  // Neutral/White
      'primary-pressed': '#ffffff',  // Neutral/White
      'primary-disabled': '#818181', // Neutral/400
      secondary: '#203b61',          // Primary/700
      'secondary-hover': '#203b61',  // Primary/700
      'secondary-pressed': '#203b61', // Primary/700
      'secondary-focused': '#203b61', // Primary/700
      'secondary-disabled': '#a0a0a0', // Neutral/300
      tertiary: '#203b61',           // Primary/700
      'tertiary-hover': '#203b61',   // Primary/700
      'tertiary-pressed': '#203b61', // Primary/700
      'tertiary-focused': '#203b61', // Primary/700
      'tertiary-disabled': '#a0a0a0', // Neutral/300
      danger: '#ffffff',             // Neutral/White
      'danger-hover': '#ffffff',     // Neutral/White
      'danger-pressed': '#ffffff',   // Neutral/White
      'danger-focused': '#ffffff',   // Neutral/White
      'danger-disabled': '#818181',  // Neutral/400
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
    'body.lg': { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '18px', fontWeight: 400, lineHeight: '28px', letterSpacing: 0 },

    // Body weight variants
    'body.xsm-medium': { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '12px', fontWeight: 500, lineHeight: '16px', letterSpacing: 0 },
    'body.sm-medium': { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: '16px', letterSpacing: 0 },
    'body.md-medium': { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '16px', fontWeight: 500, lineHeight: '24px', letterSpacing: 0 },
    'body.lg-medium': { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '18px', fontWeight: 500, lineHeight: '28px', letterSpacing: 0 },

    'body.xsm-semibold': { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '12px', fontWeight: 600, lineHeight: '16px', letterSpacing: 0 },
    'body.sm-semibold': { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '14px', fontWeight: 600, lineHeight: '16px', letterSpacing: 0 },
    'body.md-semibold': { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '16px', fontWeight: 600, lineHeight: '24px', letterSpacing: 0 },
    'body.lg-semibold': { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '18px', fontWeight: 600, lineHeight: '28px', letterSpacing: 0 },

    'body.xsm-bold': { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '12px', fontWeight: 700, lineHeight: '16px', letterSpacing: 0 },
    'body.sm-bold': { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '14px', fontWeight: 700, lineHeight: '16px', letterSpacing: 0 },
    'body.md-bold': { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '16px', fontWeight: 700, lineHeight: '24px', letterSpacing: 0 },
    'body.lg-bold': { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '18px', fontWeight: 700, lineHeight: '28px', letterSpacing: 0 },

  },
  /** Border radius (Border Radius: none, sm, md, lg → Scale/0, 50, 100, 200) */
  radius: {
    none: 0,
    sm: 2,
    md: 4,
    lg: 8,
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
