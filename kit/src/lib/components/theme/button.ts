import palette from './palette';

const bounceKeyframes = {
  '@keyframes bounce': {
    '0%, 80%, 100%': {
      transform: 'translateY(0)',
    },
    '40%': {
      transform: 'translateY(-6px)',
    },
  },
};

const MuiButton = {
  styleOverrides: {
    ...bounceKeyframes,

    root: {
      
      '&.Mui-loading': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '4px',
        color: palette.white.main,

        '&::before, &::after, & span': {
          content: '""',
          display: 'inline-block',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: 'currentColor',
          animation: 'bounce 0.6s infinite ease-in-out',
        },

        '& span': {
          animationDelay: '0.1s',
        },
        '&::after': {
          animationDelay: '0.2s',
        },
      },
    },

    containedPrimary: {
      backgroundColor: palette.primary.main,
      '&:hover': {
        backgroundColor: palette.primary.normalHover,
      },
      '&:active': {
        backgroundColor: palette.primary.normalActive,
      },
    },
    containedSecondary: {
      backgroundColor: palette.secondary.main,
      color: palette.white.main,
      '&:hover': {
        backgroundColor: palette.secondary.normalHover,
      },
      '&:active': {
        backgroundColor: palette.secondary.normalActive,
      },
    },
    containedError: {
      backgroundColor: palette.error.main,
      '&:hover': {
        backgroundColor: palette.error.normalHover,
      },
      '&:active': {
        backgroundColor: palette.error.normalActive,
      },
      '&.Mui-disabled': {
        backgroundColor: palette.error.light,
        color: palette.error.normalActive,
      },
    },
    containedSuccess: {
      color: palette.white.main,
      backgroundColor: palette.success.main,
      '&:hover': {
        backgroundColor: palette.success.normalHover,
      },
      '&:active': {
        backgroundColor: palette.success.normalActive,
      },
    },
    containedWarning: {
      backgroundColor: palette.warning.main,
      '&:hover': {
        backgroundColor: palette.warning.normalHover,
      },
      '&:active': {
        backgroundColor: palette.warning.normalActive,
      },
    },
  },
};

export default MuiButton;

