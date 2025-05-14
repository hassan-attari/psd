import { ReactNode } from 'react';

export type ThemeType = {
  colorSchemes: {
    light: typeof lightColorScheme;
    dark: typeof lightColorScheme;
  };
  palette: {
    colorScheme: 'light' | 'dark';
  } & (typeof lightColorScheme)['palette'];
} & ReturnType<typeof prepareCssVars> & { colorSchemeSelector: string };

export interface ThemeProviderProps {
  children: ReactNode;
}
