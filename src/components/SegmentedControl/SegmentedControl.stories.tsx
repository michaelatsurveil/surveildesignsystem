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
          'Segmented controls let users choose one option from a set of mutually exclusive choices. **navigational** uses a button-group with shared borders; **switcher** uses a grey track with a floating white pill (Figma: Switcher).',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['navigational', 'switcher', 'pill'],
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
    const [navXs, setNavXs] = useState('b');
    const [navS, setNavS] = useState('b');
    const [navM, setNavM] = useState('b');
    const [navL, setNavL] = useState('b');
    const [iconNavXs, setIconNavXs] = useState('list');
    const [iconNavS, setIconNavS] = useState('list');
    const [iconNavM, setIconNavM] = useState('list');
    const [iconNavL, setIconNavL] = useState('list');
    const [pillS, setPillS] = useState('b');
    const [pillM, setPillM] = useState('b');
    const [pillL, setPillL] = useState('b');
    const [iconPillS, setIconPillS] = useState('list');
    const [iconPillM, setIconPillM] = useState('list');
    const [iconPillL, setIconPillL] = useState('list');
    const [togXs, setTogXs] = useState('3');
    const [togM, setTogM] = useState('3');
    const [togL, setTogL] = useState('3');
    const [togIcon, setTogIcon] = useState('list');

    const variantLabel = (text: string) => (
      <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af', fontFamily: 'Roboto, sans-serif' }}>{text}</div>
    );
    const subLabel = (text: string) => (
      <div style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#c4c4c4', fontFamily: 'Roboto, sans-serif' }}>{text}</div>
    );

    return (
      <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Navigational */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {variantLabel('Navigational')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {subLabel('Sizes')}
            <SegmentedControl options={threeOptions} value={navXs} onChange={setNavXs} variant="navigational" size="xs" />
            <SegmentedControl options={threeOptions} value={navS} onChange={setNavS} variant="navigational" size="s" />
            <SegmentedControl options={threeOptions} value={navM} onChange={setNavM} variant="navigational" size="m" />
            <SegmentedControl options={threeOptions} value={navL} onChange={setNavL} variant="navigational" size="l" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {subLabel('Icons')}
            <SegmentedControl options={iconOptions} value={iconNavXs} onChange={setIconNavXs} variant="navigational" size="xs" />
            <SegmentedControl options={iconOptions} value={iconNavS} onChange={setIconNavS} variant="navigational" size="s" />
            <SegmentedControl options={iconOptions} value={iconNavM} onChange={setIconNavM} variant="navigational" size="m" />
            <SegmentedControl options={iconOptionsFive} value={iconNavL} onChange={setIconNavL} variant="navigational" size="l" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {subLabel('Disabled')}
            <SegmentedControl options={threeOptions} value="b" onChange={() => {}} variant="navigational" disabled />
            <SegmentedControl options={iconOptions} value="list" onChange={() => {}} variant="navigational" disabled />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {subLabel('Rounded')}
            <SegmentedControl options={threeOptions} value={pillS} onChange={setPillS} variant="pill" size="s" />
            <SegmentedControl options={threeOptions} value={pillM} onChange={setPillM} variant="pill" size="m" />
            <SegmentedControl options={threeOptions} value={pillL} onChange={setPillL} variant="pill" size="l" />
            <SegmentedControl options={iconOptions} value={iconPillS} onChange={setIconPillS} variant="pill" size="s" />
            <SegmentedControl options={iconOptions} value={iconPillM} onChange={setIconPillM} variant="pill" size="m" />
            <SegmentedControl options={iconOptionsFive} value={iconPillL} onChange={setIconPillL} variant="pill" size="l" />
          </div>
        </div>

        {/* Toggle */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {variantLabel('Switcher')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {subLabel('Sizes')}
            <SegmentedControl options={fiveOptions} value={togXs} onChange={setTogXs} variant="switcher" size="xs" />
            <SegmentedControl options={fiveOptions} value={togM} onChange={setTogM} variant="switcher" size="m" />
            <SegmentedControl options={fiveOptions} value={togL} onChange={setTogL} variant="switcher" size="l" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {subLabel('Icons')}
            <SegmentedControl options={iconOptionsFive} value={togIcon} onChange={setTogIcon} variant="switcher" size="m" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {subLabel('Disabled')}
            <SegmentedControl options={fiveOptions} value="3" onChange={() => {}} variant="switcher" disabled />
          </div>
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

export const Switcher: Story = {
  name: 'Switcher',
  render: () => {
    function Example() {
      const [text, setText] = useState('2');
      const [icon, setIcon] = useState('list');
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 40 }}>
          <SegmentedControl options={fiveOptions} value={text} onChange={setText} variant="switcher" size="m" />
          <SegmentedControl options={threeOptions} value={text === '2' ? 'b' : 'a'} onChange={() => {}} variant="switcher" size="l" />
          <SegmentedControl options={iconOptions} value={icon} onChange={setIcon} variant="switcher" size="m" />
          <SegmentedControl options={iconOptions} value={icon} onChange={setIcon} variant="switcher" size="l" />
        </div>
      );
    }
    return <Example />;
  },
};
