/**
 * Toast component
 * https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=176-590
 *
 * Sizes:    sm (default) | lg
 * Variants: default | success | info | warning | danger | error (alias for danger)
 * Shadow:   shadow prop adds Figma $Shadow-md drop shadow
 */

import { Info, CheckCircle, AlertTriangle, AlertCircle, X } from 'lucide-react';
import './Toast.css';

export type ToastVariant = 'default' | 'success' | 'info' | 'warning' | 'danger' | 'error';
export type ToastSize = 'sm' | 'lg';

export interface ToastProps {
  /** Toast variant */
  variant?: ToastVariant;
  /** Toast size — sm matches Figma Small (14px), lg matches Figma Large (16px) */
  size?: ToastSize;
  /** Add Figma drop shadow ($Shadow-md) */
  shadow?: boolean;
  /** Toast message */
  message: string;
  /** Show leading icon */
  showIcon?: boolean;
  /** Callback when close is clicked */
  onClose?: () => void;
}

const VARIANT_ICONS: Record<ToastVariant, typeof Info> = {
  default:  Info,
  success:  CheckCircle,
  info:     Info,
  warning:  AlertTriangle,
  danger:   AlertCircle,
  error:    AlertCircle,
};

export function Toast({
  variant = 'default',
  size = 'sm',
  shadow = false,
  message,
  showIcon = true,
  onClose,
}: ToastProps) {
  const Icon = VARIANT_ICONS[variant];
  const iconPx  = size === 'lg' ? 20 : 16;
  const closePx = size === 'lg' ? 18 : 16;

  const classes = [
    'toast',
    `toast--${variant}`,
    size === 'lg' && 'toast--lg',
    shadow        && 'toast--shadow',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role="alert" aria-live="polite">
      {showIcon && (
        <span className="toast__icon" aria-hidden>
          <Icon size={iconPx} strokeWidth={2} color="currentColor" />
        </span>
      )}
      <span className="toast__content">{message}</span>
      {onClose && (
        <button
          type="button"
          className="toast__close"
          onClick={onClose}
          aria-label="Dismiss"
        >
          <X size={closePx} strokeWidth={2} />
        </button>
      )}
    </div>
  );
}
