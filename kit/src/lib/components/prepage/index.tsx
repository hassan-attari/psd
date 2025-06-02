import React from 'react';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { PrePageProps } from './prepage';
import { Label, PrePageContainer } from './prepage.style';

export const PrePage: React.FC<PrePageProps> = ({
  perPage,
  perPageOptions,
  onPerPageChange,
}) => {
  const handleChangePerPage = (event: SelectChangeEvent) => {
    const newPerPage = parseInt(event.target.value, 10);
    onPerPageChange(newPerPage);
  };

  return (
    <PrePageContainer>
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
    </PrePageContainer>
  );
};
