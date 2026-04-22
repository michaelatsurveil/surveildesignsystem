/**
 * SecondarySidebar component from Figma Component Library
 * https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=168-4711
 *
 * Compact contextual panel (250px) with account header, flat nav items,
 * optional version label, divider, and footer nav item.
 *
 * When collapsible=true, a small "≡ Menu" button is rendered outside and to
 * the right of the sidebar (position: absolute, 16px from right edge, 4px
 * from top) — matching Figma node 1614:9570.
 */

import { useState } from 'react';
import { Menu } from 'lucide-react';
import './SecondarySidebar.css';

export interface SecondarySidebarItem {
  /** Nav item label */
  label: string;
  /** Optional icon (e.g. from lucide-react) */
  icon?: React.ReactNode;
  /** Link href */
  href?: string;
  /** Click handler when no href */
  onClick?: () => void;
  /** Whether this is the active/current item */
  active?: boolean;
  /** Disabled state */
  disabled?: boolean;
}

export interface SecondarySidebarAccount {
  /** Organisation / display name */
  name: string;
  /** Email or secondary line */
  email: string;
  /** Optional custom avatar node; falls back to initials circle */
  avatar?: React.ReactNode;
}

export interface SecondarySidebarProps {
  /** Account block shown at the top */
  account?: SecondarySidebarAccount;
  /** Primary nav items */
  items: SecondarySidebarItem[];
  /** Items shown below the divider (e.g. "Back to Homepage") */
  footerItems?: SecondarySidebarItem[];
  /** Version label shown above the divider (e.g. "Version 4.3.3") */
  version?: string;
  /** Width in px when expanded; default 250 */
  width?: number;
  /** Width in px when collapsed; default 48 */
  collapsedWidth?: number;
  /**
   * When true, a small "≡ Menu" button appears just outside the right edge
   * of the sidebar (16px from the edge, 4px from the top). Clicking toggles
   * the collapsed/expanded state.
   */
  collapsible?: boolean;
  /** Start collapsed; default false */
  defaultCollapsed?: boolean;
  /** Called whenever the collapsed state changes */
  onCollapseChange?: (collapsed: boolean) => void;
  /** Additional class name */
  className?: string;
}

export function SecondarySidebar({
  account,
  items,
  footerItems,
  version,
  width = 250,
  collapsible = false,
  defaultCollapsed = false,
  onCollapseChange,
  className = '',
}: SecondarySidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const handleToggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    onCollapseChange?.(next);
  };

  return (
    <div className="secondary-sidebar-wrap">
      <aside
        className={[
          'secondary-sidebar',
          collapsed ? 'secondary-sidebar--collapsed' : '',
          className,
        ].filter(Boolean).join(' ')}
        style={{ width: collapsed ? '0' : `${width}px` }}
        role="navigation"
        aria-label="Secondary navigation"
      >
        {/* Account header */}
        {account && (
          <div className="secondary-sidebar__account">
            <div className="secondary-sidebar__account-avatar" aria-hidden>
              {account.avatar ?? (
                <span className="secondary-sidebar__account-initials">
                  {account.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className="secondary-sidebar__account-text">
              <span className="secondary-sidebar__account-name">{account.name}</span>
              <span className="secondary-sidebar__account-email">{account.email}</span>
            </div>
          </div>
        )}

        {/* Primary nav list */}
        <nav className="secondary-sidebar__nav">
          <ul className="secondary-sidebar__list" role="list">
            {items.map((item, i) => (
              <li key={i}>
                <SecondarySidebarNavItem item={item} />
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer: version + divider + footer items */}
        {(version || (footerItems && footerItems.length > 0)) && (
          <div className="secondary-sidebar__footer">
            {version && (
              <span className="secondary-sidebar__version">{version}</span>
            )}
            <hr className="secondary-sidebar__divider" />
            {footerItems && footerItems.length > 0 && (
              <ul className="secondary-sidebar__list" role="list">
                {footerItems.map((item, i) => (
                  <li key={i}>
                    <SecondarySidebarNavItem item={item} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </aside>

      {/* ≡ Menu button — positioned outside the sidebar, 16px from right, 4px down */}
      {collapsible && (
        <button
          type="button"
          className="secondary-sidebar__menu-btn"
          onClick={handleToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Menu size={12} aria-hidden />
          <span>Menu</span>
        </button>
      )}
    </div>
  );
}

function SecondarySidebarNavItem({ item }: { item: SecondarySidebarItem }) {
  const cls = [
    'secondary-sidebar__item',
    item.active ? 'secondary-sidebar__item--active' : '',
    item.disabled ? 'secondary-sidebar__item--disabled' : '',
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {item.icon && (
        <span className="secondary-sidebar__item-icon" aria-hidden>
          {item.icon}
        </span>
      )}
      <span className="secondary-sidebar__item-label">{item.label}</span>
    </>
  );

  if (item.disabled) {
    return <span className={cls}>{content}</span>;
  }

  if (item.href) {
    return (
      <a href={item.href} className={cls} onClick={e => e.preventDefault()}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={cls} onClick={item.onClick}>
      {content}
    </button>
  );
}
