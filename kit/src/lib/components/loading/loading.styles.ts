import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Box, Modal } from '@mui/material';

// Animation for individual dots
export const createDotAnimation = (start: number, end: number) => keyframes`
  0%, ${start}% {
    opacity: 0.4;
    transform: translateY(0);
  }
  ${start + 5}% {
    opacity: 1;
    transform: translateY(-10px);
  }
  ${start + 10}%, ${end}% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0.4;
    transform: translateY(0);
  }
`;

// Individual dot component
export const Dot = styled.div<{
  index: number;
  color?: string;
  width?: number;
  height?: number;
}>`
  width: ${({ width }) => width || 10}px;
  height: ${({ height }) => height || 10}px;
  margin-right: 5px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  opacity: 0.4;
  animation: ${({ index }) => createDotAnimation(index * 10, (index + 1) * 15)}
    1.5s ease-in-out infinite;
  animation-fill-mode: both;
`;

// Container for the dots
export const DotsWrapper = styled.div`
  display: flex;
  gap: 11px;
  justify-content: center;
  align-items: center;
  height: 82px;
  width: 150px;
  border-radius: 30px;
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(227, 237, 253, 0.2) 0%,
    rgba(64, 0, 255, 0.05) 100%
  );
  // Ensure the DotsWrapper itself is visible and has a z-index if needed
  position: relative; // Needed for z-index to work
  z-index: 1001; // Ensure it's above the backdrop
`;

// Centering content for the Modal
export const ModalContent = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // Ensure it takes full height to center the loader
  width: 100vw; // Ensure it takes full width
  position: fixed; // Position fixed relative to viewport
  top: 0;
  left: 0;
  z-index: 1000; // Ensure it's above other page content but below the DotsWrapper if Z-index is used there.
`;

export const StyledModal = styled(Modal)`
  // Apply backdrop styles directly to the backdrop component
  & .MuiBackdrop-root {
    background-color: ${({ theme }) => `${theme.palette.common.white}E9`}; /* White with 90% opacity */
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px); /* For Safari */
    // Ensure it covers the whole screen
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999; // Should be below ModalContent but above page content
  }
`;