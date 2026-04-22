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

/* ─── Linear ─────────────────────────────────────────────────────────────────── */

export const LinearSmallDefault: Story = {
  name: 'Linear — Small / Default',
  args: { type: 'linear', size: 'sm', status: 'default', value: 30 },
};

export const LinearSmallSuccess: Story = {
  name: 'Linear — Small / Success',
  args: { type: 'linear', size: 'sm', status: 'success', value: 30 },
};

export const LinearSmallError: Story = {
  name: 'Linear — Small / Error',
  args: { type: 'linear', size: 'sm', status: 'error', value: 30 },
};

export const LinearLargeDefault: Story = {
  name: 'Linear — Large / Default',
  args: { type: 'linear', size: 'lg', status: 'default', value: 30 },
};

export const LinearLargeSuccess: Story = {
  name: 'Linear — Large / Success',
  args: { type: 'linear', size: 'lg', status: 'success', value: 30 },
};

export const LinearLargeError: Story = {
  name: 'Linear — Large / Error',
  args: { type: 'linear', size: 'lg', status: 'error', value: 30 },
};

/* ─── Circle ─────────────────────────────────────────────────────────────────── */

export const CircleSmallDefault: Story = {
  name: 'Circle — Small / Default',
  args: { type: 'circle', size: 'sm', status: 'default', value: 30 },
};

export const CircleSmallSuccess: Story = {
  name: 'Circle — Small / Success',
  args: { type: 'circle', size: 'sm', status: 'success', value: 30 },
};

export const CircleSmallError: Story = {
  name: 'Circle — Small / Error',
  args: { type: 'circle', size: 'sm', status: 'error', value: 30 },
};

export const CircleLargeDefault: Story = {
  name: 'Circle — Large / Default',
  args: { type: 'circle', size: 'lg', status: 'default', value: 30 },
};

export const CircleLargeSuccess: Story = {
  name: 'Circle — Large / Success',
  args: { type: 'circle', size: 'lg', status: 'success', value: 30 },
};

export const CircleLargeError: Story = {
  name: 'Circle — Large / Error',
  args: { type: 'circle', size: 'lg', status: 'error', value: 30 },
};

/* ─── All Variants ───────────────────────────────────────────────────────────── */

export const AllLinear: Story = {
  name: 'All Linear Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 360 }}>
      {/* Small */}
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#616161', fontFamily: 'Roboto, sans-serif' }}>Small — Default</p>
        <ProgressBar type="linear" size="sm" status="default" value={60} />
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#616161', fontFamily: 'Roboto, sans-serif' }}>Small — Success</p>
        <ProgressBar type="linear" size="sm" status="success" value={100} />
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#616161', fontFamily: 'Roboto, sans-serif' }}>Small — Error</p>
        <ProgressBar type="linear" size="sm" status="error" value={40} />
      </div>
      {/* Large */}
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#616161', fontFamily: 'Roboto, sans-serif' }}>Large — Default</p>
        <ProgressBar type="linear" size="lg" status="default" value={60} />
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#616161', fontFamily: 'Roboto, sans-serif' }}>Large — Success</p>
        <ProgressBar type="linear" size="lg" status="success" value={100} />
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#616161', fontFamily: 'Roboto, sans-serif' }}>Large — Error</p>
        <ProgressBar type="linear" size="lg" status="error" value={40} />
      </div>
    </div>
  ),
};

export const AllCircle: Story = {
  name: 'All Circle Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Small */}
      <div>
        <p style={{ marginBottom: 12, fontSize: 12, color: '#616161', fontFamily: 'Roboto, sans-serif' }}>Small</p>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <ProgressBar type="circle" size="sm" status="default" value={30} />
          <ProgressBar type="circle" size="sm" status="success" value={100} />
          <ProgressBar type="circle" size="sm" status="error"   value={40} />
        </div>
      </div>
      {/* Large */}
      <div>
        <p style={{ marginBottom: 12, fontSize: 12, color: '#616161', fontFamily: 'Roboto, sans-serif' }}>Large</p>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <ProgressBar type="circle" size="lg" status="default" value={30} />
          <ProgressBar type="circle" size="lg" status="success" value={100} />
          <ProgressBar type="circle" size="lg" status="error"   value={40} />
        </div>
      </div>
    </div>
  ),
};

/* ─── Percentage steps ───────────────────────────────────────────────────────── */

export const LinearPercentageSteps: Story = {
  name: 'Linear — Percentage Steps',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360 }}>
      {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((v) => (
        <div key={v} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 12, color: '#616161', fontFamily: 'Roboto, sans-serif', width: 32, textAlign: 'right' }}>{v}%</span>
          <div style={{ flex: 1 }}>
            <ProgressBar type="linear" size="lg" status="default" value={v} />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const CirclePercentageSteps: Story = {
  name: 'Circle — Percentage Steps',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
      {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((v) => (
        <div key={v} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <ProgressBar type="circle" size="sm" status="default" value={v} />
          <span style={{ fontSize: 11, color: '#616161', fontFamily: 'Roboto, sans-serif' }}>{v}%</span>
        </div>
      ))}
    </div>
  ),
};
