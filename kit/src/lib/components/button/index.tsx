import React from 'react';
import { LoadingDot } from '../loading';
import { HiddenContent, LoaderWrapper, StyledButton } from './button.styles';
import { LoadingButtonProps } from './button';
import { theme } from '../theme/theme';

export const Button: React.FC<LoadingButtonProps> = ({
  loading = false,
  children = '',
  variant = 'contained',
  color = 'primary',
  ...props
}) => {
  return (
    <StyledButton variant={variant} color={color} {...props}>
      {loading ? (
        <>
          <HiddenContent>{children}</HiddenContent>
          <LoaderWrapper>
            <LoadingDot
              color={theme.palette.common.white}
              width={5}
              height={5}
            />
          </LoaderWrapper>
        </>
      ) : (
        children
      )}
    </StyledButton>
  );
};
