import type { Meta, StoryObj } from '@storybook/react';
import { Topbar } from './Topbar';

const meta: Meta<typeof Topbar> = {
  title: 'Navigation/Topbar',
  component: Topbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=1554-8129',
    },
    docs: {
      description: {
        component:
          'Frosted-glass topbar with breadcrumb navigation on the left and a search bar + quick-action icons on the right. [Figma →](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=1554-8129)',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Topbar>;

export const Default: Story = {
  name: 'Overview — All Variants',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'All Topbar breadcrumb configurations stacked: single item, two items, deep trail, and no breadcrumb.',
      },
    },
  },
  render: () => {
    const label = (text: string) => (
      <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af', fontFamily: 'Roboto, sans-serif' }}>
        {text}
      </p>
    );
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          {label('Single breadcrumb')}
          <Topbar breadcrumbs={[{ label: 'Dashboard' }]} searchPlaceholder="Search…" />
        </div>
        <div>
          {label('Two breadcrumbs')}
          <Topbar breadcrumbs={[{ label: 'Home', href: '#' }, { label: 'Platform Settings' }]} searchPlaceholder="Search…" />
        </div>
        <div>
          {label('Deep trail (4 levels)')}
          <Topbar
            breadcrumbs={[
              { label: 'Home', href: '#' },
              { label: 'Azure', href: '#' },
              { label: 'Resources', href: '#' },
              { label: 'Virtual Machines' },
            ]}
            searchPlaceholder="Search resources…"
          />
        </div>
        <div>
          {label('No breadcrumb')}
          <Topbar breadcrumbs={[]} searchPlaceholder="Search…" />
        </div>
      </div>
    );
  },
};

