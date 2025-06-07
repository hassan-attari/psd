import React from 'react';
import { AlertDialogProps, DialogType } from './modal';
import {
  IconWrapper,
  StyledDialog,
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogTitle,
} from './modal.style';
import { theme } from '../theme/theme';
import { Cancel, CheckCircle, Error } from '@mui/icons-material';
import { Button } from '../button';

const dialogConfig: Record<
  DialogType,
  { icon: React.ReactNode; color: string }
> = {
  success: {
    icon: (
      <CheckCircle
        color="success"
        sx={{
          fontSize: 32,
          backgroundColor: '#E2FFE3',
          borderRadius: '100%',
          padding: '5px',
        }}
      />
    ),
    color: theme.palette.success.main,
  },
  attention: {
    icon: (
      <Error
        color="warning"
        sx={{
          fontSize: 32,
          backgroundColor: '#FFEEE2',
          borderRadius: '100%',
          padding: '5px',
        }}
      />
    ),
    color: theme.palette.warning.main,
  },
  warning: {
    icon: (
      <Cancel
        color="error"
        sx={{
          fontSize: 32,
          backgroundColor: '#FFE2E2',
          borderRadius: '100%',
          padding: '5px',
        }}
      />
    ),
    color: theme.palette.error.main,
  },
};

export const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  type = 'success',
  title,
  children,
  onClose,
  onAccept,
  ...props
}) => {
  const config = dialogConfig?.[type];
  if (!config) {
    return null;
  }

  return (
    <StyledDialog open={open} onClose={onClose} {...props} dialogtype={type}>
      <IconWrapper disableRipple>{config.icon}</IconWrapper>

      <StyledDialogTitle>{title}</StyledDialogTitle>

      <StyledDialogContent>{children}</StyledDialogContent>

      <StyledDialogActions>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ borderRadius: '8px', width: '100px' }}
        >
          Cancel
        </Button>
        <Button
          onClick={onAccept}
          variant="contained"
          autoFocus
          sx={{ borderRadius: '8px', width: '100px' }}
        >
          Accept
        </Button>
      </StyledDialogActions>
    </StyledDialog>
  );
};
