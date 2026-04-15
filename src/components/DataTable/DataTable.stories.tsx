import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
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
