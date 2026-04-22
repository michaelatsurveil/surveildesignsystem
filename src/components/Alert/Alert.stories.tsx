import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alerts',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Alerts display important messages that require user attention. They can include an optional action link.',
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

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  name: 'Overview — All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Alert message="Default alert message." variant="default" showIcon onClose={() => {}} />
      <Alert message="Success: Your changes have been saved successfully." variant="success" showIcon onClose={() => {}} />
      <Alert message="Info: Here is some helpful information about this action." variant="info" showIcon onClose={() => {}} />
      <Alert message="Warning: Please review your information before continuing." variant="warning" showIcon onClose={() => {}} />
      <Alert message="Error: Something went wrong. Please try again." variant="error" showIcon onClose={() => {}} />
      <Alert message="With action link — your session will expire soon." variant="info" action={{ label: 'Renew session', href: '#' }} showIcon onClose={() => {}} />
      <Alert message="Without icon — same variants work icon-free too." variant="default" showIcon={false} onClose={() => {}} />
    </div>
  ),
};

export const Success: Story = {
  args: {
    message: 'Your changes have been saved successfully.',
    variant: 'success',
    onClose: () => {},
  },
};

export const Info: Story = {
  args: {
    message: 'Here is some helpful information.',
    variant: 'info',
    onClose: () => {},
  },
};

export const Warning: Story = {
  args: {
    message: 'Please review your information before continuing.',
    variant: 'warning',
    onClose: () => {},
  },
};

export const Error: Story = {
  args: {
    message: 'Something went wrong. Please try again.',
    variant: 'error',
    onClose: () => {},
  },
};

export const WithAction: Story = {
  args: {
    message: 'Your session will expire soon.',
    variant: 'info',
    action: { label: 'Label', href: '#' },
    onClose: () => {},
  },
};

export const WithActionButton: Story = {
  args: {
    message: 'You have unsaved changes.',
    variant: 'warning',
    action: { label: 'Save now', onClick: () => {} },
    onClose: () => {},
  },
};

export const WithoutIcon: Story = {
  args: {
    message: 'Alert message without icon.',
    variant: 'default',
    showIcon: false,
    onClose: () => {},
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Alert message="Default alert message." variant="default" onClose={() => {}} />
      <Alert message="Success alert message." variant="success" onClose={() => {}} />
      <Alert message="Info alert message." variant="info" onClose={() => {}} />
      <Alert message="Warning alert message." variant="warning" onClose={() => {}} />
      <Alert message="Error alert message." variant="error" onClose={() => {}} />
    </div>
  ),
};
