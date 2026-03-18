import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';

const meta: Meta<typeof Modal> = {
  title: 'Display/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=333-308',
    },
    docs: {
      description: {
        component:
          'A dialog box that appears on top of the main content to capture user attention. Used for forms, alerts, or additional information. [Figma →](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=333-308)',
      },
    },
  },
  argTypes: {
    size: {
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

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Title"
          footer={
            <>
              <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>
                Label
              </Button>
              <Button size="sm" onClick={() => setOpen(false)}>
                Label
              </Button>
            </>
          }
        >
          <p>Replace me with your content.</p>
        </Modal>
      </>
    );
  },
};

export const Small: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open small</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Title"
          size="sm"
          footer={
            <>
              <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={() => setOpen(false)}>
                Confirm
              </Button>
            </>
          }
        >
          <p>Small modal (366px wide).</p>
        </Modal>
      </>
    );
  },
};

export const Medium: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open medium</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Title"
          size="md"
          footer={
            <>
              <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={() => setOpen(false)}>
                Save
              </Button>
            </>
          }
        >
          <p>Medium modal (525px wide).</p>
        </Modal>
      </>
    );
  },
};

export const Large: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open large</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Title"
          size="lg"
          footer={
            <>
              <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </>
          }
        >
          <p>Large modal (768px wide).</p>
        </Modal>
      </>
    );
  },
};

export const AllSizes: Story = {
  render: () => {
    const [size, setSize] = useState<'sm' | 'md' | 'lg'>('sm');
    const [open, setOpen] = useState(false);
    return (
      <>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Button onClick={() => { setSize('sm'); setOpen(true); }}>Small</Button>
          <Button onClick={() => { setSize('md'); setOpen(true); }}>Medium</Button>
          <Button onClick={() => { setSize('lg'); setOpen(true); }}>Large</Button>
        </div>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Title"
          size={size}
          footer={
            <>
              <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>
                Label
              </Button>
              <Button size="sm" onClick={() => setOpen(false)}>
                Label
              </Button>
            </>
          }
        >
          <p>Replace me with your content.</p>
        </Modal>
      </>
    );
  },
};
