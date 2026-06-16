import { forwardRef, type ButtonHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';
import './IconButton.css';

export type IconButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'link';
export type IconButtonSize = 'sm' | 'md' | 'lg';

const ICON_SIZES: Record<IconButtonSize, number> = { sm: 12, md: 16, lg: 18 };

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  'aria-label': string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { variant = 'primary', size = 'md', icon: Icon, className = '', ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      className={`icon-btn icon-btn--${variant} icon-btn--${size} ${className}`.trim()}
      {...props}
    >
      <Icon size={ICON_SIZES[size]} strokeWidth={2} aria-hidden />
    </button>
  );
});
