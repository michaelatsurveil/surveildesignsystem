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
      url: 'https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=153-1427',
    },
    docs: {
      description: {
        component:
          'Action button with five types (primary, secondary, tertiary, danger, link) and three sizes (sm 24px, md 28px, lg 32px). [Figma →](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=153-1427)',
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

type Story = StoryObj<typeof Button>;

const variants = ['primary', 'secondary', 'tertiary', 'danger', 'link'] as const;

const labelStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
  letterSpacing: '0.06em', color: '#9ca3af', fontFamily: 'Roboto, sans-serif',
  marginBottom: 10,
};

const labelFor = (v: string) => v === 'danger' ? 'Delete' : 'Label';

export const Default: Story = {
  name: 'Overview — All Types & Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

      <div>
        <div style={labelStyle}>Types — Small (24px)</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          {variants.map(v => <Button key={v} variant={v} size="sm">{labelFor(v)}</Button>)}
        </div>
      </div>

      <div>
        <div style={labelStyle}>Types — Medium (28px)</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          {variants.map(v => <Button key={v} variant={v} size="md">{labelFor(v)}</Button>)}
        </div>
      </div>

      <div>
        <div style={labelStyle}>Types — Large (32px)</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          {variants.map(v => <Button key={v} variant={v} size="lg">{labelFor(v)}</Button>)}
        </div>
      </div>

      <div>
        <div style={labelStyle}>Disabled — all types</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          {variants.map(v => <Button key={v} variant={v} disabled>{labelFor(v)}</Button>)}
        </div>
      </div>

    </div>
  ),
};
