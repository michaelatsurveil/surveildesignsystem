/**
 * Breadcrumb component
 * https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=469-1209
 *
 * Sizes:  sm (24px) | lg (28px)
 * States: Default | Hovered | Pressed | Focused | Active | Disabled
 * Separator: Slash icon 16×16, stroke #6B7280
 */

import './Breadcrumb.css';

/** Matches Figma Icon/Slash: 4×11px diagonal line in a 16×16 frame, stroke #6B7280 */
function SlashSeparator() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <line x1="10" y1="2.5" x2="6" y2="13.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export type BreadcrumbSize = 'sm' | 'lg';

export interface BreadcrumbItem {
  label: string;
  /** Omit for the active (current) item */
  href?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  size?: BreadcrumbSize;
}

export function Breadcrumb({ items, size = 'sm' }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={`breadcrumb breadcrumb--${size}`}>
      <ol className="breadcrumb__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isActive = isLast;

          const itemClass = [
            'breadcrumb__item',
            isLast && 'breadcrumb__item--current',
            item.disabled && 'breadcrumb__item--disabled',
          ]
            .filter(Boolean)
            .join(' ');

          const content = (
            <>
              {item.icon && (
                <span className="breadcrumb__icon" aria-hidden>{item.icon}</span>
              )}
              <span className="breadcrumb__label">{item.label}</span>
            </>
          );

          return (
            <li key={index} className="breadcrumb__entry">
              {index > 0 && (
                <span className="breadcrumb__separator" aria-hidden>
                  <SlashSeparator />
                </span>
              )}
              {item.disabled || isLast ? (
                <span
                  className={itemClass}
                  aria-current={isLast ? 'page' : undefined}
                  aria-disabled={item.disabled ? true : undefined}
                >
                  {content}
                </span>
              ) : (
                <a href={item.href ?? '#'} className={itemClass} onClick={e => e.preventDefault()}>
                  {content}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
