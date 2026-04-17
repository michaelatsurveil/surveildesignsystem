import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import { ExternalLink } from 'lucide-react';
import { DataTable } from './DataTable';
import type { DataTablePagination } from './DataTable';

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

/** Cell types — Text, Badge, and Link Button cell variants in a single table. */
type CellTypeRow = {
  id: string;
  name: string;
  status: string;
  action: string;
};

const cellTypeRows: CellTypeRow[] = [
  { id: '1', name: 'Acme Corp', status: 'Active', action: 'View details' },
  { id: '2', name: 'Globex Inc', status: 'Pending', action: 'View details' },
  { id: '3', name: 'Initech', status: 'Default', action: 'View details' },
  { id: '4', name: 'Umbrella Ltd', status: 'Active', action: 'View details' },
];

const cellTypeColumns = [
  {
    id: 'name',
    header: 'Name',
    sortable: true,
    // Text cell — plain string (default)
  },
  {
    id: 'status',
    header: 'Status',
    sortable: true,
    // Badge cell
    render: (value: unknown) => (
      <span className="data-table__badge">{String(value)}</span>
    ),
  },
  {
    id: 'action',
    header: 'Action',
    // Link Button cell
    render: (value: unknown) => (
      <button type="button" className="data-table__cell-link" onClick={() => {}}>
        {String(value)}
        <ExternalLink size={12} strokeWidth={2} aria-hidden />
      </button>
    ),
  },
];

export const CellTypes: StoryObj<typeof DataTable<CellTypeRow>> = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the three Data Cell variants from Figma: **Text** (plain), **Badge** (status chip), and **Link Button** (inline action).',
      },
    },
  },
  render: () => (
    <DataTable<CellTypeRow>
      columns={cellTypeColumns}
      rows={cellTypeRows}
      getRowId={(row) => row.id}
    />
  ),
};
