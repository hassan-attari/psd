import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme/theme';
import { Loading, LoadingDot } from '.';
import '@testing-library/jest-dom';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('LoadingDot Component', () => {
  it('renders 5 animated dots', () => {
    render(<LoadingDot color="#000" width={10} height={10} />);
    const dots = screen.getAllByTestId('loading-dot');
    expect(dots.length).toBe(5);
  });
});

describe('Loading Component', () => {
  it('should render loading modal when open is true', () => {
    renderWithTheme(<Loading open={true} />);
    const modal = screen.getByRole('presentation');
    expect(modal).toBeInTheDocument(); // ✅ این الان کار می‌کنه
  });

  it('should not render loading modal when open is false', () => {
    renderWithTheme(<Loading open={false} />);
    const modal = screen.queryByRole('presentation');
    expect(modal).toBeNull();
  });
});
