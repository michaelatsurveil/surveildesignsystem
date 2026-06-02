import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';
import { Hash } from 'lucide-react';

const meta: Meta<typeof Tag> = {
  title: 'Display/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=2671-6588',
    },
    docs: {
      description: {
        component:
          'User-assigned label with optional leading icon and remove button. Two sizes: **Default** (12px, 8px icon) and **Large** (14px, 12px icon). Supports hover, clickable, and removable states. Tags imply user ownership — for system-generated status indicators use Badge. [Figma →](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=2671-6588)',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'large'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tag>;

const sectionLabel = (text: string) => (
  <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af', fontFamily: 'Roboto, sans-serif' }}>
    {text}
  </p>
);

export const Default: Story = {
  name: 'Overview — All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {sectionLabel('Default size')}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
          <Tag size="default">Tag</Tag>
          <Tag size="default" icon={<Hash />}>With icon</Tag>
          <Tag size="default" onRemove={() => {}}>Removable</Tag>
          <Tag size="default" icon={<Hash />} onRemove={() => {}}>Icon + Remove</Tag>
          <Tag size="default" onClick={() => {}}>Clickable</Tag>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {sectionLabel('Large size')}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
          <Tag size="large">Tag</Tag>
          <Tag size="large" icon={<Hash />}>With icon</Tag>
          <Tag size="large" onRemove={() => {}}>Removable</Tag>
          <Tag size="large" icon={<Hash />} onRemove={() => {}}>Icon + Remove</Tag>
          <Tag size="large" onClick={() => {}}>Clickable</Tag>
        </div>
      </div>
    </div>
  ),
};

function RemovableExample() {
  const [tags, setTags] = useState(['Finance', 'Security', 'Technology', 'Operations']);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {sectionLabel('Interactive — click × to remove')}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {tags.map((t) => (
          <Tag key={t} size="default" onRemove={() => setTags((prev) => prev.filter((x) => x !== t))}>
            {t}
          </Tag>
        ))}
        {tags.length === 0 && (
          <span style={{ fontSize: 12, color: '#9ca3af', fontFamily: 'Roboto, sans-serif' }}>All tags removed</span>
        )}
      </div>
    </div>
  );
}

export const Removable: Story = {
  name: 'Removable Tags',
  render: () => <RemovableExample />,
};
