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

// ─── Overview ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Overview — All Variants & Sizes',
  render: () => {
    const variants = ['primary', 'secondary', 'tertiary', 'outline', 'danger'] as const;
    const sizes = ['sm', 'md', 'lg'] as const;
    const labelStyle: React.CSSProperties = {
      fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
      letterSpacing: '0.06em', color: '#9ca3af', fontFamily: 'Roboto, sans-serif',
      marginBottom: 10,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div>
          <div style={labelStyle}>Variants (medium)</div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            {variants.map((v) => (
              <Button key={v} variant={v}>{v === 'danger' ? 'Delete' : 'Label'}</Button>
            ))}
          </div>
        </div>
        <div>
          <div style={labelStyle}>Sizes (primary)</div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            {sizes.map((s) => (
              <Button key={s} size={s}>Label ({s})</Button>
            ))}
          </div>
        </div>
        <div>
          <div style={labelStyle}>Disabled</div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            {variants.map((v) => (
              <Button key={v} variant={v} disabled>{v === 'danger' ? 'Delete' : 'Label'}</Button>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

