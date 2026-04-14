import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Tabs let users switch between different views or sections. Supports optional icons and dropdown indicators.',
      },
    },
  },
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

const tabOptions = [
  { value: 'overview', label: 'Overview' },
  { value: 'details', label: 'Details' },
  { value: 'settings', label: 'Settings' },
];

const tabOptionsWithDropdown = [
  { value: 'tab1', label: 'Tab', dropdown: true },
  { value: 'tab2', label: 'Tab 2', dropdown: true },
  { value: 'tab3', label: 'Tab 3' },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('overview');
    return (
      <Tabs options={tabOptions} value={value} onChange={setValue} />
    );
  },
};

export const WithDropdown: Story = {
  render: () => {
    const [value, setValue] = useState('tab1');
    return (
      <Tabs options={tabOptionsWithDropdown} value={value} onChange={setValue} />
    );
  },
};

export const Pressed: Story = {
  args: {
    options: tabOptions,
    value: 'overview',
    onChange: () => {},
  },
  play: async ({ canvasElement }) => {
    const tabs = within(canvasElement).getAllByRole('tab');
    await userEvent.pointer({ target: tabs[1], keys: '[MouseLeft>]' });
  },
};

export const Disabled: Story = {
  args: {
    options: tabOptions,
    value: 'details',
    onChange: () => {},
    disabled: true,
  },
};
