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
  { label: 'Home', icon: <Home size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: false },
  { label: 'Azure', icon: <Cloud size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: true },
  { label: 'MultiCloud', icon: <CloudCog size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: true },
  { label: 'Microsoft 365', icon: <Cloud size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: true },
  { label: 'Alerts and Metrics', icon: <Bell size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: true },
  { label: 'Custom Analytics', icon: <BarChart2 size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: true },
  { label: 'Partner', icon: <Users size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: true },
  { label: 'Configuration', icon: <Settings size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: true },
  { label: 'Settings', icon: <Settings size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: true },
];

const meta: Meta<typeof Sidebar> = {
  title: 'Navigation/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=443-15372',
    },
    docs: {
      description: {
        component:
          'App sidebar with logo, navigation links (with optional icons and expand caret), user block, and footer. [Figma →](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=443-15372)',
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

export const Navigator: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Navigator variant — nav items with children expand/collapse inline. The chevron rotates to indicate open state. Sub-items are indented and displayed in a slightly darker band.',
      },
    },
  },
  args: {
    navItems: [
      { label: 'Home', icon: <Home size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: false },
      {
        label: 'Azure',
        icon: <Cloud size={iconSize} strokeWidth={stroke} />,
        defaultExpanded: true,
        children: [
          { label: 'Overview', href: '#', active: true },
          { label: 'Resources', href: '#' },
          { label: 'Cost Management', href: '#' },
          { label: 'Security', href: '#' },
        ],
      },
      {
        label: 'MultiCloud',
        icon: <CloudCog size={iconSize} strokeWidth={stroke} />,
        children: [
          { label: 'Overview', href: '#' },
          { label: 'AWS', href: '#' },
          { label: 'GCP', href: '#' },
        ],
      },
      {
        label: 'Microsoft 365',
        icon: <Cloud size={iconSize} strokeWidth={stroke} />,
        children: [
          { label: 'Overview', href: '#' },
          { label: 'Users', href: '#' },
          { label: 'Licenses', href: '#' },
        ],
      },
      { label: 'Alerts and Metrics', icon: <Bell size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: false },
      { label: 'Custom Analytics', icon: <BarChart2 size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: false },
      { label: 'Settings', icon: <Settings size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: false },
    ],
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
      { label: 'Home', icon: <Home size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: false },
      { label: 'Settings', icon: <Settings size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: true },
    ],
    user: undefined,
    poweredBy: false,
    footer: undefined,
    width: 260,
  },
};
