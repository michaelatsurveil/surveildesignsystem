/**
 * SecondarySidebar component from Figma Component Library
 * https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=168-4711
 *
 * Compact contextual panel (250px) with account header, flat nav items,
 * optional version label, divider, and footer nav items.
 *
 * Collapse behaviour mirrors the Navigator sidebar:
 * - ChevronsLeftRight toggle inside the header (not an external button)
 * - Collapses to a 48px icon-only strip
 * - Hover temporarily expands as a floating overlay
 */

import { useState } from 'react';
import { ChevronsLeftRight } from 'lucide-react';
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
  /** Width in px when collapsed (icon-only strip); default 48 */
  collapsedWidth?: number;
  /** Show the collapse toggle; default false */
  collapsible?: boolean;
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
  collapsedWidth = 48,
  collapsible = false,
  defaultCollapsed = false,
  onCollapseChange,
  className = '',
}: SecondarySidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [hovered, setHovered] = useState(false);

  // Visually open when permanently expanded OR temporarily hover-expanded
  const isOpen = !collapsed || hovered;

  const handleToggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    if (!next) setHovered(false);
    onCollapseChange?.(next);
  };

  const showHeader = account || collapsible;

  return (
    <div
      className="secondary-sidebar-wrap"
      style={{ width: isOpen ? `${width}px` : `${collapsedWidth}px` }}
    >
      <aside
        className={[
          'secondary-sidebar',
          !isOpen ? 'secondary-sidebar--collapsed' : '',
          collapsed && hovered ? 'secondary-sidebar--hover-expanded' : '',
          className,
        ].filter(Boolean).join(' ')}
        style={{ width: isOpen ? `${width}px` : `${collapsedWidth}px` }}
        role="navigation"
        aria-label="Secondary navigation"
        onMouseEnter={() => { if (collapsible && collapsed) setHovered(true); }}
        onMouseLeave={() => { if (collapsible) setHovered(false); }}
      >
        {/* ── Header: account + collapse toggle ── */}
        {showHeader && (
          <div className="secondary-sidebar__header">
            {account && isOpen && (
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
                aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
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
                <SecondarySidebarNavItem item={item} isCollapsed={!isOpen} />
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Footer ── */}
        {(version || (footerItems && footerItems.length > 0)) && (
          <div className="secondary-sidebar__footer">
            {isOpen && version && (
              <span className="secondary-sidebar__version">{version}</span>
            )}
            {isOpen && <hr className="secondary-sidebar__divider" />}
            {footerItems && footerItems.length > 0 && (
              <ul className="secondary-sidebar__list" role="list">
                {footerItems.map((item, i) => (
                  <li key={i}>
                    <SecondarySidebarNavItem item={item} isCollapsed={!isOpen} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}

function SecondarySidebarNavItem({
  item,
  isCollapsed,
}: {
  item: SecondarySidebarItem;
  isCollapsed: boolean;
}) {
  const cls = [
    'secondary-sidebar__item',
    item.active ? 'secondary-sidebar__item--active' : '',
    item.disabled ? 'secondary-sidebar__item--disabled' : '',
    isCollapsed ? 'secondary-sidebar__item--icon-only' : '',
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {item.icon && (
        <span className="secondary-sidebar__item-icon" aria-hidden>
          {item.icon}
        </span>
      )}
      {!isCollapsed && (
        <span className="secondary-sidebar__item-label">{item.label}</span>
      )}
    </>
  );

  const titleAttr = isCollapsed ? item.label : undefined;

  if (item.disabled) {
    return <span className={cls} title={titleAttr}>{content}</span>;
  }

  if (item.href) {
    return (
      <a href={item.href} className={cls} onClick={e => e.preventDefault()} title={titleAttr}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={cls} onClick={item.onClick} title={titleAttr}>
      {content}
    </button>
  );
}
