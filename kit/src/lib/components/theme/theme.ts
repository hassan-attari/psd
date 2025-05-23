import { createTheme } from '@mui/material';
import { typographyStyleOverrides } from './typography';
import palette from './palette';

export const theme = createTheme({
  palette: {
    grey: {
      '100': '#F0F0F0',
      '200': '#eeeeee',
      '300': '#e0e0e0',
      '400': '#bdbdbd',
      '500': '#9e9e9e',
      '600': '#757575',
      '700': '#616161',
      '800': '#424242',
      '900': '#212121',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiTypography: {
      styleOverrides: typographyStyleOverrides,
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#4caf50', // Green border on hover
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#2196f3', // Blue border on focus
            borderWidth: '2px',
          },
        },
      },
    },
    MuiSelect: {
      // Select component
      styleOverrides: {
        // Overrides for select component
        root: {
          borderRadius: '0.625rem',
        },
        select: {
          // Select element
          padding: '0.625rem 1.25rem',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: palette.gray.lightActive,
            '&:hover': {
              backgroundColor: palette.gray.lightActive, // Slightly darker on hover
            },
          },
          fontSize: '.8rem',
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '0.625rem',
        },
      },
    },
  },
});
