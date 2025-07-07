import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Button, Snackbar } from '@dashboard/kit';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@dashboard/kit';
import { SnackbarProps } from 'kit/src/lib/components/snackbar/snackbar';
import { Stack } from '@mui/material';

const meta: Meta<typeof Snackbar> = {
  title: 'Components/Snackbar',
  component: Snackbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    onClose: { action: 'onClose' },
    message: { control: 'text' },
    action: { control: 'text' },
    severity: {
      control: 'select',
      options: ['success', 'error', 'info', 'warning'],
    },
    vertical: { control: 'select', options: ['top', 'bottom'] },
    horizontal: { control: 'select', options: ['left', 'center', 'right'] },
    closeable: { control: 'boolean' },
    duration: { control: 'number' },
  },
};

export default meta;

type Story = StoryObj<typeof Snackbar>;

const Template = (args: SnackbarProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <Stack
        height={'70vh'}
        width={'50vw'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Button onClick={handleOpen}>Open Snackbar</Button>
        <Snackbar
          {...args}
          open={open}
          onClose={handleClose}
          message="This Snackbar will be dismissed in 3 seconds."
        />
      </Stack>
    </ThemeProvider>
  );
};

export const Default: Story = {
  render: (args) => <Template {...args} />,
  args: {
    open: false,
    message: 'This Snackbar will be dismissed in 3 seconds.',
    action: 'Action',
    vertical: 'bottom',
    horizontal: 'left',
    closeable: false,
    duration: 3000,
  },
};

export const AllSeverity: StoryObj<SnackbarProps> = {
  render: (args) => {
    const severities: Array<'success' | 'error' | 'info' | 'warning'> = [
      'success',
      'error',
      'info',
      'warning',
    ];

    return (
      <Stack flexDirection={'column'} height={'70vh'} width={'100%'}>
        {severities.map((severity) => (
          <div key={severity}>
            <Template {...args} severity={severity} />
          </div>
        ))}
      </Stack>
    );
  },
  args: {
    message: 'This Snackbar will be dismissed in 3 seconds.',
    action: 'Undo',
    vertical: 'bottom',
    horizontal: 'left',
    closeable: true,
    duration: 3000,
  },
};

export const WithAction: Story = {
  render: (args) => <Template {...args} />,
  args: {
    open: false,
    message: 'This Snackbar will be dismissed in 3 seconds.',
    action: <Button variant="text">Undo</Button>,
    vertical: 'bottom',
    horizontal: 'left',
    closeable: true,
    duration: 3000,
  },
};

export const WithoutCloseButton: Story = {
  render: (args) => <Template {...args} />,
  args: {
    open: false,
    message: 'This Snackbar will be dismissed in 3 seconds.',
    action: 'Action',
    severity: 'success',
    vertical: 'bottom',
    horizontal: 'left',
    closeable: false,
    duration: 3000,
  },
};

export const WithCustomDuration: Story = {
  render: (args) => <Template {...args} />,
  args: {
    open: false,
    message: 'This Snackbar will be dismissed in 3 seconds.',
    action: 'Action',
    severity: 'success',
    vertical: 'bottom',
    horizontal: 'left',
    closeable: true,
    duration: 5000,
  },
};

export const WithCustomPosition: Story = {
  render: (args) => <Template {...args} />,
  args: {
    open: false,
    message: 'This Snackbar will be dismissed in 3 seconds.',
    action: undefined,
    severity: 'success',
    vertical: 'bottom',
    horizontal: 'center',
    closeable: false,
    duration: 3000,
  },
};
