import { useState, useMemo } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CircleAlert, ShieldCheck, TriangleAlert, Info, Settings } from 'lucide-react';
import { Icon, IconByName, iconNames } from './Icon';
import type { IconBackground, IconColor } from './Icon';

const meta: Meta = {
  title: 'Foundations/Icons',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'All Lucide icons available in the Surveil design system. Search to find an icon, then copy its name for use with `IconByName` or import directly from `@/icons`.',
      },
    },
  },
};

export default meta;

const backgroundVariants: { background: IconBackground; color: IconColor; label: string; icon: React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }> }[] = [
  { background: 'default', color: 'default', label: 'Default',  icon: Settings      },
  { background: 'muted',   color: 'muted',   label: 'Muted',    icon: Settings      },
  { background: 'primary', color: 'primary', label: 'Primary',  icon: Info          },
  { background: 'success', color: 'success', label: 'Success',  icon: ShieldCheck   },
  { background: 'error',   color: 'error',   label: 'Error',    icon: CircleAlert   },
  { background: 'warning', color: 'warning', label: 'Warning',  icon: TriangleAlert },
];

export const BackgroundVariants: StoryObj = {
  name: 'Background Variants',
  parameters: {
    docs: {
      description: {
        story:
          'Pass `background` to wrap an icon in a padded container using the palette\'s tint color. ' +
          'The `background` prop accepts the same keys as `color` — pair them together for a consistent ' +
          'branded look (e.g. `background="primary" color="primary"`). Used in empty states, cards, and ' +
          'any context where an icon needs visual weight without a full badge.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      {backgroundVariants.map(({ background, color, label, icon }) => (
        <div key={background} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Icon icon={icon as never} size="lg" color={color} background={background} />
          <span style={{ fontSize: 12, color: '#616161', fontFamily: 'Roboto, sans-serif' }}>{label}</span>
        </div>
      ))}
    </div>
  ),
};

export const AllIcons: StoryObj = {
  render: function AllIconsStory() {
    const [search, setSearch] = useState('');

    const filteredIcons = useMemo(() => {
      if (!search.trim()) return iconNames.slice(0, 300);
      const q = search.toLowerCase();
      return iconNames.filter((name) => name.includes(q));
    }, [search]);

    return (
      <div>
        <div style={{ marginBottom: 24 }}>
          <input
            type="search"
            placeholder="Search icons (e.g. home, arrow, check)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              maxWidth: 400,
              padding: '10px 16px',
              fontSize: 16,
              borderRadius: 8,
              border: '1px solid #dfdfdf',
              fontFamily: 'Roboto, sans-serif',
            }}
          />
          <div className="text-body-sm" style={{ marginTop: 8, color: '#616161' }}>
            Showing {filteredIcons.length} of {iconNames.length} icons
          </div>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
            gap: 16,
          }}
        >
          {filteredIcons.map((name) => (
            <div
              key={name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                padding: 12,
                borderRadius: 8,
                background: '#f9fafb',
                cursor: 'pointer',
              }}
              onClick={() => {
                navigator.clipboard.writeText(name);
              }}
              title={`Click to copy: ${name}`}
            >
              <IconByName name={name} size="lg" />
              <span
                className="text-body-xsm"
                style={{
                  textAlign: 'center',
                  wordBreak: 'break-all',
                  color: '#616161',
                }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
