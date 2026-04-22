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

export const Default: Story = {
  name: 'Overview — Variants & Sizes',
  render: () => {
    const [rect, setRect] = useState('3');
    const [pill, setPill] = useState('3');
    const [xs, setXs] = useState('b');
    const [s, setS] = useState('b');
    const [m, setM] = useState('b');
    const [l, setL] = useState('b');
    const label = (text: string) => (
      <div style={{ marginBottom: 8, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af', fontFamily: 'Roboto, sans-serif' }}>{text}</div>
    );
    return (
      <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {label('Rectangular')}
          <SegmentedControl options={fiveOptions} value={rect} onChange={setRect} variant="rectangular" />
          {label('Pill')}
          <SegmentedControl options={fiveOptions} value={pill} onChange={setPill} variant="pill" />
          {label('Disabled')}
          <SegmentedControl options={threeOptions} value="b" onChange={() => {}} variant="rectangular" disabled />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {label('XS (26px)')}
          <SegmentedControl options={threeOptions} value={xs} onChange={setXs} size="xs" />
          {label('S (30px)')}
          <SegmentedControl options={threeOptions} value={s} onChange={setS} size="s" />
          {label('M (34px)')}
          <SegmentedControl options={threeOptions} value={m} onChange={setM} size="m" />
          {label('L (38px)')}
          <SegmentedControl options={threeOptions} value={l} onChange={setL} size="l" />
        </div>
      </div>
    );
  },
};

