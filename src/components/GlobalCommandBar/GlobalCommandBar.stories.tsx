import type { Meta, StoryObj } from '@storybook/react';
import { GlobalCommandBar } from './GlobalCommandBar';

const meta: Meta<typeof GlobalCommandBar> = {
  title: 'Navigation/Global Command Bar',
  component: GlobalCommandBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Title bar present on every screen. Left side: optional back (←) button + required title. Right side: optional secondary action, primary action, and table-editor icon button — each only rendered when applicable.',
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    onBack: { control: false },
    onTableEditor: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof GlobalCommandBar>;

export const TitleOnly: Story = {
  name: 'Title only',
  args: {
    title: 'Title',
  },
};

export const WithBack: Story = {
  name: 'With back button',
  args: {
    title: 'Title',
    onBack: () => {},
  },
};

export const WithActions: Story = {
  name: 'With actions',
  args: {
    title: 'Title',
    onBack: () => {},
    secondaryAction: { label: 'Action 2' },
    primaryAction: { label: 'Action 1' },
    onTableEditor: () => {},
  },
};

export const ActionsNoBack: Story = {
  name: 'Actions — no back button',
  args: {
    title: 'Title',
    secondaryAction: { label: 'Action 2' },
    primaryAction: { label: 'Action 1' },
    onTableEditor: () => {},
  },
};

export const PrimaryOnly: Story = {
  name: 'Primary action only',
  args: {
    title: 'Title',
    onBack: () => {},
    primaryAction: { label: 'Save' },
  },
};

export const TableEditorOnly: Story = {
  name: 'Table editor only',
  args: {
    title: 'Title',
    onTableEditor: () => {},
  },
};
