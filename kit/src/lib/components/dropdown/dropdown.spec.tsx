import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Dropdown } from './index';
import type { DropdownProps, DropdownOption } from './dropdown';

describe('Dropdown Component', () => {
  const mockOptions: DropdownOption<string>[] = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3', disabled: true },
  ];

  const mockNumberOptions: DropdownOption<number>[] = [
    { label: 'One', value: 1 },
    { label: 'Two', value: 2 },
  ];

  const defaultProps: DropdownProps<string> = {
    label: 'Test Dropdown',
    options: mockOptions,
    value: '',
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with default props', () => {
    render(<Dropdown {...defaultProps} />);

    expect(screen.getByLabelText('Test Dropdown')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('displays all options when clicked', async () => {
    render(<Dropdown {...defaultProps} />);

    const combobox = screen.getByRole('combobox');
    fireEvent.mouseDown(combobox);

    await screen.findByText('Option 1'); // Wait for options to appear
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('calls onChange with selected value when an option is selected (single select)', async () => {
    render(<Dropdown {...defaultProps} />);

    fireEvent.mouseDown(screen.getByRole('combobox'));
    await screen.findByText('Option 1');
    fireEvent.click(screen.getByText('Option 1'));

    expect(defaultProps.onChange).toHaveBeenCalledWith('1');
  });

  it('handles multiple selection correctly', async () => {
    const mockOnChange = vi.fn();
    render(
      <Dropdown {...defaultProps} multiple={true} onChange={mockOnChange} />
    );

    const combobox = screen.getByRole('combobox');
    fireEvent.mouseDown(combobox);
    await screen.findByText('Option 1');
    fireEvent.click(screen.getByText('Option 1'));

    fireEvent.mouseDown(combobox);
    await screen.findByText('Option 2');
    fireEvent.click(screen.getByText('Option 2'));

    expect(mockOnChange).toHaveBeenCalledWith(['1', '2']);
  });

  it('displays the current value when provided (single select)', () => {
    render(<Dropdown {...defaultProps} value="1" />);

    expect(screen.getByRole('combobox')).toHaveValue('Option 1');
  });

  it('displays the current values when provided (multiple select)', () => {
    render(<Dropdown {...defaultProps} multiple={true} value={['1', '2']} />);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('disables the dropdown when disabled prop is true', () => {
    render(<Dropdown {...defaultProps} disabled={true} />);

    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('shows error state and helper text when error is true', () => {
    render(
      <Dropdown {...defaultProps} error={true} helperText="Invalid selection" />
    );

    expect(screen.getByText('Invalid selection')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-invalid',
      'true'
    );
  });

  it('marks the label as required when required prop is true', () => {
    render(<Dropdown {...defaultProps} required={true} />);

    const label = screen.getByText('Test Dropdown');
    expect(label).toHaveClass('Mui-required');
  });

  it('disables options marked as disabled', async () => {
    render(<Dropdown {...defaultProps} />);

    fireEvent.mouseDown(screen.getByRole('combobox'));
    await screen.findByText('Option 3');
    const disabledOption = screen.getByText('Option 3').closest('li');
    expect(disabledOption).toHaveAttribute('aria-disabled', 'true');
  });

  it('works with non-string values', async () => {
    const mockOnChange = vi.fn();
    render(
      <Dropdown<number>
        label="Number Dropdown"
        options={mockNumberOptions}
        value={1}
        onChange={mockOnChange}
      />
    );

    fireEvent.mouseDown(screen.getByRole('combobox'));
    await screen.findByText('Two');
    fireEvent.click(screen.getByText('Two'));

    expect(mockOnChange).toHaveBeenCalledWith(2);
  });

  it('displays placeholder text when no value is selected', () => {
    render(<Dropdown {...defaultProps} placeholder="Select an option" />);

    expect(screen.getByPlaceholderText('Select an option')).toBeInTheDocument();
  });

  it('respects the size prop', () => {
    const { container } = render(<Dropdown {...defaultProps} size="small" />);

    expect(
      container.querySelector('.MuiInputBase-sizeSmall')
    ).toBeInTheDocument();
  });

  it('takes full width when fullWidth prop is true', () => {
    const { container } = render(
      <Dropdown {...defaultProps} fullWidth={true} />
    );

    expect(
      container.querySelector('.MuiFormControl-fullWidth')
    ).toBeInTheDocument();
  });
});
