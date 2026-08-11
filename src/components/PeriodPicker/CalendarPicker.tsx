/**
 * CalendarPicker component
 * Figma: https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library
 *
 * Trigger + floating menu with month/year dropdown navigation, a day grid,
 * and an action bar (Apply, Cancel, Reset).
 */
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
import { Button } from '../Button';
import './CalendarPicker.css';

export interface CalendarPickerProps {
  value?: Date;
  onChange?: (value: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

type View = 'days' | 'months' | 'years';

const MONTHS = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December',
];

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const YEAR_BLOCK = 12;

function formatDate(date: Date): string {
  return `${MONTHS_SHORT[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function firstWeekdayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function decadeStart(year: number): number {
  return Math.floor(year / YEAR_BLOCK) * YEAR_BLOCK;
}

export function CalendarPicker({
  value,
  onChange,
  placeholder = 'Select date',
  disabled = false,
  className = '',
}: CalendarPickerProps) {
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>('days');
  const [navMonth, setNavMonth] = useState(value?.getMonth() ?? today.getMonth());
  const [navYear, setNavYear] = useState(value?.getFullYear() ?? today.getFullYear());
  const [yearBlockStart, setYearBlockStart] = useState(decadeStart(value?.getFullYear() ?? today.getFullYear()));
  // Staged selection — only committed on Apply
  const [pendingDate, setPendingDate] = useState<Date | undefined>(value);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      setNavMonth(value.getMonth());
      setNavYear(value.getFullYear());
      setYearBlockStart(decadeStart(value.getFullYear()));
    }
    setPendingDate(value);
  }, [value]);

  // Reset view and pending state when closing
  useEffect(() => {
    if (!open) {
      setView('days');
      setPendingDate(value);
      return;
    }
    function onOutsideClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onOutsideClick);
    return () => document.removeEventListener('mousedown', onOutsideClick);
  }, [open]);

  /* ── Days view navigation ── */

  function handlePrevMonth() {
    if (navMonth === 0) { setNavMonth(11); setNavYear((y) => y - 1); }
    else setNavMonth((m) => m - 1);
  }

  function handleNextMonth() {
    if (navMonth === 11) { setNavMonth(0); setNavYear((y) => y + 1); }
    else setNavMonth((m) => m + 1);
  }

  function handleSelectDay(day: number) {
    setPendingDate(new Date(navYear, navMonth, day));
  }

  /* ── Months view ── */

  function handleSelectMonth(month: number) {
    setNavMonth(month);
    setView('days');
  }

  /* ── Years view ── */

  function handleSelectYear(year: number) {
    setNavYear(year);
    setYearBlockStart(decadeStart(year));
    setView('days');
  }

  function handleOpenYears() {
    setYearBlockStart(decadeStart(navYear));
    setView('years');
  }

  /* ── Action bar ── */

  function handleApply() {
    onChange?.(pendingDate);
    setOpen(false);
  }

  function handleCancel() {
    setOpen(false); // useEffect reverts pendingDate to value
  }

  function handleReset() {
    onChange?.(undefined);
    setPendingDate(undefined);
    setOpen(false);
  }

  /* ── Day grid cells ── */

  const totalDays = daysInMonth(navYear, navMonth);
  const leadBlanks = firstWeekdayOfMonth(navYear, navMonth);
  const dayCells: (number | null)[] = [
    ...Array.from({ length: leadBlanks }, () => null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];
  while (dayCells.length % 7 !== 0) dayCells.push(null);

  const hasValue = value != null;
  const triggerLabel = hasValue ? formatDate(value) : placeholder;

  return (
    <div
      ref={rootRef}
      className={[
        'calendar-picker',
        open ? 'calendar-picker--open' : '',
        hasValue ? 'calendar-picker--selected' : '',
        disabled ? 'calendar-picker--disabled' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <button
        className="calendar-picker__trigger"
        onClick={() => setOpen((o) => !o)}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className="calendar-picker__label">{triggerLabel}</span>
        <span className="calendar-picker__chevron" aria-hidden>
          {open ? <ChevronUp size={16} strokeWidth={2} /> : <ChevronDown size={16} strokeWidth={2} />}
        </span>
      </button>

      {open && (
        <div className="calendar-picker__menu" role="dialog" aria-label="Select date">

          {/* ── Days view ── */}
          {view === 'days' && (
            <>
              <div className="calendar-picker__header">
                <button className="calendar-picker__nav-btn" onClick={handlePrevMonth} aria-label="Previous month">
                  <ChevronLeft size={16} strokeWidth={2} />
                </button>
                <div className="calendar-picker__header-labels">
                  <button
                    className="calendar-picker__header-btn"
                    onClick={() => setView('months')}
                    aria-label="Select month"
                  >
                    {MONTHS[navMonth]}
                    <ChevronDown size={12} strokeWidth={2.5} className="calendar-picker__header-btn-icon" />
                  </button>
                  <button
                    className="calendar-picker__header-btn"
                    onClick={handleOpenYears}
                    aria-label="Select year"
                  >
                    {navYear}
                    <ChevronDown size={12} strokeWidth={2.5} className="calendar-picker__header-btn-icon" />
                  </button>
                </div>
                <button className="calendar-picker__nav-btn" onClick={handleNextMonth} aria-label="Next month">
                  <ChevronRight size={16} strokeWidth={2} />
                </button>
              </div>

              <div className="calendar-picker__grid">
                {WEEKDAYS.map((wd) => (
                  <span key={wd} className="calendar-picker__weekday">{wd}</span>
                ))}
                {dayCells.map((day, i) => {
                  if (day === null) return <span key={`blank-${i}`} className="calendar-picker__blank" />;
                  const isPending =
                    pendingDate != null &&
                    day === pendingDate.getDate() &&
                    navMonth === pendingDate.getMonth() &&
                    navYear === pendingDate.getFullYear();
                  const isToday =
                    day === today.getDate() &&
                    navMonth === today.getMonth() &&
                    navYear === today.getFullYear();
                  return (
                    <button
                      key={day}
                      className={[
                        'calendar-picker__day',
                        isPending ? 'calendar-picker__day--selected' : '',
                        isToday && !isPending ? 'calendar-picker__day--today' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      onClick={() => handleSelectDay(day)}
                      aria-label={`${MONTHS[navMonth]} ${day}, ${navYear}`}
                      aria-pressed={isPending}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {/* ── Action bar (days view only) ── */}
              <div className="calendar-picker__actions">
                <button className="calendar-picker__reset-btn" onClick={handleReset}>
                  Reset
                </button>
                <div className="calendar-picker__actions-right">
                  <Button variant="secondary" size="sm" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm" onClick={handleApply}>
                    Apply
                  </Button>
                </div>
              </div>
            </>
          )}

          {/* ── Months view ── */}
          {view === 'months' && (
            <>
              <div className="calendar-picker__header">
                <button className="calendar-picker__nav-btn" onClick={() => setNavYear((y) => y - 1)} aria-label="Previous year">
                  <ChevronLeft size={16} strokeWidth={2} />
                </button>
                <span className="calendar-picker__header-range">{navYear}</span>
                <button className="calendar-picker__nav-btn" onClick={() => setNavYear((y) => y + 1)} aria-label="Next year">
                  <ChevronRight size={16} strokeWidth={2} />
                </button>
              </div>

              <div className="calendar-picker__month-grid">
                {MONTHS_SHORT.map((m, i) => {
                  const isSelected = pendingDate != null && i === pendingDate.getMonth() && navYear === pendingDate.getFullYear();
                  const isCurrentMonth = i === today.getMonth() && navYear === today.getFullYear();
                  return (
                    <button
                      key={m}
                      className={[
                        'calendar-picker__month-item',
                        isSelected ? 'calendar-picker__month-item--selected' : '',
                        isCurrentMonth && !isSelected ? 'calendar-picker__month-item--current' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      onClick={() => handleSelectMonth(i)}
                      aria-pressed={isSelected}
                    >
                      {m}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* ── Years view ── */}
          {view === 'years' && (
            <>
              <div className="calendar-picker__header">
                <button
                  className="calendar-picker__nav-btn"
                  onClick={() => setYearBlockStart((s) => s - YEAR_BLOCK)}
                  aria-label="Previous years"
                >
                  <ChevronLeft size={16} strokeWidth={2} />
                </button>
                <span className="calendar-picker__header-range">
                  {yearBlockStart}–{yearBlockStart + YEAR_BLOCK - 1}
                </span>
                <button
                  className="calendar-picker__nav-btn"
                  onClick={() => setYearBlockStart((s) => s + YEAR_BLOCK)}
                  aria-label="Next years"
                >
                  <ChevronRight size={16} strokeWidth={2} />
                </button>
              </div>

              <div className="calendar-picker__year-grid">
                {Array.from({ length: YEAR_BLOCK }, (_, i) => yearBlockStart + i).map((year) => {
                  const isSelected = pendingDate != null && year === pendingDate.getFullYear();
                  const isCurrentYear = year === today.getFullYear();
                  return (
                    <button
                      key={year}
                      className={[
                        'calendar-picker__year-item',
                        isSelected ? 'calendar-picker__year-item--selected' : '',
                        isCurrentYear && !isSelected ? 'calendar-picker__year-item--current' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      onClick={() => handleSelectYear(year)}
                      aria-pressed={isSelected}
                    >
                      {year}
                    </button>
                  );
                })}
              </div>
            </>
          )}

        </div>
      )}
    </div>
  );
}
