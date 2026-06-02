import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './MultiSelect.css';

export interface MultiSelectOption {
  label: string;
  value: string;
}

export interface MultiSelectProps {
  /** Options to display in the dropdown */
  options: MultiSelectOption[];
  /** Currently selected values */
  value?: string[];
  /** Called when selection changes */
  onChange?: (values: string[]) => void;
  /** Placeholder shown when nothing is selected */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Optional class name for the root element */
  className?: string;
}

export function MultiSelect({
  options,
  value = [],
  onChange,
  placeholder = 'Select options',
  disabled = false,
  className = '',
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const hasSelection = value.length > 0;

  const triggerLabel = (() => {
    if (!hasSelection) return placeholder;
    if (value.length === 1) {
      return options.find((o) => o.value === value[0])?.label ?? placeholder;
    }
    return `${value.length} selected`;
  })();

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

  function toggleOption(optValue: string) {
    const next = value.includes(optValue)
      ? value.filter((v) => v !== optValue)
      : [...value, optValue];
    onChange?.(next);
  }

  return (
    <div
      ref={rootRef}
      className={[
        'multiselect',
        hasSelection ? 'multiselect--selected' : '',
        open ? 'multiselect--open' : '',
        disabled ? 'multiselect--disabled' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <button
        type="button"
        className="multiselect__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-multiselectable="true"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="multiselect__trigger-label">{triggerLabel}</span>
        <span className={`multiselect__chevron ${open ? 'multiselect__chevron--open' : ''}`} aria-hidden>
          <ChevronDown size={16} />
        </span>
      </button>

      {open && (
        <ul className="multiselect__menu" role="listbox" aria-multiselectable="true">
          {options.map((opt) => {
            const checked = value.includes(opt.value);
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={checked}
                className={`multiselect__item ${checked ? 'multiselect__item--checked' : ''}`}
                onClick={() => toggleOption(opt.value)}
              >
                <input
                  type="checkbox"
                  className="multiselect__checkbox"
                  checked={checked}
                  readOnly
                  tabIndex={-1}
                  aria-hidden
                />
                <span className="multiselect__item-label">{opt.label}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
