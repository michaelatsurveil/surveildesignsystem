import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import { ExternalLink, TrendingUp, MoreVertical, ChevronRight, ChevronDown } from 'lucide-react';
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

/**
 * ExampleTable — realistic account management table combining all cell types.
 * Parent rows are expandable (Tree Item); child rows indent beneath them (Child Tree Item).
 * Demonstrates: tree hierarchy, avatars, badges, toggles, numbers w/ icons, link buttons, more menu.
 */
type ExampleRow = {
  id: string;
  parentId?: string;
  isParent?: boolean;
  name: string;
  owner: string;
  status: 'Active' | 'Pending' | 'Inactive';
  users: number;
  plan: string;
  active: boolean;
  tags: string[];
};

const exampleAllRows: ExampleRow[] = [
  { id: 'acme',       isParent: true, name: 'Acme Corp',       owner: 'JD', status: 'Active',   users: 142, plan: 'Enterprise', active: true,  tags: ['M365', 'Navigator'] },
  { id: 'acme-uk',    parentId: 'acme',    name: 'Acme Corp — UK', owner: 'AB', status: 'Active',   users: 63,  plan: 'Enterprise', active: true,  tags: ['M365'] },
  { id: 'acme-us',    parentId: 'acme',    name: 'Acme Corp — US', owner: 'MC', status: 'Active',   users: 79,  plan: 'Enterprise', active: true,  tags: ['M365'] },
  { id: 'globex',     isParent: true, name: 'Globex Inc',      owner: 'RK', status: 'Pending',  users: 34,  plan: 'Growth',     active: false, tags: ['Google'] },
  { id: 'globex-apac',parentId: 'globex',  name: 'Globex — APAC', owner: 'TL', status: 'Pending',  users: 34,  plan: 'Growth',     active: false, tags: ['Google'] },
  { id: 'initech',    isParent: true, name: 'Initech',         owner: 'SP', status: 'Active',   users: 8,   plan: 'Starter',    active: true,  tags: ['M365', 'Google'] },
  { id: 'umbrella',   isParent: true, name: 'Umbrella Ltd',    owner: 'NU', status: 'Inactive', users: 0,   plan: 'Enterprise', active: false, tags: [] },
];

const statusVariant: Record<string, 'success' | 'attention' | 'default'> = {
  Active: 'success',
  Pending: 'attention',
  Inactive: 'default',
};

export const ExampleTable: StoryObj<typeof DataTable<ExampleRow>> = {
  parameters: {
    docs: {
      description: {
        story:
          'Realistic account management table combining all major cell types. Click the chevron on a parent row to expand/collapse its children. Demonstrates Tree Item / Child Tree Item hierarchy alongside avatars, badges, toggles, number+icon, link buttons, and a more menu.',
      },
    },
  },
  render: function ExampleTable() {
    const [expanded, setExpanded] = useState<Set<string>>(new Set(['acme']));
    const [activeRows, setActiveRows] = useState<Set<string>>(
      new Set(exampleAllRows.filter((r) => r.active).map((r) => r.id))
    );

    const toggle = (id: string) =>
      setExpanded((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      });

    const toggleActive = (id: string) =>
      setActiveRows((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      });

    // Filter: always show parents; show children only when parent is expanded
    const visibleRows = exampleAllRows.filter(
      (r) => !r.parentId || expanded.has(r.parentId)
    );

    const exampleColumns = [
      {
        id: 'name',
        header: 'Account',
        render: (_: unknown, row: ExampleRow) => {
          if (row.isParent) {
            const isExpanded = expanded.has(row.id);
            const hasChildren = exampleAllRows.some((r) => r.parentId === row.id);
            return (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                {hasChildren ? (
                  <button
                    type="button"
                    onClick={() => toggle(row.id)}
                    style={{ display: 'inline-flex', alignItems: 'center', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--color-grey-400, #818181)', flexShrink: 0 }}
                    aria-label={isExpanded ? 'Collapse' : 'Expand'}
                  >
                    {isExpanded
                      ? <ChevronDown size={14} strokeWidth={2} />
                      : <ChevronRight size={14} strokeWidth={2} />}
                  </button>
                ) : (
                  <span style={{ width: 14, flexShrink: 0 }} />
                )}
                <span style={{ fontWeight: 600 }}>{row.name}</span>
              </span>
            );
          }
          // Child tree item — indented
          return (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, paddingLeft: 22 }}>
              <span>{row.name}</span>
            </span>
          );
        },
      },
      {
        id: 'owner',
        header: 'Owner',
        render: (_: unknown, row: ExampleRow) => (
          <Avatar initials={row.owner} size="xs" />
        ),
      },
      {
        id: 'status',
        header: 'Status',
        render: (_: unknown, row: ExampleRow) => (
          <Tag variant={statusVariant[row.status]} size="sm">{row.status}</Tag>
        ),
      },
      {
        id: 'users',
        header: 'Users',
        render: (_: unknown, row: ExampleRow) => (
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
            {row.users > 0 && (
              <TrendingUp size={12} strokeWidth={2} color="var(--color-success, #15803d)" aria-hidden />
            )}
            <span className="data-table__cell-number">{row.users.toLocaleString()}</span>
          </span>
        ),
      },
      {
        id: 'tags',
        header: 'Tags',
        render: (_: unknown, row: ExampleRow) =>
          row.tags.length > 0 ? (
            <span style={{ display: 'inline-flex', gap: 4, flexWrap: 'wrap' as const }}>
              {row.tags.map((t) => (
                <span key={t} className="data-table__badge">{t}</span>
              ))}
            </span>
          ) : (
            <span style={{ color: 'var(--color-grey-300, #a0a0a0)' }}>—</span>
          ),
      },
      {
        id: 'plan',
        header: 'Plan',
        render: (_: unknown, row: ExampleRow) => (
          <>
            <span>{row.plan}</span>
            <span className="data-table__cell-subtext">Billed monthly</span>
          </>
        ),
      },
      {
        id: 'active',
        header: 'Active',
        render: (_: unknown, row: ExampleRow) => {
          const on = activeRows.has(row.id);
          return (
            <button
              type="button"
              className="data-table__cell-toggle"
              onClick={() => toggleActive(row.id)}
              aria-label={on ? 'Deactivate' : 'Activate'}
              aria-pressed={on}
            >
              <span
                className="data-table__cell-toggle-track"
                style={{ background: on ? 'var(--color-primary, #3165ad)' : 'var(--color-grey-200, #c0c0c0)' }}
              >
                <span
                  className="data-table__cell-toggle-thumb"
                  style={{ right: on ? 2 : undefined, left: on ? undefined : 2 }}
                />
              </span>
            </button>
          );
        },
      },
      {
        id: 'actions',
        header: '',
        render: (_: unknown, row: ExampleRow) => (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <button type="button" className="data-table__cell-link" onClick={() => alert(`View ${row.name}`)}>
              View
              <ExternalLink size={11} strokeWidth={2} aria-hidden />
            </button>
            <button type="button" className="data-table__cell-more" aria-label="More options">
              <MoreVertical size={16} strokeWidth={2} />
            </button>
          </span>
        ),
      },
    ];

    return (
      <DataTable<ExampleRow>
        columns={exampleColumns}
        rows={visibleRows}
        getRowId={(row) => row.id}
        toolbar={{ title: 'Accounts', onFilter: () => {}, onRefresh: () => {}, onDownload: () => {} }}
      />
    );
  },
};
