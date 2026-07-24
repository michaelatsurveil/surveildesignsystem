/**
 * Timeline component
 * https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library
 *
 * Variants: default | positive | negative | neutral
 */

import { Calendar } from 'lucide-react';
import './Timeline.css';

export type TimelineVariant = 'default' | 'positive' | 'negative' | 'neutral';

export interface TimelineItem {
  /** Visual state — drives description text colour */
  variant?: TimelineVariant;
  /** Relative or categorical label (e.g. "Now", "At renewal") */
  status?: string;
  /** The action or event that happened at this step */
  header: string;
  /** Precise calendar date — only shown when a concrete date is known */
  date?: string;
  /** Measurable outcome or supporting context */
  description?: string;
  /** Whether to draw the connector line below this item. Defaults to true for all items except the last. */
  showConnector?: boolean;
}

export interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="timeline">
      {items.map((item, i) => {
        const variant = item.variant ?? 'default';
        const showConnector = item.showConnector ?? i < items.length - 1;

        return (
          <div key={i} className={`timeline__item timeline__item--${variant}`}>
            <div className="timeline__left">
              <div className="timeline__icon-wrap" aria-hidden>
                <Calendar size={14} strokeWidth={2} />
              </div>
              {showConnector && <div className="timeline__connector" />}
            </div>

            <div className="timeline__content">
              <div className="timeline__header-row">
                {item.status && (
                  <span className="timeline__status">{item.status}</span>
                )}
                {item.status && item.header && (
                  <span className="timeline__sep" aria-hidden />
                )}
                <span className="timeline__title">{item.header}</span>
                {item.date && <span className="timeline__sep" aria-hidden />}
                {item.date && (
                  <span className="timeline__date">{item.date}</span>
                )}
              </div>

              {item.description && (
                <p className="timeline__description">{item.description}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
