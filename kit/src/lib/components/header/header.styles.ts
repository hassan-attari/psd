import styled from '@emotion/styled';
import { AppBar, Typography, Toolbar } from '@mui/material';
export const StyledHeader = styled(AppBar)`
  position: static;
  box-shadow: none;
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  padding: 0;
  min-height: 71px !important;
`;

export const HeaderTitle = styled(Typography)`
  font-weight: 600;
  font-size: 1.2rem;
`;

export const SuggestionsText = styled(Typography)`
  color: #000000;
  font-size: 1.5rem;
  font-weight: 600;
`;

export const ToolbarStyle = styled(Toolbar)`
  padding: 0 18px !important;
  min-height: 71px !important;
`;
