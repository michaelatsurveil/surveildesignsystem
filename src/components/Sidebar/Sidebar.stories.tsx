import type { Meta, StoryObj } from '@storybook/react';
import {
  Home,
  Cloud,
  CloudCog,
  Bell,
  BarChart2,
  Users,
  Settings,
  LogOut,
} from 'lucide-react';
import { Sidebar } from './Sidebar';
import type { SidebarNavItem } from './Sidebar';

const iconSize = 20;
const stroke = 2;

const defaultNavItems: SidebarNavItem[] = [
  { label: 'Home', icon: <Home size={iconSize} strokeWidth={stroke} />, href: '#' },
  { label: 'Azure', icon: <Cloud size={iconSize} strokeWidth={stroke} />, href: '#' },
  { label: 'MultiCloud', icon: <CloudCog size={iconSize} strokeWidth={stroke} />, href: '#' },
  { label: 'Microsoft 365', icon: <Cloud size={iconSize} strokeWidth={stroke} />, href: '#' },
  { label: 'Alerts and Metrics', icon: <Bell size={iconSize} strokeWidth={stroke} />, href: '#' },
  { label: 'Custom Analytics', icon: <BarChart2 size={iconSize} strokeWidth={stroke} />, href: '#' },
  { label: 'Partner', icon: <Users size={iconSize} strokeWidth={stroke} />, href: '#' },
  { label: 'Configuration', icon: <Settings size={iconSize} strokeWidth={stroke} />, href: '#' },
  { label: 'Settings', icon: <Settings size={iconSize} strokeWidth={stroke} />, href: '#' },
];

const meta: Meta<typeof Sidebar> = {
  title: 'Navigation/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=89-428',
    },
    docs: {
      description: {
        component:
          'App sidebar with logo, navigation links (with optional icons and expand caret), user block, and footer. [Figma →](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=89-428)',
      },
    },
  },
  argTypes: {
    header: { control: false },
    navItems: { control: false },
    user: { control: false },
    footer: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    navItems: defaultNavItems,
    user: {
      name: 'ITEXACT Limited',
      email: 'jade.chau@surveil.co',
      href: '#',
    },
    poweredBy: true,
    footer: (
      <button type="button" className="sidebar__logout">
        <LogOut size={iconSize} strokeWidth={stroke} />
        Logout
      </button>
    ),
    width: 260,
  },
};

export const WithActiveItem: Story = {
  args: {
    navItems: defaultNavItems.map((item, i) =>
      i === 2 ? { ...item, active: true } : item
    ),
    user: {
      name: 'ITEXACT Limited',
      email: 'jade.chau@surveil.co',
      href: '#',
    },
    poweredBy: true,
    footer: (
      <button type="button" className="sidebar__logout">
        <LogOut size={iconSize} strokeWidth={stroke} />
        Logout
      </button>
    ),
    width: 260,
  },
};

export const Minimal: Story = {
  args: {
    navItems: [
      { label: 'Home', icon: <Home size={iconSize} strokeWidth={stroke} />, href: '#' },
      { label: 'Settings', icon: <Settings size={iconSize} strokeWidth={stroke} />, href: '#' },
    ],
    user: undefined,
    poweredBy: false,
    footer: undefined,
    width: 260,
  },
};
