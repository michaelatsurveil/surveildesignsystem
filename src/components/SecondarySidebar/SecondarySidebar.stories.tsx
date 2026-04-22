import type { Meta, StoryObj } from '@storybook/react';
import {
  Users,
  Settings,
  FileText,
  ArrowLeft,
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
          'Compact contextual sidebar (250px) used alongside the primary navigation. Contains an account header, flat nav items, an optional version label, a divider, and footer links. Supports collapse to a 48px icon-only strip with hover-expand overlay. [Figma →](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=168-4711)',
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

export const Default: Story = {
  name: 'Overview',
  parameters: {
    docs: {
      description: {
        story:
          'Full-featured SecondarySidebar with account header, nav items, version label, footer link, and collapse toggle. Click the chevron icon in the header to collapse to a 48px icon strip — hover to temporarily expand.',
      },
    },
  },
  render: () => {
    const account = { name: 'ITEXACT Limited', email: 'jade.chau@surveil.co' };

    const mainItems = [
      { label: 'Manage Users',       icon: <Users    size={iconSize} strokeWidth={stroke} />, href: '#' },
      { label: 'Manage Permissions', icon: <Lock     size={iconSize} strokeWidth={stroke} />, href: '#' },
      { label: 'Platform Settings',  icon: <Settings size={iconSize} strokeWidth={stroke} />, href: '#', active: true },
      { label: 'Audit Logs',         icon: <FileText size={iconSize} strokeWidth={stroke} />, href: '#' },
      { label: 'Archived Reports',   icon: <FileText size={iconSize} strokeWidth={stroke} />, href: '#', disabled: true },
    ];

    const footerItems = [
      { label: 'Back to Homepage', icon: <ArrowLeft size={iconSize} strokeWidth={stroke} />, href: '#' },
    ];

    return (
      <SecondarySidebar
        account={account}
        items={mainItems}
        footerItems={footerItems}
        version="Version 4.3.3"
        collapsible
      />
    );
  },
};
