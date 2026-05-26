/**
 * SecondarySidebar component from Figma Component Library
 * https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=168-4711
 *
 * Compact contextual panel (250px) with account header, flat nav items,
 * optional version label, divider, and footer nav items.
 *
 * Collapse behaviour:
 * - ChevronsLeftRight toggle inside the header collapses the sidebar entirely
 * - Collapses to width 0 (fully hidden)
 * - A circular white ChevronRight tab button sits on the sidebar boundary,
 *   allowing the user to re-expand
 */

import { useState } from 'react';
import { ChevronsLeftRight, ChevronRight, Menu } from 'lucide-react';
import { Button } from '../Button/Button';
import './SecondarySidebar.css';

export interface SecondarySidebarItem {
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
}

export interface SecondarySidebarAccount {
  name: string;
  email: string;
  avatar?: React.ReactNode;
}

export interface SecondarySidebarProps {
  account?: SecondarySidebarAccount;
  items: SecondarySidebarItem[];
  footerItems?: SecondarySidebarItem[];
  version?: string;
  /** Width in px when expanded; default 250 */
  width?: number;
  /** @deprecated No longer used — sidebar collapses to 0 width */
  collapsedWidth?: number;
  /** Show the collapse toggle; default false */
  collapsible?: boolean;
  /**
   * Show a tertiary "≡ Menu" button positioned 10px to the right of and
   * below the sidebar — alternative collapse trigger (old-version style).
   */
  menuToggle?: boolean;
  /** Start collapsed; default false */
  defaultCollapsed?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
  className?: string;
}

export function SecondarySidebar({
  account,
  items,
  footerItems,
  version,
  width = 250,
  collapsible = false,
  menuToggle = false,
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

  const showHeader = account || collapsible;

  return (
    <div
      className="secondary-sidebar-wrap"
      style={{ width: collapsed ? '0px' : `${width}px` }}
    >
      <aside
        className={[
          'secondary-sidebar',
          collapsed ? 'secondary-sidebar--collapsed' : '',
          className,
        ].filter(Boolean).join(' ')}
        style={{ width: collapsed ? '0px' : `${width}px` }}
        role="navigation"
        aria-label="Secondary navigation"
      >
        {/* ── Header: account + collapse toggle ── */}
        {showHeader && (
          <div className="secondary-sidebar__header">
            {account && (
              <>
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
              </>
            )}
            {collapsible && (
              <button
                type="button"
                className="secondary-sidebar__collapse-btn"
                onClick={handleToggle}
                aria-label="Collapse sidebar"
                title="Collapse sidebar"
              >
                <ChevronsLeftRight size={14} aria-hidden />
              </button>
            )}
          </div>
        )}

        {/* ── Primary nav list ── */}
        <nav className="secondary-sidebar__nav">
          <ul className="secondary-sidebar__list" role="list">
            {items.map((item, i) => (
              <li key={i}>
                <SecondarySidebarNavItem item={item} />
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Footer ── */}
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

      {/* ── Floating tab: circular white chevron on the sidebar boundary ── */}
      {collapsible && collapsed && (
        <button
          type="button"
          className="secondary-sidebar__tab"
          onClick={handleToggle}
          aria-label="Expand sidebar"
          title="Expand sidebar"
        >
          <ChevronRight size={14} aria-hidden />
        </button>
      )}

      {/* ── External menu toggle (old-version style) ── */}
      {menuToggle && (
        <Button
          variant="tertiary"
          size="sm"
          className="secondary-sidebar__menu-toggle"
          onClick={handleToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Menu size={14} aria-hidden />
          Menu
        </Button>
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
