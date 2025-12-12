const MuiInputLabel = {
  styleOverrides: {
    root: {
      textAlign: 'right',
      right: 0,
      left: 'auto',
      transformOrigin: 'top right',
      direction: 'rtl',
      '&.MuiInputLabel-shrink': {
        transform: 'translate(14px, -9px) scale(0.75)',
        transformOrigin: 'top right',
      },
      '&.Mui-focused': {
        transformOrigin: 'top right',
      },
    },
    outlined: {
      '&.MuiInputLabel-shrink': {
        transform: 'translate(14px, -9px) scale(0.75)',
        transformOrigin: 'top right',
      },
    },
  },
};

export default MuiInputLabel;
