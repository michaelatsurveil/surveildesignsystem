import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from './components/Logo';

const meta: Meta<typeof Logo> = {
  title: 'Foundations/Brand',
  component: Logo,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Surveil brand logo and usage guidelines. Use the light variant on light backgrounds and the dark variant on dark backgrounds.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['light', 'dark'],
    },
    height: {
      control: { type: 'number', min: 24, max: 96, step: 4 },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const Light: Story = {
  args: {
    variant: 'light',
    height: 40,
  },
  parameters: {
    backgrounds: { default: 'light' },
  },
};

export const Dark: Story = {
  args: {
    variant: 'dark',
    height: 40,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 24, background: '#131313', borderRadius: 8 }}>
        <Story />
      </div>
    ),
  ],
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
      <div>
        <Logo variant="light" height={24} />
        <div className="text-body-sm" style={{ marginTop: 4, color: '#616161' }}>
          24px
        </div>
      </div>
      <div>
        <Logo variant="light" height={32} />
        <div className="text-body-sm" style={{ marginTop: 4, color: '#616161' }}>
          32px
        </div>
      </div>
      <div>
        <Logo variant="light" height={40} />
        <div className="text-body-sm" style={{ marginTop: 4, color: '#616161' }}>
          40px
        </div>
      </div>
      <div>
        <Logo variant="light" height={48} />
        <div className="text-body-sm" style={{ marginTop: 4, color: '#616161' }}>
          48px
        </div>
      </div>
    </div>
  ),
};

export const LightBackground: Story = {
  render: () => (
    <div
      style={{
        padding: 48,
        background: '#ffffff',
        borderRadius: 8,
        border: '1px solid #efefef',
      }}
    >
      <Logo variant="light" height={40} />
    </div>
  ),
};

export const DarkBackground: Story = {
  render: () => (
    <div
      style={{
        padding: 48,
        background: '#131313',
        borderRadius: 8,
      }}
    >
      <Logo variant="dark" height={40} />
    </div>
  ),
};

export const Usage: Story = {
  render: () => (
    <div className="text-body-md" style={{ color: '#616161', maxWidth: 600 }}>
      <h3 className="text-h6" style={{ marginBottom: 16, color: '#131313' }}>
        Usage guidelines
      </h3>
      <ul style={{ marginBottom: 24, paddingLeft: 24 }}>
        <li style={{ marginBottom: 8 }}>
          <strong>Light variant:</strong> Use on white, light gray, or light-colored backgrounds
        </li>
        <li style={{ marginBottom: 8 }}>
          <strong>Dark variant:</strong> Use on dark gray (#131313) or black backgrounds
        </li>
        <li style={{ marginBottom: 8 }}>
          Maintain clear space around the logo—at least the height of the "S" on all sides
        </li>
        <li>Do not stretch, rotate, or alter the logo proportions</li>
      </ul>
      <h3 className="text-h6" style={{ marginBottom: 16, color: '#131313' }}>
        Implementation
      </h3>
      <pre
        style={{
          padding: 16,
          background: '#f7f7f7',
          borderRadius: 8,
          overflow: 'auto',
          fontSize: 13,
          fontFamily: 'monospace',
        }}
      >
        {`import { Logo } from '@/components/Logo';

// Light background (default)
<Logo variant="light" height={40} />

// Dark background
<Logo variant="dark" height={40} />`}
      </pre>
    </div>
  ),
};
