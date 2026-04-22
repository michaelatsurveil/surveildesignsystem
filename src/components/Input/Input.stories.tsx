import type { Meta, StoryObj } from '@storybook/react';
import { Search, ChevronDown } from 'lucide-react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Input/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=466-2643',
    },
    docs: {
      description: {
        component:
          'Text input with optional label, prefix/suffix icons, validation states, and helper text. Single default size. [Figma →](https://www.figma.com/design/G2ilXQ5APUbKVg6HLbAQMP/Component-Library?node-id=466-2643)',
      },
    },
  },
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  name: 'Overview — All States & Variants',
  render: () => (
    <div style={{ maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ marginBottom: 8, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af' }}>Default</div>
        <Input label="Label" placeholder="Input value" />
      </div>
      <div>
        <div style={{ marginBottom: 8, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af' }}>Required + info tooltip</div>
        <Input label="Label" required infoTooltip="Additional information about this field" placeholder="Input value" />
      </div>
      <div>
        <div style={{ marginBottom: 8, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af' }}>With prefix icon</div>
        <Input label="Search" placeholder="Search..." prefix={<Search size={18} strokeWidth={2} color="currentColor" />} />
      </div>
      <div>
        <div style={{ marginBottom: 8, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af' }}>With suffix icon</div>
        <Input label="Label" placeholder="Select..." suffix={<ChevronDown size={18} strokeWidth={2} color="currentColor" />} />
      </div>
      <div>
        <div style={{ marginBottom: 8, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af' }}>Error</div>
        <Input label="Email" placeholder="email@example.com" error="Please enter a valid email address" />
      </div>
      <div>
        <div style={{ marginBottom: 8, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af' }}>Success</div>
        <Input label="Label" placeholder="Input value" successMessage="Looks good!" />
      </div>
      <div>
        <div style={{ marginBottom: 8, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af' }}>Helper text</div>
        <Input label="Label" placeholder="Input value" helperText="Helper text goes here" />
      </div>
      <div>
        <div style={{ marginBottom: 8, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af' }}>Disabled</div>
        <Input label="Label" placeholder="Input value" disabled value="Disabled value" />
      </div>
    </div>
  ),
};

