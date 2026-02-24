import { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { Tabs } from '../Tabs/Tabs';
import type { TabOption } from '../Tabs/Tabs';
import './SideDrawer.css';

export interface SideDrawerProps {
  /** Whether the drawer is open */
  open: boolean;
  /** Callback when drawer should close */
  onClose: () => void;
  /** Drawer title - concise and action-oriented */
  title?: string;
  /** Optional subtext - supporting context or short explanation */
  subtext?: string;
  /** Optional tabs when drawer contains multiple related views */
  tabs?: TabOption[];
  /** Currently selected tab value */
  tabValue?: string;
  /** Callback when tab changes */
  onTabChange?: (value: string) => void;
  /** Drawer content */
  children: React.ReactNode;
  /** Side from which the drawer slides in */
  side?: 'left' | 'right';
  /** Width variant */
  width?: 'sm' | 'md' | 'lg';
  /** Optional footer (action bar) - buttons left-aligned */
  footer?: React.ReactNode;
  /** Close when clicking the backdrop */
  closeOnBackdropClick?: boolean;
  /** Close when pressing Escape */
  closeOnEscape?: boolean;
}

export function SideDrawer({
  open,
  onClose,
  title,
  subtext,
  tabs,
  tabValue,
  onTabChange,
  children,
  side = 'right',
  width = 'md',
  footer,
  closeOnBackdropClick = true,
  closeOnEscape = true,
}: SideDrawerProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === 'Escape') onClose();
    },
    [closeOnEscape, onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, handleEscape]);

  if (!open) return null;

  return (
    <div
      className="side-drawer"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'side-drawer-title' : undefined}
    >
      <div
        className="side-drawer__backdrop"
        onClick={closeOnBackdropClick ? onClose : undefined}
        aria-hidden
      />
      <aside
        className={`side-drawer__panel side-drawer__panel--${side} side-drawer__panel--${width}`}
      >
        <header className="side-drawer__header">
          <div className="side-drawer__header-text">
            {title && (
              <h2 id="side-drawer-title" className="side-drawer__title">
                {title}
              </h2>
            )}
            {subtext && <p className="side-drawer__subtext">{subtext}</p>}
          </div>
          <button
            type="button"
            className="side-drawer__close"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </header>
        {tabs && tabs.length > 0 && tabValue !== undefined && onTabChange && (
          <div className="side-drawer__tabs">
            <Tabs
              options={tabs}
              value={tabValue}
              onChange={onTabChange}
            />
          </div>
        )}
        <div className="side-drawer__body">{children}</div>
        {footer && <footer className="side-drawer__footer">{footer}</footer>}
      </aside>
    </div>
  );
}
