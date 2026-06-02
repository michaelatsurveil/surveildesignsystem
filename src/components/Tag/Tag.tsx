import { X } from 'lucide-react';
import './Tag.css';

export type TagSize = 'default' | 'large';

export interface TagProps {
  /** Size variant — default (12px text, 8px icon) or large (14px text, 12px icon) */
  size?: TagSize;
  /** Optional leading icon */
  icon?: React.ReactNode;
  /** Called when the remove (×) button is clicked; omit to hide the button */
  onRemove?: () => void;
  /** Called when the tag itself is clicked (applies clickable styling) */
  onClick?: () => void;
  /** Tag label */
  children: React.ReactNode;
  /** Optional additional class name */
  className?: string;
}

export function Tag({
  size = 'default',
  icon,
  onRemove,
  onClick,
  children,
  className = '',
}: TagProps) {
  const isClickable = onClick != null;

  return (
    <span
      className={[
        'tag',
        `tag--${size}`,
        isClickable ? 'tag--clickable' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={onClick}
      onKeyDown={isClickable ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); } : undefined}
    >
      {icon != null && (
        <span className="tag__icon" aria-hidden>
          {icon}
        </span>
      )}
      <span className="tag__label">{children}</span>
      {onRemove != null && (
        <button
          type="button"
          className="tag__remove"
          aria-label="Remove"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <X />
        </button>
      )}
    </span>
  );
}
