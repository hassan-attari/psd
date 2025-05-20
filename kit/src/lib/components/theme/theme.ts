import { createTheme } from '@mui/material';
import { typographyStyleOverrides } from './typography';
import palette from './palette';
import { chipStyleOverrides } from './status';

export const theme = createTheme({
  palette: palette,
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiTypography: typographyStyleOverrides,
    MuiChip: chipStyleOverrides,
  },
});
