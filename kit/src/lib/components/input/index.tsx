import React, { FC } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import ErrorIcon from '@mui/icons-material/ErrorOutline';
import { InputProps } from './input';

const formatWithCommas = (val: string | number): string => {
  const raw = typeof val === 'number' ? val.toString() : val || '';
  const [intPart, decimalPart] = raw.replace(/,/g, '').split('.');
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return decimalPart !== undefined
    ? `${formattedInt}.${decimalPart}`
    : formattedInt;
};

const removeCommas = (val: string): string => val.replace(/,/g, '');

export const Input: FC<InputProps> = ({
  name,
  type = 'text',
  label,
  placeholder,
  Icon,
  guidMessage,
  maxLength,
  disabled = false,
  handleOnChange,
  hasNumberSeparator = false,
  required,
  showIcon,
  onFocus,
  onBlur,
  className,
  value = '',
  hasError = false,
  endIcon,
  startIcon,
  ...rest
}) => {
  const formattedValue =
    hasNumberSeparator && value !== '' ? formatWithCommas(value) : value;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = (e.target as HTMLInputElement).value;

    if (hasNumberSeparator) {
      const raw = removeCommas(input);
      if (!/^\d*\.?\d*$/.test(raw)) return;
      handleOnChange?.(raw);
    } else {
      handleOnChange?.(input);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!hasNumberSeparator) return;
    const invalidKeys = ['e', 'E', '+', '-'];
    if (invalidKeys.includes(e.key)) e.preventDefault();
    if (e.key === '.' && String(value).includes('.')) e.preventDefault();
  };

  return (
    <TextField
      fullWidth
      id={name}
      name={name}
      variant="outlined"
      placeholder={placeholder}
      value={formattedValue}
      onChange={handleChange}
      onBlur={onBlur}
      onFocus={onFocus}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      error={hasError}
      label={required ? `${label} *` : label}
      helperText={hasError ? guidMessage : ''}
      slotProps={{
        input: {
          endAdornment: (hasError || endIcon) && (
            <InputAdornment position="start">
              {hasError ? <ErrorIcon color="error" fill="red" /> : endIcon}
            </InputAdornment>
          ),
          startAdornment: startIcon && (
            <InputAdornment position="end">
              {startIcon ? startIcon : null}
            </InputAdornment>
          ),
        },
      }}
      className={className}
    />
  );
};
