export type SnackbarProps = {
  open: boolean;
  onClose: () => void;
  message: string;
  action?: React.ReactNode;
  severity?: Severity;
  vertical?: 'top' | 'bottom';
  horizontal?: 'left' | 'center' | 'right';
  closeable?: boolean;
  duration?: number;
  notify?: boolean;
};

type Severity = 'success' | 'error' | 'info' | 'warning';

export type StyledBoxProps = {
  severity?: Severity;
  notify?: boolean;
};
