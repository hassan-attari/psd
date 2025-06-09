import React from 'react';
import { ModalProps, DialogType } from './modal';
import {
  IconWrapper,
  StyledDialog,
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogTitle,
  StyledCheckCircle,
  StyledError,
  StyledCancel,
  StyledButton,
} from './modal.style';
import { theme } from '../theme/theme';

const dialogConfig: Record<
  DialogType,
  { icon: React.ReactNode; color: string }
> = {
  success: {
    icon: <StyledCheckCircle color="success" />,
    color: theme.palette.success.main,
  },
  attention: {
    icon: <StyledError color="warning" />,
    color: theme.palette.warning.main,
  },
  warning: {
    icon: <StyledCancel color="error" />,
    color: theme.palette.error.main,
  },
};

export const Modal: React.FC<ModalProps> = ({
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
        <StyledButton onClick={onClose} variant="outlined">
          Cancel
        </StyledButton>
        <StyledButton onClick={onAccept} variant="contained" autoFocus>
          Accept
        </StyledButton>
      </StyledDialogActions>
    </StyledDialog>
  );
};
