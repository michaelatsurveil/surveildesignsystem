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
          'Card container with optional header (icon in 40×40 block, title, status badge), body, and footer (primary + secondary buttons or label pills). [Figma →](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=320-5290)',
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
          <Card title="With Labels" icon={<Package size={20} strokeWidth={2} color="currentColor" />} labels={['Label', 'Tag', 'Item']}>Card with label pills in the footer.</Card>
          <Card title="Minimal">Card with no icon, status, or footer.</Card>
        </div>
      </div>
    </div>
  ),
};

export const WithIconOnly: Story = {
  args: {
    title: 'Card Header',
    icon: <Package size={20} strokeWidth={2} color="currentColor" />,
    children: 'Card body content without status or labels.',
  },
};

export const WithStatusVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
      <Card title="Default" status="Default" statusVariant="default">
        Status badge with default variant.
      </Card>
      <Card title="Success" status="Success" statusVariant="success">
        Status badge with success variant.
      </Card>
      <Card title="Error" status="Error" statusVariant="error">
        Status badge with error variant.
      </Card>
      <Card title="Warning" status="Warning" statusVariant="warning">
        Status badge with warning variant.
      </Card>
      <Card title="Info" status="Info" statusVariant="info">
        Status badge with info variant.
      </Card>
    </div>
  ),
};

export const WithLabels: Story = {
  args: {
    title: 'Card Header',
    children: 'Card body text with multiple labels in the footer.',
    labels: ['Label', 'Label', 'Tag'],
  },
};

export const Minimal: Story = {
  args: {
    title: 'Card Header',
    children: 'Minimal card with only title and body.',
  },
};

export const WithFooterButtons: Story = {
  args: {
    title: 'Card Header',
    icon: <Package size={20} strokeWidth={2} color="currentColor" />,
    status: 'Success',
    statusVariant: 'success',
    children: 'Card body text with primary and secondary actions in the footer.',
    primaryAction: { label: 'Label', onClick: () => {} },
    secondaryAction: { label: 'Label', onClick: () => {} },
  },
};

export const Interactive: Story = {
  args: {
    title: 'Clickable Card',
    icon: <Package size={20} strokeWidth={2} color="currentColor" />,
    status: 'Active',
    statusVariant: 'success',
    children: 'This card is clickable. Use for navigation or selection.',
    primaryAction: { label: 'Label' },
    onClick: () => alert('Card clicked'),
  },
};
