import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Input/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library',
    },
    docs: {
      description: {
        component:
          'Action button with semantic variants (primary, secondary, tertiary, outline, danger) and sizes. [Figma →](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library)',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'outline', 'danger'],
      description: 'Button variant from Figma Component Library',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Label',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Label',
    variant: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    children: 'Label',
    variant: 'tertiary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Label',
    variant: 'outline',
  },
};

export const Danger: Story = {
  args: {
    children: 'Delete',
    variant: 'danger',
  },
};

export const Small: Story = {
  args: {
    children: 'Label',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    children: 'Label',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    children: 'Label',
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Label',
    variant: 'primary',
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};
