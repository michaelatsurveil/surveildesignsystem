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

export const Default: Story = {
  name: 'Overview — All Types & Sizes',
  render: () => {
    const labelStyle: React.CSSProperties = {
      fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
      letterSpacing: '0.06em', color: '#9ca3af', fontFamily: 'Roboto, sans-serif',
      marginBottom: 10,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div>
          <div style={labelStyle}>Sizes — initials</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Avatar initials="JP" size="xs" />
            <Avatar initials="JP" size="sm" />
            <Avatar initials="JP" size="md" />
            <Avatar initials="JP" size="lg" />
            <Avatar initials="JP" size="xl" />
          </div>
        </div>
        <div>
          <div style={labelStyle}>Types (medium)</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Avatar initials="JP" size="md" />
            <Avatar initials="User" size="md" />
            <Avatar size="md" />
            <Avatar
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face"
              alt="Profile"
              size="md"
            />
          </div>
        </div>
      </div>
    );
  },
};

