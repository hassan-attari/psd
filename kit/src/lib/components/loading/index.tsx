import React from 'react';
import { Modal } from '@mui/material';
import { Dot, DotsWrapper, ModalContent } from './loading.styles';
import { LoadingDotProps, LoadingProps } from './loading';

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
    <Modal
      open={open}
      aria-labelledby="loading-indicator"
      aria-describedby="loading-indicator-description"
      sx={{
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
        },
      }}
    >
      <ModalContent>
        <DotsWrapper>
          <LoadingDot color="#4000ff" width={10} height={10} />
        </DotsWrapper>
      </ModalContent>
    </Modal>
  );
};
