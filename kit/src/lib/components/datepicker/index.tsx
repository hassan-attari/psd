import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormHelperText, FormControl } from '@mui/material';
import { isBefore, isAfter } from 'date-fns';
import { faIR } from 'date-fns-jalali/locale';
import { DatePickerProps } from './datepicker';

export const DatePicker: React.FC<DatePickerProps> = ({
  label = 'Select Date',
  value,
  onChange,
  minDate,
  maxDate,
  disabled = false,
  error,
  helperText,
  fullWidth = false,
  required,
  size = 'medium',
  calendarType,
}) => {
  const handleDateChange = (newValue: Date | null) => {
    if (newValue) {
      if (minDate && isBefore(newValue, minDate)) {
        onChange(minDate);
        return;
      }
      if (maxDate && isAfter(newValue, maxDate)) {
        onChange(maxDate);
        return;
      }
    }
    onChange(newValue);
  };

  const shouldDisableDate = (date: Date) => {
    if (minDate && isBefore(date, minDate)) {
      return true;
    }
    if (maxDate && isAfter(date, maxDate)) {
      return true;
    }
    return false;
  };

  return (
    <FormControl
      size={size}
      error={error}
      fullWidth={fullWidth}
      disabled={disabled}
      required={required}
    >
      <LocalizationProvider
        dateAdapter={
          calendarType === 'jalali' ? AdapterDateFnsJalali : AdapterDateFns
        }
        adapterLocale={calendarType === 'jalali' ? faIR : undefined}
      >
        <MuiDatePicker
          label={label}
          value={value}
          onChange={handleDateChange}
          minDate={minDate}
          maxDate={maxDate}
          shouldDisableDate={shouldDisableDate}
          disabled={disabled}
          readOnly={disabled}
        />
        {helperText && (
          <FormHelperText error={error}>{helperText}</FormHelperText>
        )}
      </LocalizationProvider>
    </FormControl>
  );
};
