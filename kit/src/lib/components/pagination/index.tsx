import React from 'react';
import {
  Pagination,
  Select,
  MenuItem,
  Box,
  Typography,
  SelectChangeEvent,
} from '@mui/material';
import { CustomPaginationProps } from './pagination.d';

const CustomPagination: React.FC<CustomPaginationProps> = ({
  totalItems,
  page,
  perPage,
  onPageChange,
  onPerPageChange,
  perPageOptions = [10, 25, 50, 100],
}) => {
  const totalPages = Math.ceil(totalItems / perPage);

  const handleChangePage = (_: React.ChangeEvent<unknown>, newPage: number) => {
    onPageChange(newPage);
  };

  const handleChangePerPage = (event: SelectChangeEvent) => {
    const newPerPage = parseInt(event.target.value, 10);
    onPerPageChange(newPerPage);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt={4}
    >
      <Typography variant="body2">Total suggestions: {totalItems}</Typography>

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

      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="body2">Show per page:</Typography>
        <Select
          value={perPage.toString()}
          onChange={handleChangePerPage}
          size="small"
        >
          {perPageOptions.map((option) => (
            <MenuItem key={option} value={option.toString()}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
};

export default CustomPagination;
