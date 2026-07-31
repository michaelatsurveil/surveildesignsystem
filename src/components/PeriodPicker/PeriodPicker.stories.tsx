import type { Meta, StoryObj } from '@storybook/react';
import { PeriodPicker } from './PeriodPicker';

const meta: Meta<typeof PeriodPicker> = {
  title: 'Inputs/PeriodPicker',
  component: PeriodPicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A period-selector dropdown for picking a fiscal quarter and year. Shows a trigger button with the selected period; clicking opens a popover with year navigation and a Q1–Q4 grid.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PeriodPicker>;

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
    <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', alignItems: 'flex-start', paddingBottom: 200 }}>
      <div>
        {label('Idle (no selection)')}
        <PeriodPicker placeholder="Select period" />
      </div>

      <div>
        {label('Selected')}
        <PeriodPicker value={{ quarter: 'Q1', year: 2026 }} />
      </div>

      <div>
        {label('Disabled')}
        <PeriodPicker value={{ quarter: 'Q2', year: 2026 }} disabled />
      </div>
    </div>
  ),
};

/* ─── Idle ──────────────────────────────────────────────────────────────────── */

export const Idle: Story = {
  name: 'Idle',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ paddingBottom: 200 }}>
      <PeriodPicker placeholder="Select period" />
    </div>
  ),
};

/* ─── Selected ──────────────────────────────────────────────────────────────── */

export const Selected: Story = {
  name: 'Selected',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ paddingBottom: 200 }}>
      <PeriodPicker value={{ quarter: 'Q1', year: 2026 }} />
    </div>
  ),
};

/* ─── Disabled ──────────────────────────────────────────────────────────────── */

export const Disabled: Story = {
  name: 'Disabled',
  render: () => <PeriodPicker value={{ quarter: 'Q2', year: 2026 }} disabled />,
};
