import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Filter } from './Filter';

const meta: Meta<typeof Filter> = {
  title: 'Input/Filter',
  component: Filter,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=340-3889',
    },
    docs: {
      description: {
        component:
          'Filter dropdown trigger with optional label, placeholder/value text, and a chevron that rotates when open. Use for filtering data tables or lists. [Figma →](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=340-3889)',
      },
      story: { height: '240px' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Filter>;

const STATUS_OPTIONS = [
  { label: 'All statuses', value: '' },
  { label: 'Active', value: 'active' },
  { label: 'Pending', value: 'pending' },
  { label: 'Inactive', value: 'inactive' },
];

const TYPE_OPTIONS = [
  { label: 'All types', value: '' },
  { label: 'M365', value: 'm365' },
  { label: 'Google', value: 'google' },
];

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Idle (no selection)',
  render: () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    const selected = STATUS_OPTIONS.find((o) => o.value === value);

    return (
      <div style={{ paddingBottom: 180 }}>
        <Filter
          placeholder="Status"
          value={selected?.value ? selected.label : undefined}
          open={open}
          onToggle={() => setOpen((v) => !v)}
          options={STATUS_OPTIONS}
          onSelect={setValue}
        />
      </div>
    );
  },
};

// ─── With Label ───────────────────────────────────────────────────────────────

export const WithLabel: Story = {
  name: 'With Label',
  render: () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    const selected = STATUS_OPTIONS.find((o) => o.value === value);

    return (
      <div style={{ paddingBottom: 180 }}>
        <Filter
          label="Status"
          placeholder="All statuses"
          value={selected?.value ? selected.label : undefined}
          open={open}
          onToggle={() => setOpen((v) => !v)}
          options={STATUS_OPTIONS}
          onSelect={setValue}
        />
      </div>
    );
  },
};

// ─── Open ─────────────────────────────────────────────────────────────────────

export const Open: Story = {
  name: 'Selecting Element — Open state',
  render: () => {
    const [open, setOpen] = useState(true);
    const [value, setValue] = useState('');

    const selected = STATUS_OPTIONS.find((o) => o.value === value);

    return (
      <div style={{ paddingBottom: 180 }}>
        <Filter
          label="Status"
          placeholder="All statuses"
          value={selected?.value ? selected.label : undefined}
          open={open}
          onToggle={() => setOpen((v) => !v)}
          options={STATUS_OPTIONS}
          onSelect={setValue}
        />
      </div>
    );
  },
};

// ─── With Selection ───────────────────────────────────────────────────────────

export const WithSelection: Story = {
  name: 'With Selection',
  render: () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('active');

    const selected = STATUS_OPTIONS.find((o) => o.value === value);

    return (
      <div style={{ paddingBottom: 180 }}>
        <Filter
          label="Status"
          placeholder="All statuses"
          value={selected?.label}
          open={open}
          onToggle={() => setOpen((v) => !v)}
          options={STATUS_OPTIONS}
          onSelect={setValue}
        />
      </div>
    );
  },
};

// ─── Multiple Filters ─────────────────────────────────────────────────────────

export const MultipleFilters: Story = {
  name: 'Multiple Filters',
  render: () => {
    const [statusOpen, setStatusOpen] = useState(false);
    const [statusValue, setStatusValue] = useState('');
    const [typeOpen, setTypeOpen] = useState(false);
    const [typeValue, setTypeValue] = useState('');

    const selectedStatus = STATUS_OPTIONS.find((o) => o.value === statusValue);
    const selectedType = TYPE_OPTIONS.find((o) => o.value === typeValue);

    return (
      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', paddingBottom: 180 }}>
        <Filter
          label="Status"
          placeholder="All statuses"
          value={selectedStatus?.value ? selectedStatus.label : undefined}
          open={statusOpen}
          onToggle={() => { setStatusOpen((v) => !v); setTypeOpen(false); }}
          options={STATUS_OPTIONS}
          onSelect={setStatusValue}
        />
        <Filter
          label="Type"
          placeholder="All types"
          value={selectedType?.value ? selectedType.label : undefined}
          open={typeOpen}
          onToggle={() => { setTypeOpen((v) => !v); setStatusOpen(false); }}
          options={TYPE_OPTIONS}
          onSelect={setTypeValue}
        />
      </div>
    );
  },
};
