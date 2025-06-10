import palette from './palette';

export const dropdownStyleOverrides = {
  styleOverrides: {
    root: {
      '& .MuiInputLabel-root': {
        top: '-5px',
      },
      '& .MuiInputLabel-root.MuiInputLabel-sizeSmall': {
        top: '-2px',
      },
    },
    paper: {
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
    option: {
      padding: '0.375rem 0.875rem',
      '&[aria-selected="true"]': {
        backgroundColor: palette.gray.lightActive + '!important',
      },
    },
    input: {
      padding: '0!important',
    },
    inputRoot: {
      padding: '0.625rem 1.25rem',
      minWidth: '150px',
      borderRadius: '0.625rem',
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: palette.gray.darker,
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: palette.gray.darker,
      },
    },
    listbox: {
      '& .MuiList-root': {
        maxHeight: '11.75rem',
      },
    },
    groupLabel: {
      color: palette.secondary.main,
    },
  },
};
