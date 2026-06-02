import { ArrowLeft, Columns3 } from 'lucide-react';
import { Button } from '../Button/Button';
import './GlobalCommandBar.css';

export interface GlobalCommandBarAction {
  label: string;
  onClick?: () => void;
}

export interface GlobalCommandBarProps {
  /** Page / screen title — always shown */
  title: string;
  /** When provided, renders a back (←) button on the far left */
  onBack?: () => void;
  /** Primary action button (right side) */
  primaryAction?: GlobalCommandBarAction;
  /** Secondary action button (right side, shown before primary) */
  secondaryAction?: GlobalCommandBarAction;
  /** When provided, renders the table-editor icon button on the far right */
  onTableEditor?: () => void;
  /** Additional class name */
  className?: string;
}

export function GlobalCommandBar({
  title,
  onBack,
  primaryAction,
  secondaryAction,
  onTableEditor,
  className = '',
}: GlobalCommandBarProps) {
  const hasRightContent = primaryAction != null || secondaryAction != null || onTableEditor != null;

  return (
    <div className={`gcb ${className}`.trim()} role="banner">
      {/* Left: optional back + title */}
      <div className="gcb__left">
        {onBack != null && (
          <button
            type="button"
            className="gcb__back"
            onClick={onBack}
            aria-label="Go back"
          >
            <ArrowLeft size={16} strokeWidth={2} aria-hidden />
          </button>
        )}
        <h1 className="gcb__title">{title}</h1>
      </div>

      {/* Right: action buttons + table editor */}
      {hasRightContent && (
        <div className="gcb__right">
          {secondaryAction != null && (
            <Button variant="secondary" size="sm" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
          {primaryAction != null && (
            <Button variant="primary" size="sm" onClick={primaryAction.onClick}>
              {primaryAction.label}
            </Button>
          )}
          {onTableEditor != null && (
            <button
              type="button"
              className="gcb__table-editor"
              onClick={onTableEditor}
              aria-label="Table editor"
            >
              <Columns3 size={16} strokeWidth={2} aria-hidden />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
