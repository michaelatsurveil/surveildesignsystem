import { User } from 'lucide-react';
import './Avatar.css';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  /** Image URL for profile picture */
  src?: string;
  /** Alt text for image (required when src is provided) */
  alt?: string;
  /** Initials or short label when no image (e.g. "JP", "User") */
  initials?: string;
  /** Size variant */
  size?: AvatarSize;
  /** Optional additional class name */
  className?: string;
}

const sizeMap = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
} as const;

export function Avatar({
  src,
  alt,
  initials,
  size = 'md',
  className = '',
}: AvatarProps) {
  const sizePx = sizeMap[size];
  const hasImage = Boolean(src);
  const hasInitials = Boolean(initials?.trim());

  const content = hasImage ? (
    <img
      src={src}
      alt={alt ?? ''}
      className="avatar__img"
      width={sizePx}
      height={sizePx}
      loading="lazy"
      decoding="async"
    />
  ) : hasInitials ? (
    <span className="avatar__initials" aria-hidden>
      {(initials ?? '').trim()}
    </span>
  ) : (
    <span className="avatar__icon" aria-hidden>
      <User size={sizePx * 0.5} strokeWidth={2} />
    </span>
  );

  return (
    <span
      className={`avatar avatar--${size} ${className}`.trim()}
      role="img"
      aria-label={alt ?? (initials ? `Avatar for ${initials}` : 'User avatar')}
    >
      {content}
    </span>
  );
}
