import type { Meta, StoryObj } from '@storybook/react';
import { tokens } from './design-tokens';

const meta: Meta = {
  title: 'Foundations/Shadows',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Shadow tokens from the Surveil Component Library. Use for elevation and depth.',
      },
    },
  },
};

export default meta;

const ShadowSwatch = ({
  name,
  value,
}: {
  name: string;
  value: string;
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      marginBottom: 24,
    }}
  >
    <code
      style={{
        minWidth: 120,
        fontSize: 13,
        color: '#3165ad',
        fontWeight: 500,
        fontFamily: 'monospace',
      }}
    >
      {name}
    </code>
    <div
      style={{
        flex: 1,
        height: 64,
        background: '#efefef',
        borderRadius: 4,
        boxShadow: value,
      }}
    />
  </div>
);

export const AllShadows: StoryObj = {
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <div
        style={{
          padding: '12px 16px',
          background: '#f9fafb',
          borderRadius: 8,
          marginBottom: 24,
        }}
      >
        <div className="text-body-md" style={{ color: '#616161' }}>
          Shadow tokens applied to a light gray bar
        </div>
      </div>
      <ShadowSwatch name="shadow-sm" value={tokens.shadow.sm} />
      <ShadowSwatch name="shadow" value={tokens.shadow.default} />
      <ShadowSwatch name="shadow-md" value={tokens.shadow.md} />
      <ShadowSwatch name="shadow-lg" value={tokens.shadow.lg} />
      <ShadowSwatch name="shadow-xl" value={tokens.shadow.xl} />
      <ShadowSwatch name="shadow-2xl" value={tokens.shadow['2xl']} />
      <ShadowSwatch name="shadow-inner" value={tokens.shadow.inner} />
      <div
        style={{
          marginTop: 32,
          padding: 16,
          background: '#f7f7f7',
          borderRadius: 8,
        }}
      >
        <div className="text-body-sm-semibold" style={{ marginBottom: 8 }}>
          Usage
        </div>
        <pre
          style={{
            margin: 0,
            fontSize: 12,
            fontFamily: 'monospace',
            color: '#616161',
          }}
        >
          {`/* CSS variables */
box-shadow: var(--shadow-md);

/* Design tokens */
import { tokens } from '@/design-tokens';
boxShadow: tokens.shadow.lg`}
        </pre>
      </div>
    </div>
  ),
};
