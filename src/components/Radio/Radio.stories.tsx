import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from './Radio';

const meta: Meta<typeof RadioGroup> = {
  title: 'Input/Radio',
  component: RadioGroup,
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
          'Radio buttons let users select one option from a set. Use for mutually exclusive choices. [Figma →](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=382-1585)',
      },
    },
  },
  argTypes: {
    direction: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('a');
    return (
      <RadioGroup options={options} value={value} onChange={setValue} />
    );
  },
};

export const Vertical: Story = {
  render: () => {
    const [value, setValue] = useState('b');
    return (
      <RadioGroup
        options={options}
        value={value}
        onChange={setValue}
        direction="vertical"
      />
    );
  },
};

export const Horizontal: Story = {
  render: () => {
    const [value, setValue] = useState('b');
    return (
      <RadioGroup
        options={options}
        value={value}
        onChange={setValue}
        direction="horizontal"
      />
    );
  },
};

export const WithLabels: Story = {
  render: () => {
    const [value, setValue] = useState('week');
    return (
      <RadioGroup
        options={[
          { value: 'day', label: 'Day' },
          { value: 'week', label: 'Week' },
          { value: 'month', label: 'Month' },
        ]}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    options,
    value: 'b',
    onChange: () => {},
    disabled: true,
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
      <div>
        <div style={{ marginBottom: 12, fontSize: 12, fontWeight: 600, color: '#616161' }}>
          Unselected
        </div>
        <RadioGroup
          options={[{ value: 'a', label: 'Label' }]}
          value=""
          onChange={() => {}}
        />
      </div>
      <div>
        <div style={{ marginBottom: 12, fontSize: 12, fontWeight: 600, color: '#616161' }}>
          Selected
        </div>
        <RadioGroup
          options={[{ value: 'a', label: 'Label' }]}
          value="a"
          onChange={() => {}}
        />
      </div>
      <div>
        <div style={{ marginBottom: 12, fontSize: 12, fontWeight: 600, color: '#616161' }}>
          Disabled Unselected
        </div>
        <RadioGroup
          options={[{ value: 'a', label: 'Label' }]}
          value=""
          onChange={() => {}}
          disabled
        />
      </div>
      <div>
        <div style={{ marginBottom: 12, fontSize: 12, fontWeight: 600, color: '#616161' }}>
          Disabled Selected
        </div>
        <RadioGroup
          options={[{ value: 'a', label: 'Label' }]}
          value="a"
          onChange={() => {}}
          disabled
        />
      </div>
    </div>
  ),
};
