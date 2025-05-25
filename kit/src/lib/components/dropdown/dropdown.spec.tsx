import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Dropdown } from './index';
import '@testing-library/jest-dom/vitest';

describe('Dropdown Component', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', disabled: true },
  ];

  const mockOnChange = vi.fn();

  const defaultProps = {
    name: 'test-dropdown',
    label: 'Test Label',
    options,
    value: '',
    onChange: mockOnChange,
  };

  it('renders with basic props', () => {
    render(<Dropdown {...defaultProps} />);

    const select = screen.getByRole('button');
    expect(select).toBeInTheDocument();
  });

  it('displays the label when provided', () => {
    render(<Dropdown {...defaultProps} label="Test Label" />);

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('shows all options when clicked', () => {
    render(<Dropdown {...defaultProps} />);

    fireEvent.mouseDown(screen.getByRole('button'));
    options.forEach((option) => {
      expect(
        screen.getByRole('option', { name: option.label })
      ).toBeInTheDocument();
    });
  });

  it('calls onChange when an option is selected', () => {
    render(<Dropdown {...defaultProps} />);

    fireEvent.mouseDown(screen.getByRole('button'));
    const option = screen.getByRole('option', { name: 'Option 1' });
    fireEvent.click(option);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('displays the current value', () => {
    render(<Dropdown {...defaultProps} value="option2" />);

    expect(screen.getByRole('button')).toHaveTextContent('Option 2');
  });

  it('shows helper text when provided', () => {
    render(<Dropdown {...defaultProps} helperText="Helpful text" />);

    expect(screen.getByText('Helpful text')).toBeInTheDocument();
  });

  it('applies error styling when error is true', () => {
    render(<Dropdown {...defaultProps} error helperText="Error message" />);

    // Better approach using Testing Library
    const helperText = screen.getByText('Error message');
    expect(helperText).toHaveClass('Mui-error');

    // For the FormControl error class
    const formControl = screen.getByTestId('form-control');
    expect(formControl).toHaveClass('Mui-error');
  });

  it('disables the select when disabled is true', () => {
    render(<Dropdown {...defaultProps} disabled />);

    const select = screen.getByRole('button');
    expect(select).toHaveAttribute('aria-disabled', 'true');
  });

  it('marks the field as required when required is true', () => {
    render(<Dropdown {...defaultProps} required label="Required Field" />);

    const label = screen.getByText(/Required Field/);
    expect(label).toHaveTextContent('Required Field *');
  });

  it('disables individual options when specified', () => {
    render(<Dropdown {...defaultProps} />);

    fireEvent.mouseDown(screen.getByRole('button'));
    const disabledOption = screen.getByRole('option', { name: 'Option 3' });
    expect(disabledOption).toHaveAttribute('aria-disabled', 'true');
  });

  it('handles numeric option values', () => {
    const numericOptions = [
      { value: 1, label: 'One' },
      { value: 2, label: 'Two' },
    ];

    render(<Dropdown {...defaultProps} options={numericOptions} value={1} />);

    expect(screen.getByRole('button')).toHaveTextContent('One');
  });
});
