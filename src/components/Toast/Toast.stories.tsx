import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';
import { ToastProvider, useToast } from './ToastContext';
import { Button } from '../Button/Button';

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

// ─── Small (default) ────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Overview — All Variants',
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div>
        <p style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af', fontFamily: 'Roboto, sans-serif' }}>Small</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Toast message="Toast Notification Alert" variant="default" size="sm" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" variant="success" size="sm" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" variant="info"    size="sm" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" variant="warning" size="sm" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" variant="danger"  size="sm" showIcon onClose={() => {}} />
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af', fontFamily: 'Roboto, sans-serif' }}>Large</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Toast message="Toast Notification Alert" variant="default" size="lg" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" variant="success" size="lg" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" variant="info"    size="lg" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" variant="warning" size="lg" showIcon onClose={() => {}} />
          <Toast message="Toast Notification Alert" variant="danger"  size="lg" showIcon onClose={() => {}} />
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af', fontFamily: 'Roboto, sans-serif' }}>Small + shadow</p>
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

export const DefaultShadow: Story = {
  name: 'Default (with shadow)',
  args: {
    message: 'Toast Notification Alert',
    variant: 'default',
    size: 'sm',
    shadow: true,
    showIcon: true,
    onClose: () => {},
  },
};

export const Success: Story = {
  args: {
    message: 'Toast Notification Alert',
    variant: 'success',
    size: 'sm',
    showIcon: true,
    onClose: () => {},
  },
};

export const Info: Story = {
  args: {
    message: 'Toast Notification Alert',
    variant: 'info',
    size: 'sm',
    showIcon: true,
    onClose: () => {},
  },
};

export const Warning: Story = {
  args: {
    message: 'Toast Notification Alert',
    variant: 'warning',
    size: 'sm',
    showIcon: true,
    onClose: () => {},
  },
};

export const Danger: Story = {
  args: {
    message: 'Toast Notification Alert',
    variant: 'danger',
    size: 'sm',
    showIcon: true,
    onClose: () => {},
  },
};

export const WithoutIcon: Story = {
  args: {
    message: 'Toast Notification Alert',
    variant: 'default',
    size: 'sm',
    showIcon: false,
    onClose: () => {},
  },
};

// ─── Large ───────────────────────────────────────────────────────────────────

export const LargeDefault: Story = {
  name: 'Large — Default',
  args: {
    message: 'Toast Notification Alert',
    variant: 'default',
    size: 'lg',
    shadow: false,
    showIcon: true,
    onClose: () => {},
  },
};

export const LargeDefaultShadow: Story = {
  name: 'Large — Default (with shadow)',
  args: {
    message: 'Toast Notification Alert',
    variant: 'default',
    size: 'lg',
    shadow: true,
    showIcon: true,
    onClose: () => {},
  },
};

export const LargeSuccess: Story = {
  name: 'Large — Success',
  args: {
    message: 'Toast Notification Alert',
    variant: 'success',
    size: 'lg',
    showIcon: true,
    onClose: () => {},
  },
};

export const LargeInfo: Story = {
  name: 'Large — Info',
  args: {
    message: 'Toast Notification Alert',
    variant: 'info',
    size: 'lg',
    showIcon: true,
    onClose: () => {},
  },
};

export const LargeWarning: Story = {
  name: 'Large — Warning',
  args: {
    message: 'Toast Notification Alert',
    variant: 'warning',
    size: 'lg',
    showIcon: true,
    onClose: () => {},
  },
};

export const LargeDanger: Story = {
  name: 'Large — Danger',
  args: {
    message: 'Toast Notification Alert',
    variant: 'danger',
    size: 'lg',
    showIcon: true,
    onClose: () => {},
  },
};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariantsSmall: Story = {
  name: 'All Variants — Small',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Toast message="Toast Notification Alert" variant="default" size="sm" onClose={() => {}} />
      <Toast message="Toast Notification Alert" variant="success" size="sm" onClose={() => {}} />
      <Toast message="Toast Notification Alert" variant="info"    size="sm" onClose={() => {}} />
      <Toast message="Toast Notification Alert" variant="warning" size="sm" onClose={() => {}} />
      <Toast message="Toast Notification Alert" variant="danger"  size="sm" onClose={() => {}} />
    </div>
  ),
};

export const AllVariantsLarge: Story = {
  name: 'All Variants — Large',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Toast message="Toast Notification Alert" variant="default" size="lg" onClose={() => {}} />
      <Toast message="Toast Notification Alert" variant="success" size="lg" onClose={() => {}} />
      <Toast message="Toast Notification Alert" variant="info"    size="lg" onClose={() => {}} />
      <Toast message="Toast Notification Alert" variant="warning" size="lg" onClose={() => {}} />
      <Toast message="Toast Notification Alert" variant="danger"  size="lg" onClose={() => {}} />
    </div>
  ),
};

export const AllVariantsShadow: Story = {
  name: 'All Variants — Small + Shadow',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Toast message="Toast Notification Alert" variant="default" size="sm" shadow onClose={() => {}} />
      <Toast message="Toast Notification Alert" variant="success" size="sm" shadow onClose={() => {}} />
      <Toast message="Toast Notification Alert" variant="info"    size="sm" shadow onClose={() => {}} />
      <Toast message="Toast Notification Alert" variant="warning" size="sm" shadow onClose={() => {}} />
      <Toast message="Toast Notification Alert" variant="danger"  size="sm" shadow onClose={() => {}} />
    </div>
  ),
};

// ─── Interactive ──────────────────────────────────────────────────────────────

function ToastDemo() {
  const { toast } = useToast();
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Button variant="secondary" onClick={() => toast('Toast Notification')}>
        Default
      </Button>
      <Button variant="secondary" onClick={() => toast('Operation completed successfully', { variant: 'success' })}>
        Success
      </Button>
      <Button variant="secondary" onClick={() => toast('Here is some helpful information', { variant: 'info' })}>
        Info
      </Button>
      <Button variant="secondary" onClick={() => toast('Please review before continuing', { variant: 'warning' })}>
        Warning
      </Button>
      <Button variant="danger" onClick={() => toast('Something went wrong', { variant: 'danger' })}>
        Danger
      </Button>
    </div>
  );
}

export const Interactive: Story = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
};
