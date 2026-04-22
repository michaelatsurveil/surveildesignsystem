import type { Meta, StoryObj } from '@storybook/react';
import {
  Home,
  Cloud,
  CloudCog,
  Bell,
  BarChart2,
  Settings,
  LogOut,
  LayoutDashboard,
  Server,
  ShieldCheck,
  Layers,
  Cpu,
  HardDrive,
} from 'lucide-react';
import { Sidebar } from './Sidebar';
import type { SidebarNavItem } from './Sidebar';

const iconSize = 20;
const subIconSize = 20;
const stroke = 2;

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
  name: 'Overview — All Variants',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Dark sidebar (default variant) and Navigator sidebar. The Navigator variant always includes the collapse toggle — click the icon in the header to collapse to icon-only mode; hover to preview, click again to pin open.',
      },
    },
  },
  render: () => {
    const sectionLabel = (text: string) => (
      <div style={{ marginBottom: 10, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af', fontFamily: 'Roboto, sans-serif' }}>
        {text}
      </div>
    );
    const logout = (
      <button type="button" className="sidebar__logout">
        <span className="sidebar__logout-icon">
          <LogOut size={16} strokeWidth={stroke} />
        </span>
        Logout
      </button>
    );
    const user = { name: 'ITEXACT Limited', email: 'jade.chau@surveil.co', href: '#' };

    const darkItems: SidebarNavItem[] = [
      { label: 'Home', icon: <Home size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: false },
      {
        label: 'Azure', icon: <Cloud size={iconSize} strokeWidth={stroke} />,
        children: [
          { label: 'Overview', icon: <LayoutDashboard size={subIconSize} strokeWidth={stroke} />, href: '#', active: true },
          { label: 'Resources', icon: <Server size={subIconSize} strokeWidth={stroke} />, href: '#' },
          { label: 'Security', icon: <ShieldCheck size={subIconSize} strokeWidth={stroke} />, href: '#' },
        ],
      },
      { label: 'MultiCloud', icon: <CloudCog size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: false },
      { label: 'Alerts', icon: <Bell size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: false },
      { label: 'Analytics', icon: <BarChart2 size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: false },
      { label: 'Settings', icon: <Settings size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: false },
    ];

    const navigatorItems: SidebarNavItem[] = [
      { label: 'Home', icon: <Home size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: false },
      {
        label: 'Azure', icon: <Cloud size={iconSize} strokeWidth={stroke} />, defaultExpanded: true,
        children: [
          {
            label: 'Resources', icon: <Server size={subIconSize} strokeWidth={stroke} />, defaultExpanded: true,
            children: [
              {
                label: 'Virtual Machines', icon: <Cpu size={subIconSize} strokeWidth={stroke} />, defaultExpanded: true,
                children: [
                  {
                    label: 'Production', icon: <Layers size={subIconSize} strokeWidth={stroke} />, defaultExpanded: true,
                    children: [
                      { label: 'Web Server', icon: <HardDrive size={subIconSize} strokeWidth={stroke} />, href: '#', active: true },
                    ],
                  },
                  { label: 'Staging', icon: <Layers size={subIconSize} strokeWidth={stroke} />, href: '#' },
                ],
              },
              { label: 'Storage', icon: <HardDrive size={subIconSize} strokeWidth={stroke} />, href: '#' },
            ],
          },
          { label: 'Overview', icon: <LayoutDashboard size={subIconSize} strokeWidth={stroke} />, href: '#' },
          { label: 'Security', icon: <ShieldCheck size={subIconSize} strokeWidth={stroke} />, href: '#' },
        ],
      },
      { label: 'Settings', icon: <Settings size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: false },
    ];

    return (
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div>
          {sectionLabel('Dark (default)')}
          <div style={{ height: 580, overflow: 'hidden', display: 'inline-flex' }}>
            <Sidebar navItems={darkItems} user={user} poweredBy footer={logout} width={220} />
          </div>
        </div>

        <div>
          {sectionLabel('Navigator (expanded)')}
          <div style={{ height: 580, overflow: 'hidden', display: 'inline-flex' }}>
            <Sidebar variant="navigator" navItems={navigatorItems} user={user} poweredBy footer={logout} width={250} />
          </div>
        </div>

        <div>
          {sectionLabel('Navigator (collapsed)')}
          <div style={{ height: 580, overflow: 'hidden', display: 'inline-flex' }}>
            <Sidebar variant="navigator" defaultCollapsed navItems={darkItems} user={user} poweredBy footer={logout} width={250} collapsedWidth={56} />
          </div>
        </div>
      </div>
    );
  },
};

