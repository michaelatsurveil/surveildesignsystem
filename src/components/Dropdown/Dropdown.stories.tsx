import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Calendar, Clock, TrendingUp, BarChart2, RefreshCw } from 'lucide-react';
import { Dropdown } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Input/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=1713-17865',
    },
    docs: {
      description: {
        component:
          'Select dropdown with a trigger (optional left icon, label, chevron) and a floating menu. States: idle, selected, open, disabled. [Figma →](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=1713-17865)',
      },
      story: { height: '260px' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

const DATE_OPTIONS = [
  { label: 'Last 3 months', value: 'last-3m' },
  { label: 'Last 6 months', value: 'last-6m' },
  { label: 'Last 12 months', value: 'last-12m' },
  { label: 'Year to Date', value: 'ytd' },
  { label: 'Current', value: 'current' },
];

const DATE_OPTIONS_WITH_ICONS = [
  { label: 'Last 3 months', value: 'last-3m', icon: <Clock size={14} /> },
  { label: 'Last 6 months', value: 'last-6m', icon: <Clock size={14} /> },
  { label: 'Last 12 months', value: 'last-12m', icon: <Calendar size={14} /> },
  { label: 'Year to Date', value: 'ytd', icon: <TrendingUp size={14} /> },
  { label: 'Current', value: 'current', icon: <RefreshCw size={14} /> },
];

// ─── Idle ─────────────────────────────────────────────────────────────────────

export const Idle: Story = {
  name: 'Idle — no selection',
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ paddingBottom: 220 }}>
        <Dropdown
          placeholder="Dropdown name"
          options={DATE_OPTIONS}
          value={value || undefined}
          onChange={setValue}
        />
      </div>
    );
  },
};

// ─── Selected ─────────────────────────────────────────────────────────────────

export const Selected: Story = {
  name: 'Selected',
  render: () => {
    const [value, setValue] = useState('last-12m');
    return (
      <div style={{ paddingBottom: 220 }}>
        <Dropdown
          options={DATE_OPTIONS}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

// ─── Open ─────────────────────────────────────────────────────────────────────

export const Open: Story = {
  name: 'Open — menu visible',
  render: () => {
    const [value, setValue] = useState('last-12m');
    return (
      <div style={{ paddingBottom: 200 }}>
        <Dropdown
          options={DATE_OPTIONS}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const trigger = canvasElement.querySelector<HTMLButtonElement>('.dropdown__trigger');
    trigger?.click();
  },
};

// ─── With Trigger Icon ────────────────────────────────────────────────────────

export const WithTriggerIcon: Story = {
  name: 'With trigger icon',
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ paddingBottom: 220 }}>
        <Dropdown
          placeholder="Date range"
          icon={<Calendar size={16} />}
          options={DATE_OPTIONS}
          value={value || undefined}
          onChange={setValue}
        />
      </div>
    );
  },
};

// ─── With Item Icons ──────────────────────────────────────────────────────────

export const WithItemIcons: Story = {
  name: 'With item icons',
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ paddingBottom: 200 }}>
        <Dropdown
          placeholder="Select period"
          icon={<BarChart2 size={16} />}
          options={DATE_OPTIONS_WITH_ICONS}
          value={value || undefined}
          onChange={setValue}
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const trigger = canvasElement.querySelector<HTMLButtonElement>('.dropdown__trigger');
    trigger?.click();
  },
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  name: 'Disabled',
  render: () => (
    <Dropdown
      placeholder="Dropdown name"
      options={DATE_OPTIONS}
      disabled
    />
  ),
};
