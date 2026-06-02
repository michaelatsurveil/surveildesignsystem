import { Fragment, useEffect, useRef, useState } from 'react';
import { MoreVertical, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Filter, RefreshCw, Download, Search, CircleAlert, ChevronDown, Check } from 'lucide-react';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { Filter as FilterComponent } from '../Filter/Filter';
import type { FilterField } from '../Filter/Filter';
import './DataTable.css';

export interface DataTableViewPanelSection {
  /** Section heading shown above the controls */
  label: string;
  /** 'segment' renders a segmented toggle (e.g. Annual / Monthly); 'list' renders checkable items (e.g. Group by) */
  type: 'segment' | 'list';
  /** Available options */
  options: { label: string; value: string }[];
  /** Currently selected value */
  value?: string;
  /** Called when the user picks an option */
  onChange?: (value: string) => void;
}

export interface DataTableToolbarRightAction {
  /** 'buttons' shows primary + secondary Button; 'view-panel' shows a rich panel with sections */
  type: 'buttons' | 'view-panel';
  // For type='buttons'
  primary?: { label: string; onClick?: () => void };
  secondary?: { label: string; onClick?: () => void };
  // For type='view-panel'
  viewPanelSections?: DataTableViewPanelSection[];
}

export interface DataTableFilterConfig {
  /**
   * Available filter fields shown in the field-selector dropdown.
   * Each field carries its own value options for the multiselect.
   */
  fields: FilterField[];
  /** Currently applied field value (controlled) */
  fieldValue?: string;
  /** Currently applied values — multiselect (controlled) */
  values?: string[];
  /** Called when the user clicks "Add" in the filter panel */
  onApply?: (fieldValue: string, values: string[]) => void;
  /** Called when the × remove button on the applied chip is clicked */
  onRemove?: () => void;
  /** Placeholder for the idle trigger. Defaults to "Select Filter" */
  placeholder?: string;
}

export interface DataTableToolbar {
  /** Table title shown on the left */
  title?: string;
  /**
   * Filter configurations. When provided, clicking the filter icon expands
   * a filter bar below the toolbar with one Filter component per config.
   */
  filters?: DataTableFilterConfig[];
  /** Start with the filter bar expanded (requires filters to be set) */
  defaultFilterBarOpen?: boolean;
  /** Called when filter icon is clicked (fires regardless of filters prop) */
  onFilter?: () => void;
  /** Called when refresh icon is clicked */
  onRefresh?: () => void;
  /** Called when download icon is clicked */
  onDownload?: () => void;
  /** Called when search query changes */
  onSearch?: (query: string) => void;
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Filter components shown inline in the toolbar (next to search) */
  inlineFilters?: DataTableFilterConfig[];
  /** Callback for the "+ New filter" button shown after inline filters */
  onAddFilter?: () => void;
  /** Right-side action: primary+secondary buttons, or a View dropdown */
  rightAction?: DataTableToolbarRightAction;
}

export interface DataTableColumn<T = Record<string, unknown>> {
  /** Column key (matches row data keys) */
  id: string;
  /** Header label */
  header: string;
  /** Show sort/filter affordance */
  sortable?: boolean;
  /** Custom cell renderer */
  render?: (value: unknown, row: T) => React.ReactNode;
  /** Render cell as an editable text input (ignored when render is also set) */
  editable?: boolean;
  /** Called when an editable cell's value changes */
  onCellChange?: (value: string, row: T) => void;
  /** Extra class name applied to the <th> for this column */
  headerClassName?: string;
}

export interface DataTablePagination {
  /** Current page (1-based) */
  page: number;
  /** Rows per page */
  pageSize: number;
  /** Total number of rows across all pages */
  total: number;
  /** Available page size options */
  pageSizeOptions?: number[];
  /** Called when page changes */
  onPageChange: (page: number) => void;
  /** Called when page size changes */
  onPageSizeChange?: (size: number) => void;
}

export interface DataTableGroupConfig<T = Record<string, unknown>> {
  /** Unique group ID */
  id: string;
  /** Content rendered after the chevron in the group header row (e.g., indicator + label + tag) */
  header: React.ReactNode;
  /** Rows belonging to this group */
  rows: T[];
  /** Per-group pagination */
  pagination?: DataTablePagination;
}

export interface DataTableProps<T = Record<string, unknown>> {
  /** Column definitions */
  columns?: DataTableColumn<T>[];
  /** Row data (array of objects keyed by column id). Omit or pass [] when using `groups`. */
  rows?: T[];
  /** Row key extractor for React keys */
  getRowId?: (row: T) => string;
  /** Enable row selection (adds checkbox column) */
  selectable?: boolean;
  /** Selected row ids (controlled) */
  selectedRowIds?: Set<string>;
  /** Selection change callback */
  onSelectionChange?: (selectedIds: Set<string>) => void;
  /** Toolbar configuration */
  toolbar?: DataTableToolbar;
  /** Pagination configuration (for non-grouped mode) */
  pagination?: DataTablePagination;
  /** Content shown when rows is empty. Use <DataTableEmptyState> for the standard empty state. */
  emptyState?: React.ReactNode;
  /** Optional additional class name for the wrapper */
  className?: string;
  /**
   * When provided, renders each group as a bordered card with its own rows and pagination.
   * The `rows` prop is ignored when `groups` is set.
   */
  groups?: DataTableGroupConfig<T>[];
  /** Group IDs that are collapsed on mount */
  defaultCollapsedGroupIds?: string[];
}

/* ─── Empty State ──────────────────────────────────────────────────────────── */

export interface DataTableEmptyStateProps {
  /** Primary heading. Defaults to "No data to show" */
  heading?: string;
  /** Supporting description. Defaults to "This table will automatically update once data is available" */
  description?: string;
  /** Primary (filled) action button */
  primaryAction?: { label: string; onClick?: () => void };
  /** Secondary (outline) action button */
  secondaryAction?: { label: string; onClick?: () => void };
}

export function DataTableEmptyState({
  heading     = 'No data to show',
  description = 'This table will automatically update once data is available',
  primaryAction,
  secondaryAction,
}: DataTableEmptyStateProps) {
  const showActions = primaryAction || secondaryAction;
  return (
    <div className="data-table__empty">
      <Icon icon={CircleAlert} size="lg" color="primary" background="primary" strokeWidth={1.5} />
      <div className="data-table__empty-text">
        <p className="data-table__empty-heading">{heading}</p>
        <p className="data-table__empty-description">{description}</p>
      </div>
      {showActions && (
        <div className="data-table__empty-actions">
          {secondaryAction && (
            <Button variant="secondary" size="md" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
          {primaryAction && (
            <Button variant="primary" size="md" onClick={primaryAction.onClick}>
              {primaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export function DataTable<T extends Record<string, unknown>>({
  columns = [],
  rows = [],
  getRowId = () => '',
  selectable = false,
  selectedRowIds = new Set(),
  onSelectionChange,
  toolbar,
  pagination,
  emptyState,
  className = '',
  groups,
  defaultCollapsedGroupIds,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBarOpen, setFilterBarOpen] = useState(toolbar?.defaultFilterBarOpen ?? false);
  const [openFilterIndex, setOpenFilterIndex] = useState<number | null>(null);
  const [openInlineFilterIndex, setOpenInlineFilterIndex] = useState<number | null>(null);
  const [collapsedGroupIds, setCollapsedGroupIds] = useState<Set<string>>(
    new Set(defaultCollapsedGroupIds ?? [])
  );
  const [viewPanelOpen, setViewPanelOpen] = useState(false);
  const viewPanelRef = useRef<HTMLDivElement>(null);

  const allSelected = selectable && rows.length > 0 && rows.every((r) => selectedRowIds.has(getRowId(r)));
  const someSelected = selectable && selectedRowIds.size > 0;
  const indeterminate = someSelected && !allSelected;
  const headerCheckRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (headerCheckRef.current) headerCheckRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  useEffect(() => {
    if (!viewPanelOpen) return;
    const handler = (e: MouseEvent) => {
      if (viewPanelRef.current && !viewPanelRef.current.contains(e.target as Node)) {
        setViewPanelOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [viewPanelOpen]);

  const toggleAll = () => {
    if (!onSelectionChange) return;
    if (allSelected) {
      onSelectionChange(new Set());
    } else {
      onSelectionChange(new Set(rows.map(getRowId)));
    }
  };

  const toggleRow = (id: string) => {
    if (!onSelectionChange) return;
    const next = new Set(selectedRowIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onSelectionChange(next);
  };

  const toggleGroup = (groupId: string) => {
    setCollapsedGroupIds((prev) => {
      const next = new Set(prev);
      next.has(groupId) ? next.delete(groupId) : next.add(groupId);
      return next;
    });
  };

  // Pagination calculations (non-grouped mode)
  const totalPages = pagination ? Math.max(1, Math.ceil(pagination.total / pagination.pageSize)) : 1;
  const pageSizeOptions = pagination?.pageSizeOptions ?? [10, 25, 50, 100];

  const isGrouped = Boolean(groups?.length);

  return (
    <div className={`data-table__wrap ${isGrouped ? 'data-table__wrap--grouped' : ''} ${className}`.trim()}>
      {toolbar && (
        <div className="data-table__toolbar">
          <div className="data-table__toolbar-left">
            {toolbar.title && (
              <span className="data-table__toolbar-title">{toolbar.title}</span>
            )}
            {/* Search + inline filters (new layout) */}
            {(toolbar.onSearch || toolbar.inlineFilters) && (
              <div className="data-table__toolbar-filters">
                {toolbar.onSearch && (
                  <div className="data-table__toolbar-search">
                    <Search size={12} strokeWidth={2} className="data-table__toolbar-search-icon" aria-hidden />
                    <input
                      type="text"
                      className="data-table__toolbar-search-input"
                      placeholder={toolbar.searchPlaceholder ?? 'Search…'}
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        toolbar.onSearch?.(e.target.value);
                      }}
                      aria-label="Search table"
                    />
                  </div>
                )}
                {toolbar.inlineFilters?.map((filter, i) => (
                  <FilterComponent
                    key={i}
                    fields={filter.fields}
                    fieldValue={filter.fieldValue}
                    values={filter.values}
                    placeholder={filter.placeholder}
                    open={openInlineFilterIndex === i}
                    onToggle={() => setOpenInlineFilterIndex(prev => prev === i ? null : i)}
                    onApply={(fv, vals) => {
                      filter.onApply?.(fv, vals);
                      setOpenInlineFilterIndex(null);
                    }}
                    onRemove={() => {
                      filter.onRemove?.();
                      setOpenInlineFilterIndex(null);
                    }}
                  />
                ))}
                {toolbar.onAddFilter && (
                  <FilterComponent
                    variant="new-filter"
                    onAddFilter={toolbar.onAddFilter}
                  />
                )}
              </div>
            )}
          </div>
          <div className="data-table__toolbar-right">
            {/* Legacy icon buttons — shown only when legacy props are provided */}
            {(toolbar.onFilter || toolbar.filters || toolbar.onRefresh || toolbar.onDownload) && (
              <div className="data-table__toolbar-icons">
                {(toolbar.onFilter || toolbar.filters) && (
                  <button
                    type="button"
                    className={`data-table__toolbar-btn${filterBarOpen ? ' data-table__toolbar-btn--active' : ''}`}
                    onClick={() => {
                      if (toolbar.filters?.length) setFilterBarOpen(v => !v);
                      toolbar.onFilter?.();
                    }}
                    aria-label="Filter"
                    aria-expanded={toolbar.filters?.length ? filterBarOpen : undefined}
                  >
                    <Filter size={16} strokeWidth={2} />
                  </button>
                )}
                {toolbar.onRefresh && (
                  <button type="button" className="data-table__toolbar-btn" onClick={toolbar.onRefresh} aria-label="Refresh">
                    <RefreshCw size={16} strokeWidth={2} />
                  </button>
                )}
                {toolbar.onDownload && (
                  <button type="button" className="data-table__toolbar-btn" onClick={toolbar.onDownload} aria-label="Download">
                    <Download size={16} strokeWidth={2} />
                  </button>
                )}
              </div>
            )}

            {/* Right actions (new layout) */}
            {toolbar.rightAction && (
              <div className="data-table__toolbar-actions">
                {toolbar.rightAction.type === 'buttons' && (
                  <>
                    {toolbar.rightAction.secondary && (
                      <Button variant="secondary" size="sm" onClick={toolbar.rightAction.secondary.onClick}>
                        {toolbar.rightAction.secondary.label}
                      </Button>
                    )}
                    {toolbar.rightAction.primary && (
                      <Button variant="primary" size="sm" onClick={toolbar.rightAction.primary.onClick}>
                        {toolbar.rightAction.primary.label}
                      </Button>
                    )}
                  </>
                )}
                {toolbar.rightAction.type === 'view-panel' && toolbar.rightAction.viewPanelSections && (
                  <div className="data-table__view-panel-wrap" ref={viewPanelRef}>
                    <button
                      type="button"
                      className={`data-table__view-panel-trigger${viewPanelOpen ? ' data-table__view-panel-trigger--open' : ''}`}
                      onClick={() => setViewPanelOpen(v => !v)}
                      aria-haspopup="true"
                      aria-expanded={viewPanelOpen}
                    >
                      View
                      <ChevronDown
                        size={14}
                        strokeWidth={2}
                        className={`data-table__view-panel-chevron${viewPanelOpen ? ' data-table__view-panel-chevron--open' : ''}`}
                      />
                    </button>
                    {viewPanelOpen && (
                      <div className="data-table__view-panel" role="dialog" aria-label="View options">
                        {toolbar.rightAction.viewPanelSections.map((section, si) => (
                          <div key={si} className="data-table__view-panel-section">
                            <div className="data-table__view-panel-heading">{section.label}</div>
                            {section.type === 'segment' ? (
                              <div className="data-table__view-panel-segments">
                                {section.options.map(opt => (
                                  <button
                                    key={opt.value}
                                    type="button"
                                    className={`data-table__view-panel-segment${opt.value === section.value ? ' data-table__view-panel-segment--active' : ''}`}
                                    onClick={() => section.onChange?.(opt.value)}
                                  >
                                    {opt.label}
                                  </button>
                                ))}
                              </div>
                            ) : (
                              <div className="data-table__view-panel-list">
                                {section.options.map(opt => (
                                  <button
                                    key={opt.value}
                                    type="button"
                                    className="data-table__view-panel-item"
                                    onClick={() => section.onChange?.(opt.value)}
                                  >
                                    {opt.value === section.value
                                      ? <Check size={14} strokeWidth={2} className="data-table__view-panel-check" aria-hidden />
                                      : <span className="data-table__view-panel-check-placeholder" aria-hidden />
                                    }
                                    {opt.label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Expandable filter bar ── */}
      {filterBarOpen && toolbar?.filters && toolbar.filters.length > 0 && (
        <div className="data-table__filter-bar">
          {toolbar.filters.map((filter, i) => (
            <div key={i} className="data-table__filter-bar-item">
              <FilterComponent
                fields={filter.fields}
                fieldValue={filter.fieldValue}
                values={filter.values}
                placeholder={filter.placeholder}
                open={openFilterIndex === i}
                onToggle={() => setOpenFilterIndex(prev => prev === i ? null : i)}
                onApply={(fv, vals) => {
                  filter.onApply?.(fv, vals);
                  setOpenFilterIndex(null);
                }}
                onRemove={() => {
                  filter.onRemove?.();
                  setOpenFilterIndex(null);
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* ── Grouped layout ── */}
      {isGrouped ? (
        <div className="data-table__scroll">
        <table className="data-table data-table--grouped">
          <thead className="data-table__head">
            <tr>
              {selectable && (
                <th className="data-table__cell data-table__cell--head data-table__cell--checkbox data-table__cell--head-left" scope="col" />
              )}
              {columns.map((col, colIndex) => {
                const totalCols = columns.length;
                const isFirstCol = colIndex === 0;
                const isLastCol = colIndex === totalCols - 1;
                const headPos = !selectable && isFirstCol
                  ? 'left'
                  : isLastCol
                    ? 'right'
                    : 'center';
                return (
                <th
                  key={col.id}
                  className={['data-table__cell data-table__cell--head', `data-table__cell--head-${headPos}`, col.headerClassName].filter(Boolean).join(' ')}
                  scope="col"
                >
                  <span className="data-table__head-text">
                    {col.header}
                    {col.sortable && (
                      <span className="data-table__head-icon" aria-hidden>
                        <MoreVertical size={16} strokeWidth={2} />
                      </span>
                    )}
                  </span>
                </th>
                );
              })}
            </tr>
          </thead>

          {groups!.map((group, groupIndex) => {
            const isCollapsed = collapsedGroupIds.has(group.id);
            const colCount = columns.length + (selectable ? 1 : 0);
            const gp = group.pagination;
            const gTotalPages = gp ? Math.max(1, Math.ceil(gp.total / gp.pageSize)) : 1;
            const pageCount = Math.min(gTotalPages, 10);

            return (
              <Fragment key={group.id}>
                {/* 16px gap between groups */}
                {groupIndex > 0 && (
                  <tbody className="data-table__group-spacer" aria-hidden="true">
                    <tr><td colSpan={colCount} /></tr>
                  </tbody>
                )}

                <tbody className={`data-table__group-body${isCollapsed ? ' data-table__group-body--collapsed' : ''}`}>
                  {/* Group header row */}
                  <tr className="data-table__group-header-row">
                    <td colSpan={colCount} className="data-table__cell">
                      <span className="data-table__cell--group-header">
                        <button
                          type="button"
                          className="data-table__group-toggle"
                          onClick={() => toggleGroup(group.id)}
                          aria-expanded={!isCollapsed}
                        >
                          <ChevronDown
                            size={14}
                            strokeWidth={2}
                            className={`data-table__group-toggle-chevron${isCollapsed ? ' data-table__group-toggle-chevron--collapsed' : ''}`}
                          />
                          {group.header}
                        </button>
                      </span>
                    </td>
                  </tr>

                  {/* Data rows */}
                  {!isCollapsed && group.rows.map((row) => {
                    const rowId = getRowId(row);
                    const isSelected = selectedRowIds.has(rowId);
                    return (
                      <tr key={rowId} className="data-table__row">
                        {selectable && (
                          <td className="data-table__cell data-table__cell--checkbox">
                            <label className="data-table__checkbox-label">
                              <input
                                type="checkbox"
                                className="data-table__checkbox-input"
                                checked={isSelected}
                                onChange={() => toggleRow(rowId)}
                                aria-label={`Select row ${rowId}`}
                              />
                              <span className="data-table__checkbox-box" aria-hidden />
                            </label>
                          </td>
                        )}
                        {columns.map((col) => (
                          <td key={col.id} className="data-table__cell">
                            {col.editable && !col.render
                              ? (
                                <input
                                  type="text"
                                  className="data-table__cell-input"
                                  defaultValue={String(row[col.id] ?? '')}
                                  onChange={(e) => col.onCellChange?.(e.target.value, row)}
                                  aria-label={col.header}
                                />
                              )
                              : col.render
                                ? col.render(row[col.id], row)
                                : (row[col.id] as React.ReactNode)}
                          </td>
                        ))}
                      </tr>
                    );
                  })}

                  {/* Per-group pagination row */}
                  {!isCollapsed && gp && (
                    <tr className="data-table__group-pagination-row">
                      <td colSpan={colCount} className="data-table__cell data-table__group-pagination-cell">
                        <div className="data-table__group-pagination">
                          <div className="data-table__pagination-nav">
                            <button
                              type="button"
                              className="data-table__pagination-btn"
                              onClick={() => gp.onPageChange(1)}
                              disabled={gp.page <= 1}
                              aria-label="First page"
                            >
                              <ChevronsLeft size={16} strokeWidth={2} />
                            </button>
                            <button
                              type="button"
                              className="data-table__pagination-btn"
                              onClick={() => gp.onPageChange(gp.page - 1)}
                              disabled={gp.page <= 1}
                              aria-label="Previous page"
                            >
                              <ChevronLeft size={16} strokeWidth={2} />
                            </button>
                            {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
                              <button
                                key={p}
                                type="button"
                                className={`data-table__pagination-btn${p === gp.page ? ' data-table__pagination-btn--active' : ''}`}
                                onClick={() => gp.onPageChange(p)}
                                aria-label={`Page ${p}`}
                                aria-current={p === gp.page ? 'page' : undefined}
                              >
                                {p}
                              </button>
                            ))}
                            <button
                              type="button"
                              className="data-table__pagination-btn"
                              onClick={() => gp.onPageChange(gp.page + 1)}
                              disabled={gp.page >= gTotalPages}
                              aria-label="Next page"
                            >
                              <ChevronRight size={16} strokeWidth={2} />
                            </button>
                            <button
                              type="button"
                              className="data-table__pagination-btn"
                              onClick={() => gp.onPageChange(gTotalPages)}
                              disabled={gp.page >= gTotalPages}
                              aria-label="Last page"
                            >
                              <ChevronsRight size={16} strokeWidth={2} />
                            </button>
                          </div>
                          <span className="data-table__pagination-summary">
                            {gp.page} of {gTotalPages} pages ({gp.total} items)
                          </span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Fragment>
            );
          })}
        </table>
        </div>
      ) : (
        /* ── Regular (non-grouped) layout ── */
        <>
          {rows.length === 0 && emptyState ? emptyState : (
          <div className="data-table__scroll">
          <table className="data-table">
            <thead className="data-table__head">
              <tr>
                {selectable && (
                  <th className="data-table__cell data-table__cell--head data-table__cell--checkbox data-table__cell--head-left" scope="col">
                    <label className="data-table__checkbox-label">
                      <input
                        ref={headerCheckRef}
                        type="checkbox"
                        className="data-table__checkbox-input"
                        checked={allSelected}
                        onChange={toggleAll}
                        aria-label="Select all"
                      />
                      <span className="data-table__checkbox-box" aria-hidden />
                    </label>
                  </th>
                )}
                {columns.map((col, colIndex) => {
                  const totalCols = columns.length;
                  const isFirstCol = colIndex === 0;
                  const isLastCol = colIndex === totalCols - 1;
                  const headPos = !selectable && isFirstCol
                    ? 'left'
                    : isLastCol
                      ? 'right'
                      : 'center';
                  return (
                  <th key={col.id} className={['data-table__cell data-table__cell--head', `data-table__cell--head-${headPos}`, col.headerClassName].filter(Boolean).join(' ')} scope="col">
                    <span className="data-table__head-text">
                      {col.header}
                      {col.sortable && (
                        <span className="data-table__head-icon" aria-hidden>
                          <MoreVertical size={16} strokeWidth={2} />
                        </span>
                      )}
                    </span>
                  </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="data-table__body">
              {rows.map((row) => {
                const rowId = getRowId(row);
                const isSelected = selectedRowIds.has(rowId);
                return (
                  <tr key={rowId} className="data-table__row">
                    {selectable && (
                      <td className="data-table__cell data-table__cell--checkbox">
                        <label className="data-table__checkbox-label">
                          <input
                            type="checkbox"
                            className="data-table__checkbox-input"
                            checked={isSelected}
                            onChange={() => toggleRow(rowId)}
                            aria-label={`Select row ${rowId}`}
                          />
                          <span className="data-table__checkbox-box" aria-hidden />
                        </label>
                      </td>
                    )}
                    {columns.map((col) => (
                      <td key={col.id} className="data-table__cell">
                        {col.editable && !col.render
                          ? (
                            <input
                              type="text"
                              className="data-table__cell-input"
                              defaultValue={String(row[col.id] ?? '')}
                              onChange={(e) => col.onCellChange?.(e.target.value, row)}
                              aria-label={col.header}
                            />
                          )
                          : col.render
                            ? col.render(row[col.id], row)
                            : (row[col.id] as React.ReactNode)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
          )}

          {pagination && rows.length > 0 && (
            <div className="data-table__pagination">
              <div className="data-table__pagination-nav">
                <button
                  type="button"
                  className="data-table__pagination-btn"
                  onClick={() => pagination.onPageChange(1)}
                  disabled={pagination.page <= 1}
                  aria-label="First page"
                >
                  <ChevronsLeft size={16} strokeWidth={2} />
                </button>
                <button
                  type="button"
                  className="data-table__pagination-btn"
                  onClick={() => pagination.onPageChange(pagination.page - 1)}
                  disabled={pagination.page <= 1}
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} strokeWidth={2} />
                </button>
                {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={`data-table__pagination-btn${p === pagination.page ? ' data-table__pagination-btn--active' : ''}`}
                    onClick={() => pagination.onPageChange(p)}
                    aria-label={`Page ${p}`}
                    aria-current={p === pagination.page ? 'page' : undefined}
                  >
                    {p}
                  </button>
                ))}
                <button
                  type="button"
                  className="data-table__pagination-btn"
                  onClick={() => pagination.onPageChange(pagination.page + 1)}
                  disabled={pagination.page >= totalPages}
                  aria-label="Next page"
                >
                  <ChevronRight size={16} strokeWidth={2} />
                </button>
                <button
                  type="button"
                  className="data-table__pagination-btn"
                  onClick={() => pagination.onPageChange(totalPages)}
                  disabled={pagination.page >= totalPages}
                  aria-label="Last page"
                >
                  <ChevronsRight size={16} strokeWidth={2} />
                </button>
              </div>

              <div className="data-table__pagination-right">
                <label className="data-table__pagination-label">
                  Rows per page:
                  <select
                    className="data-table__pagination-select"
                    value={pagination.pageSize}
                    onChange={(e) => pagination.onPageSizeChange?.(Number(e.target.value))}
                    aria-label="Rows per page"
                  >
                    {pageSizeOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </label>
                <span className="data-table__pagination-summary">
                  {pagination.page} of {totalPages} pages ({pagination.total} items)
                </span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
