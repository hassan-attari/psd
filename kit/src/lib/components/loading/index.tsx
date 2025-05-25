import React from 'react';
import { Dot, DotsWrapper, ModalContent, StyledModal } from './loading.styles';
import { LoadingDotProps, LoadingProps } from './loading';
import { theme } from '../theme/theme';

export const LoadingDot: React.FC<LoadingDotProps> = ({
  color,
  width,
  height,
}) => (
  <>
    {[0, 1, 2, 3, 4].map((_, i) => (
      <Dot key={i} index={i} color={color} width={width} height={height} />
    ))}
  </>
);

export const Loading: React.FC<LoadingProps> = ({ open }) => {
  return (
    <StyledModal
      open={open}
      aria-labelledby="loading-indicator"
      aria-describedby="loading-indicator-description"
    >
      <ModalContent>
        <DotsWrapper>
          <LoadingDot color={theme.palette.custom.loader} width={10} height={10} />
        </DotsWrapper>
      </ModalContent>
    </StyledModal>
  );
};
