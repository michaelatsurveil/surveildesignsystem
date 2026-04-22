import type { Meta, StoryObj } from '@storybook/react';
import { X } from 'lucide-react';
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

/** Inline shell — renders modal__content without the fixed backdrop so it's fully visible in the docs canvas */
function ModalShell({ size, label }: { size: 'sm' | 'md' | 'lg'; label: string }) {
  const widths = { sm: 366, md: 525, lg: 768 };
  return (
    <div>
      <div style={{ marginBottom: 10, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af', fontFamily: 'Roboto, sans-serif' }}>
        {label}
      </div>
      <div className={`modal__content modal__content--${size}`} style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.12)', maxWidth: '100%', width: widths[size] }}>
        <header className="modal__header">
          <h2 className="modal__title">Modal Title</h2>
          <button type="button" className="modal__close" aria-label="Close">
            <X size={20} strokeWidth={2} />
          </button>
        </header>
        <div className="modal__body">
          <p style={{ margin: 0 }}>
            This is a <strong>{size}</strong> modal. Use modals for forms, confirmations, or supplementary content that requires user attention.
          </p>
        </div>
        <footer className="modal__footer">
          <Button variant="secondary" size="sm">Cancel</Button>
          <Button size="sm">Confirm</Button>
        </footer>
      </div>
    </div>
  );
}

export const Default: Story = {
  name: 'Overview — All Sizes',
  parameters: {
    docs: {
      description: {
        story: 'All three modal sizes rendered inline. In production the modal renders as a fixed overlay with a backdrop.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <ModalShell size="sm" label="Small — 366px" />
      <ModalShell size="md" label="Medium — 525px" />
      <ModalShell size="lg" label="Large — 768px" />
    </div>
  ),
};

