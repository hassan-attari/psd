import { styled } from '@mui/material/styles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import { DialogType } from './modal';

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
          return `background: linear-gradient(359.82deg, #FFFFFF 77.57%, #E2FFE3 116.37%);`;
        case 'attention':
          return `background: linear-gradient(359.82deg, #FFFFFF 77.57%, #FFEEE2 116.37%);`;
        case 'warning':
          return `background: linear-gradient(359.82deg, #FFFFFF 77.57%, #FFE2E2 116.37%);`;
        default:
          return `background: #fff;`;
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
