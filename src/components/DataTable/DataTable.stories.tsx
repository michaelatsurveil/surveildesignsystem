import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  MoreVertical, ChevronRight, ChevronDown,
  Mail, ExternalLink, ArrowUpRight,
} from 'lucide-react';
import { DataTable, DataTableEmptyState } from './DataTable';
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

export const overviewColumns = [
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

// ─── Overview data (tree: 4 regions × 9 rows each = 36 total, 4 pages) ───────

type OverviewRow = {
  id: string;
  type: 'parent' | 'child';
  parentId?: string;
  name: string;
  region: string;
  devices: number;
  users: number;
  status: 'Active' | 'Pending' | 'Warning';
};

const overviewData: OverviewRow[] = [
  // APAC — 1 parent + 8 children = 9 rows (page 1)
  { id: 'apac',   type: 'parent',                   name: 'APAC',         region: 'Asia Pacific',          devices: 1240, users:  3820, status: 'Active'  },
  { id: 'apac-1', type: 'child', parentId: 'apac',  name: 'Contoso AU',   region: 'Australia',             devices:  480, users:  1200, status: 'Active'  },
  { id: 'apac-2', type: 'child', parentId: 'apac',  name: 'Fabrikam SG',  region: 'Singapore',             devices:  390, users:  1140, status: 'Active'  },
  { id: 'apac-3', type: 'child', parentId: 'apac',  name: 'Northwind JP', region: 'Japan',                 devices:  370, users:  1480, status: 'Pending' },
  { id: 'apac-4', type: 'child', parentId: 'apac',  name: 'Tailspin NZ',  region: 'New Zealand',           devices:  220, users:   680, status: 'Active'  },
  { id: 'apac-5', type: 'child', parentId: 'apac',  name: 'Proseware IN', region: 'India',                 devices:  510, users:  1620, status: 'Active'  },
  { id: 'apac-6', type: 'child', parentId: 'apac',  name: 'Contoso HK',   region: 'Hong Kong',             devices:  145, users:   430, status: 'Warning' },
  { id: 'apac-7', type: 'child', parentId: 'apac',  name: 'Fabrikam KR',  region: 'South Korea',           devices:  285, users:   840, status: 'Active'  },
  { id: 'apac-8', type: 'child', parentId: 'apac',  name: 'Northwind MY', region: 'Malaysia',              devices:  195, users:   570, status: 'Active'  },
  // EMEA — 1 parent + 8 children = 9 rows (page 2)
  { id: 'emea',   type: 'parent',                   name: 'EMEA',         region: 'Europe / Middle East',  devices: 2105, users:  6430, status: 'Active'  },
  { id: 'emea-1', type: 'child', parentId: 'emea',  name: 'Contoso UK',   region: 'United Kingdom',        devices:  720, users:  2100, status: 'Active'  },
  { id: 'emea-2', type: 'child', parentId: 'emea',  name: 'Fabrikam DE',  region: 'Germany',               devices:  580, users:  1890, status: 'Active'  },
  { id: 'emea-3', type: 'child', parentId: 'emea',  name: 'Northwind FR', region: 'France',                devices:  805, users:  2440, status: 'Active'  },
  { id: 'emea-4', type: 'child', parentId: 'emea',  name: 'Tailspin NL',  region: 'Netherlands',           devices:  310, users:   920, status: 'Pending' },
  { id: 'emea-5', type: 'child', parentId: 'emea',  name: 'Proseware SE', region: 'Sweden',                devices:  245, users:   730, status: 'Active'  },
  { id: 'emea-6', type: 'child', parentId: 'emea',  name: 'Contoso AE',   region: 'UAE',                   devices:  190, users:   560, status: 'Active'  },
  { id: 'emea-7', type: 'child', parentId: 'emea',  name: 'Fabrikam PL',  region: 'Poland',                devices:  175, users:   520, status: 'Warning' },
  { id: 'emea-8', type: 'child', parentId: 'emea',  name: 'Northwind IT', region: 'Italy',                 devices:  410, users:  1240, status: 'Active'  },
  // Americas — 1 parent + 8 children = 9 rows (page 3)
  { id: 'amer',   type: 'parent',                   name: 'Americas',     region: 'North / South America', devices: 3870, users: 11250, status: 'Active'  },
  { id: 'amer-1', type: 'child', parentId: 'amer',  name: 'Contoso US',   region: 'United States',         devices: 1420, users:  4800, status: 'Active'  },
  { id: 'amer-2', type: 'child', parentId: 'amer',  name: 'Fabrikam CA',  region: 'Canada',                devices:  980, users:  3200, status: 'Active'  },
  { id: 'amer-3', type: 'child', parentId: 'amer',  name: 'Northwind BR', region: 'Brazil',                devices: 1470, users:  3250, status: 'Pending' },
  { id: 'amer-4', type: 'child', parentId: 'amer',  name: 'Tailspin MX',  region: 'Mexico',                devices:  320, users:   980, status: 'Active'  },
  { id: 'amer-5', type: 'child', parentId: 'amer',  name: 'Proseware AR', region: 'Argentina',             devices:  210, users:   640, status: 'Active'  },
  { id: 'amer-6', type: 'child', parentId: 'amer',  name: 'Contoso CO',   region: 'Colombia',              devices:  195, users:   590, status: 'Warning' },
  { id: 'amer-7', type: 'child', parentId: 'amer',  name: 'Fabrikam CL',  region: 'Chile',                 devices:  280, users:   840, status: 'Active'  },
  { id: 'amer-8', type: 'child', parentId: 'amer',  name: 'Northwind PE', region: 'Peru',                  devices:  165, users:   480, status: 'Active'  },
  // APJ — 1 parent + 8 children = 9 rows (page 4)
  { id: 'apj',    type: 'parent',                   name: 'APJ',          region: 'Asia Pacific Japan',    devices: 1640, users:  4920, status: 'Active'  },
  { id: 'apj-1',  type: 'child', parentId: 'apj',   name: 'Contoso JP',   region: 'Japan',                 devices:  440, users:  1320, status: 'Active'  },
  { id: 'apj-2',  type: 'child', parentId: 'apj',   name: 'Fabrikam TH',  region: 'Thailand',              devices:  280, users:   840, status: 'Active'  },
  { id: 'apj-3',  type: 'child', parentId: 'apj',   name: 'Northwind VN', region: 'Vietnam',               devices:  310, users:   930, status: 'Pending' },
  { id: 'apj-4',  type: 'child', parentId: 'apj',   name: 'Tailspin PH',  region: 'Philippines',           devices:  195, users:   585, status: 'Active'  },
  { id: 'apj-5',  type: 'child', parentId: 'apj',   name: 'Proseware ID', region: 'Indonesia',             devices:  420, users:  1260, status: 'Active'  },
  { id: 'apj-6',  type: 'child', parentId: 'apj',   name: 'Contoso TW',   region: 'Taiwan',                devices:  165, users:   495, status: 'Warning' },
  { id: 'apj-7',  type: 'child', parentId: 'apj',   name: 'Fabrikam MM',  region: 'Myanmar',               devices:   95, users:   285, status: 'Active'  },
  { id: 'apj-8',  type: 'child', parentId: 'apj',   name: 'Northwind PK', region: 'Pakistan',              devices:  215, users:   645, status: 'Active'  },
];

// ─── Overview story ────────────────────────────────────────────────────────

export const Default: StoryObj<typeof DataTable<OverviewRow>> = {
  name: 'Overview — Tree + Numbers + Tags + Pagination',
  render: function Overview() {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const pageSize = 9;
    const [expandedIds, setExpandedIds] = useState<Set<string>>(
      new Set(['apac', 'emea', 'amer', 'apj'])
    );
    const [filterStatus, setFilterStatus] = useState('');
    const [viewMode, setViewMode] = useState('table');

    const toggle = (id: string) =>
      setExpandedIds((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      });

    // Build visible rows: parents always visible; children only when parent is expanded
    const allVisible = overviewData.filter(
      (row) => row.type === 'parent' || expandedIds.has(row.parentId!)
    );

    // Apply search + status filter (status filter skips parent rows so they always show)
    const filtered = allVisible.filter((row) => {
      const matchesQuery =
        !query ||
        row.name.toLowerCase().includes(query.toLowerCase()) ||
        row.region.toLowerCase().includes(query.toLowerCase());
      const matchesStatus =
        !filterStatus || row.type === 'parent' || row.status === filterStatus;
      return matchesQuery && matchesStatus;
    });

    const total = filtered.length;
    const pagedRows = filtered.slice((page - 1) * pageSize, page * pageSize);

    const columns = [
      {
        id: 'name',
        header: 'Name',
        headerClassName: 'data-table__cell--head-chevron',
        render: (_: unknown, row: OverviewRow) => {
          if (row.type === 'parent') {
            const isOpen = expandedIds.has(row.id);
            return (
              <span style={{ display: 'flex', alignItems: 'center', marginLeft: '-4px' }}>
                <button
                  type="button"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, width: 16, background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--color-grey,#616161)' }}
                  onClick={() => { toggle(row.id); setPage(1); }}
                  aria-label={isOpen ? 'Collapse' : 'Expand'}
                >
                  {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
                <strong style={{ fontWeight: 600, color: 'var(--color-grey-700,#272727)' }}>{row.name}</strong>
              </span>
            );
          }
          return (
            <span className="data-table__cell--child-tree" style={{ display: 'block' }}>
              {row.name}
            </span>
          );
        },
      },
      { id: 'region', header: 'Region' },
      {
        id: 'devices',
        header: 'Devices',
        headerClassName: 'data-table__cell--right',
        render: (value: unknown) => (
          <span className="data-table__cell-number" style={{ display: 'block', textAlign: 'right' }}>
            {Number(value).toLocaleString()}
          </span>
        ),
      },
      {
        id: 'users',
        header: 'Users',
        headerClassName: 'data-table__cell--right',
        render: (value: unknown) => (
          <span className="data-table__cell-number" style={{ display: 'block', textAlign: 'right' }}>
            {Number(value).toLocaleString()}
          </span>
        ),
      },
      {
        id: 'status',
        header: 'Status',
        render: (value: unknown) => (
          <Tag
            variant={value === 'Active' ? 'success' : value === 'Pending' ? 'attention' : 'attention'}
            size="sm"
          >
            {String(value)}
          </Tag>
        ),
      },
    ];

    return (
      <DataTable<OverviewRow>
        columns={columns as never}
        rows={pagedRows}
        getRowId={(row) => row.id}
        toolbar={{
          onSearch: (q) => { setQuery(q); setPage(1); },
          searchPlaceholder: 'Search…',
          inlineFilters: [
            {
              placeholder: 'Status',
              options: [
                { label: 'Active',  value: 'Active'  },
                { label: 'Pending', value: 'Pending' },
                { label: 'Warning', value: 'Warning' },
              ],
              value: filterStatus || undefined,
              onSelect: (v) => { setFilterStatus(v); setPage(1); },
            },
          ],
          onAddFilter: () => {},
          rightAction: {
            type: 'view',
            viewOptions: [
              { label: 'Table',   value: 'table'   },
              { label: 'Card',    value: 'card'    },
              { label: 'Compact', value: 'compact' },
            ],
            viewValue: viewMode,
            onViewChange: setViewMode,
          },
        }}
        pagination={{
          page,
          pageSize,
          total,
          onPageChange: (p) => setPage(p),
        }}
      />
    );
  },
};

// ─── Empty State story ─────────────────────────────────────────────────────

export const EmptyState: StoryObj<typeof DataTable<TenantRow>> = {
  name: 'Empty State',
  parameters: {
    docs: {
      description: {
        story:
          'When a table has no rows, pass `emptyState={<DataTableEmptyState />}` to show the standard empty state. The toolbar still renders; pagination is hidden. Use `heading`, `description`, `primaryAction`, and `secondaryAction` props to customise the message and call-to-action buttons.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>

      {/* With action bar */}
      <div>
        <p style={{ margin: '0 0 12px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af', fontFamily: 'Roboto, sans-serif' }}>With action buttons</p>
        <DataTable<TenantRow>
          columns={overviewColumns}
          rows={[]}
          getRowId={(row) => row.tenantEmail}
          toolbar={{
            onSearch: () => {},
            searchPlaceholder: 'Search…',
            inlineFilters: [{ placeholder: 'Status', options: [] }],
            rightAction: { type: 'view', viewOptions: [{ label: 'Table', value: 'table' }], viewValue: 'table' },
          }}
          emptyState={
            <DataTableEmptyState
              secondaryAction={{ label: 'Import data' }}
              primaryAction={{ label: 'Add tenant' }}
            />
          }
        />
      </div>

      {/* Without action bar */}
      <div>
        <p style={{ margin: '0 0 12px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af', fontFamily: 'Roboto, sans-serif' }}>Without action buttons</p>
        <DataTable<TenantRow>
          columns={overviewColumns}
          rows={[]}
          getRowId={(row) => row.tenantEmail}
          toolbar={{ onSearch: () => {}, rightAction: { type: 'view', viewOptions: [{ label: 'Table', value: 'table' }], viewValue: 'table' } }}
          emptyState={<DataTableEmptyState />}
        />
      </div>

      {/* Custom message */}
      <div>
        <p style={{ margin: '0 0 12px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af', fontFamily: 'Roboto, sans-serif' }}>Custom heading & description</p>
        <DataTable<TenantRow>
          columns={overviewColumns}
          rows={[]}
          getRowId={(row) => row.tenantEmail}
          toolbar={{ onSearch: () => {}, rightAction: { type: 'view', viewOptions: [{ label: 'Table', value: 'table' }], viewValue: 'table' } }}
          emptyState={
            <DataTableEmptyState
              heading="No tenants found"
              description="Try adjusting your search or filters to find what you're looking for."
              primaryAction={{ label: 'Clear filters' }}
            />
          }
        />
      </div>

    </div>
  ),
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
    <span style={{ display: 'flex', alignItems: 'center', marginLeft: '-4px' }}>
      <button
        type="button"
        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, width: 16, background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--color-grey,#616161)' }}
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

    case 'text-subtext-right':
      return (
        <span style={{ display: 'block', textAlign: 'right' }}>
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

    case 'heading-chevron-text':
      return (
        <span style={{ display: 'block', margin: '-8px -16px', padding: '12px 16px 12px 36px', fontSize: 12, fontWeight: 500, color: 'var(--color-text-body,#616161)', background: 'var(--color-background-alt,#f9fafb)', borderBottom: '1px solid var(--color-grey-100,#dfdfdf)' }}>
          Column name
        </span>
      );

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

    case 'row-group-header':
      return (
        <span className="data-table__cell--group-header">
          <button type="button" className="data-table__group-toggle">
            <ChevronDown size={14} strokeWidth={2} className="data-table__group-toggle-chevron" />
            <span className="data-table__group-indicator" aria-hidden />
            Group Name
            <Tag variant="default" size="sm">Error</Tag>
          </button>
        </span>
      );

    default:
      return null;
  }
}

const cellTypeRows: CellTypeRow[] = [
  { id: '1',  label: 'Text',                  cellType: 'text' },
  { id: '2',  label: 'Text (Bold)',            cellType: 'text-bold' },
  { id: '3',  label: 'Text + Subtext',          cellType: 'text-subtext' },
  { id: '3a', label: 'Text + Subtext (Right)',  cellType: 'text-subtext-right' },
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
  { id: '18', label: 'Heading — Chevron text', cellType: 'heading-chevron-text' },
  { id: '19', label: 'Tree Item',              cellType: 'tree-item' },
  { id: '20', label: 'Child Tree Item',        cellType: 'child-tree-item' },
  { id: '21', label: 'Summary',                cellType: 'summary' },
  { id: '22', label: 'Summary (Bold)',         cellType: 'summary-bold' },
  { id: '23', label: 'Input',                  cellType: 'input' },
  { id: '24', label: 'Row Group Header',        cellType: 'row-group-header' },
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
          'All 25 data cell variants available via the `render` prop: text, bold, text+subtext, text+subtext (right), number, number w/ icon, badge, multiple badges, button, icon button, link button, link button (multiple), checkbox, toggle, avatar, avatar group, more, empty, heading–chevron text, tree item, child tree item, summary, summary (bold), input, and row group header.',
      },
    },
  },
  render: () => (
    <DataTable<CellTypeRow>
      columns={cellTypeColumns as never}
      rows={cellTypeRows}
      getRowId={(row) => row.id}
      toolbar={{ onSearch: () => {}, rightAction: { type: 'view', viewOptions: [{ label: 'Table', value: 'table' }], viewValue: 'table' } }}
    />
  ),
};

// ─── Tree View story ───────────────────────────────────────────────────────

type TreeRow = {
  id: string;
  type: 'parent' | 'child';
  parentId?: string;
  name: string;
  devices: string;
  users: string;
  status: string;
};

const treeData: TreeRow[] = [
  { id: 'apac',   type: 'parent',                  name: 'APAC',         devices: '1,240', users: '3,820',  status: 'Active'  },
  { id: 'apac-1', type: 'child', parentId: 'apac', name: 'Contoso AU',   devices: '480',   users: '1,200',  status: 'Active'  },
  { id: 'apac-2', type: 'child', parentId: 'apac', name: 'Fabrikam SG',  devices: '390',   users: '1,140',  status: 'Active'  },
  { id: 'apac-3', type: 'child', parentId: 'apac', name: 'Northwind JP', devices: '370',   users: '1,480',  status: 'Pending' },
  { id: 'emea',   type: 'parent',                  name: 'EMEA',         devices: '2,105', users: '6,430',  status: 'Active'  },
  { id: 'emea-1', type: 'child', parentId: 'emea', name: 'Contoso UK',   devices: '720',   users: '2,100',  status: 'Active'  },
  { id: 'emea-2', type: 'child', parentId: 'emea', name: 'Fabrikam DE',  devices: '580',   users: '1,890',  status: 'Active'  },
  { id: 'emea-3', type: 'child', parentId: 'emea', name: 'Northwind FR', devices: '805',   users: '2,440',  status: 'Active'  },
  { id: 'amer',   type: 'parent',                  name: 'Americas',     devices: '3,870', users: '11,250', status: 'Active'  },
  { id: 'amer-1', type: 'child', parentId: 'amer', name: 'Contoso US',   devices: '1,420', users: '4,800',  status: 'Active'  },
  { id: 'amer-2', type: 'child', parentId: 'amer', name: 'Fabrikam CA',  devices: '980',   users: '3,200',  status: 'Active'  },
  { id: 'amer-3', type: 'child', parentId: 'amer', name: 'Northwind BR', devices: '1,470', users: '3,250',  status: 'Pending' },
];

export const TreeView: StoryObj<typeof DataTable<TreeRow>> = {
  name: 'Tree View',
  parameters: {
    docs: {
      description: {
        story: 'Parent rows with an expand/collapse chevron; child rows indented below. Uses `headerClassName` on the first column to apply the `.data-table__cell--head-chevron` offset (36px), aligning the header with tree item text.',
      },
    },
  },
  render: function TreeViewStory() {
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['apac', 'emea', 'amer']));

    const toggle = (id: string) =>
      setExpandedIds((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      });

    const visibleRows = treeData.filter(
      (row) => row.type === 'parent' || expandedIds.has(row.parentId!)
    );

    const columns = [
      {
        id: 'name',
        header: 'Tenant / Region',
        headerClassName: 'data-table__cell--head-chevron',
        render: (_: unknown, row: TreeRow) => {
          if (row.type === 'parent') {
            const isOpen = expandedIds.has(row.id);
            return (
              <span style={{ display: 'flex', alignItems: 'center', marginLeft: '-4px' }}>
                <button
                  type="button"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, width: 16, background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--color-grey,#616161)' }}
                  onClick={() => toggle(row.id)}
                  aria-label={isOpen ? 'Collapse' : 'Expand'}
                >
                  {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
                <strong style={{ fontWeight: 600, color: 'var(--color-grey-700,#272727)' }}>{row.name}</strong>
              </span>
            );
          }
          return (
            <span className="data-table__cell--child-tree" style={{ display: 'block' }}>
              {row.name}
            </span>
          );
        },
      },
      { id: 'devices', header: 'Devices' },
      { id: 'users',   header: 'Users' },
      {
        id: 'status',
        header: 'Status',
        render: (value: unknown) => (
          <Tag variant={value === 'Active' ? 'success' : 'attention'} size="sm">
            {String(value)}
          </Tag>
        ),
      },
    ];

    return (
      <DataTable<TreeRow>
        columns={columns as never}
        rows={visibleRows}
        getRowId={(row) => row.id}
        toolbar={{
          onSearch: () => {},
          searchPlaceholder: 'Search…',
          inlineFilters: [{ placeholder: 'Status', options: [{ label: 'Active', value: 'Active' }, { label: 'Pending', value: 'Pending' }] }],
          onAddFilter: () => {},
          rightAction: { type: 'view', viewOptions: [{ label: 'Table', value: 'table' }, { label: 'Card', value: 'card' }], viewValue: 'table' },
        }}
      />
    );
  },
};

// ─── Row Groups story ──────────────────────────────────────────────────────

type PriorityRow = {
  id: string;
  tenant: string;
  email: string;
  devices: string;
  status: string;
};

const urgentRows: PriorityRow[] = [
  { id: 'u-1', tenant: 'Contoso',         email: 'admin@contoso.com',   devices: '480', status: 'Active'  },
  { id: 'u-2', tenant: 'Fabrikam',        email: 'admin@fabrikam.com',  devices: '390', status: 'Active'  },
  { id: 'u-3', tenant: 'Adventure Works', email: 'admin@adventure.com', devices: '612', status: 'Pending' },
];

const mediumRows: PriorityRow[] = [
  { id: 'm-1', tenant: 'Northwind',    email: 'admin@northwind.com', devices: '210', status: 'Active'  },
  { id: 'm-2', tenant: 'Tailspin',     email: 'admin@tailspin.com',  devices: '145', status: 'Pending' },
  { id: 'm-3', tenant: 'Proseware',    email: 'admin@proseware.com', devices: '320', status: 'Active'  },
  { id: 'm-4', tenant: 'Contoso UK',   email: 'uk@contoso.com',      devices: '280', status: 'Active'  },
  { id: 'm-5', tenant: 'Fabrikam DE',  email: 'de@fabrikam.com',     devices: '198', status: 'Pending' },
  { id: 'm-6', tenant: 'Northwind FR', email: 'fr@northwind.com',    devices: '425', status: 'Active'  },
];

export const RowGroups: StoryObj<typeof DataTable<PriorityRow>> = {
  name: 'Row Groups',
  parameters: {
    docs: {
      description: {
        story:
          'Pass a `groups` array to render each group as a bordered card (8px radius, `border/light` border) ' +
          'separated by a 16px gap. Each group has its own rows and optional numbered pagination. ' +
          'The component manages collapse state internally — clicking the group header toggles its rows. ' +
          'Use `defaultCollapsedGroupIds` to start specific groups collapsed.',
      },
    },
  },
  render: function RowGroupsStory() {
    const [urgentPage, setUrgentPage] = useState(1);
    const [mediumPage, setMediumPage] = useState(1);

    const priorityColumns = [
      { id: 'tenant',  header: 'Tenant'  },
      { id: 'email',   header: 'Email'   },
      { id: 'devices', header: 'Devices' },
      {
        id: 'status',
        header: 'Status',
        render: (value: unknown) => (
          <Tag
            variant={value === 'Active' ? 'success' : value === 'Pending' ? 'attention' : 'default'}
            size="sm"
          >
            {String(value)}
          </Tag>
        ),
      },
    ];

    return (
      <DataTable<PriorityRow>
        columns={priorityColumns as never}
        getRowId={(row) => row.id}
        toolbar={{
          onSearch: () => {},
          searchPlaceholder: 'Search…',
          inlineFilters: [
            {
              placeholder: 'Filter name',
              options: [
                { label: 'Active',  value: 'Active'  },
                { label: 'Pending', value: 'Pending' },
              ],
            },
          ],
          onAddFilter: () => {},
          rightAction: {
            type: 'view',
            viewOptions: [
              { label: 'Table',   value: 'table'   },
              { label: 'Card',    value: 'card'    },
              { label: 'Compact', value: 'compact' },
            ],
            viewValue: 'table',
          },
        }}
        groups={[
          {
            id: 'g-urgent',
            header: (
              <>
                <span className="data-table__group-indicator" aria-hidden />
                Urgent Priority
                <Tag variant="default" size="sm">Default</Tag>
              </>
            ),
            rows: urgentRows,
            pagination: {
              page: urgentPage,
              pageSize: 3,
              total: 36,
              onPageChange: setUrgentPage,
            },
          },
          {
            id: 'g-medium',
            header: (
              <>
                <span className="data-table__group-indicator" aria-hidden />
                Medium Priority
                <Tag variant="attention" size="circle">6</Tag>
              </>
            ),
            rows: mediumRows,
            pagination: {
              page: mediumPage,
              pageSize: 6,
              total: 36,
              onPageChange: setMediumPage,
            },
          },
        ]}
      />
    );
  },
};

// ─── Editable Cells story ──────────────────────────────────────────────────

type EditableRow = {
  id: string;
  tenant: string;
  email: string;
  devices: string;
  status: string;
};

const editableBaseRows: EditableRow[] = [
  { id: 'e-1', tenant: 'Contoso',         email: 'admin@contoso.com',   devices: '480', status: 'Active'  },
  { id: 'e-2', tenant: 'Fabrikam',        email: 'admin@fabrikam.com',  devices: '390', status: 'Active'  },
  { id: 'e-3', tenant: 'Northwind',       email: 'admin@northwind.com', devices: '210', status: 'Pending' },
  { id: 'e-4', tenant: 'Adventure Works', email: 'admin@adventure.com', devices: '612', status: 'Active'  },
];

export const EditableCells: StoryObj<typeof DataTable<EditableRow>> = {
  name: 'Editable Cells',
  parameters: {
    docs: {
      description: {
        story:
          'Set `editable: true` on a column to render its cells as inline text inputs. ' +
          'Pair with `onCellChange` to receive live updates — the callback receives the new string value and the full row object. ' +
          '`editable` is ignored when a custom `render` function is also provided on the same column.',
      },
    },
  },
  render: function EditableCellsStory() {
    const [rows, setRows] = useState<EditableRow[]>(editableBaseRows);

    const handleChange = (field: keyof EditableRow) => (value: string, row: EditableRow) => {
      setRows((prev) =>
        prev.map((r) => (r.id === row.id ? { ...r, [field]: value } : r))
      );
    };

    const columns = [
      {
        id: 'tenant',
        header: 'Tenant',
        editable: true,
        onCellChange: handleChange('tenant'),
      },
      {
        id: 'email',
        header: 'Email',
        editable: true,
        onCellChange: handleChange('email'),
      },
      { id: 'devices', header: 'Devices' },
      {
        id: 'status',
        header: 'Status',
        render: (value: unknown) => (
          <Tag variant={value === 'Active' ? 'success' : 'attention'} size="sm">
            {String(value)}
          </Tag>
        ),
      },
    ];

    return (
      <DataTable<EditableRow>
        columns={columns as never}
        rows={rows}
        getRowId={(row) => row.id}
        toolbar={{
          onSearch: () => {},
          searchPlaceholder: 'Search…',
          inlineFilters: [{ placeholder: 'Status', options: [{ label: 'Active', value: 'Active' }, { label: 'Pending', value: 'Pending' }] }],
          onAddFilter: () => {},
          rightAction: { type: 'view', viewOptions: [{ label: 'Table', value: 'table' }, { label: 'Card', value: 'card' }], viewValue: 'table' },
        }}
      />
    );
  },
};

// ─── Toolbar with Button Actions story ────────────────────────────────────

export const ToolbarWithButtons: StoryObj<typeof DataTable<TenantRow>> = {
  name: 'Toolbar — Button Actions',
  parameters: {
    docs: {
      description: {
        story:
          'New toolbar layout with inline search, filter chips, and primary + secondary action buttons on the right.',
      },
    },
  },
  render: function ToolbarWithButtonsStory() {
    const [query, setQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterType, setFilterType] = useState('');

    const filtered = allRows.slice(0, 10).filter((r) => {
      if (query && !r.tenant.toLowerCase().includes(query.toLowerCase())) return false;
      if (filterStatus && r.status !== filterStatus) return false;
      if (filterType && r.type !== filterType) return false;
      return true;
    });

    return (
      <DataTable<TenantRow>
        columns={overviewColumns}
        rows={filtered}
        getRowId={(row) => row.tenantEmail}
        toolbar={{
          onSearch: (q) => setQuery(q),
          searchPlaceholder: 'Search tenants…',
          inlineFilters: [
            {
              placeholder: 'Status',
              options: [
                { label: 'Active', value: 'Active' },
                { label: 'Pending', value: 'Pending' },
                { label: 'Default', value: 'Default' },
              ],
              value: filterStatus || undefined,
              onSelect: setFilterStatus,
            },
            {
              placeholder: 'Type',
              options: [
                { label: 'M365', value: 'M365' },
                { label: 'Google', value: 'Google' },
              ],
              value: filterType || undefined,
              onSelect: setFilterType,
            },
          ],
          onAddFilter: () => {},
          rightAction: {
            type: 'buttons',
            primary: { label: 'Add tenant' },
            secondary: { label: 'Import' },
          },
        }}
      />
    );
  },
};

// ─── Toolbar with View Dropdown story ─────────────────────────────────────

export const ToolbarWithViewDropdown: StoryObj<typeof DataTable<TenantRow>> = {
  name: 'Toolbar — View Dropdown',
  parameters: {
    docs: {
      description: {
        story:
          'Same toolbar layout but right-side action replaced with a View dropdown (Table / Card / Compact options).',
      },
    },
  },
  render: function ToolbarWithViewDropdownStory() {
    const [query, setQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterType, setFilterType] = useState('');
    const [viewMode, setViewMode] = useState('table');

    const filtered = allRows.slice(0, 10).filter((r) => {
      if (query && !r.tenant.toLowerCase().includes(query.toLowerCase())) return false;
      if (filterStatus && r.status !== filterStatus) return false;
      if (filterType && r.type !== filterType) return false;
      return true;
    });

    return (
      <DataTable<TenantRow>
        columns={overviewColumns}
        rows={filtered}
        getRowId={(row) => row.tenantEmail}
        toolbar={{
          onSearch: (q) => setQuery(q),
          searchPlaceholder: 'Search tenants…',
          inlineFilters: [
            {
              placeholder: 'Status',
              options: [
                { label: 'Active', value: 'Active' },
                { label: 'Pending', value: 'Pending' },
                { label: 'Default', value: 'Default' },
              ],
              value: filterStatus || undefined,
              onSelect: setFilterStatus,
            },
            {
              placeholder: 'Type',
              options: [
                { label: 'M365', value: 'M365' },
                { label: 'Google', value: 'Google' },
              ],
              value: filterType || undefined,
              onSelect: setFilterType,
            },
          ],
          onAddFilter: () => {},
          rightAction: {
            type: 'view',
            viewOptions: [
              { label: 'Table', value: 'table' },
              { label: 'Card', value: 'card' },
              { label: 'Compact', value: 'compact' },
            ],
            viewValue: viewMode,
            onViewChange: setViewMode,
          },
        }}
      />
    );
  },
};
