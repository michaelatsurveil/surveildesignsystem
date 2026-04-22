import { Button } from '../Button/Button';
import { Tag } from '../Tag/Tag';
import type { TagVariant } from '../Tag/Tag';
import './Card.css';

export type CardStatusVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

const STATUS_TO_TAG: Record<CardStatusVariant, TagVariant> = {
  default:  'default',
  success:  'success',
  error:    'critical',
  warning:  'attention',
  info:     'info',
};

export interface CardProps {
  /** Card title / header text */
  title: string;
  /** Optional icon shown to the left of the title (in a 40x40 block) */
  icon?: React.ReactNode;
  /** Optional status badge below the title */
  status?: string;
  /** Status badge variant for color */
  statusVariant?: CardStatusVariant;
  /** Main body content */
  children: React.ReactNode;
  /** Primary footer button (left) */
  primaryAction?: { label: string; onClick?: () => void };
  /** Secondary footer button (right) */
  secondaryAction?: { label: string; onClick?: () => void };
  /** Optional click handler - when set, card is interactive */
  onClick?: () => void;
  /** Optional additional class name for the root element */
  className?: string;
}

export function Card({
  title,
  icon,
  status,
  statusVariant = 'default',
  children,
  primaryAction,
  secondaryAction,
  onClick,
  className = '',
}: CardProps) {
  const isInteractive = typeof onClick === 'function';
  const hasFooterActions = primaryAction || secondaryAction;

  return (
    <article
      className={`card ${isInteractive ? 'card--interactive' : ''} ${className}`.trim()}
      onClick={isInteractive ? onClick : undefined}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={
        isInteractive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
    >
      <header className="card__header">
        <div className="card__header-row">
          {icon && (
            <span className="card__icon" aria-hidden>
              {icon}
            </span>
          )}
          <div className="card__header-text">
            <h6 className="card__title">{title}</h6>
            {status && (
              <Tag variant={STATUS_TO_TAG[statusVariant]} size="sm">{status}</Tag>
            )}
          </div>
        </div>
      </header>
      <div className="card__body">{children}</div>
      {hasFooterActions && (
        <footer className="card__footer">
          {primaryAction && (
            <Button
              size="md"
              onClick={(e) => {
                e.stopPropagation();
                primaryAction.onClick?.();
              }}
            >
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              variant="secondary"
              size="md"
              onClick={(e) => {
                e.stopPropagation();
                secondaryAction.onClick?.();
              }}
            >
              {secondaryAction.label}
            </Button>
          )}
        </footer>
      )}
    </article>
  );
}
