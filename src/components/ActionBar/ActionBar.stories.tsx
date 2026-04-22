import type { Meta, StoryObj } from '@storybook/react';
import { Archive, Tags, Bookmark, Clock, Send } from 'lucide-react';
import { ActionBar } from './ActionBar';

const meta: Meta<typeof ActionBar> = {
  title: 'Navigation/ActionBar',
  component: ActionBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=338-621',
    },
    docs: {
      description: {
        component:
          'Contextual action bar that appears when one or more items are selected. Composes Button. [Figma →](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=338-621)',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ActionBar>;

const defaultActions = [
  {
    label: 'Archive',
    icon: <Archive size={16} strokeWidth={2} color="currentColor" />,
    onClick: () => {},
  },
  {
    label: 'Smart Tags',
    icon: <Tags size={16} strokeWidth={2} color="currentColor" />,
    onClick: () => {},
  },
  {
    label: 'Mark for Review',
    icon: <Bookmark size={16} strokeWidth={2} color="currentColor" />,
    onClick: () => {},
  },
  {
    label: 'Snooze',
    icon: <Clock size={16} strokeWidth={2} color="currentColor" />,
    onClick: () => {},
  },
  {
    label: 'Send to Integration',
    icon: <Send size={16} strokeWidth={2} color="currentColor" />,
    variant: 'primary' as const,
    onClick: () => {},
  },
];

export const Default: Story = {
  name: 'Overview — All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af', fontFamily: 'Roboto, sans-serif' }}>1 item selected</p>
        <ActionBar selectedLabel="1 item selected" actions={defaultActions} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af', fontFamily: 'Roboto, sans-serif' }}>Multiple items selected</p>
        <ActionBar selectedLabel="3 items selected" actions={defaultActions} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af', fontFamily: 'Roboto, sans-serif' }}>No status label</p>
        <ActionBar actions={defaultActions} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af', fontFamily: 'Roboto, sans-serif' }}>Single action</p>
        <ActionBar selectedLabel="1 item selected" actions={[{ label: 'Send to Integration', icon: <Send size={16} strokeWidth={2} color="currentColor" />, variant: 'primary', onClick: () => {} }]} />
      </div>
    </div>
  ),
};

