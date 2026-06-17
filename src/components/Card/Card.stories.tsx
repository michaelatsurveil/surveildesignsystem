import type { Meta, StoryObj } from '@storybook/react';
import { Package, Star } from 'lucide-react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Display/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=2283-10045',
    },
    docs: {
      description: {
        component:
          'Card container with five variants. **Default** — stacked tile with header, body, and optional footer buttons. **List** — compact navigational row with chevron. **List Toggle** — compact row with an icon toggle button. **List Action** — compact row with inline primary+secondary buttons. **Tile Toggle** — tile with toggle icon and badge+timestamp footer. [Figma →](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=2283-10045)',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'list', 'list-toggle', 'list-action', 'tile-toggle'],
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
const starIcon = <Star size={20} strokeWidth={1.5} color="currentColor" />;

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>

      {/* List — navigational */}
      <div>
        <div style={sectionLabel}>List — Navigational</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
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

      {/* List — toggle */}
      <div>
        <div style={sectionLabel}>List — Toggle</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Card variant="list-toggle" title="Card Header" status="Success" statusVariant="success" icon={icon} toggleIcon={starIcon}>
            Supporting text 1&nbsp;&nbsp;·&nbsp;&nbsp;Supporting text 2
          </Card>
          <Card variant="list-toggle" title="Card Header" status="Warning" statusVariant="warning" icon={icon} toggleIcon={starIcon}>
            Supporting text 1&nbsp;&nbsp;·&nbsp;&nbsp;Supporting text 2
          </Card>
        </div>
      </div>

      {/* List — action */}
      <div>
        <div style={sectionLabel}>List — Action</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Card
            variant="list-action"
            title="Card Header"
            status="Success"
            statusVariant="success"
            icon={icon}
            primaryAction={{ label: 'Label' }}
            secondaryAction={{ label: 'Label' }}
          >
            Borem ipsum dolor sit amet, consectetur adipiscing elit.
          </Card>
          <Card
            variant="list-action"
            title="Card Header"
            status="Info"
            statusVariant="info"
            icon={icon}
            primaryAction={{ label: 'Label' }}
          >
            Borem ipsum dolor sit amet, consectetur adipiscing elit.
          </Card>
        </div>
      </div>

      {/* Tile — default action (right) */}
      <div>
        <div style={sectionLabel}>Tile — Action (right buttons)</div>
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
            libero et velit interdum, ac aliquet odio mattis.
          </Card>
        </div>
      </div>

      {/* Tile — default action (left) */}
      <div>
        <div style={sectionLabel}>Tile — Action (left buttons)</div>
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
            libero et velit interdum, ac aliquet odio mattis.
          </Card>
        </div>
      </div>

      {/* Tile — toggle */}
      <div>
        <div style={sectionLabel}>Tile — Toggle</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <Card
            variant="tile-toggle"
            title="Card Header"
            status="Success"
            statusVariant="success"
            icon={icon}
            toggleIcon={starIcon}
            timestamp="10m ago"
          >
            Supporting text 1&nbsp;&nbsp;·&nbsp;&nbsp;Supporting text 2
          </Card>
          <Card
            variant="tile-toggle"
            title="Card Header"
            status="Warning"
            statusVariant="warning"
            icon={icon}
            toggleIcon={starIcon}
            timestamp="2h ago"
          >
            Supporting text 1&nbsp;&nbsp;·&nbsp;&nbsp;Supporting text 2
          </Card>
        </div>
      </div>

    </div>
  ),
};

// ─── List — Navigational ──────────────────────────────────────────────────────

export const ListNavigational: Story = {
  name: 'List — Navigational',
  parameters: {
    docs: {
      description: {
        story:
          'Compact navigational row. Title and status badge on the same line. Supporting sub-text below aligned with the title. Chevron on the right.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', width: 500 }}>
      <Card variant="list" title="Card Header" status="Success" statusVariant="success" icon={icon}>
        Supporting text 1&nbsp;&nbsp;·&nbsp;&nbsp;Supporting text 2
      </Card>
      <Card variant="list" title="Card Header" icon={icon}>
        Supporting text 1&nbsp;&nbsp;·&nbsp;&nbsp;Supporting text 2
      </Card>
      <Card variant="list" title="Card Header — no subtext" status="Info" statusVariant="info" icon={icon} />
      <Card variant="list" title="Interactive" status="Success" statusVariant="success" icon={icon} onClick={() => {}}>
        Clicking anywhere fires onClick
      </Card>
    </div>
  ),
};

// ─── List — Navigational States ───────────────────────────────────────────────

export const ListStates: Story = {
  name: 'List — Navigational States',
  parameters: {
    docs: {
      description: {
        story:
          'All five interactive states for the `list` variant matched 1:1 from Figma.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, width: 500 }}>
      <div style={sectionLabel}>Default</div>
      <Card variant="list" title="Card Header" status="Success" statusVariant="success" icon={icon} onClick={() => {}}>
        Supporting text 1&nbsp;&nbsp;·&nbsp;&nbsp;Supporting text 2
      </Card>

      <div style={{ ...sectionLabel, marginTop: 24 }}>Hover</div>
      <Card variant="list" title="Card Header" status="Success" statusVariant="success" icon={icon} onClick={() => {}} className="card--state-hover">
        Supporting text 1&nbsp;&nbsp;·&nbsp;&nbsp;Supporting text 2
      </Card>

      <div style={{ ...sectionLabel, marginTop: 24 }}>Pressed</div>
      <Card variant="list" title="Card Header" status="Success" statusVariant="success" icon={icon} onClick={() => {}} className="card--state-pressed">
        Supporting text 1&nbsp;&nbsp;·&nbsp;&nbsp;Supporting text 2
      </Card>

      <div style={{ ...sectionLabel, marginTop: 24 }}>Focus</div>
      <Card variant="list" title="Card Header" status="Success" statusVariant="success" icon={icon} onClick={() => {}} className="card--state-focus">
        Supporting text 1&nbsp;&nbsp;·&nbsp;&nbsp;Supporting text 2
      </Card>

      <div style={{ ...sectionLabel, marginTop: 24 }}>Disabled</div>
      <Card variant="list" title="Card Header" status="Success" statusVariant="success" icon={icon} disabled>
        Supporting text 1&nbsp;&nbsp;·&nbsp;&nbsp;Supporting text 2
      </Card>
    </div>
  ),
};

// ─── List — Toggle ────────────────────────────────────────────────────────────

export const ListToggle: Story = {
  name: 'List — Toggle',
  parameters: {
    docs: {
      description: {
        story:
          'Same layout as the navigational list but with an icon toggle button on the right instead of a chevron. Pass any icon via `toggleIcon` and a handler via `onToggle`.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', width: 500 }}>
      <Card variant="list-toggle" title="Card Header" status="Success" statusVariant="success" icon={icon} toggleIcon={starIcon}>
        Supporting text 1&nbsp;&nbsp;·&nbsp;&nbsp;Supporting text 2
      </Card>
      <Card variant="list-toggle" title="Card Header" status="Warning" statusVariant="warning" icon={icon} toggleIcon={starIcon}>
        Supporting text 1&nbsp;&nbsp;·&nbsp;&nbsp;Supporting text 2
      </Card>
      <Card variant="list-toggle" title="Card Header — no subtext" icon={icon} toggleIcon={starIcon} />
      <Card variant="list-toggle" title="Interactive" status="Info" statusVariant="info" icon={icon} toggleIcon={starIcon} onClick={() => {}}>
        Clicking card fires onClick; toggle button fires onToggle
      </Card>
    </div>
  ),
};

// ─── List — Toggle States ─────────────────────────────────────────────────────

export const ListToggleStates: Story = {
  name: 'List — Toggle States',
  parameters: {
    docs: {
      description: {
        story: 'All five interactive states for the `list-toggle` variant.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, width: 500 }}>
      <div style={sectionLabel}>Default</div>
      <Card variant="list-toggle" title="Card Header" status="Success" statusVariant="success" icon={icon} toggleIcon={starIcon} onClick={() => {}}>
        Supporting text 1&nbsp;&nbsp;·&nbsp;&nbsp;Supporting text 2
      </Card>

      <div style={{ ...sectionLabel, marginTop: 24 }}>Hover</div>
      <Card variant="list-toggle" title="Card Header" status="Success" statusVariant="success" icon={icon} toggleIcon={starIcon} onClick={() => {}} className="card--state-hover">
        Supporting text 1&nbsp;&nbsp;·&nbsp;&nbsp;Supporting text 2
      </Card>

      <div style={{ ...sectionLabel, marginTop: 24 }}>Pressed</div>
      <Card variant="list-toggle" title="Card Header" status="Success" statusVariant="success" icon={icon} toggleIcon={starIcon} onClick={() => {}} className="card--state-pressed">
        Supporting text 1&nbsp;&nbsp;·&nbsp;&nbsp;Supporting text 2
      </Card>

      <div style={{ ...sectionLabel, marginTop: 24 }}>Focus</div>
      <Card variant="list-toggle" title="Card Header" status="Success" statusVariant="success" icon={icon} toggleIcon={starIcon} onClick={() => {}} className="card--state-focus">
        Supporting text 1&nbsp;&nbsp;·&nbsp;&nbsp;Supporting text 2
      </Card>

      <div style={{ ...sectionLabel, marginTop: 24 }}>Disabled</div>
      <Card variant="list-toggle" title="Card Header" status="Success" statusVariant="success" icon={icon} toggleIcon={starIcon} disabled>
        Supporting text 1&nbsp;&nbsp;·&nbsp;&nbsp;Supporting text 2
      </Card>
    </div>
  ),
};

// ─── List — Action ────────────────────────────────────────────────────────────

export const ListAction: Story = {
  name: 'List — Action',
  parameters: {
    docs: {
      description: {
        story:
          'Compact row with icon + title + badge + subtext on the left, and a secondary+primary button pair on the right. Sub-text truncates with ellipsis.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', width: 500 }}>
      <Card
        variant="list-action"
        title="Card Header"
        status="Success"
        statusVariant="success"
        icon={icon}
        primaryAction={{ label: 'Label' }}
        secondaryAction={{ label: 'Label' }}
      >
        Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum.
      </Card>
      <Card
        variant="list-action"
        title="Card Header"
        status="Warning"
        statusVariant="warning"
        icon={icon}
        primaryAction={{ label: 'Label' }}
        secondaryAction={{ label: 'Label' }}
      >
        Borem ipsum dolor sit amet, consectetur adipiscing elit.
      </Card>
      <Card
        variant="list-action"
        title="Card Header — primary only"
        icon={icon}
        primaryAction={{ label: 'Label' }}
      >
        Supporting text for the card.
      </Card>
    </div>
  ),
};

// ─── List — Action States ─────────────────────────────────────────────────────

export const ListActionStates: Story = {
  name: 'List — Action States',
  parameters: {
    docs: {
      description: {
        story: 'All five interactive states for the `list-action` variant.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, width: 500 }}>
      <div style={sectionLabel}>Default</div>
      <Card variant="list-action" title="Card Header" status="Success" statusVariant="success" icon={icon} primaryAction={{ label: 'Label' }} secondaryAction={{ label: 'Label' }} onClick={() => {}}>
        Borem ipsum dolor sit amet, consectetur adipiscing elit.
      </Card>

      <div style={{ ...sectionLabel, marginTop: 24 }}>Hover</div>
      <Card variant="list-action" title="Card Header" status="Success" statusVariant="success" icon={icon} primaryAction={{ label: 'Label' }} secondaryAction={{ label: 'Label' }} onClick={() => {}} className="card--state-hover">
        Borem ipsum dolor sit amet, consectetur adipiscing elit.
      </Card>

      <div style={{ ...sectionLabel, marginTop: 24 }}>Pressed</div>
      <Card variant="list-action" title="Card Header" status="Success" statusVariant="success" icon={icon} primaryAction={{ label: 'Label' }} secondaryAction={{ label: 'Label' }} onClick={() => {}} className="card--state-pressed">
        Borem ipsum dolor sit amet, consectetur adipiscing elit.
      </Card>

      <div style={{ ...sectionLabel, marginTop: 24 }}>Focus</div>
      <Card variant="list-action" title="Card Header" status="Success" statusVariant="success" icon={icon} primaryAction={{ label: 'Label' }} secondaryAction={{ label: 'Label' }} onClick={() => {}} className="card--state-focus">
        Borem ipsum dolor sit amet, consectetur adipiscing elit.
      </Card>

      <div style={{ ...sectionLabel, marginTop: 24 }}>Disabled</div>
      <Card variant="list-action" title="Card Header" status="Success" statusVariant="success" icon={icon} primaryAction={{ label: 'Label' }} secondaryAction={{ label: 'Label' }} disabled>
        Borem ipsum dolor sit amet, consectetur adipiscing elit.
      </Card>
    </div>
  ),
};

// ─── Tile — Action ────────────────────────────────────────────────────────────

export const TileAction: Story = {
  name: 'Tile — Action',
  parameters: {
    docs: {
      description: {
        story:
          'Stacked tile with icon header, body text, and a footer with primary + secondary buttons. Use `footerAlign` to position buttons on the right or left.',
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

// ─── Tile — Toggle ────────────────────────────────────────────────────────────

export const TileToggle: Story = {
  name: 'Tile — Toggle',
  parameters: {
    docs: {
      description: {
        story:
          'Tile card with a toggle icon button in the top-right, title + supporting text, and a badge + timestamp in the footer. 350px wide by default. Uses a border instead of a shadow.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      <Card
        variant="tile-toggle"
        title="Card Header"
        status="Success"
        statusVariant="success"
        icon={icon}
        toggleIcon={starIcon}
        timestamp="10m ago"
      >
        Supporting text 1&nbsp;&nbsp;·&nbsp;&nbsp;Supporting text 2
      </Card>
      <Card
        variant="tile-toggle"
        title="Card Header"
        status="Warning"
        statusVariant="warning"
        icon={icon}
        toggleIcon={starIcon}
        timestamp="2h ago"
      >
        Supporting text 1&nbsp;&nbsp;·&nbsp;&nbsp;Supporting text 2
      </Card>
      <Card
        variant="tile-toggle"
        title="Card Header"
        status="Error"
        statusVariant="error"
        icon={icon}
        toggleIcon={starIcon}
        timestamp="1d ago"
      >
        Supporting text 1&nbsp;&nbsp;·&nbsp;&nbsp;Supporting text 2
      </Card>
      <Card
        variant="tile-toggle"
        title="No badge or timestamp"
        icon={icon}
        toggleIcon={starIcon}
      >
        Supporting text 1&nbsp;&nbsp;·&nbsp;&nbsp;Supporting text 2
      </Card>
    </div>
  ),
};

// ─── Default — Status badge variants ─────────────────────────────────────────

export const Minimal: Story = {
  name: 'Tile — Minimal',
  parameters: {
    docs: {
      description: { story: 'Tile card with no icon, status badge, or footer actions.' },
    },
  },
  args: {
    title: 'Minimal Card',
    children: 'Body text with no icon, no status badge, and no footer buttons.',
  },
};
