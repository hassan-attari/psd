import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Box } from '@mui/material';
import { Loading, LoadingDot } from '../../../../../kit/src/lib/components/loading';

const meta: Meta<typeof Loading> = {
  title: 'Components/Loading',
  component: Loading,
  tags: ['autodocs'],
};

export default meta;

export const LoadingModal: StoryObj<typeof Loading> = {
  render: (args) => <Loading {...args} />,
  name: 'Modal - Fullscreen Loader',
  args: {
    open: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'A full-screen loading modal using MUI Modal and animated dots.',
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
    color: '#4000ff',
    width: 10,
    height: 10,
  },
  parameters: {
    docs: {
      description: {
        story: 'Animated loading dots used inside buttons or inline loaders.',
      },
    },
  },
};
