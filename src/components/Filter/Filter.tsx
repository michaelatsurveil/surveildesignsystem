import { useRef, useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
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
  /**
   * Variant: 'default' renders the standard filter dropdown;
   * 'new-filter' renders an "Add filter" ghost button for adding filters.
   */
  variant?: 'default' | 'new-filter';
  /** Called when the 'new-filter' button is clicked */
  onAddFilter?: () => void;
}

/**
 * Filter dropdown trigger. Shows a label, selected value (or placeholder),
 * and a chevron that rotates when open. When open, the trigger becomes a
 * text input that filters the options list. Closes when clicking outside.
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
  variant = 'default',
  onAddFilter,
}: FilterProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Auto-focus the search input when opened; clear query when closed
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    } else {
      setSearchQuery('');
    }
  }, [open]);

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

  const filteredOptions = searchQuery
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  // ── New filter variant ──────────────────────────────────────────────────────
  if (variant === 'new-filter') {
    return (
      <button
        type="button"
        className={`filter__trigger--new ${className}`.trim()}
        onClick={onAddFilter}
      >
        <span className="filter__trigger--new-icon" aria-hidden>
          <Plus size={14} strokeWidth={2} />
        </span>
        New filter
      </button>
    );
  }

  return (
    <div
      ref={rootRef}
      className={`filter ${open ? 'filter--open' : ''} ${className}`.trim()}
    >
      {label && <span className="filter__label">{label}</span>}

      <button
        type="button"
        className={`filter__trigger${open ? ' filter__trigger--active' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={!open ? onToggle : undefined}
      >
        {open ? (
          <input
            ref={inputRef}
            type="text"
            className="filter__search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={value ?? placeholder}
            aria-label="Search options"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === 'Escape') onToggle?.();
            }}
          />
        ) : (
          <span className={`filter__trigger-text${!value ? ' filter__trigger-text--placeholder' : ''}`}>
            {value ?? placeholder}
          </span>
        )}
        <span
          className="filter__chevron"
          aria-hidden
          onClick={open ? (e) => { e.stopPropagation(); onToggle?.(); } : undefined}
        >
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>

      {open && (
        <ul className="filter__dropdown" role="listbox">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <li
                key={opt.value}
                className={`filter__option${value === opt.value ? ' filter__option--selected' : ''}`}
                role="option"
                aria-selected={value === opt.value}
                onClick={() => {
                  onSelect?.(opt.value);
                  onToggle?.();
                }}
              >
                {opt.label}
              </li>
            ))
          ) : (
            <li className="filter__option filter__option--empty" role="option" aria-selected={false}>
              No results
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
