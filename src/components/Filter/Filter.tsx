import { useRef, useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Plus, X, Check } from 'lucide-react';
import './Filter.css';

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterField {
  /** Display name shown in the field selector (e.g. "Status") */
  label: string;
  /** Internal key used to identify this field (e.g. "status") */
  value: string;
  /** Available values for this field — shown in the multiselect */
  options: FilterOption[];
}

export interface FilterProps {
  /**
   * Available filter fields shown in the field-selector dropdown.
   * Each field has its own set of value options for the multiselect.
   */
  fields?: FilterField[];
  /** Currently applied field value (controlled) */
  fieldValue?: string;
  /** Currently applied values — multiselect (controlled) */
  values?: string[];
  /**
   * Called when the user clicks "Add" in the panel with a valid
   * field + at least one value selected.
   */
  onApply?: (fieldValue: string, values: string[]) => void;
  /** Called when the × remove button on the applied-filter chip is clicked */
  onRemove?: () => void;
  /** Whether the filter panel is open (controlled) */
  open?: boolean;
  /** Toggle the panel open/closed */
  onToggle?: () => void;
  /** Placeholder shown in the idle trigger. Defaults to "Select Filter" */
  placeholder?: string;
  /** Optional extra class name */
  className?: string;
  /**
   * 'default'     — the full filter trigger + panel (default)
   * 'new-filter'  — a dashed "+ Filter" ghost button for adding new filters
   */
  variant?: 'default' | 'new-filter';
  /** Called when the new-filter button is clicked */
  onAddFilter?: () => void;
}

/**
 * Filter — combines a field-selector dropdown and a value multiselect in one component.
 *
 * Idle:    [Select Filter ▾]
 * Open:    floating panel with field dropdown + value multiselect + Add / Cancel
 * Applied: [FieldName: Val1, Val2 ▾] [×]
 *
 * Figma: https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=340-3889
 */
export function Filter({
  fields = [],
  fieldValue,
  values = [],
  onApply,
  onRemove,
  open = false,
  onToggle,
  placeholder = 'Select Filter',
  className = '',
  variant = 'default',
  onAddFilter,
}: FilterProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const fieldWrapRef = useRef<HTMLDivElement>(null);
  const valueWrapRef = useRef<HTMLDivElement>(null);

  // Internal panel state — staged before the user clicks "Add"
  const [panelField, setPanelField] = useState(fieldValue ?? '');
  const [panelValues, setPanelValues] = useState<string[]>(values ?? []);
  const [fieldDropdownOpen, setFieldDropdownOpen] = useState(false);
  const [valueDropdownOpen, setValueDropdownOpen] = useState(false);

  // Re-sync internal panel state whenever the panel opens
  useEffect(() => {
    if (open) {
      setPanelField(fieldValue ?? '');
      setPanelValues(values ?? []);
      setFieldDropdownOpen(false);
      setValueDropdownOpen(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Close panel on outside click
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

  // Close field/value dropdowns when clicking outside their wrap (but still inside the panel)
  useEffect(() => {
    if (!fieldDropdownOpen && !valueDropdownOpen) return;
    function handleDropdownClickOutside(e: MouseEvent) {
      if (fieldDropdownOpen && fieldWrapRef.current && !fieldWrapRef.current.contains(e.target as Node)) {
        setFieldDropdownOpen(false);
      }
      if (valueDropdownOpen && valueWrapRef.current && !valueWrapRef.current.contains(e.target as Node)) {
        setValueDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleDropdownClickOutside);
    return () => document.removeEventListener('mousedown', handleDropdownClickOutside);
  }, [fieldDropdownOpen, valueDropdownOpen]);

  // ── new-filter variant ────────────────────────────────────────────────────

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
        Filter
      </button>
    );
  }

  // ── Derived values ────────────────────────────────────────────────────────

  const isApplied = !!fieldValue && values.length > 0;
  const selectedField = fields.find((f) => f.value === fieldValue);
  const panelFieldObj = fields.find((f) => f.value === panelField);
  const availableValues = panelFieldObj?.options ?? [];

  const handleAdd = () => {
    if (panelField && panelValues.length > 0) {
      setFieldDropdownOpen(false);
      setValueDropdownOpen(false);
      onApply?.(panelField, panelValues);
      onToggle?.();
    }
  };

  const handleCancel = () => {
    onToggle?.();
  };

  const toggleValue = (v: string) => {
    setPanelValues((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
    );
  };

  // ── Applied chip (filter has been added, panel is closed) ────────────────

  const appliedChip = isApplied && !open && (
    <div ref={rootRef} className={`filter filter--applied ${className}`.trim()}>
      <button
        type="button"
        className="filter__chip"
        onClick={onToggle}
        aria-expanded={false}
        aria-haspopup="dialog"
      >
        <span className="filter__chip-label">
          {values.length > 2
            ? `${selectedField?.label}: ${values.length} selected`
            : `${selectedField?.label}: ${values
                .map((v) => selectedField?.options.find((o) => o.value === v)?.label ?? v)
                .join(', ')}`}
        </span>
        <ChevronDown size={14} strokeWidth={2} className="filter__chip-chevron" aria-hidden />
      </button>
      <button
        type="button"
        className="filter__chip-remove"
        onClick={onRemove}
        aria-label="Remove filter"
      >
        <X size={12} strokeWidth={2.5} aria-hidden />
      </button>
    </div>
  );

  if (appliedChip) return appliedChip;

  // ── Idle trigger + floating panel ────────────────────────────────────────

  return (
    <div
      ref={rootRef}
      className={['filter', open ? 'filter--open' : '', className].filter(Boolean).join(' ')}
    >
      {/* ── Trigger ── */}
      <button
        type="button"
        className={[
          'filter__trigger',
          open ? 'filter__trigger--active' : '',
          isApplied ? 'filter__trigger--selected' : '',
        ].filter(Boolean).join(' ')}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={onToggle}
      >
        <span
          className={[
            'filter__trigger-text',
            !isApplied ? 'filter__trigger-text--placeholder' : '',
          ].filter(Boolean).join(' ')}
        >
          {isApplied && selectedField ? selectedField.label : placeholder}
        </span>
        <span className="filter__chevron" aria-hidden>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>

      {/* ── Panel ── */}
      {open && (
        <div className="filter__panel" role="dialog" aria-label="Add filter">
          <div className="filter__panel-header">Add Filter</div>

          {/* Field selector */}
          <div className="filter__panel-body">
            <div className="filter__panel-section">
              <span className="filter__panel-label">Title</span>
              <div className="filter__panel-row-wrap" ref={fieldWrapRef}>
                <button
                  type="button"
                  className={[
                    'filter__panel-trigger',
                    fieldDropdownOpen ? 'filter__panel-trigger--open' : '',
                    panelField ? 'filter__panel-trigger--selected' : '',
                  ].filter(Boolean).join(' ')}
                  onClick={() => {
                    setFieldDropdownOpen((v) => !v);
                    setValueDropdownOpen(false);
                  }}
                  aria-expanded={fieldDropdownOpen}
                  aria-haspopup="listbox"
                >
                  <span
                    className={[
                      'filter__panel-trigger-text',
                      !panelField ? 'filter__panel-trigger-text--placeholder' : '',
                    ].filter(Boolean).join(' ')}
                  >
                    {panelField
                      ? fields.find((f) => f.value === panelField)?.label
                      : 'Select Filter'}
                  </span>
                  <span className="filter__chevron" aria-hidden>
                    {fieldDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                </button>

                {fieldDropdownOpen && (
                  <ul className="filter__panel-menu" role="listbox">
                    {fields.map((field) => (
                      <li
                        key={field.value}
                        className={[
                          'filter__panel-option',
                          panelField === field.value ? 'filter__panel-option--selected' : '',
                        ].filter(Boolean).join(' ')}
                        role="option"
                        aria-selected={panelField === field.value}
                        onClick={() => {
                          setPanelField(field.value);
                          setPanelValues([]);
                          setFieldDropdownOpen(false);
                        }}
                      >
                        {panelField === field.value && (
                          <Check size={13} strokeWidth={2.5} className="filter__panel-option-check" aria-hidden />
                        )}
                        {field.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Value multiselect */}
            <div className="filter__panel-section">
              <span className="filter__panel-label">Value(s)</span>
              <div className="filter__panel-row-wrap" ref={valueWrapRef}>
                <button
                  type="button"
                  className={[
                    'filter__panel-trigger',
                    !panelField ? 'filter__panel-trigger--disabled' : '',
                    valueDropdownOpen ? 'filter__panel-trigger--open' : '',
                    panelValues.length > 0 ? 'filter__panel-trigger--selected' : '',
                  ].filter(Boolean).join(' ')}
                  disabled={!panelField}
                  onClick={() => {
                    setValueDropdownOpen((v) => !v);
                    setFieldDropdownOpen(false);
                  }}
                  aria-expanded={valueDropdownOpen}
                  aria-haspopup="listbox"
                >
                  <span
                    className={[
                      'filter__panel-trigger-text',
                      panelValues.length === 0 ? 'filter__panel-trigger-text--placeholder' : '',
                    ].filter(Boolean).join(' ')}
                  >
                    {panelValues.length === 0
                      ? 'Select Value(s)'
                      : panelValues.length === 1
                        ? availableValues.find((o) => o.value === panelValues[0])?.label ?? panelValues[0]
                        : `${panelValues.length} Selected`}
                  </span>
                  <span className="filter__chevron" aria-hidden>
                    {valueDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                </button>

                {valueDropdownOpen && availableValues.length > 0 && (
                  <ul className="filter__panel-menu" role="listbox" aria-multiselectable="true">
                    {availableValues.map((opt) => {
                      const checked = panelValues.includes(opt.value);
                      return (
                        <li
                          key={opt.value}
                          className={[
                            'filter__panel-option filter__panel-option--checkbox',
                            checked ? 'filter__panel-option--checked' : '',
                          ].filter(Boolean).join(' ')}
                          role="option"
                          aria-selected={checked}
                          onClick={() => toggleValue(opt.value)}
                        >
                          <span className="filter__checkbox" aria-hidden>
                            {checked && <Check size={10} strokeWidth={3} />}
                          </span>
                          {opt.label}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Action bar */}
          <div className="filter__panel-actions">
            <button
              type="button"
              className="filter__panel-btn filter__panel-btn--cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="filter__panel-btn filter__panel-btn--add"
              disabled={!panelField || panelValues.length === 0}
              onClick={handleAdd}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
