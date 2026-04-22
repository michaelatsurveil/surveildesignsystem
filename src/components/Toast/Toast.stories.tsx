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

