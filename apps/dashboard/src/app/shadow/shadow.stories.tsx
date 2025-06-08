import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@dashboard/kit';

const meta: Meta = {
  title: 'Components/Shadows',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;

const ShadowBox = ({ shadow, label }: { shadow: string; label: string }) => (
  <Box
    sx={{
      width: 120,
      height: 120,
      bgcolor: 'background.paper',
      boxShadow: shadow,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '20px',
      margin: '50px 0',
    }}
  >
    <Typography variant="caption">{label}</Typography>
  </Box>
);

export const Shadow01: StoryObj = {
  render: () => (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
      }}
    >
      <ShadowBox shadow={1} label="Drop Shadow - 01" />
      <ShadowBox shadow={2} label="Drop Shadow - 02" />
      <ShadowBox shadow={3} label="Drop Shadow - 03" />
      <ShadowBox shadow={4} label="Drop Shadow - 04" />
      <ShadowBox shadow={5} label="Drop Shadow - 05" />
      <ShadowBox shadow={6} label="Drop Shadow - 06" />
      <ShadowBox shadow="none" label="No Shadow" />
    </Box>
  ),
};
