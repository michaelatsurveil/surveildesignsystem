import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Feedback/Progress Bar',
  component: ProgressBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Progress Bar shows the completion state of a task or process. Sourced from Figma — Types: Linear / Circle · Sizes: Small / Large · Statuses: Default / Success / Error.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ['linear', 'circle'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'lg'],
    },
    status: {
      control: 'radio',
      options: ['default', 'success', 'error'],
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 10 },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

/* ─── Overview ───────────────────────────────────────────────────────────────── */

export const Default: Story = {
  name: 'Overview — Linear & Circle',
  render: () => {
    const label = (text: string) => (
      <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af', fontFamily: 'Roboto, sans-serif' }}>{text}</p>
    );
    return (
      <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ minWidth: 280 }}>
          {label('Linear — Small')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
            <ProgressBar type="linear" size="sm" status="default" value={60} />
            <ProgressBar type="linear" size="sm" status="success" value={100} />
            <ProgressBar type="linear" size="sm" status="error" value={40} />
          </div>
          {label('Linear — Large')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <ProgressBar type="linear" size="lg" status="default" value={60} />
            <ProgressBar type="linear" size="lg" status="success" value={100} />
            <ProgressBar type="linear" size="lg" status="error" value={40} />
          </div>
        </div>
        <div>
          {label('Circle — Small')}
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 28 }}>
            <ProgressBar type="circle" size="sm" status="default" value={60} />
            <ProgressBar type="circle" size="sm" status="success" value={100} />
            <ProgressBar type="circle" size="sm" status="error" value={40} />
          </div>
          {label('Circle — Large')}
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <ProgressBar type="circle" size="lg" status="default" value={60} />
            <ProgressBar type="circle" size="lg" status="success" value={100} />
            <ProgressBar type="circle" size="lg" status="error" value={40} />
          </div>
        </div>
      </div>
    );
  },
};

