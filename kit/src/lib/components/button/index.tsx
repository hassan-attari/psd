/** @jsxImportSource @emotion/react */
import React from 'react';
import { LoadingDot } from '../loading';
import { HiddenContent, LoaderWrapper, StyledButton } from './button.styles';
import { LoadingButtonProps } from './button';



export const Button: React.FC<LoadingButtonProps> = ({
  loading = false,
  children = 'nasi',
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
            <LoadingDot color="#ffffff" width={5} height={5} />
          </LoaderWrapper>
        </>
      ) : (
        children
      )}
    </StyledButton>
  );
};
