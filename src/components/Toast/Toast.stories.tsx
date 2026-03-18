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
          'Toaster displays small, temporary, non-disruptive messages that provide feedback on an operation.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'info', 'warning', 'error'],
    },
    showIcon: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    message: 'Toast Notification Here',
    variant: 'default',
    showIcon: true,
    onClose: () => {},
  },
};

export const WithoutIcon: Story = {
  args: {
    message: 'Toast Notification Here',
    variant: 'default',
    showIcon: false,
    onClose: () => {},
  },
};

export const Success: Story = {
  args: {
    message: 'Toast Notification Here',
    variant: 'success',
    onClose: () => {},
  },
};

export const Info: Story = {
  args: {
    message: 'Toast Notification Here',
    variant: 'info',
    onClose: () => {},
  },
};

export const Warning: Story = {
  args: {
    message: 'Toast Notification Here',
    variant: 'warning',
    onClose: () => {},
  },
};

export const Error: Story = {
  args: {
    message: 'Toast Notification Here',
    variant: 'error',
    onClose: () => {},
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Toast message="Toast Notification Here" variant="default" onClose={() => {}} />
      <Toast message="Toast Notification Here" variant="success" onClose={() => {}} />
      <Toast message="Toast Notification Here" variant="info" onClose={() => {}} />
      <Toast message="Toast Notification Here" variant="warning" onClose={() => {}} />
      <Toast message="Toast Notification Here" variant="error" onClose={() => {}} />
    </div>
  ),
};

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
      <Button variant="danger" onClick={() => toast('Something went wrong', { variant: 'error' })}>
        Error
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
