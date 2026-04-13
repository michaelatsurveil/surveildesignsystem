import { Info, X, ExternalLink } from 'lucide-react';
import './Alert.css';

export type AlertVariant = 'default' | 'success' | 'info' | 'warning' | 'error';

export interface AlertProps {
  /** Alert variant */
  variant?: AlertVariant;
  /** Alert message */
  message: string;
  /** Optional action link - { label, href?, onClick? } */
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  /** Show leading icon */
  showIcon?: boolean;
  /** Callback when close is clicked */
  onClose?: () => void;
}

export function Alert({
  variant = 'default',
  message,
  action,
  showIcon = true,
  onClose,
}: AlertProps) {
  return (
    <div
      className={`alert alert--${variant}`}
      role="alert"
      aria-live="polite"
    >
      {showIcon && (
        <span className="alert__icon" aria-hidden>
          <Info size={20} strokeWidth={2} color="currentColor" />
        </span>
      )}
      <span className="alert__content">{message}</span>
      {action && (
        action.href ? (
          <a
            href={action.href}
            className="alert__action"
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.preventDefault()}
          >
            {action.label}
            <ExternalLink size={14} strokeWidth={2} />
          </a>
        ) : (
          <button
            type="button"
            className="alert__action"
            onClick={action.onClick}
          >
            {action.label}
          </button>
        )
      )}
      {onClose && (
        <button
          type="button"
          className="alert__close"
          onClick={onClose}
          aria-label="Dismiss"
        >
          <X size={18} strokeWidth={2} />
        </button>
      )}
    </div>
  );
}
