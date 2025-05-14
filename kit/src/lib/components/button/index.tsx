import MuiButton from '@mui/material/Button';
import styled from '@emotion/styled';

const StyledApp = styled.div`
  // Your style here
`;
export const Button = () => {
  return (
    <StyledApp>
      <div role="navigation"></div>
      <MuiButton variant="outlined">Outlined</MuiButton>
    </StyledApp>
  );
};
