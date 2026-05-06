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

const infoColors = [
  { name: '50', value: 'var(--color-info-50)', hex: '#e5eefa' },
  { name: '100', value: 'var(--color-info-100)', hex: '#c6d7f0' },
  { name: '200', value: 'var(--color-info-200)', hex: '#9fb9e0' },
  { name: '300', value: 'var(--color-info-300)', hex: '#81a5d9' },
  { name: '400', value: 'var(--color-info-400)', hex: '#527db6' },
  { name: 'Default', value: 'var(--color-info)', hex: '#3165ad' },
  { name: '600', value: 'var(--color-info-600)', hex: '#27518c' },
  { name: '700', value: 'var(--color-info-700)', hex: '#203b61' },
  { name: '800', value: 'var(--color-info-800)', hex: '#142845' },
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

const purpleColors = [
  { name: '50', value: 'var(--color-purple-50)', hex: '#e5d8fb' },
  { name: '100', value: 'var(--color-purple-100)', hex: '#cbb0f8' },
  { name: '200', value: 'var(--color-purple-200)', hex: '#b089f4' },
  { name: '300', value: 'var(--color-purple-300)', hex: '#9661f1' },
  { name: 'Default', value: 'var(--color-purple)', hex: '#7c3aed' },
  { name: '600', value: 'var(--color-purple-600)', hex: '#632ebe' },
  { name: '700', value: 'var(--color-purple-700)', hex: '#4a238e' },
  { name: '800', value: 'var(--color-purple-800)', hex: '#32175f' },
];

const roseColors = [
  { name: '50', value: 'var(--color-rose-50)', hex: '#fad7e1' },
  { name: '100', value: 'var(--color-rose-100)', hex: '#f6aec3' },
  { name: '200', value: 'var(--color-rose-200)', hex: '#f186a6' },
  { name: '300', value: 'var(--color-rose-300)', hex: '#ed5d88' },
  { name: 'Default', value: 'var(--color-rose)', hex: '#e8356a' },
  { name: '600', value: 'var(--color-rose-600)', hex: '#ba2a55' },
  { name: '700', value: 'var(--color-rose-700)', hex: '#8b2040' },
  { name: '800', value: 'var(--color-rose-800)', hex: '#5d152a' },
];

const orangeColors = [
  { name: '50', value: 'var(--color-orange-50)', hex: '#fce0d4' },
  { name: '100', value: 'var(--color-orange-100)', hex: '#f9c0aa' },
  { name: '200', value: 'var(--color-orange-200)', hex: '#f6a17f' },
  { name: '300', value: 'var(--color-orange-300)', hex: '#f38155' },
  { name: 'Default', value: 'var(--color-orange)', hex: '#f0622a' },
  { name: '600', value: 'var(--color-orange-600)', hex: '#c04e22' },
  { name: '700', value: 'var(--color-orange-700)', hex: '#903b19' },
  { name: '800', value: 'var(--color-orange-800)', hex: '#602711' },
];

const jadeColors = [
  { name: '50', value: 'var(--color-jade-50)', hex: '#d1f1e4' },
  { name: '100', value: 'var(--color-jade-100)', hex: '#a3e3ca' },
  { name: '200', value: 'var(--color-jade-200)', hex: '#74d4af' },
  { name: '300', value: 'var(--color-jade-300)', hex: '#46c695' },
  { name: 'Default', value: 'var(--color-jade)', hex: '#18b87a' },
  { name: '600', value: 'var(--color-jade-600)', hex: '#139362' },
  { name: '700', value: 'var(--color-jade-700)', hex: '#0e6e49' },
  { name: '800', value: 'var(--color-jade-800)', hex: '#0a4a31' },
];

const tealColors = [
  { name: '50', value: 'var(--color-teal-50)', hex: '#ccf3f0' },
  { name: '100', value: 'var(--color-teal-100)', hex: '#99e7e0' },
  { name: '200', value: 'var(--color-teal-200)', hex: '#66dad1' },
  { name: '300', value: 'var(--color-teal-300)', hex: '#33cec1' },
  { name: 'Default', value: 'var(--color-teal)', hex: '#00c2b2' },
  { name: '600', value: 'var(--color-teal-600)', hex: '#009b8e' },
  { name: '700', value: 'var(--color-teal-700)', hex: '#00746b' },
  { name: '800', value: 'var(--color-teal-800)', hex: '#004e47' },
];

const aquaColors = [
  { name: '50', value: 'var(--color-aqua-50)', hex: '#dbe9f7' },
  { name: '100', value: 'var(--color-aqua-100)', hex: '#b7d3f0' },
  { name: '200', value: 'var(--color-aqua-200)', hex: '#92bce8' },
  { name: '300', value: 'var(--color-aqua-300)', hex: '#6ea6e1' },
  { name: 'Default', value: 'var(--color-aqua)', hex: '#4a90d9' },
  { name: '600', value: 'var(--color-aqua-600)', hex: '#3b73ae' },
  { name: '700', value: 'var(--color-aqua-700)', hex: '#2c5682' },
  { name: '800', value: 'var(--color-aqua-800)', hex: '#1e3a57' },
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

export const Info: StoryObj = {
  render: () => (
    <ColorScale title="Info (Blue)" colors={infoColors} />
  ),
};

export const Warning: StoryObj = {
  render: () => (
    <ColorScale title="Warning (Yellow)" colors={warningColors} />
  ),
};

export const Purple: StoryObj = {
  render: () => (
    <ColorScale title="Purple" colors={purpleColors} />
  ),
};

export const Rose: StoryObj = {
  render: () => (
    <ColorScale title="Rose" colors={roseColors} />
  ),
};

export const Orange: StoryObj = {
  render: () => (
    <ColorScale title="Orange" colors={orangeColors} />
  ),
};

export const Jade: StoryObj = {
  render: () => (
    <ColorScale title="Jade" colors={jadeColors} />
  ),
};

export const Teal: StoryObj = {
  render: () => (
    <ColorScale title="Teal" colors={tealColors} />
  ),
};

export const Aqua: StoryObj = {
  render: () => (
    <ColorScale title="Aqua" colors={aquaColors} />
  ),
};

export const AllPalettes: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      <ColorScale title="Primary (Surveil Blue)" colors={primaryColors} />
      <ColorScale title="Grey" colors={greyColors} />
      <ColorScale title="Success (Green)" colors={successColors} />
      <ColorScale title="Error (Red)" colors={errorColors} />
      <ColorScale title="Info (Blue)" colors={infoColors} />
      <ColorScale title="Warning (Yellow)" colors={warningColors} />
      <ColorScale title="Purple" colors={purpleColors} />
      <ColorScale title="Rose" colors={roseColors} />
      <ColorScale title="Orange" colors={orangeColors} />
      <ColorScale title="Jade" colors={jadeColors} />
      <ColorScale title="Teal" colors={tealColors} />
      <ColorScale title="Aqua" colors={aquaColors} />
    </div>
  ),
};
