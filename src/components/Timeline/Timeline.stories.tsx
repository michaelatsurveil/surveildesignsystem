import type { Meta, StoryObj } from '@storybook/react';
import { Timeline } from './Timeline';

const meta: Meta<typeof Timeline> = {
  title: 'Display/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A vertical log of sequential steps or events. Each item carries a status label, a bold header, an optional date, and an optional description whose colour signals the outcome: positive (green), negative (red), neutral or default (grey).',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Timeline>;

const label = (text: string) => (
  <p
    style={{
      margin: '0 0 8px',
      fontSize: 11,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      color: '#9ca3af',
      fontFamily: 'Roboto, sans-serif',
    }}
  >
    {text}
  </p>
);

/* ─── Overview — all variants ─────────────────────────────────────────────── */

export const Default: Story = {
  name: 'Overview — All Variants',
  render: () => (
    <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div style={{ minWidth: 280 }}>
        {label('Default')}
        <Timeline
          items={[
            {
              variant: 'default',
              status: 'Now',
              header: 'Remove 3 licences',
              description: 'Available to assign to other users immediately',
              showConnector: false,
            },
          ]}
        />
      </div>

      <div style={{ minWidth: 280 }}>
        {label('Positive')}
        <Timeline
          items={[
            {
              variant: 'positive',
              status: 'At renewal',
              header: 'Renew with 3 fewer licences',
              date: '24 Jun 2026',
              description: '£120 / Month saved',
              showConnector: false,
            },
          ]}
        />
      </div>

      <div style={{ minWidth: 280 }}>
        {label('Negative')}
        <Timeline
          items={[
            {
              variant: 'negative',
              status: 'At renewal',
              header: 'Renew with 2 extra licences',
              date: '24 Jun 2026',
              description: '£41 / Month Added',
              showConnector: false,
            },
          ]}
        />
      </div>

      <div style={{ minWidth: 280 }}>
        {label('Neutral')}
        <Timeline
          items={[
            {
              variant: 'neutral',
              status: 'At renewal',
              header: 'Renew with 3 fewer licences',
              date: '24 Jun 2026',
              description: '£130 Estimated Month Saved',
              showConnector: false,
            },
          ]}
        />
      </div>
    </div>
  ),
};

/* ─── Default ─────────────────────────────────────────────────────────────── */

export const DefaultVariant: Story = {
  name: 'Default',
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <Timeline
        items={[
          {
            variant: 'default',
            status: 'Now',
            header: 'Remove 3 licences',
            description: 'Available to assign to other users immediately',
          },
          {
            variant: 'default',
            status: 'At renewal',
            header: 'Renew with 3 fewer licences',
            date: '24 Jun 2026',
            showConnector: false,
          },
        ]}
      />
    </div>
  ),
};

/* ─── Positive ────────────────────────────────────────────────────────────── */

export const Positive: Story = {
  name: 'Positive',
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <Timeline
        items={[
          {
            variant: 'default',
            status: 'Now',
            header: 'Remove 3 licences',
            description: 'Available to assign to other users immediately',
          },
          {
            variant: 'positive',
            status: 'At renewal',
            header: 'Renew with 3 fewer licences',
            date: '24 Jun 2026',
            description: '£120 / Month saved',
            showConnector: false,
          },
        ]}
      />
    </div>
  ),
};

/* ─── Negative ────────────────────────────────────────────────────────────── */

export const Negative: Story = {
  name: 'Negative',
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <Timeline
        items={[
          {
            variant: 'default',
            status: 'Now',
            header: 'Remove 3 licences',
            description: 'Available to assign to other users immediately',
          },
          {
            variant: 'negative',
            status: 'At renewal',
            header: 'Renew with 2 extra licences',
            date: '24 Jun 2026',
            description: '£41 / Month Added',
            showConnector: false,
          },
        ]}
      />
    </div>
  ),
};

/* ─── Neutral ─────────────────────────────────────────────────────────────── */

export const Neutral: Story = {
  name: 'Neutral',
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <Timeline
        items={[
          {
            variant: 'default',
            status: 'Now',
            header: 'Remove 3 licences',
            description: 'Available to assign to other users immediately',
          },
          {
            variant: 'neutral',
            status: 'At renewal',
            header: 'Renew with 3 fewer licences',
            date: '24 Jun 2026',
            description: '£130 Estimated Month Saved',
            showConnector: false,
          },
        ]}
      />
    </div>
  ),
};
