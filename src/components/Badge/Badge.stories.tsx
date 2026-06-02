import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Display/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=2670-6213',
    },
    docs: {
      description: {
        component:
          'System-generated status indicator. Three shape variants: **Circle** (18×18px numeric), **Default** (Body/xsm pill), and **Large** (Body/sm pill). Badges are non-interactive and system-generated — for user-assigned, dismissible labels use the Tag component. [Figma →](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=2670-6213)',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'critical', 'attention', 'warning', 'purple', 'rose', 'orange', 'jade', 'teal', 'aqua'],
    },
    size: {
      control: 'select',
      options: ['circle', 'sm', 'lg'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

const semanticVariants = ['default', 'info', 'success', 'critical', 'attention', 'warning'] as const;
const colourVariants = ['purple', 'rose', 'orange', 'jade', 'teal', 'aqua'] as const;

const sectionLabel = (text: string) => (
  <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af', fontFamily: 'Roboto, sans-serif' }}>
    {text}
  </p>
);

const label = (v: string) => v.charAt(0).toUpperCase() + v.slice(1);

export const Default: Story = {
  name: 'Overview — All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {sectionLabel('Semantic')}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {semanticVariants.map(v => <Badge key={v} variant={v} size="circle">9</Badge>)}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {semanticVariants.map(v => <Badge key={v} variant={v} size="sm">{label(v)}</Badge>)}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {semanticVariants.map(v => <Badge key={v} variant={v} size="lg">{label(v)}</Badge>)}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {sectionLabel('Colour')}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {colourVariants.map(v => <Badge key={v} variant={v} size="circle">9</Badge>)}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {colourVariants.map(v => <Badge key={v} variant={v} size="sm">{label(v)}</Badge>)}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {colourVariants.map(v => <Badge key={v} variant={v} size="lg">{label(v)}</Badge>)}
        </div>
      </div>
    </div>
  ),
};
