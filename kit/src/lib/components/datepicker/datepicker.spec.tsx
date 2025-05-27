import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DatePicker } from './index';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';
import { faIR } from 'date-fns-jalali/locale';

describe('DatePicker Component', () => {
  const mockOnChange = vi.fn();
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const renderDatePicker = (props = {}) => {
    return render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Test Date"
          value={null}
          onChange={mockOnChange}
          {...props}
        />
      </LocalizationProvider>
    );
  };

  it('renders with default props', () => {
    renderDatePicker();
    expect(screen.getByLabelText('Test Date')).toBeInTheDocument();
  });

  it('calls onChange when date is selected', () => {
    renderDatePicker();
    const input = screen.getByLabelText('Test Date');
    fireEvent.change(input, { target: { value: '05/27/2023' } });
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('displays error state and helper text', () => {
    renderDatePicker({
      error: true,
      helperText: 'Invalid date',
    });
    expect(screen.getByText('Invalid date')).toBeInTheDocument();
    expect(screen.getByText('Invalid date')).toHaveClass('Mui-error');
  });

  it('respects minDate prop', () => {
    renderDatePicker({ minDate: today });
    const input = screen.getByLabelText('Test Date');
    fireEvent.change(input, {
      target: { value: yesterday.toLocaleDateString() },
    });
    expect(mockOnChange).toHaveBeenCalledWith(today);
  });

  it('respects maxDate prop', () => {
    renderDatePicker({ maxDate: today });
    const input = screen.getByLabelText('Test Date');
    fireEvent.change(input, {
      target: { value: tomorrow.toLocaleDateString() },
    });
    expect(mockOnChange).toHaveBeenCalledWith(today);
  });

  it('renders in disabled state', () => {
    renderDatePicker({ disabled: true });
    const input = screen.getByLabelText('Test Date');
    expect(input).toBeDisabled();
  });

  it('renders with required indicator', () => {
    renderDatePicker({ required: true });
    expect(screen.getByLabelText('Test Date')).toHaveAttribute(
      'aria-required',
      'true'
    );
  });

  it('uses jalali calendar when specified', () => {
    render(
      <LocalizationProvider
        dateAdapter={AdapterDateFnsJalali}
        adapterLocale={faIR}
      >
        <DatePicker
          label="Jalali Date"
          value={null}
          onChange={mockOnChange}
          calendarType="jalali"
        />
      </LocalizationProvider>
    );
    expect(screen.getByLabelText('Jalali Date')).toBeInTheDocument();
  });

  it('handles null value safely', () => {
    renderDatePicker({ value: null });
    const input = screen.getByLabelText('Test Date');
    expect(input).toHaveValue('');
  });

  it('applies fullWidth style when specified', () => {
    const { container } = renderDatePicker({ fullWidth: true });
    const formControl = container.querySelector('.MuiFormControl-root');
    expect(formControl).toHaveClass('MuiFormControl-fullWidth');
  });

  it('renders with different sizes', () => {
    const { rerender } = renderDatePicker({ size: 'small' });
    let input = screen.getByLabelText('Test Date');
    expect(input).toHaveClass('MuiInputBase-sizeSmall');

    rerender(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Test Date"
          value={null}
          onChange={mockOnChange}
          size="medium"
        />
      </LocalizationProvider>
    );
    input = screen.getByLabelText('Test Date');
    expect(input).not.toHaveClass('MuiInputBase-sizeSmall');
  });
});
