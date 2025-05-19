import { createTheme } from '@mui/material';
import { lime, purple } from '@mui/material/colors';
import { typographyStyleOverrides } from './typography';

export const theme = createTheme({
  palette: {
    primary: lime,
    secondary: purple,
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiTypography: {
      styleOverrides: typographyStyleOverrides,
    },
  },
});
