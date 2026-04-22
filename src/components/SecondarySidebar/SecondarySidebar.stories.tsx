import type { Meta, StoryObj } from '@storybook/react';
import {
  Users,
  Settings,
  FileText,
  ArrowLeft,
  Bell,
  BarChart2,
  Lock,
} from 'lucide-react';
import { SecondarySidebar } from './SecondarySidebar';

const iconSize = 20;
const stroke = 2;

const meta: Meta<typeof SecondarySidebar> = {
  title: 'Navigation/SecondarySidebar',
  component: SecondarySidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'light-grey',
      values: [
        { name: 'light-grey', value: '#f9fafb' },
        { name: 'white', value: '#ffffff' },
      ],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=168-4711',
    },
    docs: {
      description: {
        component:
          'Compact contextual sidebar (250px) used alongside the primary navigation. Contains an account header, flat nav items, an optional version label, a divider, and footer links. [Figma →](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=168-4711)',
      },
    },
  },
  argTypes: {
    account: { control: false },
    items: { control: false },
    footerItems: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof SecondarySidebar>;

// ─── Overview ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Overview — All Variants',
  parameters: {
    docs: {
      description: {
        story: 'All SecondarySidebar variants side by side: with account header, no account, with a disabled item, and collapsible (both expanded and collapsed).',
      },
    },
  },
  render: () => {
    const sectionLabel = (text: string) => (
      <div style={{ marginBottom: 10, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af', fontFamily: 'Roboto, sans-serif' }}>
        {text}
      </div>
    );

    const account = { name: 'ITEXACT Limited', email: 'jade.chau@surveil.co' };

    const mainItems = [
      { label: 'Manage Users',       icon: <Users size={iconSize} strokeWidth={stroke} />, href: '#' },
      { label: 'Manage Permissions', icon: <Lock  size={iconSize} strokeWidth={stroke} />, href: '#' },
      { label: 'Platform Settings',  icon: <Settings size={iconSize} strokeWidth={stroke} />, href: '#', active: true },
      { label: 'Audit Logs',         icon: <FileText size={iconSize} strokeWidth={stroke} />, href: '#' },
    ];

    const itemsWithDisabled = [
      { label: 'Manage Users',       icon: <Users    size={iconSize} strokeWidth={stroke} />, href: '#', active: true },
      { label: 'Manage Permissions', icon: <Lock     size={iconSize} strokeWidth={stroke} />, href: '#' },
      { label: 'Platform Settings',  icon: <Settings size={iconSize} strokeWidth={stroke} />, disabled: true },
      { label: 'Audit Logs',         icon: <FileText size={iconSize} strokeWidth={stroke} />, href: '#' },
    ];

    const footerItems = [
      { label: 'Back to Homepage', icon: <ArrowLeft size={iconSize} strokeWidth={stroke} />, href: '#' },
    ];

    return (
      <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div>
          {sectionLabel('With account')}
          <SecondarySidebar account={account} items={mainItems} version="Version 4.3.3" footerItems={footerItems} />
        </div>

        <div>
          {sectionLabel('No account')}
          <SecondarySidebar items={[
            { label: 'Notifications', icon: <Bell     size={iconSize} strokeWidth={stroke} />, href: '#', active: true },
            { label: 'Analytics',     icon: <BarChart2 size={iconSize} strokeWidth={stroke} />, href: '#' },
            { label: 'Users',         icon: <Users    size={iconSize} strokeWidth={stroke} />, href: '#' },
            { label: 'Audit Logs',    icon: <FileText size={iconSize} strokeWidth={stroke} />, href: '#' },
          ]} version="Version 4.3.3" footerItems={footerItems} />
        </div>

        <div>
          {sectionLabel('With disabled item')}
          <SecondarySidebar account={account} items={itemsWithDisabled} version="Version 4.3.3" footerItems={footerItems} />
        </div>

        <div>
          {sectionLabel('Collapsible (expanded)')}
          <SecondarySidebar account={account} items={mainItems} version="Version 4.3.3" footerItems={footerItems} collapsible defaultCollapsed={false} />
        </div>

        <div>
          {sectionLabel('Collapsible (collapsed)')}
          <SecondarySidebar account={account} items={mainItems} version="Version 4.3.3" footerItems={footerItems} collapsible defaultCollapsed />
        </div>
      </div>
    );
  },
};

