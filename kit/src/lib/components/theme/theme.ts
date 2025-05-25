import { createTheme } from '@mui/material';
import { typographyStyleOverrides } from './typography';
import palette from './palette';
import { chipStyleOverrides } from './status';
import MuiButton from './button';

export const theme = createTheme({
  palette: palette,
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiTypography: typographyStyleOverrides,
    MuiChip: chipStyleOverrides,
    MuiButton: MuiButton,
  },
});
