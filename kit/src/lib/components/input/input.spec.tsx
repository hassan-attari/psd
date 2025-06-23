import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { Input } from '.';

describe('Input Component', () => {
  const mockOnChange = vi.fn();

  // ✅ Reset the mock before each test to avoid cross-test call contamination
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders basic input correctly', () => {
    render(
      <Input
        name="test-input"
        label="Test Label"
        placeholder="Test Placeholder"
        value=""
        handleOnChange={mockOnChange}
      />
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Test Placeholder')).toBeInTheDocument();
  });

  test('shows required indicator when required', () => {
    render(
      <Input
        name="required-input"
        label="Required Field"
        required
        value=""
        handleOnChange={mockOnChange}
      />
    );

    expect(screen.getByLabelText('Required Field *')).toBeInTheDocument();
  });

  test('handles value changes', () => {
    render(
      <Input
        name="change-input"
        label="Change Test"
        value=""
        handleOnChange={mockOnChange}
      />
    );

    const input = screen.getByLabelText('Change Test');
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(mockOnChange).toHaveBeenCalledWith('new value');
  });

  test('formats numbers with commas when hasNumberSeparator is true', () => {
    const { rerender } = render(
      <Input
        name="number-input"
        label="Number Input"
        hasNumberSeparator
        value="1000000"
        handleOnChange={mockOnChange}
      />
    );

    expect(screen.getByLabelText('Number Input')).toHaveValue('1,000,000');

    rerender(
      <Input
        name="number-input"
        label="Number Input"
        hasNumberSeparator
        value="1234.56"
        handleOnChange={mockOnChange}
      />
    );
    expect(screen.getByLabelText('Number Input')).toHaveValue('1,234.56');
  });

  test('removes commas when changing value with hasNumberSeparator', () => {
    render(
      <Input
        name="number-input"
        label="Number Input"
        hasNumberSeparator
        value=""
        handleOnChange={mockOnChange}
      />
    );

    const input = screen.getByLabelText('Number Input');
    fireEvent.change(input, { target: { value: '1,234,567' } });
    expect(mockOnChange).toHaveBeenCalledWith('1234567');
  });

  test('prevents invalid characters in number input', () => {
    render(
      <Input
        name="number-input"
        label="Number Input"
        hasNumberSeparator
        value="100"
        handleOnChange={mockOnChange}
      />
    );

    const input = screen.getByLabelText('Number Input');
    fireEvent.keyDown(input, { key: 'e' });
    fireEvent.keyDown(input, { key: '+' });

    // ✅ This should now pass because the mock is reset before this test
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  test('shows error state correctly', () => {
    render(
      <Input
        name="error-input"
        label="Error Input"
        hasError
        guidMessage="Invalid input"
        value=""
        handleOnChange={mockOnChange}
      />
    );

    expect(screen.getByText('Invalid input')).toBeInTheDocument();
    expect(screen.getByTestId('ErrorOutlineIcon')).toBeInTheDocument();
  });

  test('displays icons correctly', () => {
    render(
      <Input
        name="icon-input"
        label="Icon Input"
        startIcon={<span data-testid="start-icon">$</span>}
        endIcon={<span data-testid="end-icon">USD</span>}
        value=""
        handleOnChange={mockOnChange}
      />
    );

    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  });

  test('handles disabled state', () => {
    render(
      <Input
        name="disabled-input"
        label="Disabled Input"
        disabled
        value=""
        handleOnChange={mockOnChange}
      />
    );

    expect(screen.getByLabelText('Disabled Input')).toBeDisabled();
  });

  test('handles focus and blur events', () => {
    const mockOnFocus = vi.fn();
    const mockOnBlur = vi.fn();

    render(
      <Input
        name="focus-input"
        label="Focus Input"
        value=""
        onFocus={mockOnFocus}
        onBlur={mockOnBlur}
        handleOnChange={mockOnChange}
      />
    );

    const input = screen.getByLabelText('Focus Input');
    fireEvent.focus(input);
    expect(mockOnFocus).toHaveBeenCalled();

    fireEvent.blur(input);
    expect(mockOnBlur).toHaveBeenCalled();
  });
});
