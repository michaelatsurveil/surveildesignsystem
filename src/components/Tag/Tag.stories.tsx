import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Display/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=304-1063',
    },
    docs: {
      description: {
        component:
          'Pill-shaped tags with semantic variants (default, info, success, critical, attention, warning) and two sizes. [Figma →](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=304-1063)',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'critical', 'attention', 'warning'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  name: 'Overview — All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af', fontFamily: 'Roboto, sans-serif' }}>Medium (text)</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <Tag variant="default" size="md">Default</Tag>
          <Tag variant="info" size="md">Info</Tag>
          <Tag variant="success" size="md">Success</Tag>
          <Tag variant="critical" size="md">Critical</Tag>
          <Tag variant="attention" size="md">Attention</Tag>
          <Tag variant="warning" size="md">Warning</Tag>
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af', fontFamily: 'Roboto, sans-serif' }}>Small (numeric)</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <Tag variant="default" size="sm">9</Tag>
          <Tag variant="info" size="sm">9</Tag>
          <Tag variant="success" size="sm">9</Tag>
          <Tag variant="critical" size="sm">9</Tag>
          <Tag variant="attention" size="sm">9</Tag>
          <Tag variant="warning" size="sm">9</Tag>
        </div>
      </div>
    </div>
  ),
};

export const Info: Story = {
  args: {
    variant: 'info',
    size: 'md',
    children: 'Info',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    size: 'md',
    children: 'Success',
  },
};

export const Critical: Story = {
  args: {
    variant: 'critical',
    size: 'md',
    children: 'Critical',
  },
};

export const Attention: Story = {
  args: {
    variant: 'attention',
    size: 'md',
    children: 'Attention',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    size: 'md',
    children: 'Warning',
  },
};

export const NumericTags: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <Tag variant="default" size="sm">9</Tag>
      <Tag variant="info" size="sm">9</Tag>
      <Tag variant="success" size="sm">9</Tag>
      <Tag variant="critical" size="sm">9</Tag>
      <Tag variant="attention" size="sm">9</Tag>
      <Tag variant="warning" size="sm">9</Tag>
    </div>
  ),
};

export const TextTags: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <Tag variant="default" size="md">Default</Tag>
      <Tag variant="info" size="md">Info</Tag>
      <Tag variant="success" size="md">Success</Tag>
      <Tag variant="critical" size="md">Critical</Tag>
      <Tag variant="attention" size="md">Attention</Tag>
      <Tag variant="warning" size="md">Warning</Tag>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
        <Tag variant="default" size="sm">9</Tag>
        <Tag variant="info" size="sm">9</Tag>
        <Tag variant="success" size="sm">9</Tag>
        <Tag variant="critical" size="sm">9</Tag>
        <Tag variant="attention" size="sm">9</Tag>
        <Tag variant="warning" size="sm">9</Tag>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
        <Tag variant="default" size="md">Default</Tag>
        <Tag variant="info" size="md">Info</Tag>
        <Tag variant="success" size="md">Success</Tag>
        <Tag variant="critical" size="md">Critical</Tag>
        <Tag variant="attention" size="md">Attention</Tag>
        <Tag variant="warning" size="md">Warning</Tag>
      </div>
    </div>
  ),
};
