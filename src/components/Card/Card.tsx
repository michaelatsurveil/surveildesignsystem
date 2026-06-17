/**
 * Card component — Figma Component Library node 2283:10045
 * https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=320-5290
 *
 * Variants:
 *  default      — stacked tile: icon + title/badge header, body text, optional footer buttons
 *  list         — compact row (navigational): icon + title+badge + subtext, chevron right
 *  list-toggle  — compact row: same as list but with an icon toggle button instead of chevron
 *  list-action  — compact row: content left, secondary+primary action buttons right
 *  tile-toggle  — tile: icon+toggle top row, title+subtext, badge+timestamp footer
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
   * - `default`     — stacked tile: icon header, body text, optional footer buttons
   * - `list`        — compact row (navigational): title+badge inline, subtext, chevron
   * - `list-toggle` — compact row: same as list but with an icon toggle button instead of chevron
   * - `list-action` — compact row: content left, secondary+primary buttons right
   * - `tile-toggle` — tile: icon+toggle top row, title+subtext, badge+timestamp footer
   */
  variant?: 'default' | 'list' | 'list-toggle' | 'list-action' | 'tile-toggle';

  /** Card title */
  title: string;
  /** Icon shown in a 48×48 rounded container to the left of the title */
  icon?: React.ReactNode;
  /** Status badge label */
  status?: string;
  /** Status badge colour variant */
  statusVariant?: CardStatusVariant;

  /**
   * Body / supporting content.
   * - `default`     — main body text below header
   * - `list`        — supporting sub-text below title row, aligned with title
   * - `list-toggle` — same as list
   * - `list-action` — supporting sub-text below title row (truncated with ellipsis)
   * - `tile-toggle` — supporting sub-text below title (use "Text 1 · Text 2" pattern)
   */
  children?: React.ReactNode;

  /** Primary footer button (`default`, `list-action`) */
  primaryAction?: { label: string; onClick?: () => void };
  /** Secondary footer button (`default`, `list-action`) */
  secondaryAction?: { label: string; onClick?: () => void };
  /**
   * Footer button alignment — `default` variant only.
   * @default 'right'
   */
  footerAlign?: 'left' | 'right';

  /**
   * Icon rendered inside the toggle button slot.
   * Used by `list-toggle` (right-edge) and `tile-toggle` (top-right).
   */
  toggleIcon?: React.ReactNode;
  /** Called when the toggle button is clicked */
  onToggle?: () => void;

  /**
   * Timestamp string shown in the tile-toggle footer (e.g. "10m ago").
   * `tile-toggle` only.
   */
  timestamp?: string;

  /** When set the card is interactive (hover/focus styles + keyboard support) */
  onClick?: () => void;
  /**
   * Disables list-family variants — removes interactivity and applies the
   * disabled visual state (greyed background, muted text).
   */
  disabled?: boolean;
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
  toggleIcon,
  onToggle,
  timestamp,
  onClick,
  disabled = false,
  className = '',
}: CardProps) {
  const isInteractive = typeof onClick === 'function';
  const hasFooterActions = primaryAction != null || secondaryAction != null;

  const rootClass = [
    'card',
    `card--${variant}`,
    isInteractive && !disabled && 'card--interactive',
    disabled && 'card--disabled',
    className,
  ].filter(Boolean).join(' ');

  const interactiveProps = isInteractive && !disabled
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
    : disabled
      ? { 'aria-disabled': true as const }
      : {};

  // ── List variant (navigational) ──────────────────────────────────────────────
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
            <div className="card__list-heading">
              <h6 className="card__title">{title}</h6>
              {status != null && status !== '' && (
                <Badge variant={STATUS_TO_TAG[statusVariant]} size="sm">
                  {status}
                </Badge>
              )}
            </div>
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

  // ── List toggle ──────────────────────────────────────────────────────────────
  if (variant === 'list-toggle') {
    return (
      <article className={rootClass} {...interactiveProps}>
        <div className="card__list-row">
          {icon && (
            <span className="card__icon" aria-hidden>
              {icon}
            </span>
          )}
          <div className="card__list-content">
            <div className="card__list-heading">
              <h6 className="card__title">{title}</h6>
              {status != null && status !== '' && (
                <Badge variant={STATUS_TO_TAG[statusVariant]} size="sm">
                  {status}
                </Badge>
              )}
            </div>
            {children != null && (
              <p className="card__list-subtext">{children}</p>
            )}
          </div>
          {toggleIcon != null && (
            <button
              type="button"
              className="card__toggle-btn"
              onClick={(e) => {
                e.stopPropagation();
                onToggle?.();
              }}
              aria-label="Toggle"
            >
              {toggleIcon}
            </button>
          )}
        </div>
      </article>
    );
  }

  // ── List action ──────────────────────────────────────────────────────────────
  if (variant === 'list-action') {
    return (
      <article className={rootClass} {...interactiveProps}>
        <div className="card__action-row">
          <div className="card__action-content">
            {icon && (
              <span className="card__icon" aria-hidden>
                {icon}
              </span>
            )}
            <div className="card__action-text">
              <div className="card__list-heading">
                <h6 className="card__title">{title}</h6>
                {status != null && status !== '' && (
                  <Badge variant={STATUS_TO_TAG[statusVariant]} size="sm">
                    {status}
                  </Badge>
                )}
              </div>
              {children != null && (
                <p className="card__list-subtext">{children}</p>
              )}
            </div>
          </div>
          {hasFooterActions && (
            <div className="card__action-bar">
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
            </div>
          )}
        </div>
      </article>
    );
  }

  // ── Tile toggle ──────────────────────────────────────────────────────────────
  if (variant === 'tile-toggle') {
    return (
      <article className={rootClass} {...interactiveProps}>
        <div className="card__tile-toggle-header">
          <div className="card__tile-toggle-top">
            {icon && (
              <span className="card__icon" aria-hidden>
                {icon}
              </span>
            )}
            {toggleIcon != null && (
              <button
                type="button"
                className="card__toggle-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle?.();
                }}
                aria-label="Toggle"
              >
                {toggleIcon}
              </button>
            )}
          </div>
          <div className="card__tile-toggle-content">
            <h6 className="card__title">{title}</h6>
            {children != null && (
              <p className="card__tile-toggle-subtext">{children}</p>
            )}
          </div>
        </div>
        <div className="card__tile-toggle-footer">
          {status != null && status !== '' && (
            <Badge variant={STATUS_TO_TAG[statusVariant]} size="sm">
              {status}
            </Badge>
          )}
          {timestamp != null && timestamp !== '' && (
            <span className="card__timestamp">{timestamp}</span>
          )}
        </div>
      </article>
    );
  }

  // ── Default variant ──────────────────────────────────────────────────────────
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
