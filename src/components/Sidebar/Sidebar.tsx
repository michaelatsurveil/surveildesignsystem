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
}

const defaultHeader = (
  <div className="sidebar__logo-wrap">
    <Logo variant="light" height={32} />
  </div>
);

export function Sidebar({
  header = defaultHeader,
  navItems,
  user,
  poweredBy = true,
  footer,
  width = 260,
  className = '',
}: SidebarProps) {
  return (
    <aside
      className={`sidebar ${className}`.trim()}
      style={{ width: width ? `${width}px` : undefined }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="sidebar__header">
        {header}
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
        {poweredBy && (
          <p className="sidebar__powered">Powered by Surveil</p>
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

function SidebarNavLink({ item }: { item: SidebarNavItem }) {
  const hasChildren = item.children && item.children.length > 0;
  const content = (
    <>
      {item.icon && <span className="sidebar__nav-icon" aria-hidden>{item.icon}</span>}
      <span className="sidebar__nav-label">{item.label}</span>
      {hasChildren && <ChevronDown size={16} className="sidebar__nav-caret" aria-hidden />}
    </>
  );

  const className = `sidebar__nav-link ${item.active ? 'sidebar__nav-link--active' : ''}`.trim();

  if (item.href) {
    return (
      <a href={item.href} className={className}>
        {content}
      </a>
    );
  }
  if (item.onClick) {
    return (
      <button type="button" className={className} onClick={item.onClick}>
        {content}
      </button>
    );
  }
  return (
    <span className={className}>
      {content}
    </span>
  );
}
