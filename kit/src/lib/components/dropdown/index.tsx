import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { BaseDropdownProps } from './dropdown';

export const Dropdown = <OVT extends string | number>(
  props: BaseDropdownProps<OVT>
) => {
  const {
    name,
    label,
    options,
    value,
    onChange,
    helperText,
    error = false,
    disabled = false,
    required = false,
    fullWidth = true,
    size = 'medium',
    variant = 'outlined',
    selectProps,
  } = props;

  type CurrentSelectValueType = OVT | '';

  return (
    <FormControl
      size={size}
      error={error}
      fullWidth={fullWidth}
      disabled={disabled}
      required={required}
      variant={variant}
    >
      {label && <InputLabel id={`${name}-label`}>{label}</InputLabel>}
      <Select<CurrentSelectValueType>
        labelId={`${name}-label`}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        variant={variant}
        label={label}
        size={size}
        {...selectProps}
      >
        {options?.map((option) => (
          <MenuItem
            key={String(option.value)}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
