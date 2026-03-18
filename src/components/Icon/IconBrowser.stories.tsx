import { useState, useMemo } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IconByName, iconNames } from './Icon';

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
