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

export interface ActionBarProps {
  /** Status text shown on the left (e.g. "1 item selected") */
  selectedLabel?: string;
  /** Actions shown as buttons on the right */
  actions: ActionBarAction[];
  /** Optional class name for the root element */
  className?: string;
}

/**
 * Contextual action bar that appears when one or more items are selected.
 * Uses Button components for actions. Figma: node 338-621
 */
export function ActionBar({
  selectedLabel,
  actions,
  className = '',
}: ActionBarProps) {
  const hasStatus = selectedLabel != null && selectedLabel.length > 0;

  return (
    <div
      className={`action-bar ${className}`.trim()}
      role="toolbar"
      aria-label={selectedLabel ?? 'Actions'}
    >
      {hasStatus && (
        <>
          <span className="action-bar__status">{selectedLabel}</span>
          <span className="action-bar__separator" aria-hidden />
        </>
      )}
      <div className="action-bar__actions">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant ?? 'secondary'}
            size="sm"
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
    </div>
  );
}
