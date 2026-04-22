import { createContext, useContext, useState } from 'react';
import { ChevronDown, ChevronRight, ChevronsLeftRight } from 'lucide-react';
import { Logo } from '../Logo/Logo';
import './Sidebar.css';

// ─── Collapse context (avoids prop-drilling into SidebarNavLink) ──────────────
// Value is `true` when the sidebar is visually collapsed (icon-only)
const SidebarCollapseContext = createContext(false);

export interface SidebarNavItem {
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  children?: SidebarNavItem[];
  showCaret?: boolean;
  defaultExpanded?: boolean;
}

export interface SidebarUser {
  name: string;
  email: string;
  href?: string;
}

export interface SidebarProps {
  header?: React.ReactNode;
  navItems: SidebarNavItem[];
  user?: SidebarUser;
  poweredBy?: boolean;
  footer?: React.ReactNode;
  /** Width in px when expanded; default 260 */
  width?: number;
  /** Width in px when collapsed (icon-only); default 56 */
  collapsedWidth?: number;
  className?: string;
  variant?: 'default' | 'navigator';
  /**
   * When true, a circular ChevronsLeftRight button is shown in the header.
   * - When expanded: clicking the button permanently collapses the sidebar (icon-only mode, symbol logo).
   * - When collapsed: hovering temporarily expands it as an overlay and shows the button.
   * - Clicking the button while hover-expanded permanently pins it open.
   */
  collapsible?: boolean;
  /** Start collapsed; default false */
  defaultCollapsed?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
}

export function Sidebar({
  header,
  navItems,
  user,
  poweredBy = true,
  footer,
  width = 260,
  collapsedWidth = 56,
  className = '',
  variant = 'default',
  collapsible = false,
  defaultCollapsed = false,
  onCollapseChange,
}: SidebarProps) {
  const isNavigator = variant === 'navigator';
  // Permanently collapsed (persists across hover)
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  // Temporarily expanded via hover
  const [hovered, setHovered] = useState(false);

  // The sidebar is visually open when permanently expanded OR when hovered
  const isOpen = !collapsed || hovered;

  const handleToggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    // When pinning open, clear the hover flag
    if (!next) setHovered(false);
    onCollapseChange?.(next);
  };

  const resolvedHeader = header ?? (
    <div className="sidebar__logo-wrap">
      <Logo variant="light" height={32} />
    </div>
  );

  return (
    <SidebarCollapseContext.Provider value={!isOpen}>
      <aside
        className={[
          'sidebar',
          isNavigator ? 'sidebar--navigator' : '',
          !isOpen ? 'sidebar--collapsed' : '',
          collapsed && hovered ? 'sidebar--hover-expanded' : '',
          className,
        ].filter(Boolean).join(' ')}
        style={{ width: isOpen ? `${width}px` : `${collapsedWidth}px` }}
        role="navigation"
        aria-label="Main navigation"
        onMouseEnter={() => { if (collapsible && collapsed) setHovered(true); }}
        onMouseLeave={() => { if (collapsible) setHovered(false); }}
      >
        <div className="sidebar__header">
          {/* Symbol logo when collapsed (icon-only); full logo when open */}
          <div className="sidebar__header-logo">
            {isOpen ? resolvedHeader : (
              <div className="sidebar__logo-wrap">
                <Logo variant="symbol" height={24} />
              </div>
            )}
          </div>

          {/* ChevronsLeftRight toggle — only shown when sidebar is open (expanded or hover-expanded) */}
          {collapsible && isOpen && (
            <button
              type="button"
              className="sidebar__collapse-btn"
              onClick={handleToggle}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <ChevronsLeftRight size={14} aria-hidden />
            </button>
          )}
        </div>

        <nav className="sidebar__nav">
          <ul className="sidebar__nav-list" role="list">
            {navItems.map((item, i) => (
              <li key={i} className="sidebar__nav-item">
                <SidebarNavLink item={item} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar__bottom">
          {user && (
            <div className="sidebar__user">
              {user.href ? (
                <a href={user.href} className="sidebar__user-link" onClick={e => e.preventDefault()}>
                  <span className="sidebar__user-icon" aria-hidden>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <span className="sidebar__user-text">
                    <span className="sidebar__user-name">{user.name}</span>
                    <span className="sidebar__user-email">{user.email}</span>
                  </span>
                  <ChevronRight size={16} className="sidebar__user-arrow" aria-hidden />
                </a>
              ) : (
                <div className="sidebar__user-block">
                  <span className="sidebar__user-icon" aria-hidden>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <span className="sidebar__user-text">
                    <span className="sidebar__user-name">{user.name}</span>
                    <span className="sidebar__user-email">{user.email}</span>
                  </span>
                </div>
              )}
            </div>
          )}
          {poweredBy && !isNavigator && (
            <div className="sidebar__powered">
              <span className="sidebar__powered-by">Powered by</span>
              <span className="sidebar__powered-name">Surveil</span>
            </div>
          )}
          {footer && (
            <div className="sidebar__footer">
              {footer}
            </div>
          )}
        </div>
      </aside>
    </SidebarCollapseContext.Provider>
  );
}

function SidebarNavLink({ item, depth = 0 }: { item: SidebarNavItem; depth?: number }) {
  const isCollapsed = useContext(SidebarCollapseContext);
  const hasChildren = item.children && item.children.length > 0;
  const [expanded, setExpanded] = useState(item.defaultExpanded ?? false);
  const showCaret = !isCollapsed && item.showCaret !== false && (item.showCaret === true || hasChildren);

  const linkClass = [
    'sidebar__nav-link',
    item.active ? 'sidebar__nav-link--active' : '',
    depth > 0 ? 'sidebar__nav-link--child' : '',
  ].filter(Boolean).join(' ');

  const indentStyle: React.CSSProperties = isCollapsed
    ? { padding: '8px', borderRadius: '6px', justifyContent: 'center' }
    : {
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingLeft: `${12 + depth * 8}px`,
        paddingRight: '16px',
        borderRadius: '6px',
      };

  const handleToggle = () => {
    if (hasChildren) setExpanded(prev => !prev);
  };

  const content = (
    <>
      {item.icon && <span className="sidebar__nav-icon" aria-hidden>{item.icon}</span>}
      {!isCollapsed && <span className="sidebar__nav-label">{item.label}</span>}
      {showCaret && (
        <ChevronDown
          size={16}
          className={`sidebar__nav-caret ${expanded ? 'sidebar__nav-caret--open' : ''}`}
          aria-hidden
        />
      )}
    </>
  );

  const trigger = hasChildren ? (
    <button
      type="button"
      className={linkClass}
      style={indentStyle}
      onClick={handleToggle}
      aria-expanded={isCollapsed ? undefined : expanded}
      title={isCollapsed ? item.label : undefined}
    >
      {content}
    </button>
  ) : item.href ? (
    <a
      href={item.href}
      className={linkClass}
      style={indentStyle}
      onClick={e => e.preventDefault()}
      title={isCollapsed ? item.label : undefined}
    >
      {content}
    </a>
  ) : item.onClick ? (
    <button
      type="button"
      className={linkClass}
      style={indentStyle}
      onClick={item.onClick}
      title={isCollapsed ? item.label : undefined}
    >
      {content}
    </button>
  ) : (
    <span className={linkClass} style={indentStyle} title={isCollapsed ? item.label : undefined}>
      {content}
    </span>
  );

  return (
    <>
      {trigger}
      {hasChildren && expanded && !isCollapsed && (
        <ul className="sidebar__subnav-list" role="list">
          {item.children!.map((child, i) => (
            <li key={i} className="sidebar__nav-item">
              <SidebarNavLink item={child} depth={depth + 1} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
