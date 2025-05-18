import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@dashboard/kit';

const typographyClasses = [
  'text-xs-regular',
  'text-xs-medium',
  'text-xs-semibold',
  'text-xs-bold',
  'text-sm-regular',
  'text-sm-medium',
  'text-sm-semibold',
  'text-sm-bold',
  'text-md-regular',
  'text-md-medium',
  'text-md-semibold',
  'text-md-bold',
  'text-lg-regular',
  'text-lg-medium',
  'text-lg-semibold',
  'text-lg-bold',
  'text-xl-regular',
  'text-xl-medium',
  'text-xl-semibold',
  'text-xl-bold',
  'text-2xl-regular',
  'text-2xl-medium',
  'text-2xl-semibold',
  'text-2xl-bold',
  'text-3xl-regular',
  'text-3xl-medium',
  'text-3xl-semibold',
  'text-3xl-bold'
];

const TypographyDemo = () => {
  return (
    <div>
      {typographyClasses.map((className, index) => (
        <Typography key={index} className={className}>
          {className} - Dashboard sample text
        </Typography>
      ))}
    </div>
  );
};

const meta: Meta<typeof TypographyDemo> = {
  title: 'Components/Typography',
  component: TypographyDemo,
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
type Story = StoryObj<typeof TypographyDemo>;

export const Default: Story = {
  args: {},
}; 