import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SegmentedControl } from './SegmentedControl';

const meta: Meta<typeof SegmentedControl> = {
  title: 'Feedback/Segmented Control',
  component: SegmentedControl,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Segmented controls let users choose one option from a set of mutually exclusive choices.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['rectangular', 'pill'],
    },
    size: {
      control: 'radio',
      options: ['xs', 's', 'm', 'l'],
      description: 'Numbers-TC/Inputs-TC: XS (26px), S (30px), M (34px), L (38px)',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof SegmentedControl>;

const threeOptions = [
  { value: 'a', label: 'Text' },
  { value: 'b', label: 'Text' },
  { value: 'c', label: 'Text' },
];

const fiveOptions = [
  { value: '1', label: 'Text' },
  { value: '2', label: 'Text' },
  { value: '3', label: 'Text' },
  { value: '4', label: 'Text' },
  { value: '5', label: 'Text' },
];

function SegmentedControlDemo({
  options,
  variant,
}: {
  options: { value: string; label: string }[];
  variant?: 'rectangular' | 'pill';
}) {
  const [value, setValue] = useState(options[0].value);
  return (
    <SegmentedControl
      options={options}
      value={value}
      onChange={setValue}
      variant={variant}
    />
  );
}

export const Rectangular: Story = {
  render: () => (
    <SegmentedControlDemo options={fiveOptions} variant="rectangular" />
  ),
};

export const Pill: Story = {
  render: () => (
    <SegmentedControlDemo options={fiveOptions} variant="pill" />
  ),
};

export const ThreeSegments: Story = {
  render: () => (
    <SegmentedControlDemo options={threeOptions} variant="rectangular" />
  ),
};

export const WithLabels: Story = {
  render: () => {
    const [value, setValue] = useState('week');
    return (
      <SegmentedControl
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
    options: fiveOptions,
    value: '3',
    onChange: () => {},
    disabled: true,
  },
};

export const AllSizes: Story = {
  render: () => {
    const [xs, setXs] = useState('b');
    const [s, setS] = useState('b');
    const [m, setM] = useState('b');
    const [l, setL] = useState('b');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
        <div>
          <div className="text-body-sm" style={{ marginBottom: 8, color: '#616161' }}>
            XS (26px)
          </div>
          <SegmentedControl options={threeOptions} value={xs} onChange={setXs} size="xs" />
        </div>
        <div>
          <div className="text-body-sm" style={{ marginBottom: 8, color: '#616161' }}>
            S (30px)
          </div>
          <SegmentedControl options={threeOptions} value={s} onChange={setS} size="s" />
        </div>
        <div>
          <div className="text-body-sm" style={{ marginBottom: 8, color: '#616161' }}>
            M (34px)
          </div>
          <SegmentedControl options={threeOptions} value={m} onChange={setM} size="m" />
        </div>
        <div>
          <div className="text-body-sm" style={{ marginBottom: 8, color: '#616161' }}>
            L (38px)
          </div>
          <SegmentedControl options={threeOptions} value={l} onChange={setL} size="l" />
        </div>
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => {
    const [rect, setRect] = useState('3');
    const [pill, setPill] = useState('3');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <div className="text-body-sm" style={{ marginBottom: 8, color: '#616161' }}>
            Rectangular (5 segments)
          </div>
          <SegmentedControl
            options={fiveOptions}
            value={rect}
            onChange={setRect}
            variant="rectangular"
          />
        </div>
        <div>
          <div className="text-body-sm" style={{ marginBottom: 8, color: '#616161' }}>
            Pill (5 segments)
          </div>
          <SegmentedControl
            options={fiveOptions}
            value={pill}
            onChange={setPill}
            variant="pill"
          />
        </div>
        <div>
          <div className="text-body-sm" style={{ marginBottom: 8, color: '#616161' }}>
            Rectangular (3 segments)
          </div>
          <SegmentedControl
            options={threeOptions}
            value="b"
            onChange={() => {}}
            variant="rectangular"
          />
        </div>
      </div>
    );
  },
};
