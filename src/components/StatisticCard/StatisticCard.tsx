/**
 * StatisticCard — Figma Component Library node 87:409
 * https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=90-682
 *
 * Three variants:
 *  - default   : large value + stat comparison + action bar
 *  - stacked   : list of metric rows (label / bold-value + tag) + action bar
 *  - progress  : linear progress bar + action bar
 */

import { ArrowDown, ArrowUp, ArrowRight, ChevronDown, Minus } from 'lucide-react';
import { Badge } from '../Badge/Badge';
import type { BadgeVariant } from '../Badge/Badge';
import { Button } from '../Button/Button';
import './StatisticCard.css';

export type StatisticTrend = 'up' | 'down' | 'neutral';

export interface StatisticMetricItem {
  /** Small label shown above the metric value */
  label: string;
  /** Bold metric value */
  value: string;
  /** Optional tag badge (e.g. { label: 'Success', variant: 'success' }) */
  tag?: { label: string; variant?: BadgeVariant };
}

export interface StatisticCardProps {
  /** Card layout variant — default | stacked | progress */
  variant?: 'default' | 'stacked' | 'progress';

  /** Title shown in the header */
  title: string;
  /** Optional icon to the left of the title */
  icon?: React.ReactNode;
  /** Optional badge pill next to the title (e.g. "Default") */
  badge?: string;

  /**
   * [default variant] Dropdown trigger in the header right slot.
   * Renders a "Label ↓" bordered button.
   */
  headerDropdown?: { label: string; onClick?: () => void };

  /** [default variant] Primary statistic value (e.g. "£00,000.00") */
  value?: string;
  /** [default variant] Stat comparison — trend icon + colored text */
  comparison?: { trend: StatisticTrend; text: string };
  /** [default variant] Grey context text beside comparison (e.g. "vs time period") */
  comparisonContext?: string;

  /** [stacked variant] Metric rows displayed in the card body */
  metrics?: StatisticMetricItem[];

  /** [progress variant] Progress configuration */
  progress?: {
    /** 0–100 percentage */
    value: number;
    /** Override the displayed label (defaults to "{value}%") */
    label?: string;
    /** Bar colour — success (green) | warning | error; default = success */
    status?: 'success' | 'warning' | 'error';
  };

  /** Action bar: supporting text (left) */
  supportingText?: string;
  /** Action bar: CTA link label (right, e.g. "CTA") */
  ctaLabel?: string;
  /** Action bar: CTA click handler */
  ctaOnClick?: () => void;

  // ── Legacy props kept for backwards compatibility ──────────────────────────
  /** @deprecated Use ctaLabel + ctaOnClick instead */
  primaryAction?: { label: string; onClick?: () => void };
  /** @deprecated Use ctaLabel + ctaOnClick instead */
  secondaryAction?: { label: string; onClick?: () => void };
  /** @deprecated Moved to metrics tags */
  labels?: React.ReactNode[];
}

export function StatisticCard({
  variant = 'default',
  title,
  icon,
  badge,
  headerDropdown,
  value,
  comparison,
  comparisonContext,
  metrics,
  progress,
  supportingText,
  ctaLabel,
  ctaOnClick,
  primaryAction,
  secondaryAction,
  labels,
}: StatisticCardProps) {
  const hasActionBar = supportingText != null || ctaLabel != null;
  const hasLegacyFooter =
    !hasActionBar &&
    ((labels != null && labels.length > 0) || primaryAction != null || secondaryAction != null);

  return (
    <article className={`statistic-card statistic-card--${variant}`}>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="statistic-card__header">
        <div className="statistic-card__header-left">
          {icon && <span className="statistic-card__icon" aria-hidden>{icon}</span>}
          <h3 className="statistic-card__title">{title}</h3>
          {badge != null && badge !== '' && (
            <span className="statistic-card__badge">{badge}</span>
          )}
        </div>
        {headerDropdown && (
          <button
            type="button"
            className="statistic-card__dropdown-trigger"
            onClick={headerDropdown.onClick}
          >
            <span>{headerDropdown.label}</span>
            <ChevronDown size={14} strokeWidth={2} aria-hidden />
          </button>
        )}
      </header>

      {/* ── Progress bar (progress variant — sits at card level) ────────────── */}
      {variant === 'progress' && progress != null && (
        <div className="statistic-card__progress-wrap">
          <div
            className={`statistic-card__progress-track statistic-card__progress-track--${progress.status ?? 'success'}`}
            role="progressbar"
            aria-valuenow={progress.value}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="statistic-card__progress-fill"
              style={{ width: `${Math.min(100, Math.max(0, progress.value))}%` }}
            />
          </div>
          <span className="statistic-card__progress-label">
            {progress.label ?? `${progress.value}%`}
          </span>
          {comparison != null && (
            <span
              className={`statistic-card__comparison statistic-card__comparison--${comparison.trend}`}
            >
              {comparison.trend === 'up' && <ArrowUp size={14} strokeWidth={2} aria-hidden />}
              {comparison.trend === 'down' && <ArrowDown size={14} strokeWidth={2} aria-hidden />}
              {comparison.trend === 'neutral' && <Minus size={14} strokeWidth={2} aria-hidden />}
              <span>{comparison.text}</span>
            </span>
          )}
        </div>
      )}

      {/* ── Body ────────────────────────────────────────────────────────────── */}
      {(variant === 'default' || variant === 'stacked' || hasActionBar || hasLegacyFooter) && (
        <div className="statistic-card__body">

          {/* Default: large value + comparison */}
          {variant === 'default' && value != null && (
            <div className="statistic-card__statistic">
              <span className="statistic-card__value">{value}</span>
              {comparison != null && (
                <div className="statistic-card__comparison-row">
                  <span
                    className={`statistic-card__comparison statistic-card__comparison--${comparison.trend}`}
                  >
                    {comparison.trend === 'up' && <ArrowUp size={14} strokeWidth={2} aria-hidden />}
                    {comparison.trend === 'down' && <ArrowDown size={14} strokeWidth={2} aria-hidden />}
                    {comparison.trend === 'neutral' && <Minus size={14} strokeWidth={2} aria-hidden />}
                    <span>{comparison.text}</span>
                  </span>
                  {comparisonContext != null && (
                    <span className="statistic-card__comparison-context">{comparisonContext}</span>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Stacked: metric rows */}
          {variant === 'stacked' && metrics != null && metrics.length > 0 && (
            <div className="statistic-card__metrics">
              {metrics.map((m, i) => (
                <div key={i} className="statistic-card__metric-stat">
                  <span className="statistic-card__metric-label">{m.label}</span>
                  <div className="statistic-card__metric-row">
                    <span className="statistic-card__metric-value">{m.value}</span>
                    {m.tag != null && (
                      <Badge variant={m.tag.variant ?? 'success'} size="sm">
                        {m.tag.label}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Action bar: supporting text + CTA link */}
          {hasActionBar && (
            <div className="statistic-card__action-bar">
              {supportingText != null && (
                <p className="statistic-card__supporting">{supportingText}</p>
              )}
              {ctaLabel != null && (
                <button
                  type="button"
                  className="statistic-card__cta"
                  onClick={ctaOnClick}
                >
                  <span>{ctaLabel}</span>
                  <ArrowRight size={12} strokeWidth={2.5} aria-hidden />
                </button>
              )}
            </div>
          )}

          {/* Legacy footer: labels + primary/secondary buttons */}
          {hasLegacyFooter && (
            <footer className="statistic-card__footer">
              {labels != null && labels.length > 0 && (
                <div className="statistic-card__labels">
                  {labels.map((label, i) => (
                    <span key={i} className="statistic-card__label">{label}</span>
                  ))}
                </div>
              )}
              {(primaryAction != null || secondaryAction != null) && (
                <div className="statistic-card__actions">
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
            </footer>
          )}

        </div>
      )}
    </article>
  );
}
