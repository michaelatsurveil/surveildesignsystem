import type { Meta, StoryObj } from '@storybook/react';
import { Plus, Pencil, Trash2, X, MoreHorizontal, Download } from 'lucide-react';
import { IconButton } from './IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Input/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=3104-6210',
    },
    docs: {
      description: {
        component:
          'Icon-only button with five variants (primary, secondary, tertiary, danger, link) and three sizes (sm 28px, md 32px, lg 36px). Always provide an `aria-label`. [Figma →](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=3104-6210)',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'danger', 'link'],
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

type Story = StoryObj<typeof IconButton>;

const variants = ['primary', 'secondary', 'tertiary', 'danger', 'link'] as const;

const variantIcon = {
  primary: Plus,
  secondary: Pencil,
  tertiary: MoreHorizontal,
  danger: Trash2,
  link: Download,
};

const labelStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
  letterSpacing: '0.06em', color: '#9ca3af', fontFamily: 'Roboto, sans-serif',
  marginBottom: 10,
};

export const Default: Story = {
  name: 'Overview — All Types & Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

      <div>
        <div style={labelStyle}>Types — Small (28px)</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          {variants.map(v => (
            <IconButton key={v} variant={v} size="sm" icon={variantIcon[v]} aria-label={v} />
          ))}
        </div>
      </div>

      <div>
        <div style={labelStyle}>Types — Medium (32px)</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          {variants.map(v => (
            <IconButton key={v} variant={v} size="md" icon={variantIcon[v]} aria-label={v} />
          ))}
        </div>
      </div>

      <div>
        <div style={labelStyle}>Types — Large (36px)</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          {variants.map(v => (
            <IconButton key={v} variant={v} size="lg" icon={variantIcon[v]} aria-label={v} />
          ))}
        </div>
      </div>

      <div>
        <div style={labelStyle}>Disabled — all types</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          {variants.map(v => (
            <IconButton key={v} variant={v} icon={variantIcon[v]} aria-label={v} disabled />
          ))}
        </div>
      </div>

    </div>
  ),
};

export const Playground: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
    icon: X,
    'aria-label': 'Close',
  },
};
