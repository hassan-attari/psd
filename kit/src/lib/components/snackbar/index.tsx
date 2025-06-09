import { IconButton, SnackbarCloseReason } from '@mui/material';
import SnackbarComponent from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import InfoIcon from '@mui/icons-material/Info';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { StyledBox } from './snackbar.styles';
import { SnackbarProps } from './snackbar';

const getIconForSeverity = (severity: SnackbarProps['severity']) => {
  switch (severity) {
    case 'success':
      return <CheckCircleIcon fontSize="small" />;
    case 'error':
      return <CancelIcon fontSize="small" />;
    case 'info':
      return <InfoIcon fontSize="small" />;
    case 'warning':
      return <ReportProblemIcon fontSize="small" />;
    default:
      return null;
  }
};

export const Snackbar = ({
  open,
  onClose,
  message,
  action,
  severity,
  vertical = 'bottom',
  horizontal = 'right',
  closeable = true,
  duration = 3000,
  notify = false,
}: SnackbarProps) => {
  const handleClose = (
    _: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') return;
    onClose();
  };

  return (
    <SnackbarComponent
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{ vertical, horizontal }}
      action={action}
    >
      <StyledBox
        severity={severity}
        boxShadow={(theme) => theme.shadows[3]}
        notify={notify}
      >
        {getIconForSeverity(severity)}
        {message}
        {action}
        {closeable && (
          <IconButton
            aria-label="close"
            color="inherit"
            onClick={handleClose}
            size="small"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </StyledBox>
    </SnackbarComponent>
  );
};
