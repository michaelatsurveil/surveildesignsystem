import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import { Home, Settings, Users, FileText } from 'lucide-react';
import { Breadcrumb } from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=469-1209',
    },
    docs: {
      description: {
        component:
          'Breadcrumb navigation shows the user\'s location in the app hierarchy. Sizes: Small (24px) / Large (28px). The last item is always treated as the active/current page. [Figma →](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=469-1209)',
      },
    },
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

/* ── Size variants ─────────────────────────────────────────────────────────── */

export const Small: Story = {
  args: {
    size: 'sm',
    items: [
      { label: 'Home', href: '#' },
      { label: 'Settings', href: '#' },
      { label: 'Profile' },
    ],
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    items: [
      { label: 'Home', href: '#' },
      { label: 'Settings', href: '#' },
      { label: 'Profile' },
    ],
  },
};

/* ── With icons ────────────────────────────────────────────────────────────── */

export const WithIcons: Story = {
  args: {
    size: 'sm',
    items: [
      { label: 'Home', href: '#', icon: <Home size={12} strokeWidth={1.5} /> },
      { label: 'Users', href: '#', icon: <Users size={12} strokeWidth={1.5} /> },
      { label: 'Profile', icon: <Settings size={12} strokeWidth={1.5} /> },
    ],
  },
};

export const WithIconsLarge: Story = {
  name: 'With Icons — Large',
  args: {
    size: 'lg',
    items: [
      { label: 'Home', href: '#', icon: <Home size={16} strokeWidth={1.5} /> },
      { label: 'Users', href: '#', icon: <Users size={16} strokeWidth={1.5} /> },
      { label: 'Profile', icon: <Settings size={16} strokeWidth={1.5} /> },
    ],
  },
};

/* ── Length variants ───────────────────────────────────────────────────────── */

export const TwoItems: Story = {
  args: {
    size: 'sm',
    items: [
      { label: 'Home', href: '#' },
      { label: 'Profile' },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    size: 'sm',
    items: [{ label: 'Home' }],
  },
};

export const LongTrail: Story = {
  args: {
    size: 'sm',
    items: [
      { label: 'Home', href: '#' },
      { label: 'Organisation', href: '#' },
      { label: 'Department', href: '#' },
      { label: 'Team', href: '#' },
      { label: 'Documents', href: '#' },
      { label: 'Report.pdf' },
    ],
  },
};

/* ── Interactive states ────────────────────────────────────────────────────── */

const baseItems = [
  { label: 'Home', href: '#' },
  { label: 'Settings', href: '#' },
  { label: 'Profile' },
];

export const Hovered: Story = {
  args: { size: 'sm', items: baseItems },
  play: async ({ canvasElement }) => {
    const links = within(canvasElement).getAllByRole('link');
    await userEvent.pointer({ target: links[0] });
  },
};

export const Focused: Story = {
  args: { size: 'sm', items: baseItems },
  play: async ({ canvasElement }) => {
    within(canvasElement).getAllByRole('link')[0].focus();
  },
};

export const Pressed: Story = {
  args: { size: 'sm', items: baseItems },
  play: async ({ canvasElement }) => {
    await userEvent.pointer({
      target: within(canvasElement).getAllByRole('link')[0],
      keys: '[MouseLeft>]',
    });
  },
};

export const CurrentPage: Story = {
  name: 'Current Page (last item)',
  args: { size: 'sm', items: baseItems },
};

/* ── Disabled ──────────────────────────────────────────────────────────────── */

export const WithDisabledItem: Story = {
  args: {
    size: 'sm',
    items: [
      { label: 'Home', href: '#' },
      { label: 'Restricted', href: '#', disabled: true },
      { label: 'Profile' },
    ],
  },
};

/* ── All sizes side by side ────────────────────────────────────────────────── */

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#616161', fontFamily: 'Roboto, sans-serif' }}>Small</p>
        <Breadcrumb
          size="sm"
          items={[
            { label: 'Home', href: '#' },
            { label: 'Settings', href: '#' },
            { label: 'Profile' },
          ]}
        />
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#616161', fontFamily: 'Roboto, sans-serif' }}>Large</p>
        <Breadcrumb
          size="lg"
          items={[
            { label: 'Home', href: '#' },
            { label: 'Settings', href: '#' },
            { label: 'Profile' },
          ]}
        />
      </div>
    </div>
  ),
};

/* ── All states overview ───────────────────────────────────────────────────── */

export const AllStates: Story = {
  name: 'All States',
  render: () => {
    const itemStyle = (extra?: React.CSSProperties): React.CSSProperties => ({
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '4px 8px', borderRadius: 2, border: '1px solid transparent',
      fontFamily: 'Roboto, sans-serif', fontSize: 14, fontWeight: 400,
      color: '#616161', cursor: 'pointer', ...extra,
    });
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: 'Roboto, sans-serif' }}>
        {[
          { label: 'Default',      style: itemStyle() },
          { label: 'Hovered',      style: itemStyle({ backgroundColor: '#efefef', color: '#27518c' }) },
          { label: 'Pressed',      style: itemStyle({ backgroundColor: '#ffffff', borderColor: '#203b61', color: '#203b61', paddingTop: 3, paddingBottom: 3 }) },
          { label: 'Focused',      style: itemStyle({ borderColor: '#27518c', color: '#27518c' }) },
          { label: 'Current page', style: itemStyle({ cursor: 'default' }) },
          { label: 'Disabled',     style: itemStyle({ color: '#818181', cursor: 'not-allowed' }) },
        ].map(({ label, style }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ width: 100, fontSize: 12, color: '#9ca3af' }}>{label}</span>
            <span style={style}>{label}</span>
          </div>
        ))}
      </div>
    );
  },
};

/* ── With document icons ───────────────────────────────────────────────────── */

export const DocumentTrail: Story = {
  name: 'Document Trail',
  args: {
    size: 'sm',
    items: [
      { label: 'Home', href: '#', icon: <Home size={12} strokeWidth={1.5} /> },
      { label: 'Documents', href: '#', icon: <FileText size={12} strokeWidth={1.5} /> },
      { label: 'Annual Report 2024', icon: <FileText size={12} strokeWidth={1.5} /> },
    ],
  },
};
