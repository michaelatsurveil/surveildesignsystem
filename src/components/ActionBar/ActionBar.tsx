import { Button } from '../Button/Button';
import type { ButtonVariant } from '../Button/Button';
import './ActionBar.css';

export interface ActionBarAction {
  /** Button label */
  label: string;
  /** Optional icon (e.g. from lucide-react) shown before the label */
  icon?: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Button variant; default 'secondary'. Use 'primary' for the main action. */
  variant?: ButtonVariant;
}

export interface ActionBarSummary {
  /** Plain-text summary shown between the status and action buttons (no interaction) */
  label: string;
}

export interface ActionBarProps {
  /** Status text shown on the left (e.g. "1 item selected") */
  selectedLabel?: string;
  /**
   * Optional plain-text summary items displayed after the status label and
   * before the action buttons. Each item is separated by a vertical divider.
   * Use these for read-only contextual info (e.g. "Text Option 2").
   */
  summaries?: ActionBarSummary[];
  /** Actions shown as buttons on the right */
  actions: ActionBarAction[];
  /** Optional class name for the root element */
  className?: string;
}

/**
 * Contextual action bar that appears when one or more items are selected.
 * Supports optional plain-text summary items between the status and buttons.
 * Uses Button components for actions. Figma: node 338-621
 */
export function ActionBar({
  selectedLabel,
  summaries = [],
  actions,
  className = '',
}: ActionBarProps) {
  const hasStatus = selectedLabel != null && selectedLabel.length > 0;
  const hasSummaries = summaries.length > 0;
  const hasActions = actions.length > 0;

  return (
    <div
      className={`action-bar ${className}`.trim()}
      role="toolbar"
      aria-label={selectedLabel ?? 'Actions'}
    >
      {hasStatus && (
        <>
          <span className="action-bar__status">{selectedLabel}</span>
          {(hasSummaries || hasActions) && (
            <span className="action-bar__separator" aria-hidden />
          )}
        </>
      )}

      {summaries.map((summary, i) => (
        <span key={i} className="action-bar__summary-group">
          <span className="action-bar__summary">{summary.label}</span>
          {(i < summaries.length - 1 || hasActions) && (
            <span className="action-bar__separator" aria-hidden />
          )}
        </span>
      ))}

      {hasActions && (
        <div className="action-bar__actions">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant ?? 'secondary'}
              size="md"
              onClick={action.onClick}
              className="action-bar__btn"
            >
              {action.icon != null && (
                <span className="action-bar__btn-icon" aria-hidden>
                  {action.icon}
                </span>
              )}
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
