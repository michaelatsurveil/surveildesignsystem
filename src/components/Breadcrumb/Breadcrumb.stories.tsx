import type { Meta, StoryObj } from '@storybook/react';
import { Home, Settings, Users } from 'lucide-react';
import { Breadcrumb } from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=469-1209',
    },
    docs: {
      description: {
        component:
          'Breadcrumb navigation shows the user\'s location in the app hierarchy. Sizes: Small (24px) / Large (28px). The last item is always treated as the active/current page. [Figma →](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=469-1209)',
      },
    },
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

/* ── Overview ──────────────────────────────────────────────────────────────── */

export const Default: Story = {
  name: 'Overview — All Sizes & Options',
  render: () => {
    const label = (text: string) => (
      <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af', fontFamily: 'Roboto, sans-serif' }}>{text}</p>
    );
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          {label('Small (default)')}
          <Breadcrumb size="sm" items={[{ label: 'Home', onClick: () => {} }, { label: 'Settings', onClick: () => {} }, { label: 'Profile' }]} />
        </div>
        <div>
          {label('Large')}
          <Breadcrumb size="lg" items={[{ label: 'Home', onClick: () => {} }, { label: 'Settings', onClick: () => {} }, { label: 'Profile' }]} />
        </div>
        <div>
          {label('With icons (small)')}
          <Breadcrumb size="sm" items={[{ label: 'Home', onClick: () => {}, icon: <Home size={12} strokeWidth={1.5} /> }, { label: 'Users', onClick: () => {}, icon: <Users size={12} strokeWidth={1.5} /> }, { label: 'Profile', icon: <Settings size={12} strokeWidth={1.5} /> }]} />
        </div>
        <div>
          {label('With icons (large)')}
          <Breadcrumb size="lg" items={[{ label: 'Home', onClick: () => {}, icon: <Home size={16} strokeWidth={1.5} /> }, { label: 'Users', onClick: () => {}, icon: <Users size={16} strokeWidth={1.5} /> }, { label: 'Profile', icon: <Settings size={16} strokeWidth={1.5} /> }]} />
        </div>
        <div>
          {label('Long trail (6 items)')}
          <Breadcrumb size="sm" items={[{ label: 'Home', onClick: () => {} }, { label: 'Organisation', onClick: () => {} }, { label: 'Department', onClick: () => {} }, { label: 'Team', onClick: () => {} }, { label: 'Documents', onClick: () => {} }, { label: 'Report.pdf' }]} />
        </div>
        <div>
          {label('With disabled item')}
          <Breadcrumb size="sm" items={[{ label: 'Home', onClick: () => {} }, { label: 'Restricted', onClick: () => {}, disabled: true }, { label: 'Profile' }]} />
        </div>
        <div>
          {label('Two items')}
          <Breadcrumb size="sm" items={[{ label: 'Home', onClick: () => {} }, { label: 'Dashboard' }]} />
        </div>
        <div>
          {label('Single item')}
          <Breadcrumb size="sm" items={[{ label: 'Dashboard' }]} />
        </div>
      </div>
    );
  },
};

