import { createTheme } from '@mui/material';
import { typographyStyleOverrides } from './typography';
import palette from './palette';

export const theme = createTheme({
  palette: palette,
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiTypography: {
      styleOverrides: typographyStyleOverrides,
    },
  },
});
