import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from './FileUpload';

const meta: Meta<typeof FileUpload> = {
  title: 'Input/File Upload',
  component: FileUpload,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'File upload component with drag-and-drop support. Supports default, hover, drag-over, success, and error states.',
      },
    },
  },
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    multiple: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    return (
      <div style={{ maxWidth: 480 }}>
        <FileUpload files={files} onChange={setFiles} />
      </div>
    );
  },
};

export const Multiple: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    return (
      <div style={{ maxWidth: 480 }}>
        <FileUpload files={files} onChange={setFiles} multiple />
      </div>
    );
  },
};

export const WithAccept: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    return (
      <div style={{ maxWidth: 480 }}>
        <FileUpload
          files={files}
          onChange={setFiles}
          accept="image/*,.pdf"
          placeholder="Or drop images or PDFs here"
        />
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    return (
      <div style={{ maxWidth: 480 }}>
        <FileUpload
          files={files}
          onChange={setFiles}
          error="File must be less than 5MB"
        />
      </div>
    );
  },
};

export const WithSuccess: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([
      new File([''], 'document.pdf', { type: 'application/pdf' }),
    ]);
    return (
      <div style={{ maxWidth: 480 }}>
        <FileUpload
          files={files}
          onChange={setFiles}
          successMessage="File uploaded successfully"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <FileUpload disabled placeholder="Or drop files here" chooseLabel="Browse..." />
    </div>
  ),
};
