import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  MoreVertical, ChevronRight, ChevronDown,
  Mail, ExternalLink, ArrowUpRight,
} from 'lucide-react';
import { DataTable } from './DataTable';
import { Tag } from '../Tag/Tag';
import { Avatar } from '../Avatar/Avatar';
import { Button } from '../Button/Button';

// ─── Shared sample data for the main overview ──────────────────────────────

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

const overviewColumns = [
  { id: 'tenant', header: 'Tenant', sortable: true },
  { id: 'tenantEmail', header: 'Tenant Email', sortable: true },
  { id: 'type', header: 'Type', sortable: true },
  { id: 'source', header: 'Source', sortable: true },
  {
    id: 'status',
    header: 'Status',
    sortable: true,
    render: (value: unknown) => (
      <Tag variant={value === 'Active' ? 'success' : value === 'Pending' ? 'attention' : 'default'} size="sm">
        {String(value)}
      </Tag>
    ),
  },
];

// ─── Meta ──────────────────────────────────────────────────────────────────

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
          'Data table with optional row selection, column headers with sort affordance, and row dividers. Supports 22 built-in cell types via the `render` prop. [Figma →](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=112-6099)',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DataTable<TenantRow>>;

// ─── Overview story ────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Overview — Toolbar + Pagination + Selection',
  render: function Overview() {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    const filtered = allRows.filter(
      (r) =>
        !query ||
        r.tenant.toLowerCase().includes(query.toLowerCase()) ||
        r.tenantEmail.toLowerCase().includes(query.toLowerCase())
    );
    const pagedRows = filtered.slice((page - 1) * pageSize, page * pageSize);

    return (
      <DataTable<TenantRow>
        columns={overviewColumns}
        rows={pagedRows}
        getRowId={(row) => row.tenantEmail}
        selectable
        selectedRowIds={selectedIds}
        onSelectionChange={setSelectedIds}
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

// ─── Cell Types story ──────────────────────────────────────────────────────

type CellTypeRow = { id: string; label: string; cellType: string };

// Small stateful wrappers so interactive cells own their state
function ToggleCell() {
  const [on, setOn] = useState(true);
  return (
    <button
      type="button"
      className="data-table__cell-toggle"
      aria-pressed={on}
      aria-label="Toggle"
      onClick={() => setOn((v) => !v)}
    >
      <span
        className="data-table__cell-toggle-track"
        style={{ background: on ? 'var(--color-primary,#3165ad)' : 'var(--color-grey-200,#d1d5db)' }}
      >
        <span
          className="data-table__cell-toggle-thumb"
          style={{ left: on ? 'auto' : 2, right: on ? 2 : 'auto' }}
        />
      </span>
    </button>
  );
}

function TreeCell() {
  const [open, setOpen] = useState(false);
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <button
        type="button"
        style={{ display: 'inline-flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--color-grey,#616161)' }}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Collapse' : 'Expand'}
      >
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
      </button>
      Parent Row
    </span>
  );
}

function renderCellPreview(type: string): React.ReactNode {
  switch (type) {
    case 'text':
      return <span>Sample text</span>;

    case 'text-bold':
      return <strong style={{ fontWeight: 700 }}>Bold text</strong>;

    case 'text-subtext':
      return (
        <span>
          Primary text
          <span className="data-table__cell-subtext">Secondary line</span>
        </span>
      );

    case 'number':
      return (
        <span className="data-table__cell-number" style={{ display: 'block', textAlign: 'right' }}>
          10,000
        </span>
      );

    case 'number-icon':
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <ArrowUpRight size={14} style={{ color: 'var(--color-success,#15803d)' }} />
          <span className="data-table__cell-number">10,000</span>
        </span>
      );

    case 'badge':
      return <Tag variant="success" size="sm">Active</Tag>;

    case 'multiple-badges':
      return (
        <span style={{ display: 'inline-flex', gap: 4, flexWrap: 'wrap' }}>
          <Tag variant="info" size="sm">M365</Tag>
          <Tag variant="success" size="sm">Active</Tag>
          <Tag variant="attention" size="sm">Pending</Tag>
        </span>
      );

    case 'button':
      return <Button size="md" variant="secondary">Action</Button>;

    case 'icon-button':
      return (
        <button type="button" className="data-table__cell-more" aria-label="Open menu">
          <Mail size={16} />
        </button>
      );

    case 'link-button':
      return (
        <button type="button" className="data-table__cell-link">
          <ExternalLink size={12} />
          Open
        </button>
      );

    case 'link-button-multiple':
      return (
        <span style={{ display: 'inline-flex', gap: 12 }}>
          <button type="button" className="data-table__cell-link">Edit</button>
          <button type="button" className="data-table__cell-link">View</button>
          <button type="button" className="data-table__cell-link" style={{ color: 'var(--color-error,#e61c1d)' }}>Delete</button>
        </span>
      );

    case 'checkbox':
      return (
        <label className="data-table__checkbox-label">
          <input type="checkbox" className="data-table__checkbox-input" defaultChecked />
          <span className="data-table__checkbox-box" aria-hidden />
        </label>
      );

    case 'toggle':
      return <ToggleCell />;

    case 'avatar':
      return <Avatar size="xs" initials="JC" />;

    case 'avatar-group':
      return (
        <span className="data-table__cell-avatar-group">
          <Avatar size="xs" initials="JC" />
          <Avatar size="xs" initials="AB" />
          <Avatar size="xs" initials="MK" />
        </span>
      );

    case 'more':
      return (
        <button type="button" className="data-table__cell-more" aria-label="More options">
          <MoreVertical size={16} />
        </button>
      );

    case 'empty':
      return <span style={{ color: 'var(--color-grey-300,#a0a0a0)' }}>—</span>;

    case 'tree-item':
      return <TreeCell />;

    case 'child-tree-item':
      return (
        <span className="data-table__cell--child-tree" style={{ display: 'block' }}>
          Child Row
        </span>
      );

    case 'summary':
      return <span className="data-table__cell-summary">Summary text</span>;

    case 'summary-bold':
      return (
        <span className="data-table__cell-summary" style={{ fontWeight: 700 }}>
          Summary (Bold)
        </span>
      );

    case 'input':
      return (
        <input
          type="text"
          className="data-table__cell-input"
          defaultValue="Editable value"
          style={{ width: 160 }}
        />
      );

    default:
      return null;
  }
}

const cellTypeRows: CellTypeRow[] = [
  { id: '1',  label: 'Text',                  cellType: 'text' },
  { id: '2',  label: 'Text (Bold)',            cellType: 'text-bold' },
  { id: '3',  label: 'Text + Subtext',         cellType: 'text-subtext' },
  { id: '4',  label: 'Number',                 cellType: 'number' },
  { id: '5',  label: 'Number w/ Icon',         cellType: 'number-icon' },
  { id: '6',  label: 'Badge',                  cellType: 'badge' },
  { id: '7',  label: 'Multiple Badges',        cellType: 'multiple-badges' },
  { id: '8',  label: 'Button',                 cellType: 'button' },
  { id: '9',  label: 'Icon Button',            cellType: 'icon-button' },
  { id: '10', label: 'Link Button',            cellType: 'link-button' },
  { id: '11', label: 'Link Button (Multiple)', cellType: 'link-button-multiple' },
  { id: '12', label: 'Checkbox',               cellType: 'checkbox' },
  { id: '13', label: 'Toggle',                 cellType: 'toggle' },
  { id: '14', label: 'Avatar',                 cellType: 'avatar' },
  { id: '15', label: 'Avatar Group',           cellType: 'avatar-group' },
  { id: '16', label: 'More',                   cellType: 'more' },
  { id: '17', label: 'Empty',                  cellType: 'empty' },
  { id: '18', label: 'Tree Item',              cellType: 'tree-item' },
  { id: '19', label: 'Child Tree Item',        cellType: 'child-tree-item' },
  { id: '20', label: 'Summary',                cellType: 'summary' },
  { id: '21', label: 'Summary (Bold)',         cellType: 'summary-bold' },
  { id: '22', label: 'Input',                  cellType: 'input' },
];

const cellTypeColumns = [
  {
    id: 'label',
    header: 'Cell Type',
    render: (value: unknown) => (
      <span style={{ fontWeight: 500, color: 'var(--color-grey-700,#272727)' }}>
        {String(value)}
      </span>
    ),
  },
  {
    id: 'cellType',
    header: 'Preview',
    render: (value: unknown) => renderCellPreview(String(value)),
  },
];

export const CellTypes: StoryObj<typeof DataTable<CellTypeRow>> = {
  name: 'Cell Types — All Variants',
  parameters: {
    docs: {
      description: {
        story:
          'All 22 data cell variants available via the `render` prop: text, bold, text+subtext, number, number w/ icon, badge, multiple badges, button, icon button, link button, link button (multiple), checkbox, toggle, avatar, avatar group, more, empty, tree item, child tree item, summary, summary (bold), and input.',
      },
    },
  },
  render: () => (
    <DataTable<CellTypeRow>
      columns={cellTypeColumns as never}
      rows={cellTypeRows}
      getRowId={(row) => row.id}
      toolbar={{ title: 'Data Cell Types' }}
    />
  ),
};
