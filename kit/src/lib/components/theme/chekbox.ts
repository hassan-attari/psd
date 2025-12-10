import palette from './palette';

export const checkboxStyleOverrides = {
  styleOverrides: {
    root: {
      color: palette.text.secondary,
      '&.Mui-checked': {
        color: palette.primary.main,
      },
    },
  },
};
