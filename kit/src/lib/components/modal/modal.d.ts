import { DialogProps } from '@mui/material';

export type DialogType = 'success' | 'attention' | 'warning';

export interface AlertDialogProps extends Omit<DialogProps, 'title'> {
  open: boolean;
  type: DialogType;
  title: string;
  onClose: () => void;
  onAccept: () => void;
}
