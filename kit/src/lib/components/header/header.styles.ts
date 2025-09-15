import styled from '@emotion/styled';
import { AppBar, Typography, Toolbar, IconButton, Box } from '@mui/material';
import palette from '../theme/palette';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

export const StyledHeader = styled(AppBar)<{ customcolor?: string }>`
  position: static;
  box-shadow: none;
  border: 1px solid ${palette?.gray?.lightActive};
  border-radius: 10px;
  padding: 0;
  min-height: 71px !important;
  background-color: ${palette?.white?.main};
  background-color: ${({ customcolor }) => customcolor || palette?.white?.main};
`;

export const HeaderTitle = styled(Typography)`
  font-weight: 600;
  font-size: 1.2rem;
`;

export const SuggestionsText = styled(Typography)`
  color: ${palette?.black?.main};
  font-size: 1.5rem;
  font-weight: 600;
`;

export const ToolbarStyle = styled(Toolbar)`
  padding: 0 18px !important;
  min-height: 71px !important;
`;

export const StyledIconsContainer = styled(Box)`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 599px) {
    display: flex;
  }

  @media (min-width: 600px) {
    display: flex;
  }
`;

export const StyledAccountCircle = styled(AccountCircle)`
  color: #bdbdbd;
  width: 49px;
  height: 49px;
`;

export const StyledSettingsIcon = styled(SettingsIcon)`
  color: #505050;
  border-radius: 50%;
  padding: 8px;
  background-color: ${palette?.gray?.lightActive};
  width: 20px;
  height: 20px;
`;

export const StyledNotificationsIcon = styled(NotificationsNoneIcon)`
  color: #505050;
  border-radius: 50%;
  padding: 8px;
  background-color: ${palette?.gray?.lightActive};
  width: 20px;
  height: 20px;
`;

export const StyledSettingsButton = styled(IconButton)`
  padding: 0;
`;

export const StyledNotificationsButton = styled(IconButton)`
  padding: 0;
`;
