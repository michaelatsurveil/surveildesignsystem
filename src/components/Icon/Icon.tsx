import type { LucideIcon } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import type { IconName } from 'lucide-react/dynamic';
import { tokens } from '../../design-tokens';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type IconColor =
  | 'default'
  | 'muted'
  | 'primary'
  | 'success'
  | 'error'
  | 'warning'
  | 'inherit';

export interface IconProps {
  /** Lucide icon component */
  icon: LucideIcon;
  /** Icon size */
  size?: IconSize;
  /** Icon color variant */
  color?: IconColor;
  /** Override stroke width (default: 2) */
  strokeWidth?: number;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Accessibility: pass when icon is decorative */
  'aria-hidden'?: boolean;
  /** Accessibility: pass when icon conveys meaning */
  'aria-label'?: string;
}

const sizeMap: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

const colorMap: Record<IconColor, string> = {
  default: tokens.color.icon.default,
  muted: tokens.color.icon.muted,
  primary: tokens.color.icon.primary,
  success: tokens.color.icon.success,
  error: tokens.color.icon.error,
  warning: tokens.color.icon.warning,
  inherit: 'currentColor',
};

export function Icon({
  icon: IconComponent,
  size = 'md',
  color = 'default',
  strokeWidth = 2,
  className = '',
  style,
  'aria-hidden': ariaHidden,
  'aria-label': ariaLabel,
  ...props
}: IconProps & Omit<React.SVGAttributes<SVGSVGElement>, 'color'>) {
  const pixelSize = sizeMap[size];
  const iconColor = colorMap[color];

  return (
    <IconComponent
      size={pixelSize}
      strokeWidth={strokeWidth}
      color={iconColor}
      className={className}
      style={style}
      aria-hidden={ariaHidden ?? (ariaLabel ? undefined : true)}
      aria-label={ariaLabel}
      {...props}
    />
  );
}

/** Icon names available for IconByName - from Lucide */
export { iconNames } from 'lucide-react/dynamic';
export type { IconName } from 'lucide-react/dynamic';

export interface IconByNameProps
  extends Omit<React.ComponentProps<typeof DynamicIcon>, 'name'> {
  /** Icon name (kebab-case, e.g. 'home', 'chevron-right') */
  name: IconName;
  size?: IconSize;
  color?: IconColor;
}

/** Render an icon by name - useful for dynamic icon loading and icon browsers */
export function IconByName({
  name,
  size = 'md',
  color = 'default',
  strokeWidth = 2,
  ...props
}: IconByNameProps) {
  const pixelSize = sizeMap[size];
  const iconColor = colorMap[color];

  return (
    <DynamicIcon
      name={name}
      size={pixelSize}
      strokeWidth={strokeWidth}
      color={iconColor}
      {...props}
    />
  );
}
