import type { Meta, StoryObj } from '@storybook/react';
import { TypographyDemo } from '@dashboard/kit';

const meta: Meta<typeof TypographyDemo> = {
  title: 'Components/Typography',
  component: TypographyDemo,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TypographyDemo>;

export const Default: Story = {
  args: {},
}; 