import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
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

// ─── Default States ───────────────────────────────────────────────────────────

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

// ─── Sizes ────────────────────────────────────────────────────────────────────

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

// ─── Focused States ───────────────────────────────────────────────────────────

export const PrimaryFocused: Story = {
  name: 'Primary / Focused',
  args: { children: 'Label', variant: 'primary' },
  play: async ({ canvasElement }) => {
    within(canvasElement).getByRole('button').focus();
  },
};

export const SecondaryFocused: Story = {
  name: 'Secondary / Focused',
  args: { children: 'Label', variant: 'secondary' },
  play: async ({ canvasElement }) => {
    within(canvasElement).getByRole('button').focus();
  },
};

export const TertiaryFocused: Story = {
  name: 'Tertiary / Focused',
  args: { children: 'Label', variant: 'tertiary' },
  play: async ({ canvasElement }) => {
    within(canvasElement).getByRole('button').focus();
  },
};

export const OutlineFocused: Story = {
  name: 'Outline / Focused',
  args: { children: 'Label', variant: 'outline' },
  play: async ({ canvasElement }) => {
    within(canvasElement).getByRole('button').focus();
  },
};

export const DangerFocused: Story = {
  name: 'Danger / Focused',
  args: { children: 'Delete', variant: 'danger' },
  play: async ({ canvasElement }) => {
    within(canvasElement).getByRole('button').focus();
  },
};

// ─── Pressed States ───────────────────────────────────────────────────────────

export const PrimaryPressed: Story = {
  name: 'Primary / Pressed',
  args: { children: 'Label', variant: 'primary' },
  play: async ({ canvasElement }) => {
    await userEvent.pointer({
      target: within(canvasElement).getByRole('button'),
      keys: '[MouseLeft>]',
    });
  },
};

export const SecondaryPressed: Story = {
  name: 'Secondary / Pressed',
  args: { children: 'Label', variant: 'secondary' },
  play: async ({ canvasElement }) => {
    await userEvent.pointer({
      target: within(canvasElement).getByRole('button'),
      keys: '[MouseLeft>]',
    });
  },
};

export const TertiaryPressed: Story = {
  name: 'Tertiary / Pressed',
  args: { children: 'Label', variant: 'tertiary' },
  play: async ({ canvasElement }) => {
    await userEvent.pointer({
      target: within(canvasElement).getByRole('button'),
      keys: '[MouseLeft>]',
    });
  },
};

export const OutlinePressed: Story = {
  name: 'Outline / Pressed',
  args: { children: 'Label', variant: 'outline' },
  play: async ({ canvasElement }) => {
    await userEvent.pointer({
      target: within(canvasElement).getByRole('button'),
      keys: '[MouseLeft>]',
    });
  },
};

export const DangerPressed: Story = {
  name: 'Danger / Pressed',
  args: { children: 'Delete', variant: 'danger' },
  play: async ({ canvasElement }) => {
    await userEvent.pointer({
      target: within(canvasElement).getByRole('button'),
      keys: '[MouseLeft>]',
    });
  },
};

// ─── Disabled States ──────────────────────────────────────────────────────────

export const PrimaryDisabled: Story = {
  name: 'Primary / Disabled',
  args: { children: 'Label', variant: 'primary', disabled: true },
};

export const SecondaryDisabled: Story = {
  name: 'Secondary / Disabled',
  args: { children: 'Label', variant: 'secondary', disabled: true },
};

export const TertiaryDisabled: Story = {
  name: 'Tertiary / Disabled',
  args: { children: 'Label', variant: 'tertiary', disabled: true },
};

export const OutlineDisabled: Story = {
  name: 'Outline / Disabled',
  args: { children: 'Label', variant: 'outline', disabled: true },
};

export const DangerDisabled: Story = {
  name: 'Danger / Disabled',
  args: { children: 'Delete', variant: 'danger', disabled: true },
};

// ─── All Variants Overview ────────────────────────────────────────────────────

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

export const AllStates: Story = {
  name: 'All States',
  render: () => {
    const variants = ['primary', 'secondary', 'tertiary', 'outline', 'danger'] as const;
    const colStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 12,
    };
    const labelStyle: React.CSSProperties = {
      fontSize: 11,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      color: '#818181',
      marginBottom: 4,
    };
    return (
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        {variants.map((variant) => (
          <div key={variant} style={colStyle}>
            <span style={labelStyle}>{variant}</span>
            <Button variant={variant}>{variant === 'danger' ? 'Delete' : 'Default'}</Button>
            <Button variant={variant} disabled>{variant === 'danger' ? 'Delete' : 'Disabled'}</Button>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Overview of all variants in default and disabled states. See individual "Focused" and "Pressed" stories for interactive states.',
      },
    },
  },
};
