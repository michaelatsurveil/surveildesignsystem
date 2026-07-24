import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toaster',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Toaster displays small, temporary, non-disruptive messages that provide feedback on an operation. Sourced from Figma: Sizes × Types × Shadow.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'info', 'warning', 'danger', 'error'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'lg'],
    },
    shadow: {
      control: 'boolean',
    },
    showIcon: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Toast>;

const label = (text: string) => (
  <p style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af', fontFamily: 'Roboto, sans-serif' }}>{text}</p>
);

const DESC = 'Briefly displays status updates or alerts with icons, titles, and timestamps.';

// ─── Overview ───────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Overview — All Variants',
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div>
        {label('Small')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Toast message="Toast Notification Alert" variant="default" size="sm" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" variant="success" size="sm" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" variant="info"    size="sm" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" variant="warning" size="sm" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" variant="danger"  size="sm" showIcon onClose={() => {}} />
        </div>
      </div>
      <div>
        {label('Large')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Toast message="Toast Notification Alert" variant="default" size="lg" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" variant="success" size="lg" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" variant="info"    size="lg" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" variant="warning" size="lg" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" variant="danger"  size="lg" showIcon onClose={() => {}} />
        </div>
      </div>
      <div>
        {label('Small + shadow')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Toast message="Toast Notification Alert" variant="default" size="sm" shadow showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" variant="success" size="sm" shadow showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" variant="info"    size="sm" shadow showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" variant="warning" size="sm" shadow showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" variant="danger"  size="sm" shadow showIcon onClose={() => {}} />
        </div>
      </div>
    </div>
  ),
};

// ─── With description ────────────────────────────────────────────────────────

export const WithDescription: Story = {
  name: 'With Description',
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div>
        {label('Small')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Toast message="Toast Notification Alert" description={DESC} variant="default" size="sm" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" description={DESC} variant="success" size="sm" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" description={DESC} variant="info"    size="sm" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" description={DESC} variant="warning" size="sm" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" description={DESC} variant="danger"  size="sm" showIcon onClose={() => {}} />
        </div>
      </div>
      <div>
        {label('Large')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Toast message="Toast Notification Alert" description={DESC} variant="default" size="lg" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" description={DESC} variant="success" size="lg" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" description={DESC} variant="info"    size="lg" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" description={DESC} variant="warning" size="lg" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" description={DESC} variant="danger"  size="lg" showIcon onClose={() => {}} />
        </div>
      </div>
    </div>
  ),
};

// ─── With progress bar ───────────────────────────────────────────────────────

export const WithProgressBar: Story = {
  name: 'With Progress Bar',
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div>
        {label('Small')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Toast message="Toast Notification Alert" description={DESC} progressValue={80} variant="default" size="sm" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" description={DESC} progressValue={60} variant="success" size="sm" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" description={DESC} progressValue={40} variant="info"    size="sm" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" description={DESC} progressValue={30} variant="warning" size="sm" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" description={DESC} progressValue={20} variant="danger"  size="sm" showIcon onClose={() => {}} />
        </div>
      </div>
      <div>
        {label('Large')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Toast message="Toast Notification Alert" description={DESC} progressValue={80} variant="default" size="lg" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" description={DESC} progressValue={60} variant="success" size="lg" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" description={DESC} progressValue={40} variant="info"    size="lg" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" description={DESC} progressValue={30} variant="warning" size="lg" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" description={DESC} progressValue={20} variant="danger"  size="lg" showIcon onClose={() => {}} />
        </div>
      </div>
    </div>
  ),
};

// ─── With buttons ────────────────────────────────────────────────────────────

const BUTTONS = [
  { label: 'Confirm', variant: 'primary' as const, onClick: () => {} },
  { label: 'Dismiss', variant: 'secondary' as const, onClick: () => {} },
];

export const WithButtons: Story = {
  name: 'With Buttons',
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div>
        {label('Bottom left')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Toast message="Toast Notification Alert" description={DESC} buttons={BUTTONS} buttonPosition="left" variant="default" size="lg" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" description={DESC} buttons={BUTTONS} buttonPosition="left" variant="success" size="lg" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" description={DESC} buttons={BUTTONS} buttonPosition="left" variant="info"    size="lg" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" description={DESC} buttons={BUTTONS} buttonPosition="left" variant="warning" size="lg" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" description={DESC} buttons={BUTTONS} buttonPosition="left" variant="danger"  size="lg" showIcon onClose={() => {}} />
        </div>
      </div>
      <div>
        {label('Bottom right')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Toast message="Toast Notification Alert" description={DESC} buttons={BUTTONS} buttonPosition="right" variant="default" size="lg" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" description={DESC} buttons={BUTTONS} buttonPosition="right" variant="success" size="lg" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" description={DESC} buttons={BUTTONS} buttonPosition="right" variant="info"    size="lg" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" description={DESC} buttons={BUTTONS} buttonPosition="right" variant="warning" size="lg" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" description={DESC} buttons={BUTTONS} buttonPosition="right" variant="danger"  size="lg" showIcon onClose={() => {}} />
        </div>
      </div>
    </div>
  ),
};

