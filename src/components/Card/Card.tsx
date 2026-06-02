/**
 * Card component — Figma Component Library node 2283:10045
 * https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=320-5290
 *
 * Two variants:
 *  default  — icon + (title / tag stacked) + body text + footer buttons
 *  list     — compact row: icon + (title [tag] row) + chevron; supporting text
 *             indented to align with title, not icon
 */

import { ChevronRight } from 'lucide-react';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';
import type { BadgeVariant } from '../Badge/Badge';
import './Card.css';

export type CardStatusVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

const STATUS_TO_TAG: Record<CardStatusVariant, BadgeVariant> = {
  default:  'default',
  success:  'success',
  error:    'critical',
  warning:  'attention',
  info:     'info',
};

export interface CardProps {
  /**
   * Layout variant.
   * - `default` — stacked card with body text and optional footer buttons
   * - `list`    — compact single-row item: title+tag inline, chevron on right,
   *               children rendered as supporting sub-text aligned with the title
   */
  variant?: 'default' | 'list';

  /** Card title */
  title: string;
  /** Optional icon shown in a 48×48 rounded container to the left of the title */
  icon?: React.ReactNode;
  /** Optional status badge label (e.g. "Success") */
  status?: string;
  /** Status badge colour variant */
  statusVariant?: CardStatusVariant;

  /**
   * Body content.
   * - In the `default` variant: main body text shown below the header.
   * - In the `list` variant: supporting sub-text shown below the title row,
   *   indented to align horizontally with the title.
   */
  children?: React.ReactNode;

  /** Primary footer button — right slot (default) or left slot when footerAlign='left' */
  primaryAction?: { label: string; onClick?: () => void };
  /** Secondary footer button */
  secondaryAction?: { label: string; onClick?: () => void };
  /**
   * Footer button alignment.
   * - `right` (default) — buttons aligned to the right
   * - `left`            — buttons aligned to the left
   */
  footerAlign?: 'left' | 'right';

  /** When set the card is interactive (hover/focus styles + keyboard support) */
  onClick?: () => void;
  /** Additional class name */
  className?: string;
}

export function Card({
  variant = 'default',
  title,
  icon,
  status,
  statusVariant = 'default',
  children,
  primaryAction,
  secondaryAction,
  footerAlign = 'right',
  onClick,
  className = '',
}: CardProps) {
  const isInteractive = typeof onClick === 'function';
  const hasFooterActions = primaryAction != null || secondaryAction != null;

  const rootClass = [
    'card',
    `card--${variant}`,
    isInteractive && 'card--interactive',
    className,
  ].filter(Boolean).join(' ');

  const interactiveProps = isInteractive
    ? {
        onClick,
        role: 'button' as const,
        tabIndex: 0,
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        },
      }
    : {};

  // ── List variant ────────────────────────────────────────────────────────────
  if (variant === 'list') {
    return (
      <article className={rootClass} {...interactiveProps}>
        <div className="card__list-row">
          {icon && (
            <span className="card__icon" aria-hidden>
              {icon}
            </span>
          )}
          <div className="card__list-content">
            {/* Title + tag on the same horizontal line */}
            <div className="card__list-heading">
              <h6 className="card__title">{title}</h6>
              {status != null && status !== '' && (
                <Badge variant={STATUS_TO_TAG[statusVariant]} size="sm">
                  {status}
                </Badge>
              )}
            </div>
            {/* Supporting sub-text aligned with title (indented past icon) */}
            {children != null && (
              <p className="card__list-subtext">{children}</p>
            )}
          </div>
          <ChevronRight
            size={20}
            strokeWidth={2}
            className="card__list-chevron"
            aria-hidden
          />
        </div>
      </article>
    );
  }

  // ── Default variant ─────────────────────────────────────────────────────────
  return (
    <article className={rootClass} {...interactiveProps}>
      <header className="card__header">
        <div className="card__header-row">
          {icon && (
            <span className="card__icon" aria-hidden>
              {icon}
            </span>
          )}
          <div className="card__header-text">
            <h6 className="card__title">{title}</h6>
            {status != null && status !== '' && (
              <Badge variant={STATUS_TO_TAG[statusVariant]} size="sm">{status}</Badge>
            )}
          </div>
        </div>
      </header>

      {children != null && (
        <div className="card__body">{children}</div>
      )}

      {hasFooterActions && (
        <footer className={`card__footer card__footer--${footerAlign}`}>
          {secondaryAction != null && (
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
          {primaryAction != null && (
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
        </footer>
      )}
    </article>
  );
}
