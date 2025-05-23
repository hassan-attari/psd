// BaseDropdown.tsx
import React, { useState, forwardRef } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  OutlinedInput, // Used for multiple select to display selected chips
  SelectChangeEvent,
  Theme,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// ----------------------------- Types -----------------------------

/**
 * Defines the structure for a dropdown option.
 * It's generic to allow for different value types (string, number, etc.)
 */
export interface DropdownOption<T = string | number> {
  value: T;
  label: string;
  disabled?: boolean; // Option can be disabled individually
}

/**
 * Props for the BaseDropdown component.
 * It extends the native HTML 'select' attributes and MUI Select props for flexibility.
 */
export interface BaseDropdownProps<T = string | number | (string | number)[]> {
  name: string;
  label: string;
  options: DropdownOption<Exclude<T, (string | number)[]>>[]; // Options array, value type excludes array for single select
  value: T;
  onChange: (event: SelectChangeEvent<T>) => void;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  size?: 'small' | 'medium';
  variant?: 'standard' | 'outlined' | 'filled';
}

// ----------------------------- Styled Components (Optional but good practice) -----------------------------

// You can style the FormControl or Select directly if needed,
// but for a base component, passing `sx` prop is often sufficient.
// For example, if you wanted all dropdowns to have a specific default background:

// ----------------------------- Component Definition -----------------------------

export const Dropdown = <T extends string | number | (string | number)[]>({
  name,
  label,
  options,
  value,
  onChange,
  helperText,
  error = false,
  disabled = false,
  multiple = false,
  required = false,
  fullWidth = true,
  size = 'medium',
  variant = 'outlined',
  ...rest
}: BaseDropdownProps<T>) => {
  // Determine the type for the Select component based on 'multiple' prop
  type SelectValueType = T;

  return (
    <FormControl
      size={size}
      error={error}
      fullWidth={fullWidth}
      disabled={disabled}
      required={required}
    >
      {label && <InputLabel id={`${name}-label`}>{label}</InputLabel>}
      <Select<SelectValueType>
        labelId={`${name}-label`}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        // displayEmpty={Boolean(placeholder)} // Essential for placeholder to work
        input={multiple ? <OutlinedInput label={label} /> : undefined} // For multiple select, use OutlinedInput
        // renderValue={renderValue} // Custom rendering for selected value(s)
        multiple={multiple}
        disabled={disabled}
        variant={variant}
        label={label}
        // notched={Boolean(value) || multiple || Boolean(placeholder)} // Controls the notch animation for outlined variant
        {...rest}
      >
        {options.map((option) => (
          <MenuItem
            key={String(option.value)}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
