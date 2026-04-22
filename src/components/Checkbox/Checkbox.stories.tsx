import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Input/Checkbox',
  component: Checkbox,
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
          'Checkboxes let users select one or more options. Use for multi-select or toggles. Supports indeterminate state for "select all" scenarios. [Figma →](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=382-1585)',
      },
    },
  },
  argTypes: {
    checked: {
      control: 'boolean',
    },
    indeterminate: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  name: 'Overview — All States',
  render: () => (
    <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div>
        <div style={{ marginBottom: 12, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af' }}>Unchecked</div>
        <Checkbox label="Label" checked={false} onChange={() => {}} />
      </div>
      <div>
        <div style={{ marginBottom: 12, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af' }}>Checked</div>
        <Checkbox label="Label" checked onChange={() => {}} />
      </div>
      <div>
        <div style={{ marginBottom: 12, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af' }}>Indeterminate</div>
        <Checkbox label="Select all" checked={false} indeterminate onChange={() => {}} />
      </div>
      <div>
        <div style={{ marginBottom: 12, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af' }}>Disabled unchecked</div>
        <Checkbox label="Label" checked={false} disabled />
      </div>
      <div>
        <div style={{ marginBottom: 12, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af' }}>Disabled checked</div>
        <Checkbox label="Label" checked disabled />
      </div>
      <div>
        <div style={{ marginBottom: 12, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af' }}>Disabled indeterminate</div>
        <Checkbox label="Select all" indeterminate disabled />
      </div>
    </div>
  ),
};

