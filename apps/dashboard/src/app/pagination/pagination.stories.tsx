import React, { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import CustomPagination from '../../../../../kit/src/lib/components/pagination';


export default {
  title: 'Components/Pagination',
  component: CustomPagination,
} as Meta;

interface PaginationArgs {
  totalItems: number;
  page: number;
  perPage: number;
}

const Template: StoryFn<PaginationArgs> = (args: PaginationArgs) => {
  const [page, setPage] = useState(args.page);
  const [perPage, setPerPage] = useState(args.perPage);
  return (
    <CustomPagination
      {...args}
      page={page}
      perPage={perPage}
      onPageChange={(newPage) => setPage(newPage)}
      onPerPageChange={(newPerPage) => setPerPage(newPerPage)}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  totalItems: 100,
  page: 1,
  perPage: 10,
};
