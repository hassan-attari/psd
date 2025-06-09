import { styled } from '@mui/material/styles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
} from '@mui/material';
import { DialogType } from './modal';
import { CheckCircle, Error, Cancel } from '@mui/icons-material';
import palette from '../theme/palette';

export const StyledDialog = styled(Dialog, {
  shouldForwardProp: (prop) => prop !== 'dialogtype',
})<{ dialogtype: DialogType }>`
  & .MuiDialog-paper {
    border-radius: 16px;
    padding: ${({ theme }) => theme.spacing(1)};
    text-align: center;
    width: 440px;

    ${({ dialogtype }) => {
      switch (dialogtype) {
        case 'success':
          return `background: linear-gradient(359.82deg, ${palette.white.main} 77.57%, ${palette.success.light} 116.37%);`;
        case 'attention':
          return `background: linear-gradient(359.82deg, ${palette.white.main} 77.57%, ${palette.warning.light} 116.37%);`;
        case 'warning':
          return `background: linear-gradient(359.82deg, ${palette.white.main} 77.57%, ${palette.error.light} 116.37%);`;
        default:
          return `background: ${palette.white.main};`;
      }
    }}

    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }
`;

export const IconWrapper = styled(IconButton)`
  width: 48px;
  height: 48px;
  margin: ${({ theme }) => theme.spacing(2, 'auto', 0)};
`;

export const StyledDialogTitle = styled(DialogTitle)`
  font-weight: bold;
  padding-top: ${({ theme }) => theme.spacing(1)};
`;

export const StyledDialogContent = styled(DialogContent)`
  padding-bottom: 29px;
  text-align: Left;
`;

export const StyledDialogActions = styled(DialogActions)`
  justify-content: end;
  gap: ${({ theme }) => theme.spacing(1)};
`;

export const StyledCheckCircle = styled(CheckCircle)`
  font-size: 32px;
  background-color: ${palette.success.light};
  border-radius: 100%;
  padding: 5px;
`;

export const StyledError = styled(Error)`
  font-size: 32px;
  background-color: ${palette.warning.light};
  border-radius: 100%;
  padding: 5px;
`;

export const StyledCancel = styled(Cancel)`
  font-size: 32px;
  background-color: ${palette.error.light};
  border-radius: 100%;
  padding: 5px;
`;

export const StyledButton = styled(Button)`
  border-radius: 8px;
  width: 100px;
`;
