import { Button } from '../../components';
import { Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../components/theme/theme';

const typographyClasses = [
  'text-xs-regular',
  'text-xs-medium',
  'text-xs-semibold',
  'text-xs-bold',
  'text-sm-regular',
  'text-sm-medium',
  'text-sm-semibold',
  'text-sm-bold',
  'text-md-regular',
  'text-md-medium',
  'text-md-semibold',
  'text-md-bold',
  'text-lg-regular',
  'text-lg-medium',
  'text-lg-semibold',
  'text-lg-bold',
  'text-xl-regular',
  'text-xl-medium',
  'text-xl-semibold',
  'text-xl-bold',
  'text-2xl-regular',
  'text-2xl-medium',
  'text-2xl-semibold',
  'text-2xl-bold',
  'text-3xl-regular',
  'text-3xl-medium',
  'text-3xl-semibold',
  'text-3xl-bold'
];

export const Login = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button />
        <div>
          {typographyClasses.map((className, index) => (
            <Typography key={index} className={className}>
               Dashboard sample text
            </Typography>
          ))}
        </div>
      </div>
    </ThemeProvider>
  );
};
