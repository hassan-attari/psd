import { Typography } from '@mui/material';
import { theme } from '../theme/theme';
import { ThemeProvider } from '@mui/material/styles';

const TypographyDemo: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Typography className="text-xs-regular">Dashboard sample text</Typography>
        <Typography className="text-xs-medium">Dashboard sample text</Typography>
        <Typography className="text-xs-semibold">Dashboard sample text</Typography>
        <Typography className="text-xs-bold">Dashboard sample text</Typography>
        <Typography className="text-sm-regular">Dashboard sample text</Typography>
        <Typography className="text-sm-medium">Dashboard sample text</Typography>
        <Typography className="text-sm-semibold">Dashboard sample text</Typography>
        <Typography className="text-sm-bold">Dashboard sample text</Typography>
        <Typography className="text-md-regular">Dashboard sample text</Typography>
        <Typography className="text-md-medium">Dashboard sample text</Typography>
        <Typography className="text-md-semibold">Dashboard sample text</Typography>
        <Typography className="text-md-bold">Dashboard sample text</Typography>
        <Typography className="text-lg-regular">Dashboard sample text</Typography>
        <Typography className="text-lg-medium">Dashboard sample text</Typography>
        <Typography className="text-lg-semibold">Dashboard sample text</Typography>
        <Typography className="text-lg-bold">Dashboard sample text</Typography>
        <Typography className="text-xl-regular">Dashboard sample text</Typography>
        <Typography className="text-xl-medium">Dashboard sample text</Typography>
        <Typography className="text-xl-semibold">Dashboard sample text</Typography>
        <Typography className="text-xl-bold">Dashboard sample text</Typography>
        <Typography className="text-2xl-regular">Dashboard sample text</Typography>
        <Typography className="text-2xl-medium">Dashboard sample text</Typography>
        <Typography className="text-2xl-semibold">Dashboard sample text</Typography>
        <Typography className="text-2xl-bold">Dashboard sample text</Typography>
        <Typography className="text-3xl-regular">Dashboard sample text</Typography>
        <Typography className="text-3xl-medium">Dashboard sample text</Typography>
        <Typography className="text-3xl-semibold">Dashboard sample text</Typography>
        <Typography className="text-3xl-bold">Dashboard sample text</Typography>
      </div>
    </ThemeProvider>
  );
};

export default TypographyDemo;