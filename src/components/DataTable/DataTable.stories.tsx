import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './DataTable';

type TenantRow = {
  tenant: string;
  tenantEmail: string;
  type: string;
  source: string;
  status: string;
};

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
