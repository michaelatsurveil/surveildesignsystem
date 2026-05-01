/**
 * Progress Bar component
 * https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=379-399
 *
 * Types:    linear | circle
 * Sizes:    sm (Small) | lg (Large)
 * Statuses: default | success | error
 * Value:    0 – 100
 */

import './ProgressBar.css';

export type ProgressBarType   = 'linear' | 'circle';
export type ProgressBarSize   = 'sm' | 'lg';
export type ProgressBarStatus = 'default' | 'success' | 'error';

export interface ProgressBarProps {
  /** Visual type of the progress indicator */
  type?: ProgressBarType;
  /** Small (sm) or Large (lg) */
  size?: ProgressBarSize;
  /** Colour status */
  status?: ProgressBarStatus;
  /** Progress value 0–100 */
  value?: number;
  /** Accessible label */
  label?: string;
  /** Heading displayed above the linear bar (body/lrg-semibold, text/headings). Linear only. */
  heading?: string;
  /** Subtext displayed below the linear bar (body/xsm, text/subtext). Linear only. */
  subtext?: string;
}

/* ─── Circle SVG dimensions (from Figma) ───────────────────────────────────── */
const CIRCLE_CONFIG = {
  sm: { size: 80,  strokeWidth: 8,  radius: 32 },
  lg: { size: 120, strokeWidth: 10, radius: 50 },
} as const;

export function ProgressBar({
  type    = 'linear',
  size    = 'sm',
  status  = 'default',
  value   = 0,
  label   = 'Progress',
  heading,
  subtext,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, value));

  if (type === 'circle') {
    const { size: dim, strokeWidth, radius } = CIRCLE_CONFIG[size];
    const circumference = 2 * Math.PI * radius;
    const offset       = circumference - (pct / 100) * circumference;
    const center       = dim / 2;

    return (
      <div
        className={`progress-circle progress-circle--${size} progress-circle--${status}`}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <svg
          className="progress-circle__svg"
          width={dim}
          height={dim}
          viewBox={`0 0 ${dim} ${dim}`}
        >
          {/* Track */}
          <circle
            className="progress-circle__track"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
          {/* Fill */}
          <circle
            className="progress-circle__fill"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
      </div>
    );
  }

  /* ── Linear ── */
  const bar = (
    <div
      className={`progress-linear progress-linear--${size} progress-linear--${status}`}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div
        className="progress-linear__fill"
        style={{ width: `${pct}%` }}
      />
    </div>
  );

  if (heading || subtext) {
    return (
      <div className="progress-linear__labeled">
        {heading && <span className={`progress-linear__heading progress-linear__heading--${size}`}>{heading}</span>}
        <div className="progress-linear__bar-row">
          {bar}
          <span className="progress-linear__percentage">{pct}%</span>
        </div>
        {subtext && <span className="progress-linear__subtext">{subtext}</span>}
      </div>
    );
  }

  return bar;
}
