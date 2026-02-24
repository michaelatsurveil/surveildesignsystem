import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=275-16494',
    },
    docs: {
      description: {
        component:
          'Circular avatar showing image, initials, or fallback icon. [Figma →](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=275-16494)',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Initials: Story = {
  args: {
    initials: 'JP',
    size: 'md',
  },
};

export const InitialsUser: Story = {
  args: {
    initials: 'User',
    size: 'md',
  },
};

export const IconFallback: Story = {
  args: {
    size: 'md',
  },
};

export const Image: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face',
    alt: 'User profile',
    size: 'md',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Avatar initials="CN" size="xs" />
      <Avatar initials="JP" size="sm" />
      <Avatar initials="User" size="md" />
      <Avatar initials="JP" size="lg" />
      <Avatar initials="User" size="xl" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
      <Avatar initials="JP" size="md" />
      <Avatar initials="User" size="md" />
      <Avatar size="md" />
      <Avatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face"
        alt="Profile"
        size="md"
      />
    </div>
  ),
};
