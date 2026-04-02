/**
 * Surveil logo component
 * SVGs sourced directly from Figma Component Library (Brand page, nodes 233:928, 233:929 & 826:11662)
 *
 * variant="light"  — dark blue wordmark, for use on light/white backgrounds
 * variant="dark"   — white wordmark, for use on dark/navy backgrounds
 * variant="symbol" — icon-only mark (square), for use as favicon/avatar/app icon
 *
 * Figma: https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=233-866
 */

import logoOnLightUrl from './logo-on-light.svg?url';
import logoOnDarkUrl from './logo-on-dark.svg?url';
import logoSymbolUrl from './logo-symbol.svg?url';

export type LogoVariant = 'light' | 'dark' | 'symbol';

export interface LogoProps {
  /** "light" = dark blue logo for light backgrounds. "dark" = white logo for dark backgrounds. "symbol" = icon-only mark. */
  variant?: LogoVariant;
  /** Logo height in pixels; width scales proportionally */
  height?: number;
  /** Additional class name */
  className?: string;
}

const WORDMARK_ASPECT_RATIO = 544 / 128; // from cropped Figma SVG viewBox

export function Logo({ variant = 'light', height = 32, className = '' }: LogoProps) {
  const isSymbol = variant === 'symbol';
  const src =
    variant === 'dark' ? logoOnDarkUrl : isSymbol ? logoSymbolUrl : logoOnLightUrl;
  const width = isSymbol ? height : Math.round(height * WORDMARK_ASPECT_RATIO);

  return (
    <img
      src={src}
      width={width}
      height={height}
      alt="Surveil"
      className={className}
      style={{ display: 'block' }}
      draggable={false}
    />
  );
}
