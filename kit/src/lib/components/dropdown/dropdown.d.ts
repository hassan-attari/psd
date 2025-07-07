export interface DropdownOption<T> {
  value: T;
  label: string;
  disabled?: boolean;
}

export type DropdownProps<T> = {
  label?: string;
  options: DropdownOption<T>[];
  value: T | T[];
  onChange: (value: T | T[]) => void;
  multiple?: boolean;
  placeholder?: string;
  required?: boolean;
  size?: 'small' | 'medium';
  disabled?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  helperText?: string;
  variant?: 'outlined' | 'filled' | 'standard';
};
