import { forwardRef, useState } from 'react';
import { Info, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import './Input.css';

/** Size: Numbers-TC/Inputs-TC (XS: 26, S: 30, M: 34, L: 38) */
export type InputSize = 'xs' | 's' | 'm' | 'l';

/** Validation/feedback state */
export type InputValidationState = 'default' | 'error' | 'success';

/** Interaction state (for styling) */
export type InputInteractionState = 'default' | 'hover' | 'focus' | 'disabled';

/** Message type below input */
export type InputMessageType = 'none' | 'helper' | 'error' | 'success';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  // ─── Label ─────────────────────────────────────────────────────────────
  /** Field label */
  label?: string;
  /** Show required indicator (*) */
  required?: boolean;
  /** Info tooltip (shows info icon next to label) */
  infoTooltip?: string;

  // ─── Slots ─────────────────────────────────────────────────────────────
  /** Left prefix (e.g. Search icon) */
  prefix?: React.ReactNode;
  /** Right suffix (e.g. ChevronDown, custom icon) */
  suffix?: React.ReactNode;

  // ─── Message ───────────────────────────────────────────────────────────
  /** Helper text (neutral, below input) */
  helperText?: string;
  /** Error message (sets error state) */
  error?: string;
  /** Success message (sets success state) */
  successMessage?: string;

  // ─── Variants ──────────────────────────────────────────────────────────
  /** Size: xs (26px), s (30px), m (34px), l (38px) */
  size?: InputSize;
  /** Show password visibility toggle when type="password" */
  showPasswordToggle?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    required,
    infoTooltip,
    prefix,
    suffix,
    helperText,
    error,
    successMessage,
    size = 'm',
    showPasswordToggle = true,
    type = 'text',
    disabled,
    className = '',
    id: propId,
    ...props
  },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);
  const [generatedId] = useState(() => `input-${Math.random().toString(36).slice(2, 9)}`);
  const id = propId ?? generatedId;

  const isPassword = type === 'password';
  const effectiveType = isPassword && showPassword ? 'text' : type;

  const validationState: InputValidationState = error ? 'error' : successMessage ? 'success' : 'default';

  const suffixContent =
    isPassword && showPasswordToggle ? (
      <button
        type="button"
        className="input__suffix-btn"
        onClick={() => setShowPassword((p) => !p)}
        tabIndex={-1}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? <EyeOff size={18} strokeWidth={2} /> : <Eye size={18} strokeWidth={2} />}
      </button>
    ) : (
      suffix
    );

  const hasSuffix = suffixContent != null;

  return (
    <div
      className={`input input--${size} input--${validationState} ${disabled ? 'input--disabled' : ''} ${className}`.trim()}
    >
      {label != null && (
        <div className="input__label-row">
          <label htmlFor={id} className="input__label">
            {label}
            {required && <span className="input__required" aria-hidden> *</span>}
          </label>
          {infoTooltip != null && (
            <span
              className="input__info"
              title={infoTooltip}
              aria-label={infoTooltip}
              role="img"
            >
              <Info size={14} strokeWidth={2} />
            </span>
          )}
        </div>
      )}
      <div className="input__wrapper">
        {prefix != null && <span className="input__prefix">{prefix}</span>}
        <input
          ref={ref}
          id={id}
          type={effectiveType}
          disabled={disabled}
          className={`input__field ${prefix != null ? 'input__field--has-prefix' : ''} ${hasSuffix ? 'input__field--has-suffix' : ''}`}
          aria-invalid={!!error}
          aria-describedby={
            [error && `${id}-error`, successMessage && `${id}-success`, helperText && `${id}-helper`]
              .filter(Boolean)
              .join(' ') || undefined
          }
          {...props}
        />
        {hasSuffix && <span className="input__suffix">{suffixContent}</span>}
      </div>
      {(error || successMessage || helperText) && (
        <div className="input__messages">
          {error && (
            <p id={`${id}-error`} className="input__message input__message--error">
              <span className="input__message-icon">
                <AlertCircle size={14} strokeWidth={2} color="currentColor" />
              </span>
              {error}
            </p>
          )}
          {successMessage && !error && (
            <p id={`${id}-success`} className="input__message input__message--success">
              <span className="input__message-icon">
                <CheckCircle size={14} strokeWidth={2} color="currentColor" />
              </span>
              {successMessage}
            </p>
          )}
          {helperText && !error && !successMessage && (
            <p id={`${id}-helper`} className="input__message input__message--helper">
              <span className="input__message-icon">
                <CheckCircle size={14} strokeWidth={2} color="currentColor" />
              </span>
              {helperText}
            </p>
          )}
        </div>
      )}
    </div>
  );
});
