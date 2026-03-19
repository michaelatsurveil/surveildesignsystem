/**
 * Surveil logo component
 * SVGs sourced directly from Figma Component Library (Brand page, nodes 233:928 & 233:929)
 *
 * variant="light" — dark blue wordmark, for use on light/white backgrounds
 * variant="dark"  — white wordmark, for use on dark/navy backgrounds
 *
 * Figma: https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=233-866
 */

import logoOnLightUrl from './logo-on-light.svg?url';
import logoOnDarkUrl from './logo-on-dark.svg?url';

export type LogoVariant = 'light' | 'dark';

export interface LogoProps {
  /** "light" = dark blue logo for light backgrounds. "dark" = white logo for dark backgrounds. */
  variant?: LogoVariant;
  /** Logo height in pixels; width scales proportionally (aspect ratio 544:128 ≈ 4.25:1) */
  height?: number;
  /** Additional class name */
  className?: string;
}

const ASPECT_RATIO = 544 / 128; // from cropped Figma SVG viewBox

export function Logo({ variant = 'light', height = 32, className = '' }: LogoProps) {
  const src = variant === 'light' ? logoOnLightUrl : logoOnDarkUrl;
  const width = Math.round(height * ASPECT_RATIO);

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
