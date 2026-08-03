import type { Meta, StoryObj } from '@storybook/react';
import { CalendarPicker } from './CalendarPicker';

const meta: Meta<typeof CalendarPicker> = {
  title: 'Inputs/CalendarPicker',
  component: CalendarPicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A date-picker dropdown for selecting a specific day. Shows a trigger button with the selected date; clicking opens a popover with month navigation and a day grid.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CalendarPicker>;

const label = (text: string) => (
  <p
    style={{
      margin: '0 0 8px',
      fontSize: 11,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      color: '#9ca3af',
      fontFamily: 'Roboto, sans-serif',
    }}
  >
    {text}
  </p>
);

/* ─── Overview ─────────────────────────────────────────────────────────────── */

export const Default: Story = {
  name: 'Overview — All States',
  render: () => (
    <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', alignItems: 'flex-start', paddingBottom: 320 }}>
      <div>
        {label('Idle (no selection)')}
        <CalendarPicker placeholder="Select date" />
      </div>

      <div>
        {label('Selected')}
        <CalendarPicker value={new Date(2026, 0, 15)} />
      </div>

      <div>
        {label('Disabled')}
        <CalendarPicker value={new Date(2026, 2, 10)} disabled />
      </div>
    </div>
  ),
};

/* ─── Idle ──────────────────────────────────────────────────────────────────── */

export const Idle: Story = {
  name: 'Idle',
  render: () => (
    <div style={{ paddingBottom: 320 }}>
      <CalendarPicker placeholder="Select date" />
    </div>
  ),
};

/* ─── Selected ──────────────────────────────────────────────────────────────── */

export const Selected: Story = {
  name: 'Selected',
  render: () => (
    <div style={{ paddingBottom: 320 }}>
      <CalendarPicker value={new Date(2026, 0, 15)} />
    </div>
  ),
};

/* ─── Disabled ──────────────────────────────────────────────────────────────── */

export const Disabled: Story = {
  name: 'Disabled',
  render: () => <CalendarPicker value={new Date(2026, 2, 10)} disabled />,
};
