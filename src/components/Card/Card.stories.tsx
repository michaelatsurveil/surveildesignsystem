import type { Meta, StoryObj } from '@storybook/react';
import { Package } from 'lucide-react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Display/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=320-5290',
    },
    docs: {
      description: {
        component:
          'Card container with optional header (icon, title, status badge), body, and footer (primary + secondary buttons). [Figma →](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=320-5290)',
      },
    },
  },
  argTypes: {
    statusVariant: {
      control: 'radio',
      options: ['default', 'success', 'error', 'warning', 'info'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  name: 'Overview — All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ margin: '0 0 12px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af', fontFamily: 'Roboto, sans-serif' }}>Status variants</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <Card title="Default" status="Default" statusVariant="default" icon={<Package size={20} strokeWidth={2} color="currentColor" />}>Card body text.</Card>
          <Card title="Success" status="Success" statusVariant="success" icon={<Package size={20} strokeWidth={2} color="currentColor" />}>Card body text.</Card>
          <Card title="Error" status="Error" statusVariant="error" icon={<Package size={20} strokeWidth={2} color="currentColor" />}>Card body text.</Card>
          <Card title="Warning" status="Warning" statusVariant="warning" icon={<Package size={20} strokeWidth={2} color="currentColor" />}>Card body text.</Card>
          <Card title="Info" status="Info" statusVariant="info" icon={<Package size={20} strokeWidth={2} color="currentColor" />}>Card body text.</Card>
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 12px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af', fontFamily: 'Roboto, sans-serif' }}>With footer actions</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <Card title="With Buttons" icon={<Package size={20} strokeWidth={2} color="currentColor" />} status="Success" statusVariant="success" primaryAction={{ label: 'Primary' }} secondaryAction={{ label: 'Secondary' }}>Card with primary and secondary footer actions.</Card>
          <Card title="Minimal">Card with no icon, status, or footer.</Card>
        </div>
      </div>
    </div>
  ),
};

