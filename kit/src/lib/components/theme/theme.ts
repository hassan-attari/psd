import { createTheme } from '@mui/material';
import { typographyStyleOverrides } from './typography';
import palette from './palette';
import { chipStyleOverrides } from './status';
import { checkboxStyleOverrides } from './chekbox';
import { dropdownStyleOverrides } from './dropdown';
import { datepickerStyleOverrides } from './datepicker';
import { formControlStyleOverrides } from './form-control';

export const theme = createTheme({
  palette: palette,
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiTypography: typographyStyleOverrides,
    MuiChip: chipStyleOverrides,
    MuiCheckbox: checkboxStyleOverrides,
    MuiRadio: checkboxStyleOverrides,
    ...dropdownStyleOverrides,
    MuiFormControl: formControlStyleOverrides,
    MuiDayCalendar: datepickerStyleOverrides,
  },
});
