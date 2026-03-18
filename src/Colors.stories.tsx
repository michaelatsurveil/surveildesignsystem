import type { Meta, StoryObj } from '@storybook/react';

const ColorSwatch = ({ color, name, hex }: { color: string; name: string; hex: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
    <div
      style={{
        width: 64,
        height: 64,
        borderRadius: 8,
        backgroundColor: color,
        border: hex === '#ffffff' ? '1px solid #e5e7eb' : undefined,
      }}
    />
    <div style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{name}</div>
    <div style={{ fontSize: 11, color: '#6b7280', fontFamily: 'monospace' }}>{hex}</div>
  </div>
);

const ColorScale = ({
  title,
  colors,
}: {
  title: string;
  colors: { name: string; value: string; hex: string }[];
}) => (
  <div>
    <div className="text-body-md-semibold" style={{ marginBottom: 16 }}>{title}</div>
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {colors.map(({ name, value, hex }) => (
        <ColorSwatch key={name} color={value} name={name} hex={hex} />
      ))}
    </div>
  </div>
);

const meta: Meta = {
  title: 'Foundations/Colors',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;

const primaryColors = [
  { name: '50', value: 'var(--color-primary-50)', hex: '#e5eefa' },
  { name: '100', value: 'var(--color-primary-100)', hex: '#c6d7f0' },
  { name: '200', value: 'var(--color-primary-200)', hex: '#9fb9e0' },
  { name: '300', value: 'var(--color-primary-300)', hex: '#81a5d9' },
  { name: '400', value: 'var(--color-primary-400)', hex: '#527db6' },
  { name: 'Default', value: 'var(--color-primary)', hex: '#3165ad' },
  { name: '600', value: 'var(--color-primary-600)', hex: '#27518c' },
  { name: '700', value: 'var(--color-primary-700)', hex: '#203b61' },
  { name: '800', value: 'var(--color-primary-800)', hex: '#142845' },
  { name: '900', value: 'var(--color-primary-900)', hex: '#111827' },
];

const greyColors = [
  { name: '25', value: 'var(--color-grey-25)', hex: '#f7f7f7' },
  { name: '50', value: 'var(--color-grey-50)', hex: '#efefef' },
  { name: '100', value: 'var(--color-grey-100)', hex: '#dfdfdf' },
  { name: '200', value: 'var(--color-grey-200)', hex: '#c0c0c0' },
  { name: '300', value: 'var(--color-grey-300)', hex: '#a0a0a0' },
  { name: '400', value: 'var(--color-grey-400)', hex: '#818181' },
  { name: 'Default', value: 'var(--color-grey)', hex: '#616161' },
  { name: '600', value: 'var(--color-grey-600)', hex: '#3a3a3a' },
  { name: '700', value: 'var(--color-grey-700)', hex: '#272727' },
  { name: '800', value: 'var(--color-grey-800)', hex: '#131313' },
];

const successColors = [
  { name: '50', value: 'var(--color-success-50)', hex: '#effff5' },
  { name: '100', value: 'var(--color-success-100)', hex: '#daf1de' },
  { name: '200', value: 'var(--color-success-200)', hex: '#c0e7ce' },
  { name: '300', value: 'var(--color-success-300)', hex: '#76bd91' },
  { name: '400', value: 'var(--color-success-400)', hex: '#449964' },
  { name: 'Default', value: 'var(--color-success)', hex: '#15803d' },
  { name: '600', value: 'var(--color-success-600)', hex: '#116631' },
  { name: '700', value: 'var(--color-success-700)', hex: '#0d4d25' },
  { name: '800', value: 'var(--color-success-800)', hex: '#083318' },
];

const errorColors = [
  { name: '50', value: 'var(--color-error-50)', hex: '#fff3f3' },
  { name: '100', value: 'var(--color-error-100)', hex: '#ffe1e1' },
  { name: '200', value: 'var(--color-error-200)', hex: '#ffbbbc' },
  { name: '300', value: 'var(--color-error-300)', hex: '#f07777' },
  { name: '400', value: 'var(--color-error-400)', hex: '#eb494a' },
  { name: 'Default', value: 'var(--color-error)', hex: '#e61c1d' },
  { name: '600', value: 'var(--color-error-600)', hex: '#c51516' },
  { name: '700', value: 'var(--color-error-700)', hex: '#8a1111' },
  { name: '800', value: 'var(--color-error-800)', hex: '#5c0b0c' },
];

const warningColors = [
  { name: '50', value: 'var(--color-warning-50)', hex: '#fdf9e9' },
  { name: '100', value: 'var(--color-warning-100)', hex: '#fbf1c6' },
  { name: '200', value: 'var(--color-warning-200)', hex: '#f8e090' },
  { name: '300', value: 'var(--color-warning-300)', hex: '#f4c750' },
  { name: '400', value: 'var(--color-warning-400)', hex: '#f0b537' },
  { name: 'Default', value: 'var(--color-warning)', hex: '#db9315' },
  { name: '600', value: 'var(--color-warning-600)', hex: '#99510f' },
  { name: '700', value: 'var(--color-warning-700)', hex: '#7f4014' },
  { name: '800', value: 'var(--color-warning-800)', hex: '#6c3517' },
];

export const Primary: StoryObj = {
  render: () => (
    <ColorScale title="Primary (Surveil Blue)" colors={primaryColors} />
  ),
};

export const Grey: StoryObj = {
  render: () => (
    <ColorScale title="Grey" colors={greyColors} />
  ),
};

export const Success: StoryObj = {
  render: () => (
    <ColorScale title="Success (Green)" colors={successColors} />
  ),
};

export const Error: StoryObj = {
  render: () => (
    <ColorScale title="Error (Red)" colors={errorColors} />
  ),
};

export const Warning: StoryObj = {
  render: () => (
    <ColorScale title="Warning (Yellow)" colors={warningColors} />
  ),
};

export const AllPalettes: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      <ColorScale title="Primary (Surveil Blue)" colors={primaryColors} />
      <ColorScale title="Grey" colors={greyColors} />
      <ColorScale title="Success (Green)" colors={successColors} />
      <ColorScale title="Error (Red)" colors={errorColors} />
      <ColorScale title="Warning (Yellow)" colors={warningColors} />
    </div>
  ),
};
