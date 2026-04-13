import type { Meta, StoryObj } from '@storybook/react';
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

/* ── States ────────────────────────────────────────────────────────────────── */

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
