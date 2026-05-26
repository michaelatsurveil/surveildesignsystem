import type { Meta, StoryObj } from '@storybook/react';
import { StatisticCard } from './StatisticCard';

const meta: Meta<typeof StatisticCard> = {
  title: 'Display/StatisticCard',
  component: StatisticCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=90-682',
    },
    docs: {
      description: {
        component:
          'Statistic card with three variants: **default** (large value + comparison), **stacked** (metric rows), and **progress** (linear bar). Each card has a header (title + badge + optional dropdown), a body section, and an action bar (supporting text + CTA link). [Figma →](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=90-682)',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'stacked', 'progress'],
    },
    comparison: { control: false },
    metrics: { control: false },
    progress: { control: false },
    headerDropdown: { control: false },
    labels: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof StatisticCard>;

const sectionLabel: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: '#9ca3af',
  fontFamily: 'Roboto, sans-serif',
  marginBottom: 12,
};

// ─── Default — Overview ───────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Overview — All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

      <div>
        <div style={sectionLabel}>Default (value + comparison)</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          <StatisticCard
            variant="default"
            title="Statistic Title"
            badge="Default"
            headerDropdown={{ label: 'Label' }}
            value="£00,000.00"
            comparison={{ trend: 'down', text: '-{N} (-{N}%)' }}
            comparisonContext="vs time period"
            supportingText="Supporting text that adds value or can be actioned"
            ctaLabel="CTA"
          />
          <StatisticCard
            variant="default"
            title="Monthly Revenue"
            badge="Live"
            headerDropdown={{ label: 'Annual' }}
            value="£12,450.00"
            comparison={{ trend: 'up', text: '+12% (+£1,340)' }}
            comparisonContext="vs last month"
            supportingText="Total monthly recurring revenue."
            ctaLabel="View report"
          />
          <StatisticCard
            variant="default"
            title="Active Users"
            badge="Weekly"
            value="892"
            comparison={{ trend: 'neutral', text: 'No change' }}
            comparisonContext="vs last week"
            supportingText="Active sessions this week."
            ctaLabel="View all"
          />
        </div>
      </div>

      <div>
        <div style={sectionLabel}>Stacked (metric rows)</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          <StatisticCard
            variant="stacked"
            title="Statistic Title"
            badge="Default"
            metrics={[
              { label: 'Metric Title', value: 'Metric Title', tag: { label: 'Success', variant: 'success' } },
              { label: 'Metric Title', value: 'Metric Title', tag: { label: 'Success', variant: 'success' } },
              { label: 'Metric Title', value: 'Metric Title', tag: { label: 'Success', variant: 'success' } },
            ]}
            supportingText="Supporting text that adds value or can be actioned"
            ctaLabel="CTA"
          />
          <StatisticCard
            variant="stacked"
            title="Licence Overview"
            badge="M365"
            metrics={[
              { label: 'Total licences', value: '1,200', tag: { label: 'Active', variant: 'success' } },
              { label: 'Assigned', value: '987', tag: { label: 'In use', variant: 'info' } },
              { label: 'Unassigned', value: '213', tag: { label: 'Available', variant: 'default' } },
            ]}
            supportingText="Licence utilisation across all tenants."
            ctaLabel="Manage"
          />
          <StatisticCard
            variant="stacked"
            title="Renewal Pipeline"
            badge="Q2"
            metrics={[
              { label: 'Due this month', value: '34', tag: { label: 'Urgent', variant: 'critical' } },
              { label: 'Due next month', value: '67', tag: { label: 'Upcoming', variant: 'attention' } },
            ]}
            supportingText="Renewals requiring action."
            ctaLabel="View pipeline"
          />
        </div>
      </div>

      <div>
        <div style={sectionLabel}>Progress bar</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          <StatisticCard
            variant="progress"
            title="Statistic Title"
            badge="Default"
            progress={{ value: 20, status: 'success' }}
            supportingText="Supporting text that adds value or can be actioned"
            ctaLabel="CTA"
          />
          <StatisticCard
            variant="progress"
            title="Storage Used"
            badge="Azure"
            progress={{ value: 65, status: 'warning', label: '65%' }}
            supportingText="650 GB of 1 TB used."
            ctaLabel="Manage storage"
          />
          <StatisticCard
            variant="progress"
            title="Compliance Score"
            badge="Live"
            progress={{ value: 92, status: 'success', label: '92%' }}
            supportingText="Above target threshold."
            ctaLabel="View details"
          />
        </div>
      </div>

    </div>
  ),
};

// ─── Default variant ──────────────────────────────────────────────────────────

export const DefaultVariant: Story = {
  name: 'Default — Value + Comparison',
  parameters: {
    docs: {
      description: {
        story:
          'The default variant shows a large value, a coloured stat comparison (arrow + text), optional grey context text, and an action bar with supporting text and a CTA link. The header supports an optional dropdown trigger.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
      <StatisticCard
        variant="default"
        title="Statistic Title"
        badge="Default"
        headerDropdown={{ label: 'Label' }}
        value="£00,000.00"
        comparison={{ trend: 'down', text: '-{N} (-{N}%)' }}
        comparisonContext="vs time period"
        supportingText="Supporting text that adds value or can be actioned"
        ctaLabel="CTA"
      />
      <StatisticCard
        variant="default"
        title="Revenue"
        badge="Annual"
        headerDropdown={{ label: 'Annual' }}
        value="£124,500.00"
        comparison={{ trend: 'up', text: '+18.4% (+£19,300)' }}
        comparisonContext="vs last year"
        supportingText="Total annual recurring revenue."
        ctaLabel="View report"
      />
      <StatisticCard
        variant="default"
        title="No comparison"
        badge="Live"
        value="4,892"
        supportingText="Total active devices."
        ctaLabel="Browse"
      />
    </div>
  ),
};

// ─── Stacked variant ──────────────────────────────────────────────────────────

export const StackedVariant: Story = {
  name: 'Stacked — Metric Rows',
  parameters: {
    docs: {
      description: {
        story:
          'The stacked variant lists metric rows. Each row has a small label above a bold value + Tag badge. Use for multi-dimension breakdowns within a single card.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
      <StatisticCard
        variant="stacked"
        title="Statistic Title"
        badge="Default"
        metrics={[
          { label: 'Metric Title', value: 'Metric Title', tag: { label: 'Success', variant: 'success' } },
          { label: 'Metric Title', value: 'Metric Title', tag: { label: 'Success', variant: 'success' } },
          { label: 'Metric Title', value: 'Metric Title', tag: { label: 'Success', variant: 'success' } },
        ]}
        supportingText="Supporting text that adds value or can be actioned"
        ctaLabel="CTA"
      />
      <StatisticCard
        variant="stacked"
        title="Tenants by Status"
        badge="Live"
        metrics={[
          { label: 'Active tenants', value: '142', tag: { label: 'Active', variant: 'success' } },
          { label: 'Pending onboard', value: '17', tag: { label: 'Pending', variant: 'attention' } },
          { label: 'Suspended', value: '3', tag: { label: 'Suspended', variant: 'critical' } },
        ]}
        supportingText="Tenant status across all regions."
        ctaLabel="View tenants"
      />
    </div>
  ),
};

// ─── Progress variant ─────────────────────────────────────────────────────────

export const ProgressVariant: Story = {
  name: 'Progress — Linear Bar',
  parameters: {
    docs: {
      description: {
        story:
          'The progress variant renders a full-width linear progress bar with a percentage label. Set `status` to `success` (green), `warning`, or `error` to change the bar colour.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
      <StatisticCard
        variant="progress"
        title="Statistic Title"
        badge="Default"
        progress={{ value: 20, status: 'success' }}
        supportingText="Supporting text that adds value or can be actioned"
        ctaLabel="CTA"
      />
      <StatisticCard
        variant="progress"
        title="Disk Utilisation"
        badge="Warning"
        progress={{ value: 78, status: 'warning', label: '78%' }}
        supportingText="Approaching capacity limit."
        ctaLabel="Manage"
      />
      <StatisticCard
        variant="progress"
        title="Policy Compliance"
        badge="Error"
        progress={{ value: 45, status: 'error', label: '45%' }}
        supportingText="Below required compliance threshold."
        ctaLabel="Remediate"
      />
    </div>
  ),
};

// ─── No action bar ────────────────────────────────────────────────────────────

export const NoActionBar: Story = {
  name: 'Without Action Bar',
  parameters: {
    docs: {
      description: {
        story: 'When neither `supportingText` nor `ctaLabel` is provided, the action bar is omitted and the card hugs its content.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
      <StatisticCard
        variant="default"
        title="Value only"
        value="£00,000.00"
      />
      <StatisticCard
        variant="default"
        title="With comparison"
        badge="Live"
        value="4,200"
        comparison={{ trend: 'up', text: '+5%' }}
        comparisonContext="vs last week"
      />
      <StatisticCard
        variant="progress"
        title="Compact progress"
        progress={{ value: 55 }}
      />
    </div>
  ),
};
