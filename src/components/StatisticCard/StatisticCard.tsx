import { ChevronDown, ChevronUp, Minus } from 'lucide-react';
import { Button } from '../Button/Button';
import './StatisticCard.css';

export type StatisticTrend = 'up' | 'down' | 'neutral';

export interface StatisticCardProps {
  /** Title shown in the header */
  title: string;
  /** Optional icon (e.g. warning) to the left of the title */
  icon?: React.ReactNode;
  /** Optional badge/label on the right of the header (e.g. "Default") */
  badge?: string;
  /** Primary statistic value (e.g. "£00,000.00") */
  value: string;
  /** Optional comparison: trend and label */
  comparison?: {
    trend: StatisticTrend;
    text: string;
  };
  /** Optional supporting text below the value */
  supportingText?: string;
  /** Primary footer button (left) */
  primaryAction?: { label: string; onClick?: () => void };
  /** Secondary footer button (right) */
  secondaryAction?: { label: string; onClick?: () => void };
}

export function StatisticCard({
  title,
  icon,
  badge,
  value,
  comparison,
  supportingText,
  primaryAction,
  secondaryAction,
}: StatisticCardProps) {
  const hasFooterActions = primaryAction || secondaryAction;

  return (
    <article className="statistic-card">
      <header className="statistic-card__header">
        <div className="statistic-card__header-left">
          {icon && <span className="statistic-card__icon" aria-hidden>{icon}</span>}
          <h3 className="statistic-card__title">{title}</h3>
        </div>
        {badge && <span className="statistic-card__badge">{badge}</span>}
      </header>

      <div className="statistic-card__value-row">
        <span className="statistic-card__value">{value}</span>
        {comparison && (
          <span className={`statistic-card__comparison statistic-card__comparison--${comparison.trend}`}>
            {comparison.trend === 'up' && <ChevronUp size={16} strokeWidth={2} aria-hidden />}
            {comparison.trend === 'down' && <ChevronDown size={16} strokeWidth={2} aria-hidden />}
            {comparison.trend === 'neutral' && <Minus size={16} strokeWidth={2} aria-hidden />}
            <span>{comparison.text}</span>
          </span>
        )}
      </div>

      {supportingText && (
        <p className="statistic-card__supporting">{supportingText}</p>
      )}

      {hasFooterActions && (
        <footer className="statistic-card__footer">
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
        </footer>
      )}
    </article>
  );
}
