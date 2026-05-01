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
    heading: { control: 'text' },
    subtext: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

/* ─── Linear standalone ──────────────────────────────────────────────────────── */

export const LinearStandalone: Story = {
  name: 'Linear — Standalone',
  render: () => {
    const label = (text: string) => (
      <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af', fontFamily: 'Roboto, sans-serif' }}>{text}</p>
    );
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 400 }}>
        <div>
          {label('Small — default / success / error')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <ProgressBar type="linear" size="sm" status="default" value={60} />
            <ProgressBar type="linear" size="sm" status="success" value={100} />
            <ProgressBar type="linear" size="sm" status="error" value={40} />
          </div>
        </div>
        <div>
          {label('Large — default / success / error')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <ProgressBar type="linear" size="lg" status="default" value={60} />
            <ProgressBar type="linear" size="lg" status="success" value={100} />
            <ProgressBar type="linear" size="lg" status="error" value={40} />
          </div>
        </div>
      </div>
    );
  },
};

/* ─── Linear with heading + subtext ─────────────────────────────────────────── */

export const WithHeadingAndSubtext: Story = {
  name: 'Linear — Heading & Subtext',
  render: () => {
    const label = (text: string) => (
      <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af', fontFamily: 'Roboto, sans-serif' }}>{text}</p>
    );
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 400 }}>
        <div>
          {label('Large — heading & subtext')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <ProgressBar type="linear" size="lg" status="default" value={60} heading="Uploading files" subtext="3 of 5 files uploaded" />
            <ProgressBar type="linear" size="lg" status="success" value={100} heading="Upload complete" subtext="All files uploaded successfully" />
            <ProgressBar type="linear" size="lg" status="error" value={40} heading="Upload failed" subtext="Connection interrupted at 40%" />
          </div>
        </div>
        <div>
          {label('Small — heading & subtext')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <ProgressBar type="linear" size="sm" status="default" value={75} heading="Processing" subtext="Step 3 of 4" />
            <ProgressBar type="linear" size="sm" status="default" value={75} heading="Processing" />
            <ProgressBar type="linear" size="sm" status="default" value={30} subtext="30% complete" />
          </div>
        </div>
      </div>
    );
  },
};

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

