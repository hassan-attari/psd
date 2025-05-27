import palette from './palette';

declare module '@mui/material/styles' {
  interface Components {
    MuiDayCalendar?: {
      styleOverrides?: {
        root?: {
          '& .MuiPickersDay-root'?: {
            '&.Mui-selected'?:
              | {
                  '&:hover'?: React.CSSProperties;
                }
              | React.CSSProperties;
          };
        };
      };
    };
  }
}

export const datepickerStyleOverrides = {
  styleOverrides: {
    root: {
      '& .MuiPickersDay-root': {
        '&.Mui-selected': {
          backgroundColor: palette.secondary.main,
          color: 'white',
          '&:hover': {
            backgroundColor: palette.secondary.normalHover,
          },
        },
      },
    },
  },
};
