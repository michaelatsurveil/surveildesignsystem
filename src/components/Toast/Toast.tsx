/**
 * Toast component
 * https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=176-590
 *
 * Sizes:    sm (default) | lg
 * Variants: default | success | info | warning | danger | error (alias for danger)
 * Shadow:   shadow prop adds Figma $Shadow-md drop shadow
 * Options:  description, progressValue, buttons, buttonPosition
 */

import { Info, CheckCircle, AlertTriangle, AlertCircle, X } from 'lucide-react';
import { Button } from '../Button/Button';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import './Toast.css';

export type ToastVariant = 'default' | 'success' | 'info' | 'warning' | 'danger' | 'error';
export type ToastSize = 'sm' | 'lg';

export interface ToastButton {
  label: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export interface ToastProps {
  /** Toast variant */
  variant?: ToastVariant;
  /** Toast size — sm matches Figma Small (14px), lg matches Figma Large (16px) */
  size?: ToastSize;
  /** Add Figma drop shadow ($Shadow-md) */
  shadow?: boolean;
  /** Toast title */
  message: string;
  /** Optional description shown below the title */
  description?: string;
  /** Show linear progress bar (0–100) */
  progressValue?: number;
  /** Action buttons shown below the content */
  buttons?: ToastButton[];
  /** Alignment of the buttons row */
  buttonPosition?: 'left' | 'right';
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
  description,
  progressValue,
  buttons,
  buttonPosition = 'left',
  showIcon = true,
  onClose,
}: ToastProps) {
  const Icon = VARIANT_ICONS[variant];
  const iconPx  = size === 'lg' ? 20 : 16;
  const closePx = size === 'lg' ? 18 : 16;
  const btnSize = size === 'lg' ? 'md' : 'sm';

  const classes = [
    'toast',
    `toast--${variant}`,
    size === 'lg' && 'toast--lg',
    shadow        && 'toast--shadow',
  ]
    .filter(Boolean)
    .join(' ');

  const hasExtra = description || progressValue !== undefined || (buttons && buttons.length > 0);

  return (
    <div className={classes} role="alert" aria-live="polite">
      {showIcon && (
        <span className={`toast__icon${hasExtra ? ' toast__icon--top' : ''}`} aria-hidden>
          <Icon size={iconPx} strokeWidth={2} color="currentColor" />
        </span>
      )}
      <div className="toast__content">
        <span className="toast__title">{message}</span>
        {description && (
          <p className="toast__description">{description}</p>
        )}
        {progressValue !== undefined && (
          <div className="toast__progress">
            <ProgressBar type="linear" size={size} status="default" value={progressValue} />
          </div>
        )}
        {buttons && buttons.length > 0 && (
          <div className={`toast__actions toast__actions--${buttonPosition}`}>
            {buttons.map((btn, i) => (
              <Button
                key={i}
                variant={btn.variant ?? 'primary'}
                size={btnSize}
                onClick={btn.onClick}
              >
                {btn.label}
              </Button>
            ))}
          </div>
        )}
      </div>
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
