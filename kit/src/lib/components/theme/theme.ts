import { createTheme } from '@mui/material';
import { typographyStyleOverrides } from './typography';
import palette from './palette';
import { chipStyleOverrides } from './status';
import { checkboxStyleOverrides } from './chekbox';
import { dropdownStyleOverrides } from './dropdown';
import { customShadows } from './shadow';

export const theme = createTheme({
  palette: palette,
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  shadows: customShadows,
  components: {
    MuiTypography: typographyStyleOverrides,
    MuiChip: chipStyleOverrides,
    MuiCheckbox: checkboxStyleOverrides,
    MuiRadio: checkboxStyleOverrides,
    ...dropdownStyleOverrides,
  },
});
