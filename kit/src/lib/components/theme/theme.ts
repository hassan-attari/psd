import { createTheme } from '@mui/material';
import { typographyStyleOverrides } from './typography';
import palette from './palette';
import MuiButton from './button';

export const theme = createTheme({
  palette: palette,
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
   
    MuiTypography: {
      styleOverrides: typographyStyleOverrides,
    },
    MuiButton: MuiButton,
    MuiCircularProgress : {
      styleOverrides: {
        root: {
          color: 'red', // your desired color
          width: 16,
          height: 16,
        },
      },
    }
    
  },
});
