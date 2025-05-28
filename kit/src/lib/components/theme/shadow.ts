import { Theme } from '@mui/material';
export const customShadows = [
  'none',
  '0px 6px 10px 0px #0000000F',
  '0px 10px 20px 0px #00000014',
  '0px 14px 30px 0px #0000001A',
  '0px 18px 40px 0px #0000001F',
  '0px 22px 50px 0px #00000024',
  '0px 26px 60px 0px #00000029',
  ...Array(18).fill('none'),
] as Theme['shadows'];
