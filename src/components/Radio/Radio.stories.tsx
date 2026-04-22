import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from './Radio';

const meta: Meta<typeof RadioGroup> = {
  title: 'Input/Radio',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=382-1585',
    },
    docs: {
      description: {
        component:
          'Radio buttons let users select one option from a set. Use for mutually exclusive choices. [Figma →](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=382-1585)',
      },
    },
  },
  argTypes: {
    direction: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
];

export const Default: Story = {
  name: 'Overview — All States',
  render: () => (
    <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div>
        <div style={{ marginBottom: 12, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af' }}>Vertical (default)</div>
        <RadioGroup options={options} value="b" onChange={() => {}} direction="vertical" />
      </div>
      <div>
        <div style={{ marginBottom: 12, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af' }}>Horizontal</div>
        <RadioGroup options={options} value="b" onChange={() => {}} direction="horizontal" />
      </div>
      <div>
        <div style={{ marginBottom: 12, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af' }}>Disabled</div>
        <RadioGroup options={options} value="b" onChange={() => {}} disabled />
      </div>
    </div>
  ),
};

