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
        backgroundColor: palette.error.light,
        color: palette.error.main,
      },
      '&.MuiChip-colorWarning': {
        backgroundColor: palette.warning.lightHover,
        color: palette.warning.main,
      },
      '&.MuiChip-colorSuccess': {
        backgroundColor: palette.success.light,
        color: palette.success.main,
      },
      '&.MuiChip-colorDefault': {
        backgroundColor: palette.gray.lightActive,
        color: palette.gray.darkActive,
      },
    },
  },
};
