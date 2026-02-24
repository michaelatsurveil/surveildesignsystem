import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Search, ChevronDown } from 'lucide-react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Input/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Text input with optional label, prefix/suffix icons, validation states, and helper text.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['xs', 's', 'm', 'l'],
      description: 'Numbers-TC/Inputs-TC: XS (26px), S (30px), M (34px), L (38px)',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Placeholder',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Label',
    placeholder: 'Input value',
  },
};

export const Required: Story = {
  args: {
    label: 'Label',
    required: true,
    placeholder: 'Input value',
  },
};

export const WithInfoTooltip: Story = {
  args: {
    label: 'Label',
    required: true,
    infoTooltip: 'Additional information about this field',
    placeholder: 'Input value',
  },
};

export const WithPrefix: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    prefix: <Search size={18} strokeWidth={2} color="currentColor" />,
  },
};

export const WithSuffix: Story = {
  args: {
    label: 'Label',
    placeholder: 'Input value',
    suffix: <ChevronDown size={18} strokeWidth={2} color="currentColor" />,
  },
};

export const FullExample: Story = {
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <Input
        label="Label"
        required
        infoTooltip="Additional information"
        placeholder="Input value"
        prefix={<Search size={18} strokeWidth={2} color="currentColor" />}
        suffix={<ChevronDown size={18} strokeWidth={2} color="currentColor" />}
        successMessage="Info message"
      />
    </div>
  ),
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'email@example.com',
    error: 'Please enter a valid email address',
  },
};

export const WithSuccess: Story = {
  args: {
    label: 'Label',
    placeholder: 'Input value',
    successMessage: 'Info message',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Label',
    placeholder: 'Input value',
    helperText: 'Helper text goes here',
  },
};

export const Password: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ maxWidth: 400 }}>
        <Input
          label="Password"
          type="password"
          placeholder="Enter password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          showPasswordToggle
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    label: 'Label',
    placeholder: 'Input value',
    disabled: true,
    value: 'Disabled value',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Input label="XS (26px)" size="xs" placeholder="Input value" />
      <Input label="S (30px)" size="s" placeholder="Input value" />
      <Input label="M (34px)" size="m" placeholder="Input value" />
      <Input label="L (38px)" size="l" placeholder="Input value" />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <div style={{ marginBottom: 8, fontSize: 12, fontWeight: 600, color: '#616161' }}>
          Default
        </div>
        <Input label="Label" placeholder="Input value" />
      </div>
      <div>
        <div style={{ marginBottom: 8, fontSize: 12, fontWeight: 600, color: '#616161' }}>
          Hover (hover over input)
        </div>
        <Input label="Label" placeholder="Input value" />
      </div>
      <div>
        <div style={{ marginBottom: 8, fontSize: 12, fontWeight: 600, color: '#616161' }}>
          Focus (tab to focus)
        </div>
        <Input label="Label" placeholder="Input value" />
      </div>
      <div>
        <div style={{ marginBottom: 8, fontSize: 12, fontWeight: 600, color: '#616161' }}>
          Disabled
        </div>
        <Input label="Label" placeholder="Input value" disabled value="Disabled" />
      </div>
      <div>
        <div style={{ marginBottom: 8, fontSize: 12, fontWeight: 600, color: '#616161' }}>
          Error
        </div>
        <Input label="Label" placeholder="Input value" error="Please enter a valid value" />
      </div>
      <div>
        <div style={{ marginBottom: 8, fontSize: 12, fontWeight: 600, color: '#616161' }}>
          Success
        </div>
        <Input label="Label" placeholder="Input value" successMessage="Looks good!" />
      </div>
    </div>
  ),
};

export const VariantMatrix: Story = {
  render: () => (
    <div style={{ maxWidth: 600, display: 'flex', flexDirection: 'column', gap: 40 }}>
      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600 }}>Label + Required + Info</h3>
        <Input
          label="Label"
          required
          infoTooltip="Additional information"
          placeholder="Input value"
        />
      </div>
      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600 }}>With Prefix (Search)</h3>
        <Input
          label="Search"
          placeholder="Search..."
          prefix={<Search size={18} strokeWidth={2} color="currentColor" />}
        />
      </div>
      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600 }}>With Suffix (Dropdown)</h3>
        <Input
          label="Label"
          placeholder="Select..."
          suffix={<ChevronDown size={18} strokeWidth={2} color="currentColor" />}
        />
      </div>
      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600 }}>Full (all slots)</h3>
        <Input
          label="Label"
          required
          infoTooltip="Info"
          placeholder="Input value"
          prefix={<Search size={18} strokeWidth={2} color="currentColor" />}
          suffix={<ChevronDown size={18} strokeWidth={2} color="currentColor" />}
          successMessage="Info message"
        />
      </div>
    </div>
  ),
};
