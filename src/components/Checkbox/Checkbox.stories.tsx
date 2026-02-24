import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Input/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=382-1585',
    },
    docs: {
      description: {
        component:
          'Checkboxes let users select one or more options. Use for multi-select or toggles. Supports indeterminate state for "select all" scenarios. [Figma →](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=382-1585)',
      },
    },
  },
  argTypes: {
    checked: {
      control: 'boolean',
    },
    indeterminate: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        label="Label"
        checked={checked}
        onChange={setChecked}
      />
    );
  },
};

export const Checked: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    return (
      <Checkbox
        label="Label"
        checked={checked}
        onChange={setChecked}
      />
    );
  },
};

export const Indeterminate: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        label="Select all"
        checked={checked}
        indeterminate
        onChange={setChecked}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    label: 'Label',
    checked: false,
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Label',
    checked: true,
    disabled: true,
  },
};

export const DisabledIndeterminate: Story = {
  render: () => (
    <Checkbox
      label="Select all"
      checked={false}
      indeterminate
      disabled
    />
  ),
};

export const CheckboxGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['b']);
    const options = [
      { id: 'a', label: 'Option A' },
      { id: 'b', label: 'Option B' },
      { id: 'c', label: 'Option C' },
    ];
    const toggle = (id: string) => {
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {options.map((opt) => (
          <Checkbox
            key={opt.id}
            label={opt.label}
            checked={selected.includes(opt.id)}
            onChange={() => toggle(opt.id)}
          />
        ))}
      </div>
    );
  },
};

export const SelectAllExample: Story = {
  render: () => {
    const options = [
      { id: 'a', label: 'Option A' },
      { id: 'b', label: 'Option B' },
      { id: 'c', label: 'Option C' },
    ];
    const [selected, setSelected] = useState<string[]>(['b']);
    const allSelected = selected.length === options.length;
    const someSelected = selected.length > 0;
    const indeterminate = someSelected && !allSelected;

    const toggleAll = () => {
      setSelected(allSelected ? [] : options.map((o) => o.id));
    };
    const toggle = (id: string) => {
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Checkbox
          label="Select all"
          checked={allSelected}
          indeterminate={indeterminate}
          onChange={toggleAll}
        />
        <div style={{ paddingLeft: 26, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {options.map((opt) => (
            <Checkbox
              key={opt.id}
              label={opt.label}
              checked={selected.includes(opt.id)}
              onChange={() => toggle(opt.id)}
            />
          ))}
        </div>
      </div>
    );
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
      <div>
        <div style={{ marginBottom: 12, fontSize: 12, fontWeight: 600, color: '#616161' }}>
          Unchecked
        </div>
        <Checkbox label="Label" checked={false} onChange={() => {}} />
      </div>
      <div>
        <div style={{ marginBottom: 12, fontSize: 12, fontWeight: 600, color: '#616161' }}>
          Checked
        </div>
        <Checkbox label="Label" checked onChange={() => {}} />
      </div>
      <div>
        <div style={{ marginBottom: 12, fontSize: 12, fontWeight: 600, color: '#616161' }}>
          Indeterminate
        </div>
        <Checkbox label="Select all" checked={false} indeterminate onChange={() => {}} />
      </div>
      <div>
        <div style={{ marginBottom: 12, fontSize: 12, fontWeight: 600, color: '#616161' }}>
          Disabled Unchecked
        </div>
        <Checkbox label="Label" checked={false} disabled />
      </div>
      <div>
        <div style={{ marginBottom: 12, fontSize: 12, fontWeight: 600, color: '#616161' }}>
          Disabled Checked
        </div>
        <Checkbox label="Label" checked disabled />
      </div>
      <div>
        <div style={{ marginBottom: 12, fontSize: 12, fontWeight: 600, color: '#616161' }}>
          Disabled Indeterminate
        </div>
        <Checkbox label="Select all" indeterminate disabled />
      </div>
    </div>
  ),
};
