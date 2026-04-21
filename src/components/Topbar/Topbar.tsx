import { Search, Megaphone, MonitorPlay, Sparkles, HelpCircle, ChevronRight } from 'lucide-react';
import './Topbar.css';

export interface TopbarBreadcrumbItem {
  /** Display label */
  label: string;
  /** Optional href — renders as a link when provided */
  href?: string;
  /** Whether this is the current/active page (last item) */
  active?: boolean;
}

export interface TopbarProps {
  /** Breadcrumb trail shown on the left */
  breadcrumbs?: TopbarBreadcrumbItem[];
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Called when the search query changes */
  onSearch?: (query: string) => void;
  /** Called when the announcements icon is clicked */
  onAnnouncements?: () => void;
  /** Called when the demos icon is clicked */
  onDemos?: () => void;
  /** Called when the AI/sparkles icon is clicked */
  onAI?: () => void;
  /** Called when the help icon is clicked */
  onHelp?: () => void;
  /** Additional class name */
  className?: string;
}

/**
 * Topbar — Figma Component Library → Navigation → Topbar (1554:8129)
 * Frosted-glass header with breadcrumb navigation on the left
 * and a search bar + icon cluster on the right.
 */
export function Topbar({
  breadcrumbs = [],
  searchPlaceholder = 'Search…',
  onSearch,
  onAnnouncements,
  onDemos,
  onAI,
  onHelp,
  className = '',
}: TopbarProps) {
  return (
    <header className={`topbar ${className}`.trim()} role="banner">
      {/* Left: breadcrumb */}
      <nav className="topbar__breadcrumb" aria-label="Breadcrumb">
        <ol className="topbar__breadcrumb-list">
          {breadcrumbs.map((item, i) => {
            const isLast = i === breadcrumbs.length - 1;
            return (
              <li key={i} className="topbar__breadcrumb-item">
                {item.href && !isLast ? (
                  <a href={item.href} className="topbar__breadcrumb-link">
                    {item.label}
                  </a>
                ) : (
                  <span
                    className={`topbar__breadcrumb-link${isLast ? ' topbar__breadcrumb-link--active' : ''}`}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                )}
                {!isLast && (
                  <ChevronRight
                    size={14}
                    className="topbar__breadcrumb-separator"
                    aria-hidden
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Right: search + icons */}
      <div className="topbar__right">
        {/* Search bar */}
        <div className="topbar__search">
          <Search size={16} className="topbar__search-icon" aria-hidden />
          <input
            type="search"
            className="topbar__search-input"
            placeholder={searchPlaceholder}
            onChange={(e) => onSearch?.(e.target.value)}
            aria-label="Search"
          />
        </div>

        {/* Icon cluster */}
        <div className="topbar__icons" aria-label="Quick actions">
          <button
            type="button"
            className="topbar__icon-btn"
            onClick={onAnnouncements}
            aria-label="Announcements"
          >
            <Megaphone size={16} />
          </button>
          <button
            type="button"
            className="topbar__icon-btn"
            onClick={onDemos}
            aria-label="Demos"
          >
            <MonitorPlay size={16} />
          </button>
          <button
            type="button"
            className="topbar__icon-btn"
            onClick={onAI}
            aria-label="AI assistant"
          >
            <Sparkles size={16} />
          </button>
          <button
            type="button"
            className="topbar__icon-btn"
            onClick={onHelp}
            aria-label="Help"
          >
            <HelpCircle size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
