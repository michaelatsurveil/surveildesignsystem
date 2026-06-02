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
          'Two-part filter: a field-selector dropdown + a value multiselect combined in one component. ' +
          'Idle state shows a "Select Filter" trigger. Clicking opens a panel to pick the filter field and values. ' +
          'Once applied the trigger becomes a chip showing the active filter with a × to remove. ' +
          '[Figma →](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=340-3889)',
      },
      story: { height: '440px' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Filter>;

// ─── Shared sample data ───────────────────────────────────────────────────────

const SAMPLE_FIELDS = [
  {
    label: 'Status',
    value: 'status',
    options: [
      { label: 'Active',   value: 'active'   },
      { label: 'Pending',  value: 'pending'  },
      { label: 'Inactive', value: 'inactive' },
    ],
  },
  {
    label: 'Type',
    value: 'type',
    options: [
      { label: 'M365',   value: 'm365'   },
      { label: 'Google', value: 'google' },
    ],
  },
  {
    label: 'Source',
    value: 'source',
    options: [
      { label: 'Navigator', value: 'navigator' },
      { label: 'Manual',    value: 'manual'    },
      { label: 'API',       value: 'api'       },
    ],
  },
];

// ─── Default — idle ───────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Idle (no filter applied)',
  parameters: {
    docs: {
      description: {
        story: 'Default idle state — shows "Select Filter" trigger. Click to open the Add Filter panel.',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);
    const [fieldValue, setFieldValue] = useState<string | undefined>();
    const [values, setValues] = useState<string[]>([]);

    return (
      <div style={{ paddingBottom: 280 }}>
        <Filter
          fields={SAMPLE_FIELDS}
          fieldValue={fieldValue}
          values={values}
          open={open}
          onToggle={() => setOpen((v) => !v)}
          onApply={(fv, vals) => { setFieldValue(fv); setValues(vals); }}
          onRemove={() => { setFieldValue(undefined); setValues([]); }}
        />
      </div>
    );
  },
};

// ─── Panel open ───────────────────────────────────────────────────────────────

export const PanelOpen: Story = {
  name: 'Panel open — selecting field',
  parameters: {
    docs: {
      description: {
        story: 'Panel is open. Pick a field in the "Title" dropdown to enable the "Value(s)" multiselect.',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(true);
    const [fieldValue, setFieldValue] = useState<string | undefined>();
    const [values, setValues] = useState<string[]>([]);

    return (
      <div style={{ paddingBottom: 320 }}>
        <Filter
          fields={SAMPLE_FIELDS}
          fieldValue={fieldValue}
          values={values}
          open={open}
          onToggle={() => setOpen((v) => !v)}
          onApply={(fv, vals) => { setFieldValue(fv); setValues(vals); setOpen(false); }}
          onRemove={() => { setFieldValue(undefined); setValues([]); }}
        />
      </div>
    );
  },
};

// ─── Applied filter ───────────────────────────────────────────────────────────

export const Applied: Story = {
  name: 'Applied — filter chip shown',
  parameters: {
    docs: {
      description: {
        story:
          'A filter has been applied. The chip shows "Status: Active, Pending" with a × to remove. ' +
          'Clicking the chip label re-opens the panel to edit.',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);
    const [fieldValue, setFieldValue] = useState<string | undefined>('status');
    const [values, setValues] = useState<string[]>(['active', 'pending']);

    return (
      <div style={{ paddingBottom: 280 }}>
        <Filter
          fields={SAMPLE_FIELDS}
          fieldValue={fieldValue}
          values={values}
          open={open}
          onToggle={() => setOpen((v) => !v)}
          onApply={(fv, vals) => { setFieldValue(fv); setValues(vals); setOpen(false); }}
          onRemove={() => { setFieldValue(undefined); setValues([]); }}
        />
      </div>
    );
  },
};

// ─── Multiple selected values ─────────────────────────────────────────────────

export const ManyValues: Story = {
  name: 'Applied — many values (N selected)',
  parameters: {
    docs: {
      description: {
        story: 'When more than two values are selected the chip shows "FieldName: N selected" to keep the trigger compact.',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);
    const [fieldValue, setFieldValue] = useState<string | undefined>('source');
    const [values, setValues] = useState<string[]>(['navigator', 'manual', 'api']);

    return (
      <div style={{ paddingBottom: 280 }}>
        <Filter
          fields={SAMPLE_FIELDS}
          fieldValue={fieldValue}
          values={values}
          open={open}
          onToggle={() => setOpen((v) => !v)}
          onApply={(fv, vals) => { setFieldValue(fv); setValues(vals); setOpen(false); }}
          onRemove={() => { setFieldValue(undefined); setValues([]); }}
        />
      </div>
    );
  },
};

// ─── New-filter variant ───────────────────────────────────────────────────────

export const NewFilter: Story = {
  name: 'New Filter variant (+ Filter)',
  parameters: {
    docs: {
      description: {
        story:
          'Pass `variant="new-filter"` to render the dashed "+ Filter" ghost button. ' +
          'Place it after applied filter chips to let users add additional filters. ' +
          'The `onAddFilter` callback fires on click.',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);
    const [fieldValue, setFieldValue] = useState<string | undefined>('status');
    const [values, setValues] = useState<string[]>(['active']);

    return (
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', paddingBottom: 340 }}>
        <Filter
          fields={SAMPLE_FIELDS}
          fieldValue={fieldValue}
          values={values}
          open={open}
          onToggle={() => setOpen((v) => !v)}
          onApply={(fv, vals) => { setFieldValue(fv); setValues(vals); setOpen(false); }}
          onRemove={() => { setFieldValue(undefined); setValues([]); }}
        />
        <Filter
          variant="new-filter"
          onAddFilter={() => alert('Add filter clicked')}
        />
      </div>
    );
  },
};

// ─── Multiple filters ─────────────────────────────────────────────────────────

export const MultipleFilters: Story = {
  name: 'Multiple filters',
  parameters: {
    docs: {
      description: {
        story:
          'Full toolbar row — one applied filter chip, one idle "Select Filter", and a "+ Filter" button. ' +
          'Each Filter manages its own open state independently.',
      },
    },
  },
  render: () => {
    const [open1, setOpen1] = useState(false);
    const [field1, setField1] = useState<string | undefined>('status');
    const [vals1, setVals1] = useState<string[]>(['active', 'pending']);

    const [open2, setOpen2] = useState(false);
    const [field2, setField2] = useState<string | undefined>();
    const [vals2, setVals2] = useState<string[]>([]);

    return (
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', paddingBottom: 320 }}>
        <Filter
          fields={SAMPLE_FIELDS}
          fieldValue={field1}
          values={vals1}
          open={open1}
          onToggle={() => { setOpen1((v) => !v); setOpen2(false); }}
          onApply={(fv, vals) => { setField1(fv); setVals1(vals); setOpen1(false); }}
          onRemove={() => { setField1(undefined); setVals1([]); }}
        />
        <Filter
          fields={SAMPLE_FIELDS}
          fieldValue={field2}
          values={vals2}
          open={open2}
          onToggle={() => { setOpen2((v) => !v); setOpen1(false); }}
          onApply={(fv, vals) => { setField2(fv); setVals2(vals); setOpen2(false); }}
          onRemove={() => { setField2(undefined); setVals2([]); }}
        />
        <Filter
          variant="new-filter"
          onAddFilter={() => {}}
        />
      </div>
    );
  },
};
