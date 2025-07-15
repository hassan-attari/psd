import type { Meta, StoryObj } from '@storybook/react';
import { CustomPagination } from '@dashboard/kit';

const meta = {
  title: 'Components/Pagination',
  component: CustomPagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CustomPagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalItems: 100,
    page: 1,
    perPage: 10,
    perPageOptions: [10, 25, 50, 100],
    onPageChange: (page: number) => console.log('Page changed to:', page),
    onPerPageChange: (perPage: number) =>
      console.log('Per page changed to:', perPage),
  },
};

export const WithManyItems: Story = {
  args: {
    totalItems: 500,
    page: 5,
    perPage: 25,
    perPageOptions: [10, 25, 50, 100],
    onPageChange: (page: number) => console.log('Page changed to:', page),
    onPerPageChange: (perPage: number) =>
      console.log('Per page changed to:', perPage),
  },
};

export const CustomPerPageOptions: Story = {
  args: {
    totalItems: 200,
    page: 1,
    perPage: 20,
    perPageOptions: [20, 40, 60, 80],
    onPageChange: (page: number) => console.log('Page changed to:', page),
    onPerPageChange: (perPage: number) =>
      console.log('Per page changed to:', perPage),
  },
};
