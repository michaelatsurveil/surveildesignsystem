import type { Meta, StoryObj } from '@storybook/react';
import { AlertCircle } from 'lucide-react';
import { StatisticCard } from './StatisticCard';

const meta: Meta<typeof StatisticCard> = {
  title: 'Display/StatisticCard',
  component: StatisticCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=87-408',
    },
    docs: {
      description: {
        component:
          'Displays a primary statistic with title, value, optional comparison trend, supporting text, and footer actions. [Figma →](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=87-408)',
      },
    },
  },
  argTypes: {
    comparison: {
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof StatisticCard>;

export const Default: Story = {
  args: {
    title: 'Statistic Title',
    icon: <AlertCircle size={20} strokeWidth={2} color="currentColor" />,
    badge: 'Default',
    value: '£00,000.00',
    comparison: { trend: 'down', text: 'Statistic comparison' },
    supportingText: 'Supporting text',
    primaryAction: { label: 'Label' },
    secondaryAction: { label: 'Label' },
  },
};

export const TrendUp: Story = {
  args: {
    title: 'Revenue',
    value: '£12,450.00',
    comparison: { trend: 'up', text: '12% vs last month' },
    supportingText: 'Monthly recurring revenue.',
    primaryAction: { label: 'View report' },
    secondaryAction: { label: 'Export' },
  },
};

export const TrendDown: Story = {
  args: {
    title: 'Statistic Title',
    icon: <AlertCircle size={20} strokeWidth={2} color="currentColor" />,
    value: '£00,000.00',
    comparison: { trend: 'down', text: 'Statistic comparison' },
    supportingText: 'Supporting text',
    primaryAction: { label: 'Label' },
    secondaryAction: { label: 'Label' },
  },
};

export const TrendNeutral: Story = {
  args: {
    title: 'Active users',
    value: '1,234',
    comparison: { trend: 'neutral', text: 'No change' },
    supportingText: 'Compared to previous period.',
  },
};

export const Minimal: Story = {
  args: {
    title: 'Total orders',
    value: '42',
    supportingText: 'Last 30 days.',
  },
};
