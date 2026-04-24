import { useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './Filter.css';

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterProps {
  /** Optional label shown above the trigger */
  label?: string;
  /** Currently selected value displayed in the trigger */
  value?: string;
  /** Placeholder text when no value is selected */
  placeholder?: string;
  /** Whether the dropdown is open */
  open?: boolean;
  /** Called when the trigger is clicked */
  onToggle?: () => void;
  /** Options shown in the dropdown */
  options?: FilterOption[];
  /** Called when an option is selected */
  onSelect?: (value: string) => void;
  /** Optional class name for the root element */
  className?: string;
}

/**
 * Filter dropdown trigger. Shows a label, selected value (or placeholder),
 * and a chevron that rotates when open. Closes when clicking outside.
 * Figma: node 340-3889
 */
export function Filter({
  label,
  value,
  placeholder = 'Select…',
  open = false,
  onToggle,
  options = [],
  onSelect,
  className = '',
}: FilterProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        onToggle?.();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, onToggle]);

  return (
    <div
      ref={rootRef}
      className={`filter ${open ? 'filter--open' : ''} ${className}`.trim()}
    >
      {label && <span className="filter__label">{label}</span>}

      <button
        type="button"
        className="filter__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={onToggle}
      >
        <span className={`filter__trigger-text ${!value ? 'filter__trigger-text--placeholder' : ''}`}>
          {value ?? placeholder}
        </span>
        <span className="filter__chevron" aria-hidden>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>

      {open && options.length > 0 && (
        <ul className="filter__dropdown" role="listbox">
          {options.map((opt) => (
            <li
              key={opt.value}
              className={`filter__option ${value === opt.value ? 'filter__option--selected' : ''}`}
              role="option"
              aria-selected={value === opt.value}
              onClick={() => {
                onSelect?.(opt.value);
                onToggle?.();
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
