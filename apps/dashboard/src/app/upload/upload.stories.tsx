import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Button, FileUploadModal } from '@dashboard/kit';
import { FileUploadModalProps } from 'kit/src/lib/components/upload/upload';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@dashboard/kit';

const meta: Meta<typeof FileUploadModal> = {
  title: 'Components/FileUploadModal',
  component: FileUploadModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    onClose: { action: 'onClose' },
    onFileUpload: { action: 'onFileUpload' },
    accept: { control: 'text' },
    maxSize: { control: 'number' },
    title: { control: 'text' },
    multiple: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof FileUploadModal>;

const Template = (args: FileUploadModalProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUpload = async (files: File[]): Promise<void> => {
    console.log('Uploading files:', files);
    await new Promise<void>((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <ThemeProvider theme={theme}>
      <Button onClick={handleOpen}>Open Upload Modal</Button>
      <FileUploadModal
        {...args}
        open={open}
        onClose={handleClose}
        onFileUpload={handleUpload}
      />
    </ThemeProvider>
  );
};

export const Default: Story = {
  render: (args) => <Template {...args} />,
  args: {
    accept: '*',
    title: 'Upload Files',
    maxSize: 10485760,
    multiple: true,
  },
};

export const SingleFile: Story = {
  render: (args) => <Template {...args} />,
  args: {
    accept: 'image/*',
    title: 'Upload a Profile Picture',
    maxSize: 5242880,
    multiple: false,
  },
};

export const CustomMaxSizeAndTypes: Story = {
  render: (args) => <Template {...args} />,
  args: {
    accept: '.pdf,.docx',
    title: 'Upload a Document',
    maxSize: 2097152, // 2MB
    multiple: true,
  },
};
