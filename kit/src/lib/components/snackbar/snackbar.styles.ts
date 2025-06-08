import { Box } from '@mui/material';
import styled from '@emotion/styled';
import { StyledBoxProps } from './snackbar';

export const StyledBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'notify',
})<StyledBoxProps>`
  background-color: ${({ theme, severity, notify }) =>
    notify
      ? theme.palette.gray.darkActive
      : severity
      ? theme.palette[severity].main
      : theme.palette.common.white};
  color: ${({ theme, severity, notify }) =>
    notify && severity
      ? theme.palette[severity].lightActive
      : severity
      ? theme.palette.common.white
      : theme.palette.text.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  padding: 8.5px 16px;
  border-radius: 10px;
`;
