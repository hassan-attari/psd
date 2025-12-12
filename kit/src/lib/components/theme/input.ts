import palette from './palette';

const MuiInput = {
  styleOverrides: {
    root: {
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#1976d2',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#1976d2',
      },
      '&.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#d32f2f',
      },
      '&.Mui-error .MuiOutlinedInput-notchedOutline': {
        borderColor: '#d32f2f',
      },
    },
    input: {
      textAlign: 'right',
      '&::placeholder': {
        textAlign: 'right',
        direction: 'rtl',
      },
    },
  },
};

export default MuiInput;
