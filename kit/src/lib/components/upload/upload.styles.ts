import styled from '@emotion/styled';
import { Paper, LinearProgress, Typography } from '@mui/material';

interface StyledPaperProps {
  isDragging: boolean;
  isUploading: boolean;
}

export const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'isDragging' && prop !== 'isUploading',
})<StyledPaperProps>`
  padding: 32px;
  text-align: center;
  cursor: pointer;
  border: 2px dashed ${({ theme }) => theme.palette.gray.normalHover};
  border-radius: 10px;
  box-shadow: none;
`;

export const StyledUploadAreaContent = styled.div`
  margin-top: 16px;
`;

export const StyledProgressContainer = styled.div`
  margin-top: 24px;
`;

export const StyledProgressText = styled(Typography)`
  margin-top: 8px;
  text-align: center;
`;

export const StyledLinearProgress = styled(LinearProgress)`
  height: 8px;
  border-radius: 4px;
`;
