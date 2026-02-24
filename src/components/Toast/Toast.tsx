import { Info, X } from 'lucide-react';
import './Toast.css';

export type ToastVariant = 'default' | 'success' | 'info' | 'warning' | 'error';

export interface ToastProps {
  /** Toast variant */
  variant?: ToastVariant;
  /** Toast message */
  message: string;
  /** Show leading icon */
  showIcon?: boolean;
  /** Callback when close is clicked */
  onClose?: () => void;
}

export function Toast({
  variant = 'default',
  message,
  showIcon = true,
  onClose,
}: ToastProps) {
  const Icon = showIcon ? Info : null;

  return (
    <div
      className={`toast toast--${variant}`}
      role="alert"
      aria-live="polite"
    >
      {showIcon && Icon && (
        <span className="toast__icon" aria-hidden>
          <Icon size={20} strokeWidth={2} color="currentColor" />
        </span>
      )}
      <span className="toast__content">{message}</span>
      {onClose && (
        <button
          type="button"
          className="toast__action"
          onClick={onClose}
          aria-label="Dismiss"
        >
          <X size={18} strokeWidth={2} />
        </button>
      )}
    </div>
  );
}
