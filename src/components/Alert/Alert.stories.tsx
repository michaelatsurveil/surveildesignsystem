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

