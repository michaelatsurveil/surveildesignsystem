import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SideDrawer } from './SideDrawer';
import { Button } from '../Button/Button';

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

export const Default: Story = {
  render: () => {
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
              <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>
                Action 4
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>
                Action 3
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>
                Action 2
              </Button>
              <Button size="sm" onClick={() => setOpen(false)}>
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
