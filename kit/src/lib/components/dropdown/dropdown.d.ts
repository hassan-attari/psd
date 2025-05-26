import {
  SelectChangeEvent,
  SelectProps as MuiSelectProps,
} from '@mui/material';
import { ReactNode } from 'react';

export interface DropdownOption<ValueType = string | number> {
  value: ValueType;
  label: string;
  disabled?: boolean;
}

export interface BaseDropdownProps<OVT extends string | number> {
  name: string;
  label: string;
  options: DropdownOption<OVT>[];
  value: OVT | '';
  onChange: (event: SelectChangeEvent<OVT | ''>, child: ReactNode) => void;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  size?: 'small' | 'medium';
  variant?: 'standard' | 'outlined' | 'filled';
  selectProps?: Omit<
    MuiSelectProps<OVT | ''>,
    | 'value'
    | 'onChange'
    | 'multiple'
    | 'input'
    | 'label'
    | 'name'
    | 'id'
    | 'labelId'
    | 'variant'
  >;
}
