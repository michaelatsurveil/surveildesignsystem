/**
 * Breadcrumb component
 * https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=469-1209
 *
 * Sizes:  sm (24px) | lg (28px)
 * States: Default | Hovered | Pressed | Focused | Active | Disabled
 * Separator: Slash icon 16×16, stroke #6B7280
 */

import { Slash } from 'lucide-react';
import './Breadcrumb.css';

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
            isActive && 'breadcrumb__item--active',
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
                  <Slash size={16} color="#6B7280" strokeWidth={1.5} />
                </span>
              )}
              {item.disabled || isActive ? (
                <span
                  className={itemClass}
                  aria-current={isActive ? 'page' : undefined}
                  aria-disabled={item.disabled ? true : undefined}
                >
                  {content}
                </span>
              ) : (
                <a href={item.href ?? '#'} className={itemClass}>
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
