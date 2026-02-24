import './Tag.css';

export type TagVariant =
  | 'default'
  | 'info'
  | 'success'
  | 'critical'
  | 'attention'
  | 'warning';

export type TagSize = 'sm' | 'md';

export interface TagProps {
  /** Semantic variant (default, info, success, critical, attention, warning) */
  variant?: TagVariant;
  /** Size: sm (compact e.g. numeric), md (text) */
  size?: TagSize;
  /** Tag content (number or text) */
  children: React.ReactNode;
  /** Optional additional class name */
  className?: string;
}

export function Tag({
  variant = 'default',
  size = 'md',
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
