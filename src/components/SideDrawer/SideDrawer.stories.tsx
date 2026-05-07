import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SideDrawer } from './SideDrawer';
import { Button } from '../Button/Button';
import { Tag } from '../Tag/Tag';
import { Input } from '../Input/Input';
import { Dropdown } from '../Dropdown/Dropdown';

const meta: Meta<typeof SideDrawer> = {
  title: 'Display/SideDrawer',
  component: SideDrawer,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=404-1255',
    },
    docs: {
      description: {
        component:
          'Side drawer slides in from the left or right with an overlay. Use for filters, settings, or supplementary content. [Figma →](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=404-1255)',
      },
    },
  },
  argTypes: {
    side: {
      control: 'radio',
      options: ['left', 'right'],
    },
    width: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    closeOnBackdropClick: {
      control: 'boolean',
    },
    closeOnEscape: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof SideDrawer>;

// ─── Shared layout helpers ─────────────────────────────────────────────────

const sectionTitleStyle: React.CSSProperties = {
  margin: 0,
  fontFamily: 'var(--font-family-body, Roboto, system-ui, sans-serif)',
  fontSize: 16,
  fontWeight: 'var(--font-weight-medium, 500)' as React.CSSProperties['fontWeight'],
  lineHeight: '24px',
  color: 'var(--color-grey-700, #272727)',
};

const fieldLabelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-family-body, Roboto, system-ui, sans-serif)',
  fontSize: 14,
  fontWeight: 'var(--font-weight-medium, 500)' as React.CSSProperties['fontWeight'],
  lineHeight: '16px',
  color: 'var(--color-grey-400, #818181)',
};

const fieldValueStyle: React.CSSProperties = {
  fontFamily: 'var(--font-family-body, Roboto, system-ui, sans-serif)',
  fontSize: 14,
  fontWeight: 'var(--font-weight-regular, 400)' as React.CSSProperties['fontWeight'],
  lineHeight: '16px',
  color: 'var(--color-grey, #616161)',
};

function DrawerSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--scale-250, 10px)' }}>
      <p style={sectionTitleStyle}>{title}</p>
      {children}
    </div>
  );
}

function DrawerField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--scale-100, 4px)' }}>
      <span style={fieldLabelStyle}>{label}</span>
      <span style={fieldValueStyle}>{children}</span>
    </div>
  );
}

// ─── Overview ─────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Overview',
  parameters: {
    docs: {
      description: {
        story:
          'Full-featured side drawer: heading + subtext, tab bar, scrollable body, and a footer action bar. The body scrolls while the header and footer stay pinned.',
      },
    },
  },
  render: function Overview() {
    const [open, setOpen] = useState(false);
    const [tab, setTab] = useState('details');
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open drawer</Button>
        <SideDrawer
          open={open}
          onClose={() => setOpen(false)}
          title="Drawer heading"
          subtext="Drawer subtext — supporting context or a short explanation."
          tabs={[
            { value: 'details', label: 'Details' },
            { value: 'settings', label: 'Settings' },
            { value: 'history', label: 'History' },
          ]}
          tabValue={tab}
          onTabChange={setTab}
          footer={
            <>
              <Button variant="secondary" size="md" onClick={() => setOpen(false)}>
                Action 4
              </Button>
              <Button variant="secondary" size="md" onClick={() => setOpen(false)}>
                Action 3
              </Button>
              <Button variant="secondary" size="md" onClick={() => setOpen(false)}>
                Action 2
              </Button>
              <Button size="md" onClick={() => setOpen(false)}>
                Action 1
              </Button>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p>
              Content for tab: <strong>{tab}</strong>. The content area stretches vertically and
              scrolls when necessary.
            </p>
            <p>
              Use this space for forms, tables, configuration panels, or any supplementary content.
              Keep related items grouped and maintain consistent spacing.
            </p>
            {Array.from({ length: 15 }, (_, i) => (
              <p key={i}>
                Paragraph {i + 3}. Long content demonstrates the scrollable body. The action bar
                stays fixed at the bottom while content scrolls.
              </p>
            ))}
          </div>
        </SideDrawer>
      </>
    );
  },
};

// ─── Page Format — Details Panel ──────────────────────────────────────────

export const DetailsPanel: Story = {
  name: 'Page Format — Details Panel',
  parameters: {
    docs: {
      description: {
        story:
          'Read-only record view. Organise data into named sections, each containing a two-column grid of label / value pairs. Use `Tag` for status or categorical values. This format is ideal for surfacing entity details without navigating away from the current page.',
      },
    },
  },
  render: function DetailsPanelStory() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>View details</Button>
        <SideDrawer
          open={open}
          onClose={() => setOpen(false)}
          title="Tenant Details"
          subtext="ITEXACT Limited"
          footer={
            <>
              <Button variant="secondary" size="md" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button size="md" onClick={() => setOpen(false)}>
                Save changes
              </Button>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--scale-1000, 40px)' }}>

            <DrawerSection title="General Information">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--scale-400, 16px)' }}>
                <DrawerField label="Tenant name">ITEXACT Limited</DrawerField>
                <DrawerField label="Type">M365</DrawerField>
                <DrawerField label="Status">
                  <Tag variant="success" size="sm">Active</Tag>
                </DrawerField>
                <DrawerField label="Source">Navigator</DrawerField>
              </div>
            </DrawerSection>

            <DrawerSection title="Account Details">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--scale-400, 16px)' }}>
                <DrawerField label="Owner">Jade Chau</DrawerField>
                <DrawerField label="Email">jade.chau@surveil.co</DrawerField>
                <DrawerField label="Created">12 Jan 2024</DrawerField>
                <DrawerField label="Review status">
                  <Tag variant="attention" size="sm">Pending review</Tag>
                </DrawerField>
              </div>
            </DrawerSection>

            <DrawerSection title="Notes">
              <p style={{ margin: 0, ...fieldValueStyle, lineHeight: '20px' }}>
                This tenant was onboarded as part of the Q1 2024 migration from the legacy platform.
                All user accounts have been successfully transferred and verified.
              </p>
            </DrawerSection>

          </div>
        </SideDrawer>
      </>
    );
  },
};

// ─── Page Format — Edit Form ───────────────────────────────────────────────

export const EditForm: Story = {
  name: 'Page Format — Edit Form',
  parameters: {
    docs: {
      description: {
        story:
          'Editable form layout. Group related fields under section titles using the `Input` and `Dropdown` components. The footer holds the primary save action and a secondary cancel. Use this format for create or edit workflows where the user needs to remain on the current page.',
      },
    },
  },
  render: function EditFormStory() {
    const [open, setOpen] = useState(false);
    const [tenantType, setTenantType] = useState('m365');
    const [source, setSource] = useState('navigator');
    return (
      <>
        <Button onClick={() => setOpen(true)}>Edit tenant</Button>
        <SideDrawer
          open={open}
          onClose={() => setOpen(false)}
          title="Edit Tenant"
          subtext="Make changes to the tenant configuration below."
          footer={
            <>
              <Button variant="secondary" size="md" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="secondary" size="md" onClick={() => setOpen(false)}>
                Reset
              </Button>
              <Button size="md" onClick={() => setOpen(false)}>
                Save changes
              </Button>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--scale-800, 32px)' }}>

            <DrawerSection title="General">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--scale-400, 16px)' }}>
                <Input
                  label="Tenant name"
                  defaultValue="ITEXACT Limited"
                  placeholder="Enter tenant name"
                />
                <Input
                  label="Domain"
                  defaultValue="itexact.com"
                  placeholder="e.g. company.com"
                  helperText="Used to match users automatically on sign-in."
                />
                <Dropdown
                  options={[
                    { label: 'M365', value: 'm365' },
                    { label: 'Google Workspace', value: 'google' },
                  ]}
                  value={tenantType}
                  onChange={setTenantType}
                  placeholder="Select type"
                />
                <Dropdown
                  options={[
                    { label: 'Navigator', value: 'navigator' },
                    { label: 'Direct', value: 'direct' },
                    { label: 'Partner', value: 'partner' },
                  ]}
                  value={source}
                  onChange={setSource}
                  placeholder="Select source"
                />
              </div>
            </DrawerSection>

            <DrawerSection title="Contact">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--scale-400, 16px)' }}>
                <Input
                  label="Owner name"
                  defaultValue="Jade Chau"
                  placeholder="Enter owner name"
                />
                <Input
                  label="Owner email"
                  type="email"
                  defaultValue="jade.chau@surveil.co"
                  placeholder="Enter owner email"
                />
              </div>
            </DrawerSection>

            <DrawerSection title="Notes">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--scale-100, 4px)' }}>
                <span style={fieldLabelStyle}>Notes</span>
                <textarea
                  rows={4}
                  defaultValue="This tenant was onboarded as part of the Q1 2024 migration from the legacy platform."
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '8px 12px',
                    fontFamily: 'var(--font-family-body, Roboto, system-ui, sans-serif)',
                    fontSize: 14,
                    lineHeight: '20px',
                    color: 'var(--color-grey-700, #272727)',
                    background: 'var(--color-white, #ffffff)',
                    border: '1px solid var(--color-border-dark, #dfdfdf)',
                    borderRadius: 'var(--radius-md, 4px)',
                    resize: 'vertical',
                    outline: 'none',
                  }}
                />
              </div>
            </DrawerSection>

          </div>
        </SideDrawer>
      </>
    );
  },
};
