import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Box, Modal } from '@mui/material';

// انیمیشن نقطه‌ها
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

// هر نقطه
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

// کانتینر دایره‌ای دور نقطه‌ها
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
`;

// مرکز دهنده به Modal
export const ModalContent = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  z-index: 1000;
`;

export const StyledModal = styled(Modal)`
  .MuiBackdrop-root {
    background-color: ${({ theme }) => `${theme.palette.white.main}E9`}; /* 90% opacity */
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px); /* برای Safari */
  }
`;