import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Home,
  Cloud,
  CloudCog,
  Monitor,
  Bell,
  BarChart2,
  Users,
  SlidersHorizontal,
  Settings,
  LogOut,
  Calendar,
} from 'lucide-react';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Topbar } from './components/Topbar/Topbar';
import { Tabs } from './components/Tabs/Tabs';
import { Dropdown } from './components/Dropdown/Dropdown';
import type { SidebarNavItem } from './components/Sidebar/Sidebar';

const meta: Meta = {
  title: 'Foundations/Page Setup',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**For prototyping purposes only.**

Page Setup provides the baseline layout shells used across all Surveil designs. When creating a prototype from scratch, always start from one of these setups — they assemble the correct DS components (Sidebar, Topbar, Tabs, Dropdown) in the right hierarchy so spacing, sizing, and component behaviour match production.

> Do not use these layouts to build production code. They exist solely as a shared starting point for design work and interactive prototypes.
        `.trim(),
      },
    },
  },
};

export default meta;

type Story = StoryObj;

const iconSize = 20;
const stroke = 2;

const surveilNavItems: SidebarNavItem[] = [
  { label: 'Home', icon: <Home size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: false },
  { label: 'Azure', icon: <Cloud size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: true },
  { label: 'MultiCloud', icon: <CloudCog size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: true },
  { label: 'Microsoft 365', icon: <Monitor size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: true },
  { label: 'Alerts and Metrics', icon: <Bell size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: true },
  { label: 'Custom Analytics', icon: <BarChart2 size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: true },
  { label: 'Partner', icon: <Users size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: true },
  { label: 'Configuration', icon: <SlidersHorizontal size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: true },
  { label: 'Settings', icon: <Settings size={iconSize} strokeWidth={stroke} />, href: '#', showCaret: true },
];

const tabOptions = [
  { value: 'tab1', label: 'Tab', dropdown: true },
  { value: 'tab2', label: 'Tab', dropdown: true },
  { value: 'tab3', label: 'Tab', dropdown: true },
];

const dateRangeOptions = [
  { value: 'last-7', label: 'Last 7 Days' },
  { value: 'last-30', label: 'Last 30 Days' },
  { value: 'last-3m', label: 'Last 3 Months' },
  { value: 'last-12m', label: 'Last 12 Months' },
  { value: 'ytd', label: 'Year to Date' },
];

export const Surveil: Story = {
  name: 'Surveil',
  parameters: {
    docs: {
      description: {
        story:
          'Baseline layout using the dark Surveil sidebar. Includes the Topbar, a Tabs bar, and a content area with a page title and date-range Dropdown. Use this as the starting point for any new Surveil page prototype.',
      },
    },
  },
  render: () => {
    const [activeTab, setActiveTab] = useState('tab1');
    const [dateRange, setDateRange] = useState('last-12m');

    const logout = (
      <button type="button" className="sidebar__logout">
        <span className="sidebar__logout-icon">
          <LogOut size={16} strokeWidth={stroke} />
        </span>
        Logout
      </button>
    );

    return (
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: 'var(--font-family-body, Roboto, system-ui, sans-serif)' }}>
        {/* Sidebar */}
        <Sidebar
          navItems={surveilNavItems}
          user={{ name: 'ITEXACT Limited', email: 'jade.chau@surveil.co', href: '#' }}
          poweredBy
          footer={logout}
          width={192}
        />

        {/* Main chrome */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
          {/* Topbar */}
          <Topbar
            breadcrumbs={[
              { label: 'Default breadcrumb', href: '#' },
              { label: 'Active Breadcrumb' },
            ]}
          />

          {/* Tab bar */}
          <div style={{ background: 'var(--color-white, #ffffff)' }}>
            <Tabs options={tabOptions} value={activeTab} onChange={setActiveTab} />
          </div>

          {/* Page content */}
          <main
            style={{
              flex: 1,
              overflow: 'auto',
              background: 'var(--color-grey-50, #efefef)',
              padding: 'var(--scale-500, 20px)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--scale-400, 16px)',
              }}
            >
              <h1
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-family-body, Roboto, system-ui, sans-serif)',
                  fontSize: '20px',
                  fontWeight: 600,
                  lineHeight: '28px',
                  color: 'var(--color-grey-700, #272727)',
                }}
              >
                Date in Month Date, Year - Month Date, Year
              </h1>
              <Dropdown
                options={dateRangeOptions}
                value={dateRange}
                onChange={setDateRange}
                icon={<Calendar size={16} />}
              />
            </div>
          </main>
        </div>
      </div>
    );
  },
};
