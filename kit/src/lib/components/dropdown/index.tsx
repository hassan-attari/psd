import React from 'react';
import {
  Autocomplete,
  TextField,
  Checkbox,
  AutocompleteRenderOptionState,
  Box,
  InputLabel,
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { AutocompleteDropdownProps, DropdownOption } from './dropdown';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export function AutocompleteDropdown<T>({
  label = 'Select:',
  options,
  value,
  onChange,
  multiple = false,
  placeholder = '',
}: AutocompleteDropdownProps<T>) {
  const getOptionDisabled = (option: DropdownOption<T>) => !!option.disabled;

  const handleChange = (
    _: any,
    newValue: DropdownOption<T> | DropdownOption<T>[] | null
  ) => {
    if (multiple) {
      const values = (newValue as DropdownOption<T>[]).map((o) => o.value);
      onChange(values);
    } else if (newValue) {
      onChange((newValue as DropdownOption<T>).value);
    }
  };

  const getValue = () => {
    if (multiple) {
      return options.filter((o) => (value as T[]).includes(o.value));
    }
    return options.find((o) => o.value === value) || null;
  };

  const renderOption = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: DropdownOption<T>,
    { selected }: AutocompleteRenderOptionState
  ) => (
    <li {...props} style={{ opacity: option.disabled ? 0.5 : 1 }}>
      {multiple && (
        <Checkbox
          icon={icon}
          checkedIcon={checkedIcon}
          style={{ marginRight: 8 }}
          checked={selected}
        />
      )}
      {option.label}
    </li>
  );

  return (
    <Box>
      <InputLabel>{label}</InputLabel>
      <Autocomplete
        multiple={multiple}
        disableCloseOnSelect={multiple}
        options={options}
        value={getValue()}
        onChange={handleChange}
        getOptionDisabled={getOptionDisabled}
        isOptionEqualToValue={(option, val) => option.value === val.value}
        renderOption={renderOption}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            size="small"
            placeholder={placeholder}
          />
        )}
        sx={{ minWidth: 200 }}
      />
    </Box>
  );
}
