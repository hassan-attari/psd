import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import {
  StyledHeader,
  SuggestionsText,
  ToolbarStyle,
  StyledAccountCircle,
  StyledSettingsIcon,
  StyledNotificationsIcon,
  StyledSettingsButton,
  StyledNotificationsButton,
  StyledIconsContainer,
} from './header.styles';
import { HeaderProps } from './header';

export const Header: React.FC<HeaderProps> = ({ title, customcolor }) => {
  return (
    <StyledHeader customcolor={customcolor}>
      <ToolbarStyle>
        <SuggestionsText>{title}</SuggestionsText>
        <Box sx={{ flexGrow: 1 }} />
        <StyledIconsContainer>
          <IconButton size="large" aria-label="account of current user">
            <StyledAccountCircle />
          </IconButton>
          <StyledSettingsButton size="large" aria-label="settings">
            <StyledSettingsIcon />
          </StyledSettingsButton>
          <StyledNotificationsButton
            size="large"
            aria-label="account of current user"
          >
            <StyledNotificationsIcon />
          </StyledNotificationsButton>
        </StyledIconsContainer>
      </ToolbarStyle>
    </StyledHeader>
  );
};
