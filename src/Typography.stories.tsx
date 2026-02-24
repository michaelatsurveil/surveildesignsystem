import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Foundations/Typography',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;

export const Headings: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div className="text-h1">Heading 1</div>
        <div className="text-body-sm" style={{ color: '#616161', marginTop: 4 }}>
          60px / 72px line height / Bold
        </div>
      </div>
      <div>
        <div className="text-h2">Heading 2</div>
        <div className="text-body-sm" style={{ color: '#616161', marginTop: 4 }}>
          48px / 56px line height / Bold
        </div>
      </div>
      <div>
        <div className="text-h3">Heading 3</div>
        <div className="text-body-sm" style={{ color: '#616161', marginTop: 4 }}>
          40px / 48px line height / Bold
        </div>
      </div>
      <div>
        <div className="text-h4">Heading 4</div>
        <div className="text-body-sm" style={{ color: '#616161', marginTop: 4 }}>
          32px / 40px line height / Bold
        </div>
      </div>
      <div>
        <div className="text-h5">Heading 5</div>
        <div className="text-body-sm" style={{ color: '#616161', marginTop: 4 }}>
          24px / 28px line height / Bold
        </div>
      </div>
      <div>
        <div className="text-h6">Heading 6</div>
        <div className="text-body-sm" style={{ color: '#616161', marginTop: 4 }}>
          20px / 24px line height / Bold
        </div>
      </div>
    </div>
  ),
};

export const BodyText: StoryObj = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
      <div>
        <div className="text-body-sm-semibold" style={{ marginBottom: 12 }}>Body x-small</div>
        <div className="text-body-xsm" style={{ marginBottom: 8 }}>Body x-small</div>
        <div className="text-body-xsm" style={{ marginBottom: 8 }}>Body x-small</div>
        <div className="text-body-xsm" style={{ marginBottom: 8 }}>Body x-small</div>
        <div className="text-body-xsm">Body x-small</div>
        <div className="text-body-sm" style={{ color: '#616161', marginTop: 8 }}>12px / 16px</div>
      </div>
      <div>
        <div className="text-body-sm-semibold" style={{ marginBottom: 12 }}>Body small</div>
        <div className="text-body-sm" style={{ marginBottom: 8 }}>Body small</div>
        <div className="text-body-sm" style={{ marginBottom: 8 }}>Body small</div>
        <div className="text-body-sm" style={{ marginBottom: 8 }}>Body small</div>
        <div className="text-body-sm">Body small</div>
        <div className="text-body-sm" style={{ color: '#616161', marginTop: 8 }}>14px / 16px</div>
      </div>
      <div>
        <div className="text-body-sm-semibold" style={{ marginBottom: 12 }}>Body medium</div>
        <div className="text-body-md" style={{ marginBottom: 8 }}>Body medium</div>
        <div className="text-body-md" style={{ marginBottom: 8 }}>Body medium</div>
        <div className="text-body-md" style={{ marginBottom: 8 }}>Body medium</div>
        <div className="text-body-md">Body medium</div>
        <div className="text-body-sm" style={{ color: '#616161', marginTop: 8 }}>16px / 24px</div>
      </div>
      <div>
        <div className="text-body-sm-semibold" style={{ marginBottom: 12 }}>Body large</div>
        <div className="text-body-lg" style={{ marginBottom: 8 }}>Body large</div>
        <div className="text-body-lg" style={{ marginBottom: 8 }}>Body large</div>
        <div className="text-body-lg" style={{ marginBottom: 8 }}>Body large</div>
        <div className="text-body-lg">Body large</div>
        <div className="text-body-sm" style={{ color: '#616161', marginTop: 8 }}>20px / 28px</div>
      </div>
    </div>
  ),
};

export const BodyWeights: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <div className="text-body-md">Regular (400) — The quick brown fox jumps over the lazy dog</div>
      </div>
      <div>
        <div className="text-body-md-medium">Medium (500) — The quick brown fox jumps over the lazy dog</div>
      </div>
      <div>
        <div className="text-body-md-semibold">Semibold (600) — The quick brown fox jumps over the lazy dog</div>
      </div>
      <div>
        <div className="text-body-md-bold">Bold (700) — The quick brown fox jumps over the lazy dog</div>
      </div>
    </div>
  ),
};
