import React from 'react';
import { Autocomplete, TextField, FormControl } from '@mui/material';
import { DropdownProps, DropdownOption } from './dropdown';

export function Dropdown<T>({
  label = 'Select:',
  options = [],
  value,
  onChange,
  multiple = false,
  placeholder = '',
  size = 'medium',
  fullWidth = false,
  error,
  required,
  disabled,
  helperText,
  variant = 'outlined',
}: DropdownProps<T>) {
  const getOptionDisabled = (option: DropdownOption<T>) => !!option.disabled;

  const handleChange = (
    _: React.SyntheticEvent,
    newValue: DropdownOption<T> | DropdownOption<T>[] | null
  ) => {
    if (multiple) {
      const values = (newValue as DropdownOption<T>[]).map((o) => o.value);
      onChange(values);
    } else {
      onChange((newValue as DropdownOption<T>)?.value);
    }
  };

  const getValue = () => {
    if (multiple) {
      return options.filter((o) => (value as T[])?.includes(o.value));
    }
    return options.find((o) => o.value === value) || null;
  };

  return (
    <FormControl
      size={size}
      error={error}
      fullWidth={fullWidth}
      disabled={disabled}
      required={required}
      variant={variant}
    >
      <Autocomplete
        multiple={multiple}
        disableCloseOnSelect={multiple}
        options={options}
        value={getValue()}
        onChange={handleChange}
        getOptionDisabled={getOptionDisabled}
        disabled={disabled}
        isOptionEqualToValue={(option, val) => option.value === val.value}
        renderInput={(params) => (
          <TextField
            {...params}
            variant={variant}
            size={size}
            label={label}
            placeholder={placeholder}
            error={error}
            helperText={helperText}
            disabled={disabled}
          />
        )}
      />
    </FormControl>
  );
}
