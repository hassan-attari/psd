import palette from './palette';

export const dropdownStyleOverrides = {
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: palette.gray.darker,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: palette.gray.darker,
        },
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      root: {
        borderRadius: '0.625rem',
      },
      select: {
        padding: '0.625rem 1.25rem',
        '&.MuiInputBase-inputSizeSmall': {
          padding: '0.5rem 0.8rem',
        },
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
  MuiList: {
    styleOverrides: {
      root: {
        maxHeight: '11.75rem',
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        top: '-5px',
        '&.MuiInputLabel-sizeSmall': {
          top: '0',
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: '0.625rem',
        scrollbarColor: palette.gray.main,
        '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
          backgroundColor: palette.gray.lightActive,
          width: '0.38rem',
          borderRadius: '0.625rem',
        },
        '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
          backgroundColor: palette.gray.main,
          borderRadius: '0.625rem',
        },
      },
    },
  },
};
