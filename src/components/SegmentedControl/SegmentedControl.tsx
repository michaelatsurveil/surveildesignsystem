import './SegmentedControl.css';

export type SegmentedControlVariant = 'rectangular' | 'pill';

export type SegmentedControlSize = 'xs' | 's' | 'm' | 'l';

export interface SegmentedControlOption {
  value: string;
  label: string;
}

export interface SegmentedControlProps {
  /** Options to display */
  options: SegmentedControlOption[];
  /** Currently selected value */
  value: string;
  /** Callback when selection changes */
  onChange: (value: string) => void;
  /** Visual style: rectangular (rounded corners) or pill (fully rounded) */
  variant?: SegmentedControlVariant;
  /** Size: xs (26px), s (30px), m (34px), l (38px) - Numbers-TC/Inputs-TC */
  size?: SegmentedControlSize;
  /** Disable all segments */
  disabled?: boolean;
}

export function SegmentedControl({
  options,
  value,
  onChange,
  variant = 'rectangular',
  size = 'm',
  disabled = false,
}: SegmentedControlProps) {
  return (
    <div
      className={`segmented-control segmented-control--${variant} segmented-control--${size}`}
      role="tablist"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="tab"
          aria-selected={option.value === value}
          className={`segmented-control__segment ${
            option.value === value ? 'segmented-control__segment--selected' : ''
          }`}
          onClick={() => !disabled && onChange(option.value)}
          disabled={disabled}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
