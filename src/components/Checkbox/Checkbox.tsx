import { useEffect, useRef } from 'react';
import './Checkbox.css';

export interface CheckboxProps {
  /** Checkbox label */
  label: string;
  /** Checked state */
  checked?: boolean;
  /** Indeterminate state (e.g. "select all" when some items selected) */
  indeterminate?: boolean;
  /** Callback when state changes */
  onChange?: (checked: boolean) => void;
  /** Disabled state */
  disabled?: boolean;
}

export function Checkbox({
  label,
  checked = false,
  indeterminate = false,
  onChange,
  disabled = false,
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <label
      className={`checkbox ${disabled ? 'checkbox--disabled' : ''}`}
      data-indeterminate={indeterminate || undefined}
    >
      <input
        ref={inputRef}
        type="checkbox"
        checked={checked}
        onChange={(e) => !disabled && onChange?.(e.target.checked)}
        disabled={disabled}
        className="checkbox__input"
      />
      <span className="checkbox__box" aria-hidden>
        <span className="checkbox__check" />
        <span className="checkbox__indeterminate" />
      </span>
      <span className="checkbox__label">{label}</span>
    </label>
  );
}
