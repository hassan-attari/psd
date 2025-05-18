import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme/theme';
import { Typography } from '@mui/material';

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

const renderWithTheme = (component: React.ReactNode) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('Typography Component', () => {
  it('should render all typography variants', () => {
    renderWithTheme(
      <div>
        {typographyClasses.map((className, index) => (
          <Typography key={index} className={className}>
            {className} - Dashboard sample text
          </Typography>
        ))}
      </div>
    );
    const textElements = screen.getAllByText(/Dashboard sample text/);
    expect(textElements).toHaveLength(28);
  });

  it('should apply correct classes to typography elements', () => {
    renderWithTheme(
      <div>
        {typographyClasses.map((className, index) => (
          <Typography key={index} className={className}>
            {className} - Dashboard sample text
          </Typography>
        ))}
      </div>
    );
    const textElements = screen.getAllByText(/Dashboard sample text/);
    
    expect(textElements[0]).toHaveClass('text-xs-regular');
    expect(textElements[1]).toHaveClass('text-xs-medium');
    expect(textElements[2]).toHaveClass('text-xs-semibold');
    expect(textElements[3]).toHaveClass('text-xs-bold');
  });

  it('should render with correct text content', () => {
    renderWithTheme(
      <div>
        {typographyClasses.map((className, index) => (
          <Typography key={index} className={className}>
            {className} - Dashboard sample text
          </Typography>
        ))}
      </div>
    );
    const textElements = screen.getAllByText(/Dashboard sample text/);
    textElements.forEach((element, index) => {
      expect(element).toHaveTextContent(`${typographyClasses[index]} - Dashboard sample text`);
    });
  });
});