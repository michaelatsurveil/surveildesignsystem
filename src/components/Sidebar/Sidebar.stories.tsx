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
  LayoutDashboard,
  Server,
  TrendingDown,
  ShieldCheck,
  Globe,
  Key,
  Layers,
  Cpu,
  HardDrive,
} from 'lucide-react';
import { Sidebar } from './Sidebar';
import type { SidebarNavItem } from './Sidebar';

const iconSize = 20;
const subIconSize = 20;
const stroke = 2;

const defaultNavItems: SidebarNavItem[] = [
  { label: 'Home', icon: <Home size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: false },
  {
    label: 'Azure', icon: <Cloud size={iconSize} strokeWidth={stroke} />,                          // L1
    children: [
      { label: 'Overview', icon: <LayoutDashboard size={subIconSize} strokeWidth={stroke} />, href: '#' }, // L2
      {
        label: 'Resources', icon: <Server size={subIconSize} strokeWidth={stroke} />,              // L2
        children: [
          {
            label: 'Virtual Machines', icon: <Cpu size={subIconSize} strokeWidth={stroke} />,     // L3
            children: [
              {
                label: 'Production', icon: <Layers size={subIconSize} strokeWidth={stroke} />,    // L4
                children: [
                  { label: 'Web Server', icon: <HardDrive size={subIconSize} strokeWidth={stroke} />, href: '#' }, // L5
                ],
              },
              { label: 'Staging', icon: <Layers size={subIconSize} strokeWidth={stroke} />, href: '#' },   // L4
            ],
          },
          { label: 'Storage', icon: <HardDrive size={subIconSize} strokeWidth={stroke} />, href: '#' },     // L3
        ],
      },
      { label: 'Cost Management', icon: <TrendingDown size={subIconSize} strokeWidth={stroke} />, href: '#' }, // L2
      { label: 'Security', icon: <ShieldCheck size={subIconSize} strokeWidth={stroke} />, href: '#' },         // L2
    ],
  },
  {
    label: 'MultiCloud', icon: <CloudCog size={iconSize} strokeWidth={stroke} />,
    children: [
      { label: 'Overview', icon: <LayoutDashboard size={subIconSize} strokeWidth={stroke} />, href: '#' },
      { label: 'AWS', icon: <Cloud size={subIconSize} strokeWidth={stroke} />, href: '#' },
      { label: 'GCP', icon: <Globe size={subIconSize} strokeWidth={stroke} />, href: '#' },
    ],
  },
  {
    label: 'Microsoft 365', icon: <Cloud size={iconSize} strokeWidth={stroke} />,
    children: [
      { label: 'Overview', icon: <LayoutDashboard size={subIconSize} strokeWidth={stroke} />, href: '#' },
      { label: 'Users', icon: <Users size={subIconSize} strokeWidth={stroke} />, href: '#' },
      { label: 'Licenses', icon: <Key size={subIconSize} strokeWidth={stroke} />, href: '#' },
    ],
  },
  { label: 'Alerts and Metrics', icon: <Bell size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: false },
  { label: 'Custom Analytics', icon: <BarChart2 size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: false },
  { label: 'Partner', icon: <Users size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: false },
  { label: 'Configuration', icon: <Settings size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: false },
  { label: 'Settings', icon: <Settings size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: false },
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
  name: 'Overview — All Variants',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'All Sidebar variants side by side: Dark (default), Navigator with L1–L5 levels expanded, and Collapsible Navigator in its collapsed icon-strip state.',
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

    const allLevelsItems: SidebarNavItem[] = [
      { label: 'Home', icon: <Home size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: false },
      {
        label: 'L1 — Azure', icon: <Cloud size={iconSize} strokeWidth={stroke} />, defaultExpanded: true,
        children: [
          {
            label: 'L2 — Resources', icon: <Server size={subIconSize} strokeWidth={stroke} />, defaultExpanded: true,
            children: [
              {
                label: 'L3 — Virtual Machines', icon: <Cpu size={subIconSize} strokeWidth={stroke} />, defaultExpanded: true,
                children: [
                  {
                    label: 'L4 — Production', icon: <Layers size={subIconSize} strokeWidth={stroke} />, defaultExpanded: true,
                    children: [
                      { label: 'L5 — Web Server', icon: <HardDrive size={subIconSize} strokeWidth={stroke} />, href: '#', active: true },
                    ],
                  },
                  { label: 'L4 — Staging', icon: <Layers size={subIconSize} strokeWidth={stroke} />, href: '#' },
                ],
              },
              { label: 'L3 — Storage', icon: <HardDrive size={subIconSize} strokeWidth={stroke} />, href: '#' },
            ],
          },
          { label: 'L2 — Overview', icon: <LayoutDashboard size={subIconSize} strokeWidth={stroke} />, href: '#' },
          { label: 'L2 — Security', icon: <ShieldCheck size={subIconSize} strokeWidth={stroke} />, href: '#' },
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
          {sectionLabel('Navigator — L1 to L5')}
          <div style={{ height: 580, overflow: 'hidden', display: 'inline-flex' }}>
            <Sidebar variant="navigator" navItems={allLevelsItems} user={user} poweredBy footer={logout} width={250} />
          </div>
        </div>

        <div>
          {sectionLabel('Collapsible (expanded)')}
          <div style={{ height: 580, overflow: 'hidden', display: 'inline-flex' }}>
            <Sidebar
              variant="navigator"
              collapsible
              defaultCollapsed={false}
              navItems={darkItems}
              user={user}
              poweredBy
              footer={logout}
              width={220}
              collapsedWidth={56}
            />
          </div>
        </div>

        <div>
          {sectionLabel('Collapsible (collapsed)')}
          <div style={{ height: 580, overflow: 'hidden', display: 'inline-flex' }}>
            <Sidebar
              variant="navigator"
              collapsible
              defaultCollapsed
              navItems={darkItems}
              user={user}
              poweredBy
              footer={logout}
              width={220}
              collapsedWidth={56}
            />
          </div>
        </div>
      </div>
    );
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
        <span className="sidebar__logout-icon">
          <LogOut size={16} strokeWidth={stroke} />
        </span>
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
          'Navigator variant — white background, dark text. Nav items expand/collapse inline with a rotating chevron. Hover uses neutral-50 (#efefef), pressed uses neutral-100 (#dfdfdf), active uses primary (#3165ad). Matches Figma Secondary Side Bar (153:3673).',
      },
    },
  },
  args: {
    variant: 'navigator',
    navItems: [
      { label: 'Home', icon: <Home size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: false },
      {
        label: 'Azure',                                                                            // L1
        icon: <Cloud size={iconSize} strokeWidth={stroke} />,
        defaultExpanded: true,
        children: [
          { label: 'Overview', icon: <LayoutDashboard size={subIconSize} strokeWidth={stroke} />, href: '#', active: true }, // L2
          {
            label: 'Resources', icon: <Server size={subIconSize} strokeWidth={stroke} />,          // L2
            defaultExpanded: true,
            children: [
              {
                label: 'Virtual Machines', icon: <Cpu size={subIconSize} strokeWidth={stroke} />, // L3
                defaultExpanded: true,
                children: [
                  {
                    label: 'Production', icon: <Layers size={subIconSize} strokeWidth={stroke} />, // L4
                    defaultExpanded: true,
                    children: [
                      { label: 'Web Server', icon: <HardDrive size={subIconSize} strokeWidth={stroke} />, href: '#' }, // L5
                    ],
                  },
                  { label: 'Staging', icon: <Layers size={subIconSize} strokeWidth={stroke} />, href: '#' },            // L4
                ],
              },
              { label: 'Storage', icon: <HardDrive size={subIconSize} strokeWidth={stroke} />, href: '#' },              // L3
            ],
          },
          { label: 'Cost Management', icon: <TrendingDown size={subIconSize} strokeWidth={stroke} />, href: '#' },       // L2
          { label: 'Security', icon: <ShieldCheck size={subIconSize} strokeWidth={stroke} />, href: '#' },               // L2
        ],
      },
      {
        label: 'MultiCloud',
        icon: <CloudCog size={iconSize} strokeWidth={stroke} />,
        children: [
          { label: 'Overview', icon: <LayoutDashboard size={subIconSize} strokeWidth={stroke} />, href: '#' },
          { label: 'AWS', icon: <Cloud size={subIconSize} strokeWidth={stroke} />, href: '#' },
          { label: 'GCP', icon: <Globe size={subIconSize} strokeWidth={stroke} />, href: '#' },
        ],
      },
      {
        label: 'Microsoft 365',
        icon: <Cloud size={iconSize} strokeWidth={stroke} />,
        children: [
          { label: 'Overview', icon: <LayoutDashboard size={subIconSize} strokeWidth={stroke} />, href: '#' },
          { label: 'Users', icon: <Users size={subIconSize} strokeWidth={stroke} />, href: '#' },
          { label: 'Licenses', icon: <Key size={subIconSize} strokeWidth={stroke} />, href: '#' },
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
        <span className="sidebar__logout-icon">
          <LogOut size={16} strokeWidth={stroke} />
        </span>
        Logout
      </button>
    ),
    width: 260,
  },
};

export const NavigatorAllLevels: Story = {
  name: 'Navigator / All Levels (L1–L5)',
  parameters: {
    docs: {
      description: {
        story:
          'Shows all five indentation levels fully expanded. L1=12px, L2=20px, L3=28px, L4=36px, L5=44px — each level increments by 8px per Figma spec.',
      },
    },
  },
  args: {
    variant: 'navigator',
    width: 280,
    navItems: [
      { label: 'Home', icon: <Home size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: false },
      {
        label: 'L1 — Azure',                                           // depth 0 → 12px
        icon: <Cloud size={iconSize} strokeWidth={stroke} />,
        defaultExpanded: true,
        children: [
          {
            label: 'L2 — Resources',                                   // depth 1 → 20px
            icon: <Server size={subIconSize} strokeWidth={stroke} />,
            defaultExpanded: true,
            children: [
              {
                label: 'L3 — Virtual Machines',                        // depth 2 → 28px
                icon: <Cpu size={subIconSize} strokeWidth={stroke} />,
                defaultExpanded: true,
                children: [
                  {
                    label: 'L4 — Production',                          // depth 3 → 36px
                    icon: <Layers size={subIconSize} strokeWidth={stroke} />,
                    defaultExpanded: true,
                    children: [
                      {
                        label: 'L5 — Web Server',                      // depth 4 → 44px
                        icon: <HardDrive size={subIconSize} strokeWidth={stroke} />,
                        href: '#',
                        active: true,
                      },
                    ],
                  },
                  { label: 'L4 — Staging', icon: <Layers size={subIconSize} strokeWidth={stroke} />, href: '#' },
                ],
              },
              { label: 'L3 — Storage', icon: <HardDrive size={subIconSize} strokeWidth={stroke} />, href: '#' },
            ],
          },
          { label: 'L2 — Overview', icon: <LayoutDashboard size={subIconSize} strokeWidth={stroke} />, href: '#' },
          { label: 'L2 — Security', icon: <ShieldCheck size={subIconSize} strokeWidth={stroke} />, href: '#' },
        ],
      },
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
        <span className="sidebar__logout-icon">
          <LogOut size={16} strokeWidth={stroke} />
        </span>
        Logout
      </button>
    ),
  },
};

export const CollapsibleNavigator: Story = {
  name: 'Navigator / Collapsible',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Navigator variant with collapse support. Click the **ChevronsLeftRight** icon at the bottom of the nav to toggle between full (260px) and icon-only (56px) modes. Labels and sub-nav are hidden when collapsed; native `title` tooltips show the item label on hover.',
      },
    },
  },
  args: {
    variant: 'navigator',
    collapsible: true,
    defaultCollapsed: false,
    width: 260,
    collapsedWidth: 56,
    navItems: [
      { label: 'Home',             icon: <Home      size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: false },
      {
        label: 'Azure',
        icon: <Cloud size={iconSize} strokeWidth={stroke} />,
        defaultExpanded: true,
        children: [
          { label: 'Overview',      icon: <LayoutDashboard size={subIconSize} strokeWidth={stroke} />, href: '#', active: true },
          { label: 'Resources',     icon: <Server          size={subIconSize} strokeWidth={stroke} />, href: '#' },
          { label: 'Cost Management', icon: <TrendingDown  size={subIconSize} strokeWidth={stroke} />, href: '#' },
          { label: 'Security',      icon: <ShieldCheck     size={subIconSize} strokeWidth={stroke} />, href: '#' },
        ],
      },
      {
        label: 'MultiCloud',
        icon: <CloudCog size={iconSize} strokeWidth={stroke} />,
        children: [
          { label: 'Overview', icon: <LayoutDashboard size={subIconSize} strokeWidth={stroke} />, href: '#' },
          { label: 'AWS',      icon: <Cloud           size={subIconSize} strokeWidth={stroke} />, href: '#' },
          { label: 'GCP',      icon: <Globe           size={subIconSize} strokeWidth={stroke} />, href: '#' },
        ],
      },
      { label: 'Alerts',           icon: <Bell      size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: false },
      { label: 'Custom Analytics', icon: <BarChart2  size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: false },
      { label: 'Settings',         icon: <Settings   size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: false },
    ],
    user: {
      name: 'ITEXACT Limited',
      email: 'jade.chau@surveil.co',
      href: '#',
    },
    poweredBy: true,
    footer: (
      <button type="button" className="sidebar__logout">
        <span className="sidebar__logout-icon">
          <LogOut size={16} strokeWidth={stroke} />
        </span>
        Logout
      </button>
    ),
  },
};
