import { useEffect, useRef, useState } from 'react';
import { MoreVertical, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Filter, RefreshCw, Download, Search } from 'lucide-react';
import './DataTable.css';

export interface DataTableToolbar {
  /** Table title shown on the left */
  title?: string;
  /** Called when filter icon is clicked */
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
  /** Optional additional class name for the wrapper */
  className?: string;
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
  className = '',
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
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
              {toolbar.onFilter && (
                <button type="button" className="data-table__toolbar-btn" onClick={toolbar.onFilter} aria-label="Filter">
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
              <th key={col.id} className="data-table__cell data-table__cell--head" scope="col">
                <span className="data-table__head-text">{col.header}</span>
                {col.sortable && (
                  <span className="data-table__head-icon" aria-hidden>
                    <MoreVertical size={16} strokeWidth={2} />
                  </span>
                )}
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
                    {col.render
                      ? col.render(row[col.id], row)
                      : (row[col.id] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {pagination && (
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
