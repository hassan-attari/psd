import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Box,
  Typography,
} from '@mui/material';
import { format, parse, isBefore, isAfter } from 'date-fns';
import { faIR } from 'date-fns-jalali/locale';

interface DatePickerWithCalendarSwitchProps {
  label?: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
}

export const DatePickerWithCalendarSwitch: React.FC<
  DatePickerWithCalendarSwitchProps
> = ({
  label = 'Select Date',
  value,
  onChange,
  minDate,
  maxDate,
  disabled = false,
}) => {
  const [calendarType, setCalendarType] = useState<'gregorian' | 'jalali'>(
    'gregorian'
  );

  const handleCalendarChange = (
    event: React.MouseEvent<HTMLElement>,
    newCalendarType: 'gregorian' | 'jalali' | null
  ) => {
    if (newCalendarType !== null) {
      setCalendarType(newCalendarType);
    }
  };

  const handleDateChange = (newValue: Date | null) => {
    if (newValue) {
      // Validate against min/max dates
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

  const formatDateDisplay = (date: Date | null) => {
    if (!date) return '';

    if (calendarType === 'jalali') {
      return format(date, 'yyyy/MM/dd', { locale: faIR });
    }
    return format(date, 'yyyy/MM/dd');
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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <ToggleButtonGroup
        value={calendarType}
        exclusive
        onChange={handleCalendarChange}
        aria-label="calendar type"
        size="small"
        sx={{ alignSelf: 'flex-start' }}
      >
        <ToggleButton value="gregorian" aria-label="gregorian">
          Gregorian
        </ToggleButton>
        <ToggleButton value="jalali" aria-label="jalali">
          Jalali
        </ToggleButton>
      </ToggleButtonGroup>

      <LocalizationProvider
        dateAdapter={
          calendarType === 'jalali' ? AdapterDateFnsJalali : AdapterDateFns
        }
        adapterLocale={calendarType === 'jalali' ? faIR : undefined}
      >
        <DatePicker
          label={label}
          value={value}
          onChange={handleDateChange}
          minDate={minDate}
          maxDate={maxDate}
          shouldDisableDate={shouldDisableDate}
          disabled={disabled}
        />
      </LocalizationProvider>

      {value && (
        <Typography variant="body2">
          Selected date: {formatDateDisplay(value)}
        </Typography>
      )}
    </Box>
  );
};
