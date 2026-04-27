/**
 * Dropdown component
 * Figma: https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=1713-17865
 */
import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './Dropdown.css';

export interface DropdownOption {
  label: string;
  value: string;
  /** Optional 14px icon shown to the left of the label in the menu */
  icon?: React.ReactNode;
}

export interface DropdownProps {
  /** Options list */
  options: DropdownOption[];
  /** Currently selected value */
  value?: string;
  /** Called when the user selects an option */
  onChange?: (value: string) => void;
  /** Placeholder text shown when no value is selected */
  placeholder?: string;
  /** Optional 16px icon shown to the left of the trigger label */
  icon?: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Optional class name for the root element */
  className?: string;
}

export function Dropdown({
  options,
  value,
  onChange,
  placeholder = 'Dropdown name',
  icon,
  disabled = false,
  className = '',
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);
  const hasValue = selected != null;

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={[
        'dropdown',
        hasValue ? 'dropdown--selected' : '',
        open ? 'dropdown--open' : '',
        disabled ? 'dropdown--disabled' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <button
        type="button"
        className="dropdown__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
      >
        {icon != null && (
          <span className="dropdown__trigger-icon" aria-hidden>
            {icon}
          </span>
        )}
        <span className="dropdown__trigger-label">
          {selected ? selected.label : placeholder}
        </span>
        <span className={`dropdown__chevron ${open ? 'dropdown__chevron--open' : ''}`} aria-hidden>
          <ChevronDown size={16} />
        </span>
      </button>

      {open && (
        <ul className="dropdown__menu" role="listbox">
          {options.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={value === opt.value}
              className={`dropdown__item ${value === opt.value ? 'dropdown__item--active' : ''}`}
              onClick={() => {
                onChange?.(opt.value);
                setOpen(false);
              }}
            >
              {opt.icon != null && (
                <span className="dropdown__item-icon" aria-hidden>
                  {opt.icon}
                </span>
              )}
              <span className="dropdown__item-label">{opt.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
