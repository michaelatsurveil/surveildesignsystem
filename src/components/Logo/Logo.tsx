/**
 * Surveil logo component
 * Light and dark variants for use on different backgrounds
 * Matches Figma: https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=233-866
 */

import { useId } from 'react';

export type LogoVariant = 'light' | 'dark';

export interface LogoProps {
  /** Logo variant: light (for light backgrounds) or dark (for dark backgrounds) */
  variant?: LogoVariant;
  /** Logo height in pixels */
  height?: number;
  /** Additional class name */
  className?: string;
}

const colors = {
  light: {
    text: '#3165ad',
    dot: '#e61c1d',
    icon: '#e61c1d',
  },
  dark: {
    text: '#ffffff',
    dot: '#e61c1d',
    icon: '#e61c1d',
  },
};

export function Logo({ variant = 'light', height = 32, className = '' }: LogoProps) {
  const c = colors[variant];
  const iconSize = height;
  const maskId = `logo-ring-${useId().replace(/:/g, '')}`;

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: Math.round(height * 0.35),
        height,
      }}
    >
      {/* Concentric circles - red strokes; dark variant has white fill between circles */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <mask id={maskId}>
            <circle cx="16" cy="16" r="15" fill="white" />
            <circle cx="16" cy="16" r="9" fill="black" />
          </mask>
        </defs>
        <circle
          cx="16"
          cy="16"
          r="15"
          stroke={c.icon}
          strokeWidth="2"
          fill="none"
        />
        <circle
          cx="16"
          cy="16"
          r="9"
          stroke={c.icon}
          strokeWidth="1.25"
          fill="none"
        />
        {variant === 'dark' && (
          <circle
            cx="16"
            cy="16"
            r="15"
            fill="white"
            mask={`url(#${maskId})`}
          />
        )}
      </svg>
      <span
        style={{
          fontFamily: 'Roboto, system-ui, sans-serif',
          fontWeight: 700,
          fontSize: Math.round(height * 0.7),
          lineHeight: 1,
          color: c.text,
          letterSpacing: '-0.02em',
        }}
      >
        Surve<span style={{ color: c.dot }}>i</span>l
      </span>
    </div>
  );
}
