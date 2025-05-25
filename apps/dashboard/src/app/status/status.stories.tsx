import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@dashboard/kit';

const meta: Meta<typeof Chip> = {
  title: 'Components/Status',
  component: Chip,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'success', 'default'],
    },
    label: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Primary: Story = {
  args: {
    label: 'Primary Status',
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Status',
    color: 'secondary',
  },
};

export const Error: Story = {
  args: {
    label: 'Error Status',
    color: 'error',
  },
};

export const Warning: Story = {
  args: {
    label: 'Warning Status',
    color: 'warning',
  },
};

export const Success: Story = {
  args: {
    label: 'Success Status',
    color: 'success',
  },
};

export const Default: Story = {
  args: {
    label: 'Default Status',
    color: 'default',
  },
};
