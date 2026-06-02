import './Badge.css';

export type BadgeVariant =
  | 'default'
  | 'info'
  | 'success'
  | 'critical'
  | 'attention'
  | 'warning'
  | 'purple'
  | 'rose'
  | 'orange'
  | 'jade'
  | 'teal'
  | 'aqua';

export type BadgeSize = 'circle' | 'sm' | 'lg';

export interface BadgeProps {
  /** Semantic variant */
  variant?: BadgeVariant;
  /** Shape/size: circle (18×18 numeric), sm (full rounded default), lg (full rounded large) */
  size?: BadgeSize;
  /** Badge content (number or text) */
  children: React.ReactNode;
  /** Optional additional class name */
  className?: string;
}

export function Badge({
  variant = 'default',
  size = 'sm',
  children,
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`badge badge--${variant} badge--${size} ${className}`.trim()}
      role="status"
    >
      {children}
    </span>
  );
}
