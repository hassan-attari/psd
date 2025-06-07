import React from 'react';
import { Pagination, Box } from '@mui/material';
import { CustomPaginationProps } from './pagination.d';

export const CustomPagination: React.FC<CustomPaginationProps> = ({
  totalItems,
  page,
  perPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / perPage);
  const handleChangePage = (_: React.ChangeEvent<unknown>, newPage: number) => {
    onPageChange(newPage);
  };
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Pagination
        shape="rounded"
        variant="outlined"
        count={totalPages}
        page={page}
        onChange={handleChangePage}
        color="primary"
        siblingCount={1}
        boundaryCount={1}
      />
    </Box>
  );
};
