import { Theme } from '@mui/material';
import palette from './palette';
function applyAlpha(color: string, alpha: number) {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
export const customShadows = [
  'none',
  `0px 6px 10px 0px ${applyAlpha(palette.black.main, 0.06)}`,
  `0px 10px 20px 0px ${applyAlpha(palette.black.main, 0.08)}`,
  `0px 14px 30px 0px ${applyAlpha(palette.black.main, 0.1)}`,
  `0px 18px 40px 0px ${applyAlpha(palette.black.main, 0.12)}`,
  `0px 22px 50px 0px ${applyAlpha(palette.black.main, 0.14)}`,
  `0px 26px 60px 0px ${applyAlpha(palette.black.main, 0.16)}`,
  ...Array(18).fill('none'),
] as Theme['shadows'];
