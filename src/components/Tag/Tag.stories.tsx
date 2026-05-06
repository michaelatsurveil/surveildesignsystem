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
          'Semantic badge/tag with three shape variants: **Circle** (18×18px numeric), **Default Full Rounded** (Body/xsm pill), and **Large Full Rounded** (Body/sm pill). [Figma →](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=304-1063)',
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

type Story = StoryObj<typeof Tag>;

const semanticVariants = ['default', 'info', 'success', 'critical', 'attention', 'warning'] as const;
const colourVariants = ['purple', 'rose', 'orange', 'jade', 'teal', 'aqua'] as const;
const variants = [...semanticVariants, ...colourVariants] as const;

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
          {semanticVariants.map(v => <Tag key={v} variant={v} size="circle">9</Tag>)}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {semanticVariants.map(v => <Tag key={v} variant={v} size="sm">{label(v)}</Tag>)}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {semanticVariants.map(v => <Tag key={v} variant={v} size="lg">{label(v)}</Tag>)}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {sectionLabel('Colour')}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {colourVariants.map(v => <Tag key={v} variant={v} size="circle">9</Tag>)}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {colourVariants.map(v => <Tag key={v} variant={v} size="sm">{label(v)}</Tag>)}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {colourVariants.map(v => <Tag key={v} variant={v} size="lg">{label(v)}</Tag>)}
        </div>
      </div>
    </div>
  ),
};
