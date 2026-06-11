import type { LucideIcon } from 'lucide-react';
import './SegmentedControl.css';

export type SegmentedControlVariant = 'rectangular' | 'pill';

export type SegmentedControlSize = 'xs' | 's' | 'm' | 'l';

export interface SegmentedControlOption {
  value: string;
  /** Text label (rendered as content, or as aria-label when icon is set) */
  label?: string;
  /** Icon for icon-only segments */
  icon?: LucideIcon;
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
  /** Size: xs/s (28px), m (32px), l (36px) */
  size?: SegmentedControlSize;
  /** Disable all segments */
  disabled?: boolean;
}

const iconSizeMap: Record<SegmentedControlSize, number> = {
  xs: 16,
  s: 16,
  m: 16,
  l: 20,
};

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
      {options.map((option) => {
        const isSelected = option.value === value;
        const isIcon = !!option.icon;
        const IconComponent = option.icon;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isSelected}
            aria-label={isIcon ? option.label : undefined}
            className={[
              'segmented-control__segment',
              isIcon ? 'segmented-control__segment--icon' : '',
              isSelected ? 'segmented-control__segment--selected' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => !disabled && onChange(option.value)}
            disabled={disabled}
          >
            {IconComponent ? (
              <IconComponent
                size={iconSizeMap[size]}
                strokeWidth={2}
                color="currentColor"
                aria-hidden
              />
            ) : (
              option.label
            )}
          </button>
        );
      })}
    </div>
  );
}
