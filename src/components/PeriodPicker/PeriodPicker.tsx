/**
 * PeriodPicker component
 * Figma: https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=3749-6481
 *
 * Trigger + floating menu with year navigation and Q1–Q4 quarter grid.
 */
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
import './PeriodPicker.css';

export type Quarter = 'Q1' | 'Q2' | 'Q3' | 'Q4';

export interface PeriodPickerValue {
  quarter: Quarter;
  year: number;
}

export interface PeriodPickerProps {
  value?: PeriodPickerValue;
  onChange?: (value: PeriodPickerValue) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const QUARTERS: Quarter[] = ['Q1', 'Q2', 'Q3', 'Q4'];

export function PeriodPicker({
  value,
  onChange,
  placeholder = 'Select period',
  disabled = false,
  className = '',
}: PeriodPickerProps) {
  const [open, setOpen] = useState(false);
  const [navYear, setNavYear] = useState(value?.year ?? new Date().getFullYear());
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value?.year != null) setNavYear(value.year);
  }, [value?.year]);

  useEffect(() => {
    if (!open) return;
    function onOutsideClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onOutsideClick);
    return () => document.removeEventListener('mousedown', onOutsideClick);
  }, [open]);

  const hasValue = value != null;
  const triggerLabel = hasValue ? `${value.quarter} ${value.year}` : placeholder;

  function handleSelect(quarter: Quarter) {
    onChange?.({ quarter, year: navYear });
    setOpen(false);
  }

  return (
    <div
      ref={rootRef}
      className={[
        'period-picker',
        open ? 'period-picker--open' : '',
        hasValue ? 'period-picker--selected' : '',
        disabled ? 'period-picker--disabled' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <button
        className="period-picker__trigger"
        onClick={() => setOpen((o) => !o)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="period-picker__label">{triggerLabel}</span>
        <span className="period-picker__chevron" aria-hidden>
          {open ? (
            <ChevronUp size={16} strokeWidth={2} />
          ) : (
            <ChevronDown size={16} strokeWidth={2} />
          )}
        </span>
      </button>

      {open && (
        <div className="period-picker__menu" role="listbox" aria-label="Select quarter">
          <div className="period-picker__header">
            <button
              className="period-picker__nav-btn"
              onClick={() => setNavYear((y) => y - 1)}
              aria-label="Previous year"
            >
              <ChevronLeft size={16} strokeWidth={2} />
            </button>
            <span className="period-picker__year">{navYear}</span>
            <button
              className="period-picker__nav-btn"
              onClick={() => setNavYear((y) => y + 1)}
              aria-label="Next year"
            >
              <ChevronRight size={16} strokeWidth={2} />
            </button>
          </div>

          <div className="period-picker__grid">
            {QUARTERS.map((q) => {
              const isSelected = value?.quarter === q && value?.year === navYear;
              return (
                <button
                  key={q}
                  className={[
                    'period-picker__item',
                    isSelected ? 'period-picker__item--selected' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(q)}
                >
                  {q}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
