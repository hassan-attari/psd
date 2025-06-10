export interface DropdownOption<T> {
  value: T;
  label: string;
  disabled?: boolean;
}

export type AutocompleteDropdownProps<T> = {
  label?: string;
  options: DropdownOption<T>[];
  value: T | T[];
  onChange: (value: T | T[]) => void;
  multiple?: boolean;
  placeholder?: string;
};
