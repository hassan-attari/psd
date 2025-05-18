import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme/theme';
import TypographyDemo from './index';

const renderWithTheme = (component: React.ReactNode) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('Typography Component', () => {
  it('should render successfully', () => {
    renderWithTheme(<TypographyDemo />);
    const textElements = screen.getAllByText('Dashboard sample text');
    expect(textElements.length).toBeGreaterThan(0);
  });

  it('should render all typography variants', () => {
    renderWithTheme(<TypographyDemo />);
    const textElements = screen.getAllByText('Dashboard sample text');
    expect(textElements).toHaveLength(28);
  });

  it('should apply correct classes to typography elements', () => {
    renderWithTheme(<TypographyDemo />);
    const textElements = screen.getAllByText('Dashboard sample text');
    
    // Check first few elements for their classes
    expect(textElements[0]).toHaveClass('text-xs-regular');
    expect(textElements[1]).toHaveClass('text-xs-medium');
    expect(textElements[2]).toHaveClass('text-xs-semibold');
    expect(textElements[3]).toHaveClass('text-xs-bold');
  });
});