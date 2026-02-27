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
  args: {
    selectedLabel: '1 item selected',
    actions: defaultActions,
  },
};

export const MultipleSelected: Story = {
  args: {
    selectedLabel: '3 items selected',
    actions: defaultActions,
  },
};

export const NoStatusText: Story = {
  args: {
    actions: defaultActions,
  },
};

export const SingleAction: Story = {
  args: {
    selectedLabel: '1 item selected',
    actions: [
      {
        label: 'Send to Integration',
        icon: <Send size={16} strokeWidth={2} color="currentColor" />,
        variant: 'primary',
        onClick: () => {},
      },
    ],
  },
};
