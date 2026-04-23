import './Tag.css';

export type TagVariant =
  | 'default'
  | 'info'
  | 'success'
  | 'critical'
  | 'attention'
  | 'warning';

export type TagSize = 'circle' | 'sm' | 'lg';

export interface TagProps {
  /** Semantic variant (default, info, success, critical, attention, warning) */
  variant?: TagVariant;
  /** Shape/size: circle (18×18 numeric), sm (full rounded default), lg (full rounded large) */
  size?: TagSize;
  /** Tag content (number or text) */
  children: React.ReactNode;
  /** Optional additional class name */
  className?: string;
}

export function Tag({
  variant = 'default',
  size = 'sm',
  children,
  className = '',
}: TagProps) {
  return (
    <span
      className={`tag tag--${variant} tag--${size} ${className}`.trim()}
      role="status"
    >
      {children}
    </span>
  );
}
