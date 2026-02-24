import { Menu, ChevronDown } from 'lucide-react';
import './Tabs.css';

export interface TabOption {
  value: string;
  label: string;
  /** Optional left icon - defaults to Menu for dropdown tabs */
  icon?: React.ReactNode;
  /** Show dropdown chevron indicator */
  dropdown?: boolean;
}

export interface TabsProps {
  /** Tab options */
  options: TabOption[];
  /** Currently selected value */
  value: string;
  /** Callback when selection changes */
  onChange: (value: string) => void;
  /** Disable all tabs */
  disabled?: boolean;
}

export function Tabs({
  options,
  value,
  onChange,
  disabled = false,
}: TabsProps) {
  return (
    <div className="tabs" role="tablist">
      {options.map((option) => {
        const isSelected = option.value === value;
        const icon = option.icon ?? (option.dropdown ? <Menu size={16} strokeWidth={2} color="currentColor" /> : null);
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isSelected}
            className={`tabs__tab ${isSelected ? 'tabs__tab--selected' : ''}`}
            onClick={() => !disabled && onChange(option.value)}
            disabled={disabled}
          >
            {icon && (
              <span className="tabs__tab-icon" aria-hidden>
                {icon}
              </span>
            )}
            <span className="tabs__tab-label">{option.label}</span>
            {option.dropdown && (
              <span className="tabs__tab-chevron" aria-hidden>
                <ChevronDown size={16} strokeWidth={2} color="currentColor" />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
