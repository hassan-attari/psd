import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';

export const StyledButton = styled(Button)`
  position: relative;
  overflow: hidden;
`;

export const HiddenContent = styled(Box)`
  visibility: hidden;
`;

export const LoaderWrapper = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
`;
