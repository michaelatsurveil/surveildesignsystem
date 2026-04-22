import { Search, Megaphone, MonitorPlay, Sparkles, HelpCircle } from 'lucide-react';
import { Breadcrumb } from '../Breadcrumb/Breadcrumb';
import type { BreadcrumbItem } from '../Breadcrumb/Breadcrumb';
import './Topbar.css';

/** @deprecated Use BreadcrumbItem from the Breadcrumb component instead */
export type TopbarBreadcrumbItem = BreadcrumbItem;

export interface TopbarProps {
  /** Breadcrumb trail shown on the left */
  breadcrumbs?: BreadcrumbItem[];
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
      <div className="topbar__breadcrumb">
        <Breadcrumb items={breadcrumbs} size="sm" />
      </div>

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
