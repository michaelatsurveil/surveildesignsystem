import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import { ExternalLink, TrendingUp, MoreVertical, ChevronRight } from 'lucide-react';
import { DataTable } from './DataTable';
import type { DataTablePagination } from './DataTable';
import { Avatar } from '../Avatar/Avatar';
import { Button } from '../Button/Button';
import { Tag } from '../Tag/Tag';

type TenantRow = {
  tenant: string;
  tenantEmail: string;
  type: string;
  source: string;
  status: string;
};

const allRows: TenantRow[] = Array.from({ length: 50 }, (_, i) => ({
  tenant: `Tenant ${i + 1}`,
  tenantEmail: `user${i + 1}@email.com`,
  type: i % 2 === 0 ? 'M365' : 'Google',
  source: 'Navigator',
  status: i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Pending' : 'Default',
}));

const sampleRows: TenantRow[] = Array.from({ length: 7 }, (_, i) => ({
  tenant: 'Name',
  tenantEmail: `user${i + 1}@email.com`,
  type: 'M365',
  source: 'Navigator',
  status: 'Default',
}));

const columns = [
  { id: 'tenant', header: 'Tenant', sortable: true },
  { id: 'tenantEmail', header: 'Tenant Email', sortable: true },
  { id: 'type', header: 'Type', sortable: true },
  { id: 'source', header: 'Source', sortable: true },
  {
    id: 'status',
    header: 'Status',
    sortable: true,
    render: (value: unknown) => (
      <span className="data-table__badge">{String(value)}</span>
    ),
  },
];

const meta: Meta<typeof DataTable> = {
  title: 'Display/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=112-6099',
    },
    docs: {
      description: {
        component:
          'Data table with optional row selection, column headers with sort affordance, and row dividers. [Figma →](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=112-6099)',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DataTable<TenantRow>>;

export const Default: Story = {
  args: {
    columns,
    rows: sampleRows,
    getRowId: (row) => row.tenantEmail,
  },
};

export const WithToolbar: Story = {
  render: function WithToolbar() {
    const [query, setQuery] = useState('');
    const filtered = allRows.filter(
      (r) =>
        !query ||
        r.tenant.toLowerCase().includes(query.toLowerCase()) ||
        r.tenantEmail.toLowerCase().includes(query.toLowerCase())
    );
    return (
      <DataTable<TenantRow>
        columns={columns}
        rows={filtered.slice(0, 10)}
        getRowId={(row) => row.tenantEmail}
        toolbar={{
          title: 'Tenants',
          onFilter: () => {},
          onRefresh: () => {},
          onDownload: () => {},
          onSearch: setQuery,
          searchPlaceholder: 'Search tenants…',
        }}
      />
    );
  },
};

export const WithToolbarAndPagination: Story = {
  render: function WithToolbarAndPagination() {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const filtered = allRows.filter(
      (r) =>
        !query ||
        r.tenant.toLowerCase().includes(query.toLowerCase()) ||
        r.tenantEmail.toLowerCase().includes(query.toLowerCase())
    );
    const pagedRows = filtered.slice((page - 1) * pageSize, page * pageSize);

    return (
      <DataTable<TenantRow>
        columns={columns}
        rows={pagedRows}
        getRowId={(row) => row.tenantEmail}
        toolbar={{
          title: 'Tenants',
          onFilter: () => {},
          onRefresh: () => {},
          onDownload: () => {},
          onSearch: (q) => { setQuery(q); setPage(1); },
          searchPlaceholder: 'Search tenants…',
        }}
        pagination={{
          page,
          pageSize,
          total: filtered.length,
          pageSizeOptions: [10, 25, 50],
          onPageChange: setPage,
          onPageSizeChange: (size) => { setPageSize(size); setPage(1); },
        }}
      />
    );
  },
};

export const WithPagination: Story = {
  render: function WithPagination() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const pagedRows = allRows.slice((page - 1) * pageSize, page * pageSize);

    const pagination: DataTablePagination = {
      page,
      pageSize,
      total: allRows.length,
      pageSizeOptions: [10, 25, 50],
      onPageChange: setPage,
      onPageSizeChange: (size) => { setPageSize(size); setPage(1); },
    };

    return (
      <DataTable<TenantRow>
        columns={columns}
        rows={pagedRows}
        getRowId={(row) => row.tenantEmail}
        pagination={pagination}
      />
    );
  },
};

export const WithSelectionAndPagination: Story = {
  render: function WithSelectionAndPagination() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const pagedRows = allRows.slice((page - 1) * pageSize, page * pageSize);

    const pagination: DataTablePagination = {
      page,
      pageSize,
      total: allRows.length,
      pageSizeOptions: [10, 25, 50],
      onPageChange: setPage,
      onPageSizeChange: (size) => { setPageSize(size); setPage(1); },
    };

    return (
      <DataTable<TenantRow>
        columns={columns}
        rows={pagedRows}
        getRowId={(row) => row.tenantEmail}
        selectable
        selectedRowIds={selectedIds}
        onSelectionChange={setSelectedIds}
        pagination={pagination}
      />
    );
  },
};

export const WithSelection: Story = {
  render: function WithSelection() {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(
      new Set(sampleRows.map((r) => r.tenantEmail))
    );
    return (
      <DataTable<TenantRow>
        columns={columns}
        rows={sampleRows}
        getRowId={(row) => row.tenantEmail}
        selectable
        selectedRowIds={selectedIds}
        onSelectionChange={setSelectedIds}
      />
    );
  },
};

/** Header row — shows column header cells with sort affordance (Emphasis=High). */
export const HeaderRow: Story = {
  args: {
    columns,
    rows: [],
    getRowId: (row) => row.tenantEmail,
  },
};

/** Row hover — background transitions to grey-25 on pointer enter. */
export const RowHover: Story = {
  args: {
    columns,
    rows: sampleRows,
    getRowId: (row) => row.tenantEmail,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const rows = canvas.getAllByRole('row');
    // Hover the first body row (index 0 is the header row)
    if (rows[1]) await userEvent.hover(rows[1]);
  },
};

/**
 * Cell Types — all 22 Data Cell variants from the Figma component set (496:4747).
 * Each row demonstrates a different cell type.
 */
type CellDemoRow = { id: string; label: string };

const cellDemoRows: CellDemoRow[] = [
  { id: 'text',                 label: 'Text' },
  { id: 'text-bold',            label: 'Text (Bold)' },
  { id: 'summary',              label: 'Summary' },
  { id: 'summary-bold',         label: 'Summary (Bold)' },
  { id: 'text-subtext',         label: 'Text + Subtext' },
  { id: 'number',               label: 'Number' },
  { id: 'number-icon',          label: 'Number w/ Icon' },
  { id: 'badge',                label: 'Badge' },
  { id: 'multiple-badges',      label: 'Multiple Badges' },
  { id: 'button',               label: 'Button' },
  { id: 'icon-button',          label: 'Icon Button' },
  { id: 'link-button',          label: 'Link Button' },
  { id: 'link-button-multiple', label: 'Link Button (Multiple)' },
  { id: 'toggle',               label: 'Toggle' },
  { id: 'input',                label: 'Input' },
  { id: 'avatar',               label: 'Avatar' },
  { id: 'avatar-group',         label: 'Avatar Group' },
  { id: 'checkbox',             label: 'Checkbox' },
  { id: 'tree-item',            label: 'Tree Item' },
  { id: 'child-tree-item',      label: 'Child Tree Item' },
  { id: 'more',                 label: 'More' },
  { id: 'empty',                label: 'Empty' },
];

function renderCellPreview(id: string) {
  switch (id) {
    case 'text':
      return <span>Sample text</span>;

    case 'text-bold':
      return <span style={{ fontWeight: 600 }}>Sample text</span>;

    case 'summary':
      return <span className="data-table__cell-summary">Summary content</span>;

    case 'summary-bold':
      return <span className="data-table__cell-summary" style={{ fontWeight: 600 }}>Summary content</span>;

    case 'text-subtext':
      return (
        <>
          <span>Primary text</span>
          <span className="data-table__cell-subtext">Supporting subtext</span>
        </>
      );

    case 'number':
      return <span className="data-table__cell-number" style={{ display: 'block', textAlign: 'right' }}>10,000</span>;

    case 'number-icon':
      return (
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
          <TrendingUp size={14} strokeWidth={2} color="var(--color-success, #15803d)" aria-hidden />
          <span className="data-table__cell-number">10,000</span>
        </span>
      );

    case 'badge':
      return <span className="data-table__badge">Active</span>;

    case 'multiple-badges':
      return (
        <span style={{ display: 'inline-flex', gap: 6, flexWrap: 'wrap' }}>
          <Tag variant="success" size="sm">Active</Tag>
          <Tag variant="info" size="sm">Synced</Tag>
        </span>
      );

    case 'button':
      return <Button size="sm">Action</Button>;

    case 'icon-button':
      return (
        <button type="button" className="data-table__toolbar-btn" aria-label="More options">
          <MoreVertical size={16} strokeWidth={2} />
        </button>
      );

    case 'link-button':
      return (
        <button type="button" className="data-table__cell-link">
          View details
          <ExternalLink size={12} strokeWidth={2} aria-hidden />
        </button>
      );

    case 'link-button-multiple':
      return (
        <span style={{ display: 'inline-flex', gap: 12 }}>
          <button type="button" className="data-table__cell-link">Edit</button>
          <button type="button" className="data-table__cell-link">Delete</button>
        </span>
      );

    case 'toggle':
      return (
        <button type="button" className="data-table__cell-toggle" aria-label="Toggle on">
          <span className="data-table__cell-toggle-track">
            <span className="data-table__cell-toggle-thumb" />
          </span>
        </button>
      );

    case 'input':
      return <input type="text" className="data-table__cell-input" defaultValue="Editable value" />;

    case 'avatar':
      return <Avatar initials="JD" size="xs" />;

    case 'avatar-group':
      return (
        <span className="data-table__cell-avatar-group">
          <Avatar initials="JD" size="xs" />
          <Avatar initials="AB" size="xs" />
          <Avatar initials="MC" size="xs" />
        </span>
      );

    case 'checkbox':
      return (
        <label className="data-table__checkbox-label">
          <input type="checkbox" className="data-table__checkbox-input" defaultChecked />
          <span className="data-table__checkbox-box" aria-hidden />
        </label>
      );

    case 'tree-item':
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <ChevronRight size={14} strokeWidth={2} color="var(--color-grey-400, #818181)" aria-hidden />
          <span>Parent item</span>
        </span>
      );

    case 'child-tree-item':
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, paddingLeft: 20 }}>
          <span>Child item</span>
        </span>
      );

    case 'more':
      return (
        <button type="button" className="data-table__cell-more" aria-label="More options">
          <MoreVertical size={16} strokeWidth={2} />
        </button>
      );

    case 'empty':
    default:
      return <span style={{ color: 'var(--color-grey-300, #a0a0a0)' }}>—</span>;
  }
}

const cellDemoColumns = [
  {
    id: 'label',
    header: 'Cell Type',
  },
  {
    id: 'id',
    header: 'Preview',
    render: (_value: unknown, row: CellDemoRow) => renderCellPreview(row.id),
  },
];

export const CellTypes: StoryObj<typeof DataTable<CellDemoRow>> = {
  parameters: {
    docs: {
      description: {
        story:
          'All 22 Data Cell variants from the Figma component set. Each row shows a different type: Text, Text (Bold), Summary, Summary (Bold), Text + Subtext, Number, Number w/ Icon, Badge, Multiple Badges, Button, Icon Button, Link Button, Link Button (Multiple), Toggle, Input, Avatar, Avatar Group, Checkbox, Tree Item, Child Tree Item, More, and Empty.',
      },
    },
  },
  render: () => (
    <DataTable<CellDemoRow>
      columns={cellDemoColumns}
      rows={cellDemoRows}
      getRowId={(row) => row.id}
    />
  ),
};
