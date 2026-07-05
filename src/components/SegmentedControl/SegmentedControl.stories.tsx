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
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=296-4663',
    },
    docs: {
      description: {
        component:
          'Segmented controls let users choose one option from a set of mutually exclusive choices. **navigational** uses a button-group with shared borders; **toggle** uses a grey track with a floating white pill (Figma: Switcher).',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['navigational', 'toggle', 'pill'],
    },
    size: {
      control: 'radio',
      options: ['xs', 's', 'm', 'l'],
      description: 'XS/S (28px), M (32px), L (36px)',
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
    const [nav, setNav] = useState('3');
    const [tog, setTog] = useState('3');
    const [pill, setPill] = useState('3');
    const [xs, setXs] = useState('b');
    const [s, setS] = useState('b');
    const [m, setM] = useState('b');
    const [l, setL] = useState('b');
    const [togXs, setTogXs] = useState('3');
    const [togM, setTogM] = useState('3');
    const [iconXs, setIconXs] = useState('grid');
    const [iconS, setIconS] = useState('grid');
    const [iconM, setIconM] = useState('list');
    const [iconL, setIconL] = useState('list');
    const [togIcon, setTogIcon] = useState('list');
    const label = (text: string) => (
      <div style={{ marginBottom: 8, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af', fontFamily: 'Roboto, sans-serif' }}>{text}</div>
    );
    return (
      <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Variants */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {label('Navigational')}
          <SegmentedControl options={fiveOptions} value={nav} onChange={setNav} variant="navigational" />
          {label('Toggle')}
          <SegmentedControl options={fiveOptions} value={tog} onChange={setTog} variant="toggle" />
          {label('Pill')}
          <SegmentedControl options={fiveOptions} value={pill} onChange={setPill} variant="pill" />
          {label('Disabled — Navigational')}
          <SegmentedControl options={threeOptions} value="b" onChange={() => {}} variant="navigational" disabled />
          {label('Disabled — Toggle')}
          <SegmentedControl options={fiveOptions} value="3" onChange={() => {}} variant="toggle" disabled />
        </div>

        {/* Sizes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {label('XS (28px)')}
          <SegmentedControl options={threeOptions} value={xs} onChange={setXs} size="xs" />
          {label('S (28px)')}
          <SegmentedControl options={threeOptions} value={s} onChange={setS} size="s" />
          {label('M (32px)')}
          <SegmentedControl options={threeOptions} value={m} onChange={setM} size="m" />
          {label('L (36px)')}
          <SegmentedControl options={threeOptions} value={l} onChange={setL} size="l" />
          {label('Toggle — XS')}
          <SegmentedControl options={fiveOptions} value={togXs} onChange={setTogXs} size="xs" variant="toggle" />
          {label('Toggle — M')}
          <SegmentedControl options={fiveOptions} value={togM} onChange={setTogM} size="m" variant="toggle" />
          {label('Toggle — L')}
          <SegmentedControl options={threeOptions} value={l} onChange={setL} size="l" variant="toggle" />
        </div>

        {/* Icon */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {label('Icon — XS')}
          <SegmentedControl options={iconOptions} value={iconXs} onChange={setIconXs} size="xs" />
          {label('Icon — S')}
          <SegmentedControl options={iconOptions} value={iconS} onChange={setIconS} size="s" />
          {label('Icon — M')}
          <SegmentedControl options={iconOptions} value={iconM} onChange={setIconM} size="m" />
          {label('Icon — L')}
          <SegmentedControl options={iconOptionsFive} value={iconL} onChange={setIconL} size="l" />
          {label('Icon — Toggle M')}
          <SegmentedControl options={iconOptionsFive} value={togIcon} onChange={setTogIcon} size="m" variant="toggle" />
          {label('Icon — Pill')}
          <SegmentedControl options={iconOptions} value={iconM} onChange={setIconM} size="m" variant="pill" />
          {label('Icon — Disabled')}
          <SegmentedControl options={iconOptions} value="grid" onChange={() => {}} size="m" disabled />
        </div>
      </div>
    );
  },
};

export const Navigational: Story = {
  name: 'Navigational',
  render: () => {
    function Example() {
      const [val, setVal] = useState('2');
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 40 }}>
          <SegmentedControl options={fiveOptions} value={val} onChange={setVal} variant="navigational" size="m" />
          <SegmentedControl options={threeOptions} value={val === '2' ? 'b' : 'a'} onChange={() => {}} variant="navigational" size="l" />
        </div>
      );
    }
    return <Example />;
  },
};

export const Toggle: Story = {
  name: 'Toggle',
  render: () => {
    function Example() {
      const [text, setText] = useState('2');
      const [icon, setIcon] = useState('list');
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 40 }}>
          <SegmentedControl options={fiveOptions} value={text} onChange={setText} variant="toggle" size="m" />
          <SegmentedControl options={threeOptions} value={text === '2' ? 'b' : 'a'} onChange={() => {}} variant="toggle" size="l" />
          <SegmentedControl options={iconOptions} value={icon} onChange={setIcon} variant="toggle" size="m" />
          <SegmentedControl options={iconOptions} value={icon} onChange={setIcon} variant="toggle" size="l" />
        </div>
      );
    }
    return <Example />;
  },
};
