import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LayoutGrid, List, BarChart2, TableProperties, AlignLeft } from 'lucide-react';
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
      description: 'Numbers-TC/Inputs-TC: XS (28px), S (28px), M (32px), L (36px)',
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

const iconOptions = [
  { value: 'grid', icon: LayoutGrid, label: 'Grid view' },
  { value: 'list', icon: List, label: 'List view' },
  { value: 'chart', icon: BarChart2, label: 'Chart view' },
];

const iconOptionsFive = [
  { value: 'grid', icon: LayoutGrid, label: 'Grid view' },
  { value: 'list', icon: List, label: 'List view' },
  { value: 'chart', icon: BarChart2, label: 'Chart view' },
  { value: 'table', icon: TableProperties, label: 'Table view' },
  { value: 'text', icon: AlignLeft, label: 'Text view' },
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
    const [iconXs, setIconXs] = useState('grid');
    const [iconS, setIconS] = useState('grid');
    const [iconM, setIconM] = useState('list');
    const [iconL, setIconL] = useState('list');
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
          {label('XS (28px)')}
          <SegmentedControl options={threeOptions} value={xs} onChange={setXs} size="xs" />
          {label('S (28px)')}
          <SegmentedControl options={threeOptions} value={s} onChange={setS} size="s" />
          {label('M (32px)')}
          <SegmentedControl options={threeOptions} value={m} onChange={setM} size="m" />
          {label('L (36px)')}
          <SegmentedControl options={threeOptions} value={l} onChange={setL} size="l" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {label('Icon — XS')}
          <SegmentedControl options={iconOptions} value={iconXs} onChange={setIconXs} size="xs" />
          {label('Icon — S')}
          <SegmentedControl options={iconOptions} value={iconS} onChange={setIconS} size="s" />
          {label('Icon — M')}
          <SegmentedControl options={iconOptions} value={iconM} onChange={setIconM} size="m" />
          {label('Icon — L')}
          <SegmentedControl options={iconOptions} value={iconL} onChange={setIconL} size="l" />
          {label('Icon — Pill')}
          <SegmentedControl options={iconOptions} value={iconM} onChange={setIconM} size="m" variant="pill" />
          {label('Icon — Disabled')}
          <SegmentedControl options={iconOptions} value="grid" onChange={() => {}} size="m" disabled />
        </div>
      </div>
    );
  },
};

