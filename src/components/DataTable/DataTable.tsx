import { useEffect, useRef } from 'react';
import { MoreVertical } from 'lucide-react';
import './DataTable.css';

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
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  rows,
  getRowId,
  selectable = false,
  selectedRowIds = new Set(),
  onSelectionChange,
}: DataTableProps<T>) {
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

  return (
    <div className="data-table__wrap">
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
    </div>
  );
}
