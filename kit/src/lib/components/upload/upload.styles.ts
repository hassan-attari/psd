import styled from '@emotion/styled';
import {
  Paper,
  LinearProgress,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from '@mui/material';

interface StyledPaperProps {
  isDragging: boolean;
  isUploading: boolean;
}

export const StyledDialogTitle = styled(DialogTitle)(() => ({
  padding: '0',
}));
export const StyledDialogContent = styled(DialogContent)(() => ({
  padding: '0',
}));

export const StyledDialogActions = styled(DialogActions)(() => ({
  padding: '1.25rem 0 0 0',
}));

export const StyledDialog = styled(Dialog)(() => ({
  '& .MuiDialog-paper': {
    borderRadius: '1.75rem',
    padding: '1.25rem',
  },
}));

export const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'isDragging' && prop !== 'isUploading',
})<StyledPaperProps>`
  padding: 32px;
  text-align: center;
  cursor: pointer;
  border: 2px dashed ${({ theme }) => theme.palette.gray.normalHover};
  border-radius: 10px;
  box-shadow: none;
  height: 126px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledUploadAreaContent = styled.div`
  margin-top: 16px;
`;

export const StyledProgressContainer = styled.div`
  margin-top: 10px;
  background-color: ${({ theme }) => theme.palette.gray.lightHover};
  border-radius: 10px;
  padding: 6px 11px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  & .MuiLinearProgress-root {
    border-radius: 1.25rem;
  }
`;

export const StyledLinearProgress = styled(LinearProgress)`
  height: 8px;
  border-radius: 4px;
`;
