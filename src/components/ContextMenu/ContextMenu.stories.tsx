import { useState, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Settings, Trash2, Edit2, ExternalLink, Copy, LogOut, User } from 'lucide-react';
import { ContextMenu } from './ContextMenu';
import { Button } from '../Button/Button';

const meta: Meta<typeof ContextMenu> = {
  title: 'Display/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=299-827',
    },
    docs: {
      description: {
        component:
          'Context / dropdown menu. Each item supports an optional icon, avatar, checkbox, toggle, right-arrow, description, and divider. Figma atom: node 299-827. [Figma →](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=299-827)',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ContextMenu>;

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Text only',
  render: () => (
    <ContextMenu
      open
      items={[
        { label: 'View details' },
        { label: 'Edit' },
        { label: 'Duplicate' },
        { label: 'Delete', divider: false },
      ]}
    />
  ),
};

// ─── With Icons ───────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  name: 'With Icons',
  render: () => (
    <ContextMenu
      open
      items={[
        { label: 'Edit', icon: <Edit2 size={14} /> },
        { label: 'Open link', icon: <ExternalLink size={14} /> },
        { label: 'Copy', icon: <Copy size={14} />, divider: true },
        { label: 'Settings', icon: <Settings size={14} /> },
        { label: 'Delete', icon: <Trash2 size={14} /> },
      ]}
    />
  ),
};

// ─── With Descriptions ────────────────────────────────────────────────────────

export const WithDescriptions: Story = {
  name: 'With Descriptions',
  render: () => (
    <ContextMenu
      open
      items={[
        {
          label: 'Edit',
          icon: <Edit2 size={14} />,
          description: 'Modify this record',
        },
        {
          label: 'Settings',
          icon: <Settings size={14} />,
          description: 'Manage preferences',
          divider: true,
        },
        {
          label: 'Delete',
          icon: <Trash2 size={14} />,
          description: 'Permanently remove',
        },
      ]}
    />
  ),
};

// ─── With Avatars ─────────────────────────────────────────────────────────────

export const WithAvatars: Story = {
  name: 'With Avatars',
  render: () => (
    <ContextMenu
      open
      items={[
        { label: 'Jane Doe', avatarInitials: 'JD', description: 'Admin' },
        { label: 'Alex Brown', avatarInitials: 'AB', description: 'Editor' },
        { label: 'Maria Kim', avatarInitials: 'MK', description: 'Viewer' },
      ]}
    />
  ),
};

// ─── With Checkboxes ──────────────────────────────────────────────────────────

export const WithCheckboxes: Story = {
  name: 'With Checkboxes',
  render: () => {
    const [checked, setChecked] = useState<Record<string, boolean>>({
      active: true,
      pending: false,
      inactive: false,
    });

    return (
      <ContextMenu
        open
        items={[
          {
            label: 'Active',
            checkbox: true,
            checked: checked.active,
            onClick: () => setChecked((p) => ({ ...p, active: !p.active })),
          },
          {
            label: 'Pending',
            checkbox: true,
            checked: checked.pending,
            onClick: () => setChecked((p) => ({ ...p, pending: !p.pending })),
          },
          {
            label: 'Inactive',
            checkbox: true,
            checked: checked.inactive,
            onClick: () => setChecked((p) => ({ ...p, inactive: !p.inactive })),
          },
        ]}
      />
    );
  },
};

// ─── With Toggles ─────────────────────────────────────────────────────────────

export const WithToggles: Story = {
  name: 'With Toggles',
  render: () => {
    const [state, setState] = useState({ notifications: true, autoSync: false });

    return (
      <ContextMenu
        open
        items={[
          {
            label: 'Notifications',
            toggle: true,
            toggled: state.notifications,
            onClick: () => setState((p) => ({ ...p, notifications: !p.notifications })),
          },
          {
            label: 'Auto-sync',
            toggle: true,
            toggled: state.autoSync,
            onClick: () => setState((p) => ({ ...p, autoSync: !p.autoSync })),
          },
        ]}
      />
    );
  },
};

// ─── With Arrows (sub-menu) ───────────────────────────────────────────────────

export const WithArrows: Story = {
  name: 'With Arrows (Sub-menu)',
  render: () => (
    <ContextMenu
      open
      items={[
        { label: 'Account', icon: <User size={14} />, arrow: true },
        { label: 'Settings', icon: <Settings size={14} />, arrow: true, divider: true },
        { label: 'Sign out', icon: <LogOut size={14} /> },
      ]}
    />
  ),
};

// ─── With Disabled Items ──────────────────────────────────────────────────────

export const WithDisabledItems: Story = {
  name: 'With Disabled Items',
  render: () => (
    <ContextMenu
      open
      items={[
        { label: 'Edit', icon: <Edit2 size={14} /> },
        { label: 'Copy (unavailable)', icon: <Copy size={14} />, disabled: true },
        { label: 'Delete', icon: <Trash2 size={14} />, disabled: true, divider: true },
        { label: 'Settings', icon: <Settings size={14} /> },
      ]}
    />
  ),
};

// ─── With Dividers ────────────────────────────────────────────────────────────

export const WithDividers: Story = {
  name: 'With Dividers',
  render: () => (
    <ContextMenu
      open
      items={[
        { label: 'View profile', icon: <User size={14} /> },
        { label: 'Settings', icon: <Settings size={14} />, divider: true },
        { label: 'Copy link', icon: <Copy size={14} /> },
        { label: 'Open in new tab', icon: <ExternalLink size={14} />, divider: true },
        { label: 'Delete', icon: <Trash2 size={14} /> },
      ]}
    />
  ),
};

// ─── Triggered (interactive) ──────────────────────────────────────────────────

export const Triggered: Story = {
  name: 'Triggered — Button opens menu',
  render: () => {
    const [open, setOpen] = useState(false);
    const [lastAction, setLastAction] = useState<string | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    function handleAction(label: string) {
      setLastAction(label);
      setOpen(false);
    }

    return (
      <div ref={wrapperRef} style={{ display: 'inline-flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
        <Button
          size="md"
          variant="secondary"
          onClick={() => setOpen((v) => !v)}
        >
          Open menu
        </Button>
        {open && (
          <ContextMenu
            open
            items={[
              { label: 'Edit', icon: <Edit2 size={14} />, onClick: () => handleAction('Edit') },
              { label: 'Duplicate', icon: <Copy size={14} />, onClick: () => handleAction('Duplicate'), divider: true },
              { label: 'Delete', icon: <Trash2 size={14} />, onClick: () => handleAction('Delete') },
            ]}
          />
        )}
        {lastAction && (
          <span style={{ fontSize: 13, color: 'var(--color-grey-400, #818181)' }}>
            Last action: <strong>{lastAction}</strong>
          </span>
        )}
      </div>
    );
  },
};
