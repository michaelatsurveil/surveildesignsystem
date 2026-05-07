import { useEffect, useRef, useState } from 'react';
import { MoreVertical, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Filter, RefreshCw, Download, Search, CircleAlert } from 'lucide-react';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { Filter as FilterComponent } from '../Filter/Filter';
import type { FilterOption } from '../Filter/Filter';
import './DataTable.css';

export interface DataTableFilterConfig {
  /** Placeholder text shown in the filter trigger */
  placeholder: string;
  /** Available options */
  options: FilterOption[];
  /** Currently selected value (controlled) */
  value?: string;
  /** Called when an option is selected */
  onSelect?: (value: string) => void;
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

export interface DataTableProps<T = Record<string, unknown>> {
  /** Column definitions */
  columns: DataTableColumn<T>[];
  /** Row data (array of objects keyed by column id) */
  rows: T[];
  /** Row key extractor for React keys */
  getRowId: (row: T) => string;
  /** Enable row selection (adds checkbox column) */
  selectable?: boolean;
  /** Selected row ids (controlled) */
  selectedRowIds?: Set<string>;
  /** Selection change callback */
  onSelectionChange?: (selectedIds: Set<string>) => void;
  /** Toolbar configuration */
  toolbar?: DataTableToolbar;
  /** Pagination configuration */
  pagination?: DataTablePagination;
  /** Content shown when rows is empty. Use <DataTableEmptyState> for the standard empty state. */
  emptyState?: React.ReactNode;
  /** Optional additional class name for the wrapper */
  className?: string;
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
  columns,
  rows,
  getRowId,
  selectable = false,
  selectedRowIds = new Set(),
  onSelectionChange,
  toolbar,
  pagination,
  emptyState,
  className = '',
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBarOpen, setFilterBarOpen] = useState(toolbar?.defaultFilterBarOpen ?? false);
  const [openFilterIndex, setOpenFilterIndex] = useState<number | null>(null);
  const allSelected = selectable && rows.length > 0 && rows.every((r) => selectedRowIds.has(getRowId(r)));
  const someSelected = selectable && selectedRowIds.size > 0;
  const indeterminate = someSelected && !allSelected;
  const headerCheckRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (headerCheckRef.current) headerCheckRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

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

  // Pagination calculations
  const totalPages = pagination ? Math.max(1, Math.ceil(pagination.total / pagination.pageSize)) : 1;
  const rangeStart = pagination ? (pagination.page - 1) * pagination.pageSize + 1 : 1;
  const rangeEnd = pagination ? Math.min(pagination.page * pagination.pageSize, pagination.total) : rows.length;
  const pageSizeOptions = pagination?.pageSizeOptions ?? [10, 25, 50, 100];

  return (
    <div className={`data-table__wrap ${className}`.trim()}>
      {toolbar && (
        <div className="data-table__toolbar">
          <div className="data-table__toolbar-left">
            {toolbar.title && (
              <span className="data-table__toolbar-title">{toolbar.title}</span>
            )}
          </div>
          <div className="data-table__toolbar-right">
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
          </div>
        </div>
      )}

      {/* ── Expandable filter bar ── */}
      {filterBarOpen && toolbar?.filters && toolbar.filters.length > 0 && (
        <div className="data-table__filter-bar">
          {toolbar.filters.map((filter, i) => (
            <div key={i} className="data-table__filter-bar-item">
              <FilterComponent
                placeholder={filter.placeholder}
                options={filter.options}
                value={filter.value}
                open={openFilterIndex === i}
                onToggle={() => setOpenFilterIndex(prev => prev === i ? null : i)}
                onSelect={(v) => {
                  filter.onSelect?.(v);
                  setOpenFilterIndex(null);
                }}
              />
            </div>
          ))}
        </div>
      )}

      {rows.length === 0 && emptyState ? emptyState : (
      <table className="data-table">
        <thead className="data-table__head">
          <tr>
            {selectable && (
              <th className="data-table__cell data-table__cell--checkbox" scope="col">
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
            {columns.map((col) => (
              <th key={col.id} className={['data-table__cell data-table__cell--head', col.headerClassName].filter(Boolean).join(' ')} scope="col">
                <span className="data-table__head-text">
                  {col.header}
                  {col.sortable && (
                    <span className="data-table__head-icon" aria-hidden>
                      <MoreVertical size={16} strokeWidth={2} />
                    </span>
                  )}
                </span>
              </th>
            ))}
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
              {rangeStart}–{rangeEnd} of {pagination.total}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
