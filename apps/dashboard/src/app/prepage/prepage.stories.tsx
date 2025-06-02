import type { Meta, StoryObj } from '@storybook/react';
import { PrePage } from '@dashboard/kit';

const meta = {
  title: 'Components/PrePage',
  component: PrePage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PrePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    perPage: 10,
    perPageOptions: [10, 25, 50, 100],
    onPerPageChange: (newPerPage: number) =>
      console.log('Per page changed to:', newPerPage),
  },
};

export const CustomOptions: Story = {
  args: {
    perPage: 20,
    perPageOptions: [20, 40, 60, 80],
    onPerPageChange: (newPerPage: number) =>
      console.log('Per page changed to:', newPerPage),
  },
};

export const WithSelectedValue: Story = {
  args: {
    perPage: 50,
    perPageOptions: [10, 25, 50, 100],
    onPerPageChange: (newPerPage: number) =>
      console.log('Per page changed to:', newPerPage),
  },
};
