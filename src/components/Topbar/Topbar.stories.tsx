import type { Meta, StoryObj } from '@storybook/react';
import { Topbar } from './Topbar';

const meta: Meta<typeof Topbar> = {
  title: 'Navigation/Topbar',
  component: Topbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=1554-8129',
    },
    docs: {
      description: {
        component:
          'Frosted-glass topbar with breadcrumb navigation on the left and a search bar + quick-action icons on the right. [Figma →](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=1554-8129)',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Topbar>;

export const Default: Story = {
  args: {
    breadcrumbs: [
      { label: 'Default breadcrumb', href: '#' },
      { label: 'Active Breadcrumb', active: true },
    ],
    searchPlaceholder: 'Search…',
  },
};

export const SingleBreadcrumb: Story = {
  args: {
    breadcrumbs: [{ label: 'Dashboard', active: true }],
    searchPlaceholder: 'Search…',
  },
};

export const DeepBreadcrumb: Story = {
  args: {
    breadcrumbs: [
      { label: 'Home', href: '#' },
      { label: 'Microsoft 365', href: '#' },
      { label: 'Azure', href: '#' },
      { label: 'Resources', active: true },
    ],
    searchPlaceholder: 'Search resources…',
  },
};

export const NoBreadcrumb: Story = {
  args: {
    breadcrumbs: [],
    searchPlaceholder: 'Search…',
  },
};
