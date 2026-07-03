import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MultiSelect } from './MultiSelect';

const meta: Meta<typeof MultiSelect> = {
  title: 'Input/Multi Select',
  component: MultiSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=2675-8189',
    },
    docs: {
      description: {
        component:
          'Dropdown with checkbox-based multi-selection. Trigger shows the selected item label (single) or a count (multiple). Checked items are highlighted and bolded in the menu. [Figma →](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=2675-8189)',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof MultiSelect>;

const departmentOptions = [
  { label: 'Security', value: 'security' },
  { label: 'Technology', value: 'technology' },
  { label: 'Finance', value: 'finance' },
  { label: 'Operations', value: 'operations' },
];

const departmentOptionsNested = [
  { label: 'Security', value: 'security' },
  { label: 'Technology', value: 'technology' },
  {
    label: 'Finance',
    value: 'finance',
    children: [
      { label: 'Accounting', value: 'accounting' },
      { label: 'Audit', value: 'audit' },
      { label: 'Data Governance', value: 'data-governance' },
      { label: 'Pay Roll', value: 'payroll' },
    ],
  },
  { label: 'Operations', value: 'operations' },
];

function ControlledMultiSelect({ options = departmentOptions, placeholder = 'Select options' }) {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        placeholder={placeholder}
      />
      {selected.length > 0 && (
        <p style={{ margin: 0, fontSize: 12, color: '#818181', fontFamily: 'Roboto, sans-serif' }}>
          Selected: {selected.join(', ')}
        </p>
      )}
    </div>
  );
}

export const Default: Story = {
  name: 'Overview',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, paddingBottom: 200 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af', fontFamily: 'Roboto, sans-serif' }}>
          Department filter
        </p>
        <ControlledMultiSelect placeholder="Department" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af', fontFamily: 'Roboto, sans-serif' }}>
          Disabled
        </p>
        <MultiSelect
          options={departmentOptions}
          value={[]}
          placeholder="Department"
          disabled
        />
      </div>
    </div>
  ),
};

export const Preselected: Story = {
  name: 'Preselected values',
  render: () => {
    function Example() {
      const [selected, setSelected] = useState<string[]>(['finance', 'security']);
      return (
        <div style={{ paddingBottom: 200 }}>
          <MultiSelect
            options={departmentOptions}
            value={selected}
            onChange={setSelected}
            placeholder="Department"
          />
        </div>
      );
    }
    return <Example />;
  },
};

export const Embedded: Story = {
  name: 'Embedded (nested sub-menu)',
  render: () => {
    function Example() {
      const [selected, setSelected] = useState<string[]>([]);
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, paddingBottom: 300 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af', fontFamily: 'Roboto, sans-serif' }}>
              Empty — hover Finance to see sub-menu
            </p>
            <MultiSelect
              variant="embedded"
              options={departmentOptionsNested}
              value={selected}
              onChange={setSelected}
              placeholder="Select Department"
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af', fontFamily: 'Roboto, sans-serif' }}>
              With sub-selections
            </p>
            <EmbeddedPreselected />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af', fontFamily: 'Roboto, sans-serif' }}>
              Disabled
            </p>
            <MultiSelect
              variant="embedded"
              options={departmentOptionsNested}
              value={['accounting', 'audit']}
              placeholder="Select Department"
              disabled
            />
          </div>
        </div>
      );
    }

    function EmbeddedPreselected() {
      const [selected, setSelected] = useState<string[]>(['accounting', 'audit', 'data-governance']);
      return (
        <MultiSelect
          variant="embedded"
          options={departmentOptionsNested}
          value={selected}
          onChange={setSelected}
          placeholder="Select Department"
        />
      );
    }

    return <Example />;
  },
};
