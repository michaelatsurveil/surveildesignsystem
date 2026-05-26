import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Users,
  Settings,
  FileText,
  Lock,
  ShieldCheck,
  ClipboardList,
  Home,
  Cloud,
  Grid,
  Bell,
  BarChart2,
  ChevronsLeftRight,
  ChevronRight,
  Star,
  LogOut,
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
          'Compact contextual sidebar (250px) used alongside the primary navigation. Contains an account header, flat nav items, an optional version label, a divider, and footer links. Supports full collapse — the panel hides entirely and a circular white chevron tab sits on the sidebar boundary for re-expansion. [Figma →](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=168-4711)',
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
          'Full-featured SecondarySidebar with account header, nav items, version label, footer link, and collapse toggle. Click the ChevronsLeftRight icon in the header to fully hide the sidebar — a circular white chevron tab appears on the boundary; click it to re-expand.',
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

    return (
      <SecondarySidebar
        account={account}
        items={mainItems}
        version="Version 4.3.3"
        collapsible
      />
    );
  },
};

export const OldVersion: Story = {
  name: 'Old Version',
  parameters: {
    docs: {
      description: {
        story:
          'Secondary sidebar with the external "≡ Menu" collapse trigger. The tertiary button sits 10px to the right of and below the panel top — clicking it collapses/expands the sidebar identically to the header toggle.',
      },
    },
  },
  render: () => {
    const account = { name: 'ITEXACT Limited', email: 'jade.chau@surveil.co' };

    const mainItems = [
      { label: 'Manage Users',                    icon: <Users       size={iconSize} strokeWidth={stroke} />, href: '#' },
      { label: 'Manage Permissions',              icon: <Lock        size={iconSize} strokeWidth={stroke} />, href: '#' },
      { label: 'Manage Recommendation Restrictions', icon: <ShieldCheck size={iconSize} strokeWidth={stroke} />, href: '#' },
      { label: 'Platform Settings',               icon: <Settings    size={iconSize} strokeWidth={stroke} />, href: '#' },
      { label: 'Audit Logs',                      icon: <ClipboardList size={iconSize} strokeWidth={stroke} />, href: '#' },
    ];

    return (
      <div style={{ paddingRight: 120 }}>
        <SecondarySidebar
          account={account}
          items={mainItems}
          version="Version 4.3.3"
          menuToggle
        />
      </div>
    );
  },
};

export const CollapsedIntoPrimary: Story = {
  name: 'Collapsed into Primary Nav',
  parameters: {
    docs: {
      description: {
        story:
          'Shows the secondary sidebar alongside the primary navigation. Click the ChevronsLeftRight icon in the secondary sidebar header to collapse it — the primary navigation fills the viewport, matching the final collapsed layout.',
      },
    },
  },
  render: () => {
    const [, setCollapsed] = useState(false);

    const account = { name: 'ITEXACT Limited', email: 'jade.chau@surveil.co' };

    const mainItems = [
      { label: 'Manage Users',                       icon: <Users         size={iconSize} strokeWidth={stroke} />, href: '#' },
      { label: 'Manage Permissions',                 icon: <Lock          size={iconSize} strokeWidth={stroke} />, href: '#' },
      { label: 'Manage Recommendation Restrictions', icon: <ShieldCheck   size={iconSize} strokeWidth={stroke} />, href: '#' },
      { label: 'Platform Settings',                  icon: <Settings      size={iconSize} strokeWidth={stroke} />, href: '#', active: true },
      { label: 'Audit Logs',                         icon: <ClipboardList size={iconSize} strokeWidth={stroke} />, href: '#' },
    ];

    const navItems = [
      { label: 'Home',                icon: Home },
      { label: 'Azure',               icon: Cloud },
      { label: 'MultiCloud',          icon: Grid },
      { label: 'Microsoft 365',       icon: Grid },
      { label: 'Alerts and Metrics',  icon: Bell },
      { label: 'Custom Analytics',    icon: BarChart2 },
      { label: 'Partner',             icon: Users },
      { label: 'Configuration',       icon: Settings },
      { label: 'Settings',            icon: Settings },
    ];

    return (
      <div style={{ display: 'flex', background: '#ffffff', border: '1px solid #efefef', borderRadius: 8, overflow: 'hidden', minHeight: 620 }}>
        {/* primary nav mock */}
        <div style={{ width: 260, minHeight: 620, background: '#ffffff', borderRight: '1px solid #efefef', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          {/* header */}
          <div style={{ height: 56, borderBottom: '1px solid #efefef', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', flexShrink: 0 }}>
            <span style={{ fontWeight: 600, fontSize: 16, color: '#111' }}>Surveil</span>
            <ChevronsLeftRight size={18} strokeWidth={1.5} style={{ color: '#616161', cursor: 'pointer' }} />
          </div>
          {/* nav items */}
          <div style={{ flex: 1, overflowY: 'auto', paddingTop: 8, paddingBottom: 8 }}>
            {navItems.map(({ label, icon: Icon }) => (
              <div
                key={label}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 16px', cursor: 'pointer', color: '#616161', fontSize: 14 }}
              >
                <Icon size={18} strokeWidth={1.5} style={{ flexShrink: 0 }} />
                <span>{label}</span>
              </div>
            ))}
          </div>
          {/* bottom section */}
          <hr style={{ borderTop: '1px solid #efefef', margin: 0, border: 'none', borderTopStyle: 'solid', borderTopColor: '#efefef', borderTopWidth: 1 }} />
          {/* account row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', cursor: 'pointer' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#3a3a3a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>ITEXACT Limited</div>
              <div style={{ fontSize: 12, color: '#616161', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>jade.chau@surveil.co</div>
            </div>
            <ChevronRight size={16} strokeWidth={1.5} style={{ color: '#616161', flexShrink: 0 }} />
          </div>
          {/* whats new */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 16px', cursor: 'pointer', color: '#616161', fontSize: 14 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#efefef', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Star size={16} strokeWidth={1.5} />
            </div>
            <span>Whats new</span>
          </div>
          {/* logout */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 16px', cursor: 'pointer', color: '#616161', fontSize: 14, marginBottom: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#efefef', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <LogOut size={16} strokeWidth={1.5} />
            </div>
            <span>Logout</span>
          </div>
        </div>
        {/* secondary sidebar */}
        <SecondarySidebar
          account={account}
          items={mainItems}
          version="Version 4.3.3"
          collapsible
          onCollapseChange={setCollapsed}
        />
      </div>
    );
  },
};
