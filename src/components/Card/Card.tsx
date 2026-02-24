import { Button } from '../Button/Button';
import './Card.css';

export type CardStatusVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

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
  /** Optional footer labels/tags (rendered as pills when no actions) */
  labels?: React.ReactNode[];
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
  labels,
  onClick,
  className = '',
}: CardProps) {
  const isInteractive = typeof onClick === 'function';
  const hasFooterActions = primaryAction || secondaryAction;
  const hasFooterLabels = labels && labels.length > 0;

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
          <h3 className="card__title">{title}</h3>
        </div>
        {status && (
          <span className={`card__status card__status--${statusVariant}`}>{status}</span>
        )}
      </header>
      <div className="card__body">{children}</div>
      {(hasFooterActions || hasFooterLabels) && (
        <footer className="card__footer">
          {hasFooterActions && (
            <>
              {primaryAction && (
                <Button
                  size="sm"
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
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    secondaryAction.onClick?.();
                  }}
                >
                  {secondaryAction.label}
                </Button>
              )}
            </>
          )}
          {hasFooterLabels && !hasFooterActions &&
            labels!.map((label, i) => (
              <span key={i} className="card__label">
                {label}
              </span>
            ))}
        </footer>
      )}
    </article>
  );
}
