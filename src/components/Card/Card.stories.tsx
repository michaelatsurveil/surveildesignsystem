import type { Meta, StoryObj } from '@storybook/react';
import { Package } from 'lucide-react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Display/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=320-5290',
    },
    docs: {
      description: {
        component:
          'Card container with two variants. **Default** — icon, title, status badge (below title), body text, and optional footer buttons. **List** — compact single-row item: title + badge inline, supporting sub-text aligned with the title, chevron on the right. [Figma →](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=320-5290)',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'list'],
    },
    statusVariant: {
      control: 'radio',
      options: ['default', 'success', 'error', 'warning', 'info'],
    },
    footerAlign: {
      control: 'radio',
      options: ['left', 'right'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

const icon = <Package size={24} strokeWidth={1.5} color="currentColor" />;

const sectionLabel: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: '#9ca3af',
  fontFamily: 'Roboto, sans-serif',
  marginBottom: 12,
};

// ─── Overview ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Overview — All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

      {/* List variant */}
      <div>
        <div style={sectionLabel}>List — compact row</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Card variant="list" title="Card Header" status="Success" statusVariant="success" icon={icon}>
            Supporting text 1&nbsp;&nbsp;·&nbsp;&nbsp;Supporting text 2
          </Card>
          <Card variant="list" title="Card Header" status="Warning" statusVariant="warning" icon={icon}>
            Supporting text 1&nbsp;&nbsp;·&nbsp;&nbsp;Supporting text 2
          </Card>
          <Card variant="list" title="Card Header" status="Error" statusVariant="error" icon={icon}>
            Supporting text 1&nbsp;&nbsp;·&nbsp;&nbsp;Supporting text 2
          </Card>
        </div>
      </div>

      {/* Default variant — buttons right */}
      <div>
        <div style={sectionLabel}>Default — buttons right</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <Card
            title="Card Header"
            status="Success"
            statusVariant="success"
            icon={icon}
            primaryAction={{ label: 'Label' }}
            secondaryAction={{ label: 'Label' }}
            footerAlign="right"
          >
            Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
            libero et velit interdum, ac aliquet odio mattis. Class aptent taciti
            sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
          </Card>
        </div>
      </div>

      {/* Default variant — buttons left */}
      <div>
        <div style={sectionLabel}>Default — buttons left</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <Card
            title="Card Header"
            status="Success"
            statusVariant="success"
            icon={icon}
            primaryAction={{ label: 'Label' }}
            secondaryAction={{ label: 'Label' }}
            footerAlign="left"
          >
            Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
            libero et velit interdum, ac aliquet odio mattis. Class aptent taciti
            sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
          </Card>
        </div>
      </div>

      {/* Status variants */}
      <div>
        <div style={sectionLabel}>Default — status badge variants</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          {(['default', 'success', 'error', 'warning', 'info'] as const).map(v => (
            <Card key={v} title="Card Header" status={v.charAt(0).toUpperCase() + v.slice(1)} statusVariant={v} icon={icon}>
              Card body text.
            </Card>
          ))}
        </div>
      </div>

    </div>
  ),
};

// ─── List variant — States ────────────────────────────────────────────────────

export const ListStates: Story = {
  name: 'List — States',
  parameters: {
    docs: {
      description: {
        story:
          'All five interactive states for the `list` variant, matched 1:1 from Figma. **Default** — white bg, grey-50 bottom border. **Hover** — grey-50 fill. **Pressed** — grey-25 fill (`:active`). **Focus** — white bg, 2px primary-600 full border. **Disabled** — grey-100 fill, muted text, `pointer-events: none`.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, width: 500 }}>

      {/* Default */}
      <div style={sectionLabel}>Default</div>
      <Card variant="list" title="Card Header" status="Success" statusVariant="success" icon={icon} onClick={() => {}}>
        Supporting text 1&nbsp;&nbsp;·&nbsp;&nbsp;Supporting text 2
      </Card>

      {/* Hover */}
      <div style={{ ...sectionLabel, marginTop: 24 }}>Hover</div>
      <Card variant="list" title="Card Header" status="Success" statusVariant="success" icon={icon} onClick={() => {}} className="card--state-hover">
        Supporting text 1&nbsp;&nbsp;·&nbsp;&nbsp;Supporting text 2
      </Card>

      {/* Pressed */}
      <div style={{ ...sectionLabel, marginTop: 24 }}>Pressed</div>
      <Card variant="list" title="Card Header" status="Success" statusVariant="success" icon={icon} onClick={() => {}} className="card--state-pressed">
        Supporting text 1&nbsp;&nbsp;·&nbsp;&nbsp;Supporting text 2
      </Card>

      {/* Focus */}
      <div style={{ ...sectionLabel, marginTop: 24 }}>Focus</div>
      <Card variant="list" title="Card Header" status="Success" statusVariant="success" icon={icon} onClick={() => {}} className="card--state-focus">
        Supporting text 1&nbsp;&nbsp;·&nbsp;&nbsp;Supporting text 2
      </Card>

      {/* Disabled */}
      <div style={{ ...sectionLabel, marginTop: 24 }}>Disabled</div>
      <Card variant="list" title="Card Header" status="Success" statusVariant="success" icon={icon} disabled>
        Supporting text 1&nbsp;&nbsp;·&nbsp;&nbsp;Supporting text 2
      </Card>

    </div>
  ),
};

// ─── List variant ─────────────────────────────────────────────────────────────

export const ListVariant: Story = {
  name: 'List — Compact Row',
  parameters: {
    docs: {
      description: {
        story:
          'The `list` variant renders a compact single-row item. The title and status badge are on the **same horizontal line**. Supporting sub-text appears below, indented to align with the title (not the icon). A chevron appears on the right edge.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Card variant="list" title="Card Header" status="Success" statusVariant="success" icon={icon}>
        Supporting text 1&nbsp;&nbsp;·&nbsp;&nbsp;Supporting text 2
      </Card>
      <Card variant="list" title="Card Header" icon={icon}>
        Supporting text 1&nbsp;&nbsp;·&nbsp;&nbsp;Supporting text 2
      </Card>
      <Card variant="list" title="Card Header — no subtext" status="Info" statusVariant="info" icon={icon} />
      <Card variant="list" title="Interactive list item" status="Success" statusVariant="success" icon={icon} onClick={() => {}}>
        Clicking anywhere on this card fires the onClick handler
      </Card>
    </div>
  ),
};

// ─── Default variant ──────────────────────────────────────────────────────────

export const DefaultVariant: Story = {
  name: 'Default — With Footer Buttons',
  parameters: {
    docs: {
      description: {
        story:
          'The `default` variant has a stacked header (icon on the left; title and badge stacked vertically to its right), body text, and an optional footer with primary and secondary buttons. Use `footerAlign` to position buttons on the left or right.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      <Card
        title="Card Header"
        status="Success"
        statusVariant="success"
        icon={icon}
        primaryAction={{ label: 'Label' }}
        secondaryAction={{ label: 'Label' }}
        footerAlign="right"
      >
        Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
        libero et velit interdum, ac aliquet odio mattis. Class aptent taciti
        sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
      </Card>
      <Card
        title="Card Header"
        status="Success"
        statusVariant="success"
        icon={icon}
        primaryAction={{ label: 'Label' }}
        secondaryAction={{ label: 'Label' }}
        footerAlign="left"
      >
        Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
        libero et velit interdum, ac aliquet odio mattis. Class aptent taciti
        sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
      </Card>
    </div>
  ),
};

// ─── No icon / no status ──────────────────────────────────────────────────────

export const Minimal: Story = {
  name: 'Default — Minimal',
  parameters: {
    docs: {
      description: { story: 'Card with no icon, status badge, or footer actions.' },
    },
  },
  args: {
    title: 'Minimal Card',
    children: 'Body text with no icon, no status badge, and no footer buttons.',
  },
};
