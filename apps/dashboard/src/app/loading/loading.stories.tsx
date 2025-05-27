import type { Meta, StoryObj } from '@storybook/react';
import { Loading, LoadingDot, theme } from '@dashboard/kit';
import { Box, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

const meta: Meta<typeof Loading> = {
  title: 'Components/Loading',
  component: Loading,
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls the visibility of the full-screen loading modal.',
    },
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#F8F8F8' },
        { name: 'dark', value: '#333333' },
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Loading>;

export const LoadingModal: Story = {
  render: (args) => (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f0f0f0',
          color: '#555',
          padding: 4,
          boxSizing: 'border-box',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Application Content Here
        </Typography>
        <Typography variant="body1">
          This is what your users would see before the loading modal appears.
        </Typography>
        <Typography variant="caption" sx={{ mt: 2 }}>
          Use the 'open' control in the Storybook panel to toggle the overlay.
        </Typography>

        <Loading {...args} />
      </Box>
    </ThemeProvider>
  ),
  name: 'Fullscreen Loading Modal',
  args: {
    open: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'A full-screen loading modal with a blurred backdrop. The `open` control can be used to show/hide it.',
      },
    },
  },
};

export const LoadingDotsPreview: StoryObj<typeof LoadingDot> = {
  render: (args) => (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
      <LoadingDot {...args} />
    </Box>
  ),
  name: 'Inline Loading Dots',
  args: {
    color: theme.palette.custom.loader,
    width: 10,
    height: 10,
  },
  parameters: {
    docs: {
      description: {
        story: 'Animated loading dots for inline use. Adjust color and size.',
      },
    },
    layout: 'centered',
  },
};
