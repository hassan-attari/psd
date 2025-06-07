import React from 'react';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { PerPageProps } from './perPage';
import { Label, PerPageContainer } from './perPage.style';

export const PerPage: React.FC<PerPageProps> = ({
  perPage,
  perPageOptions,
  onPerPageChange,
}) => {
  const handleChangePerPage = (event: SelectChangeEvent) => {
    const newPerPage = parseInt(event.target.value, 10);
    onPerPageChange(newPerPage);
  };

  return (
    <PerPageContainer>
      <Label variant="body2">Show per page:</Label>
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
    </PerPageContainer>
  );
};
