import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronRight, X } from 'lucide-react';
import './MultiSelect.css';

export interface MultiSelectOption {
  label: string;
  value: string;
  /** Optional nested sub-options (used with variant="embedded") */
  children?: MultiSelectOption[];
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
  /**
   * 'embedded' enables hierarchical sub-menus: options with `children` show a
   * flyout panel on hover. The trigger shows a count summary and a clear button.
   */
  variant?: 'default' | 'embedded';
}

export function MultiSelect({
  options,
  value = [],
  onChange,
  placeholder = 'Select options',
  disabled = false,
  className = '',
  variant = 'default',
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [activeParent, setActiveParent] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const hasSelection = value.length > 0;
  const isEmbedded = variant === 'embedded';

  const defaultTriggerLabel = (() => {
    if (!hasSelection) return placeholder;
    if (value.length === 1) {
      return options.find((o) => o.value === value[0])?.label ?? placeholder;
    }
    return `${value.length} selected`;
  })();

  const embeddedTriggerLabel = (() => {
    if (!hasSelection) return placeholder;

    const parentsWithSelections = options.filter(
      (o) => o.children && o.children.some((c) => value.includes(c.value))
    );
    const directSelections = value.filter((v) => options.some((o) => o.value === v));

    if (parentsWithSelections.length === 1 && directSelections.length === 0) {
      const parent = parentsWithSelections[0];
      const count = parent.children!.filter((c) => value.includes(c.value)).length;
      return `${parent.label} (${count})`;
    }
    if (value.length === 1) {
      const flat = options.flatMap((o) => [o, ...(o.children ?? [])]);
      return flat.find((o) => o.value === value[0])?.label ?? placeholder;
    }
    return `${value.length} selected`;
  })();

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setActiveParent(null);
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

  function toggleAllChildren(parent: MultiSelectOption) {
    if (!parent.children) return;
    const childValues = parent.children.map((c) => c.value);
    const allSelected = childValues.every((v) => value.includes(v));
    if (allSelected) {
      onChange?.(value.filter((v) => !childValues.includes(v)));
    } else {
      const next = [...value];
      childValues.forEach((v) => { if (!next.includes(v)) next.push(v); });
      onChange?.(next);
    }
  }

  const classNames = [
    'multiselect',
    isEmbedded ? 'multiselect--embedded' : '',
    hasSelection ? 'multiselect--selected' : '',
    open ? 'multiselect--open' : '',
    disabled ? 'multiselect--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={rootRef} className={classNames}>
      {/* ── Trigger ── */}
      {isEmbedded ? (
        <div
          className="multiselect__trigger multiselect__trigger--embedded"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              setOpen((v) => !v);
            }
          }}
        >
          <span
            className="multiselect__trigger-label"
            onClick={() => !disabled && setOpen((v) => !v)}
          >
            {embeddedTriggerLabel}
          </span>
          {hasSelection && (
            <button
              type="button"
              className="multiselect__clear"
              aria-label="Clear all"
              onClick={(e) => {
                e.stopPropagation();
                onChange?.([]);
              }}
            >
              <X size={14} />
            </button>
          )}
          <button
            type="button"
            className={`multiselect__chevron-btn${open ? ' multiselect__chevron--open' : ''}`}
            aria-label={open ? 'Close dropdown' : 'Open dropdown'}
            disabled={disabled}
            onClick={() => !disabled && setOpen((v) => !v)}
          >
            <ChevronDown size={16} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="multiselect__trigger"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-multiselectable="true"
          disabled={disabled}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="multiselect__trigger-label">{defaultTriggerLabel}</span>
          <span
            className={`multiselect__chevron ${open ? 'multiselect__chevron--open' : ''}`}
            aria-hidden
          >
            <ChevronDown size={16} />
          </span>
        </button>
      )}

      {/* ── Dropdown ── */}
      {open && (
        isEmbedded ? (
          <div className="multiselect__dropdown">
            {/* Left panel */}
            <ul className="multiselect__menu" role="listbox" aria-multiselectable="true">
              {options.map((opt) => {
                const hasChildren = (opt.children?.length ?? 0) > 0;
                const childValues = opt.children?.map((c) => c.value) ?? [];
                const selectedChildCount = childValues.filter((v) => value.includes(v)).length;
                const isFullyChecked = hasChildren
                  ? selectedChildCount === childValues.length && childValues.length > 0
                  : value.includes(opt.value);
                const isIndeterminate =
                  hasChildren && selectedChildCount > 0 && selectedChildCount < childValues.length;
                const isActive = activeParent === opt.value;

                return (
                  <li
                    key={opt.value}
                    role="option"
                    aria-selected={isFullyChecked}
                    className={[
                      'multiselect__item',
                      isActive ? 'multiselect__item--active' : '',
                      isFullyChecked && !isIndeterminate ? 'multiselect__item--checked' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onMouseEnter={() =>
                      hasChildren ? setActiveParent(opt.value) : setActiveParent(null)
                    }
                    onClick={() => {
                      if (hasChildren) toggleAllChildren(opt);
                      else toggleOption(opt.value);
                    }}
                  >
                    <input
                      type="checkbox"
                      className="multiselect__checkbox"
                      checked={isFullyChecked}
                      onChange={() => {}}
                      ref={(el) => { if (el) el.indeterminate = isIndeterminate; }}
                      tabIndex={-1}
                      aria-hidden
                    />
                    <span className="multiselect__item-label">
                      {opt.label}
                      {hasChildren && selectedChildCount > 0 ? ` (${selectedChildCount})` : ''}
                    </span>
                    {hasChildren && (
                      <ChevronRight size={14} className="multiselect__item-arrow" />
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Right sub-panel */}
            {activeParent && (() => {
              const parent = options.find((o) => o.value === activeParent);
              if (!parent?.children) return null;
              return (
                <ul
                  className="multiselect__menu multiselect__submenu"
                  role="listbox"
                  aria-multiselectable="true"
                >
                  {parent.children.map((child) => {
                    const checked = value.includes(child.value);
                    return (
                      <li
                        key={child.value}
                        role="option"
                        aria-selected={checked}
                        className={`multiselect__item ${checked ? 'multiselect__item--checked' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleOption(child.value);
                        }}
                      >
                        <input
                          type="checkbox"
                          className="multiselect__checkbox"
                          checked={checked}
                          readOnly
                          tabIndex={-1}
                          aria-hidden
                        />
                        <span className="multiselect__item-label">{child.label}</span>
                      </li>
                    );
                  })}
                </ul>
              );
            })()}
          </div>
        ) : (
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
        )
      )}
    </div>
  );
}
