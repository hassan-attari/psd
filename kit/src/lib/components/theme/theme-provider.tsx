import { FC } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProviderProps } from './theme.d';
import { theme } from './theme';
// @ts-expect-error - @fontsource/vazir is a CSS-only package without TypeScript definitions
import '@fontsource/vazir';

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};
