import { createContext, useContext, useState } from 'react';
import { ChevronDown, ChevronRight, ChevronsLeftRight } from 'lucide-react';
import { Logo } from '../Logo/Logo';
import './Sidebar.css';

// ─── Collapse context (avoids prop-drilling into SidebarNavLink) ──────────────
const SidebarCollapseContext = createContext(false);

export interface SidebarNavItem {
  /** Link label */
  label: string;
  /** Optional icon (e.g. from lucide-react) */
  icon?: React.ReactNode;
  /** Link href; if omitted, use onClick or render as span */
  href?: string;
  /** Click handler when no href */
  onClick?: () => void;
  /** Whether this item is the current page */
  active?: boolean;
  /** Optional sub-items (expandable section) */
  children?: SidebarNavItem[];
  /** Show chevron on the right (default: true except when explicitly false) */
  showCaret?: boolean;
  /** Whether this item is expanded by default (only applies when children present) */
  defaultExpanded?: boolean;
}

export interface SidebarUser {
  /** Organization or display name */
  name: string;
  /** Email or secondary line */
  email: string;
  /** Link to profile/settings */
  href?: string;
}

export interface SidebarProps {
  /** Brand/logo in header; defaults to Surveil Logo (light variant on white background) */
  header?: React.ReactNode;
  /** Main navigation items */
  navItems: SidebarNavItem[];
  /** Optional user block (name, email, link) */
  user?: SidebarUser;
  /** Show "Powered by Surveil" above footer */
  poweredBy?: boolean;
  /** Footer content (e.g. Logout button) */
  footer?: React.ReactNode;
  /** Optional width in px; default 260 */
  width?: number;
  /** Width in px when collapsed; default 56 */
  collapsedWidth?: number;
  /** Additional class name */
  className?: string;
  /**
   * Visual variant.
   * - `default` — dark navy background (primary sidebar)
   * - `navigator` — white background with dark text (secondary/contextual sidebar)
   */
  variant?: 'default' | 'navigator';
  /**
   * When true, a ChevronsLeftRight toggle button is shown in the nav footer.
   * Clicking it collapses the sidebar to icon-only mode.
   */
  collapsible?: boolean;
  /** Initial collapsed state (only used when collapsible=true); default false */
  defaultCollapsed?: boolean;
  /** Callback fired when the collapsed state changes */
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
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const handleToggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    onCollapseChange?.(next);
  };

  // Both sidebar variants have a white header background → always use the light-background logo
  const resolvedHeader = header ?? (
    <div className="sidebar__logo-wrap">
      <Logo variant="light" height={32} />
    </div>
  );

  return (
    <SidebarCollapseContext.Provider value={collapsed}>
      <aside
        className={[
          'sidebar',
          isNavigator ? 'sidebar--navigator' : '',
          collapsed ? 'sidebar--collapsed' : '',
          className,
        ].filter(Boolean).join(' ')}
        style={{ width: collapsed ? `${collapsedWidth}px` : `${width}px` }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="sidebar__header">
          {resolvedHeader}
          {/* Collapse toggle — sits to the right of the logo in the header */}
          {collapsible && (
            <button
              type="button"
              className="sidebar__collapse-btn"
              onClick={handleToggle}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <ChevronsLeftRight size={16} aria-hidden />
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
              {/* Figma: two stacked text nodes, no logo. Both white at 40% opacity */}
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
  const collapsed = useContext(SidebarCollapseContext);
  const hasChildren = item.children && item.children.length > 0;
  const [expanded, setExpanded] = useState(item.defaultExpanded ?? false);
  const showCaret = !collapsed && item.showCaret !== false && (item.showCaret === true || hasChildren);

  const linkClass = [
    'sidebar__nav-link',
    item.active ? 'sidebar__nav-link--active' : '',
    depth > 0 ? 'sidebar__nav-link--child' : '',
  ].filter(Boolean).join(' ');

  // Collapsed: centre the icon with uniform padding; Expanded: full indent per depth level
  const indentStyle: React.CSSProperties = collapsed
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
      {!collapsed && <span className="sidebar__nav-label">{item.label}</span>}
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
      aria-expanded={collapsed ? undefined : expanded}
      title={collapsed ? item.label : undefined}
    >
      {content}
    </button>
  ) : item.href ? (
    <a
      href={item.href}
      className={linkClass}
      style={indentStyle}
      onClick={e => e.preventDefault()}
      title={collapsed ? item.label : undefined}
    >
      {content}
    </a>
  ) : item.onClick ? (
    <button
      type="button"
      className={linkClass}
      style={indentStyle}
      onClick={item.onClick}
      title={collapsed ? item.label : undefined}
    >
      {content}
    </button>
  ) : (
    <span className={linkClass} style={indentStyle} title={collapsed ? item.label : undefined}>
      {content}
    </span>
  );

  return (
    <>
      {trigger}
      {/* Hide sub-nav when collapsed */}
      {hasChildren && expanded && !collapsed && (
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
