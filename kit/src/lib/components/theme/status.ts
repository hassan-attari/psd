import palette from './palette';

export const chipStyleOverrides = {
  styleOverrides: {
    root: {
      backgroundColor: palette.primary.light,
      color: palette.primary.main,
      '&.MuiChip-colorPrimary': {
        backgroundColor: palette.primary.light,
        color: palette.primary.main,
      },
      '&.MuiChip-colorSecondary': {
        backgroundColor: palette.secondary.light,
        color: palette.secondary.main,
      },
      '&.MuiChip-colorError': {
        backgroundColor: 'rgba(244, 67, 54, 0.1)',
        color: palette.error.main,
      },
      '&.MuiChip-colorWarning': {
        backgroundColor: palette.warning.light,
        color: palette.warning.main,
      },
      '&.MuiChip-colorSuccess': {
        backgroundColor: palette.success.light,
        color: palette.success.main,
      },
      '&.MuiChip-colorDefault': {
        backgroundColor: palette.gray.dark,
        color: palette.gray.light,
      },
    },
  },
};
