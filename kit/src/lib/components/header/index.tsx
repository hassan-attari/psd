import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { theme } from '../theme/theme';
import { StyledHeader, SuggestionsText, ToolbarStyle } from './header.styles';
import { HeaderProps } from './header';
export const Header: React.FC<HeaderProps> = ({ title, ...props }) => {
  return (
    <StyledHeader color={theme.palette.primary.main}>
      <ToolbarStyle>
        <SuggestionsText>{title}</SuggestionsText>
        <Box sx={{ flexGrow: 1 }} />
        <Box display={{ xs: 'flex', md: 'flex' }} gap={1.5}>
          <IconButton
            size="large"
            aria-label="account of current user"
            sx={{
              padding: 0,
            }}
          >
            <AccountCircle color="disabled" sx={{ width: 49, height: 49 }} />
          </IconButton>
          <IconButton
            size="large"
            aria-label="settings"
            sx={{
              padding: 0,
              '& .MuiSvgIcon-root': {
                color: ' #505050',
                borderRadius: '50%',
                padding: '8px',
                backgroundColor: '#F0F0F0',
              },
              '&:hover .MuiSvgIcon-root': {},
            }}
          >
            <SettingsIcon sx={{ width: '20px', height: '20px' }} />
          </IconButton>
          <IconButton
            size="large"
            aria-label="account of current user"
            sx={{
              padding: 0,
              '& .MuiSvgIcon-root': {
                color: ' #505050',
                borderRadius: '50%',
                padding: '8px',
                backgroundColor: '#F0F0F0',
              },
              '&:hover .MuiSvgIcon-root': {},
            }}
          >
            <NotificationsNoneIcon sx={{ width: '20px', height: '20px' }} />
          </IconButton>
        </Box>
      </ToolbarStyle>
    </StyledHeader>
  );
};
