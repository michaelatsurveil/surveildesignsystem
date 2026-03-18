import './Radio.css';

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioGroupProps {
  /** Radio options */
  options: RadioOption[];
  /** Currently selected value */
  value: string;
  /** Callback when selection changes */
  onChange: (value: string) => void;
  /** Group name (for native radio behavior) */
  name?: string;
  /** Disable all options */
  disabled?: boolean;
  /** Layout direction */
  direction?: 'vertical' | 'horizontal';
}

export function RadioGroup({
  options,
  value,
  onChange,
  name = 'radio-group',
  disabled = false,
  direction = 'vertical',
}: RadioGroupProps) {
  return (
    <div
      className={`radio-group radio-group--${direction}`}
      role="radiogroup"
    >
      {options.map((option) => (
        <label
          key={option.value}
          className={`radio ${disabled ? 'radio--disabled' : ''}`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={option.value === value}
            onChange={() => !disabled && onChange(option.value)}
            disabled={disabled}
            className="radio__input"
          />
          <span className="radio__circle" aria-hidden />
          <span className="radio__label">{option.label}</span>
        </label>
      ))}
    </div>
  );
}
