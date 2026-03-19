import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Logo } from '../Logo/Logo';
import './Sidebar.css';

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
  /** Additional class name */
  className?: string;
  /**
   * Visual variant.
   * - `default` — dark navy background (primary sidebar)
   * - `navigator` — white background with dark text (secondary/contextual sidebar)
   */
  variant?: 'default' | 'navigator';
}

export function Sidebar({
  header,
  navItems,
  user,
  poweredBy = true,
  footer,
  width = 260,
  className = '',
  variant = 'default',
}: SidebarProps) {
  const isNavigator = variant === 'navigator';
  // Both sidebar variants have a white header background → always use the light-background logo
  const resolvedHeader = header ?? (
    <div className="sidebar__logo-wrap">
      <Logo variant="light" height={32} />
    </div>
  );
  return (
    <aside
      className={[
        'sidebar',
        isNavigator ? 'sidebar--navigator' : '',
        className,
      ].filter(Boolean).join(' ')}
      style={{ width: width ? `${width}px` : undefined }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="sidebar__header">
        {resolvedHeader}
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
              <a href={user.href} className="sidebar__user-link">
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
  );
}

function SidebarNavLink({ item, depth = 0 }: { item: SidebarNavItem; depth?: number }) {
  const hasChildren = item.children && item.children.length > 0;
  const [expanded, setExpanded] = useState(item.defaultExpanded ?? false);
  const showCaret = item.showCaret !== false && (item.showCaret === true || hasChildren);

  const linkClass = [
    'sidebar__nav-link',
    item.active ? 'sidebar__nav-link--active' : '',
    depth > 0 ? 'sidebar__nav-link--child' : '',
  ].filter(Boolean).join(' ');

  // Figma: L1=12px, L2=20px, L3=28px, L4=36px, L5=44px → 12px + depth × 8px
  // Fully explicit so inline style wins over CSS shorthand on all levels
  const indentStyle: React.CSSProperties = {
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: `${12 + depth * 8}px`,
    paddingRight: '12px',
    borderRadius: '8px',
  };

  const handleToggle = () => {
    if (hasChildren) setExpanded(prev => !prev);
  };

  const content = (
    <>
      {item.icon && <span className="sidebar__nav-icon" aria-hidden>{item.icon}</span>}
      <span className="sidebar__nav-label">{item.label}</span>
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
      aria-expanded={expanded}
    >
      {content}
    </button>
  ) : item.href ? (
    <a href={item.href} className={linkClass} style={indentStyle}>
      {content}
    </a>
  ) : item.onClick ? (
    <button type="button" className={linkClass} style={indentStyle} onClick={item.onClick}>
      {content}
    </button>
  ) : (
    <span className={linkClass} style={indentStyle}>{content}</span>
  );

  return (
    <>
      {trigger}
      {hasChildren && expanded && (
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
