import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Switch } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@dashboard/kit';

describe('Toggle Component', () => {
  const renderWithTheme = (component: React.ReactNode) => {
    return render(
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    );
  };

  it('renders toggle', () => {
    renderWithTheme(<Switch />);
    const toggle = screen.getByRole('checkbox');
    expect(toggle).toBeInTheDocument();
  });

  it('renders disabled toggle', () => {
    renderWithTheme(<Switch disabled />);
    const toggle = screen.getByRole('checkbox');
    expect(toggle).toBeDisabled();
  });

  it('renders checked toggle', () => {
    renderWithTheme(<Switch defaultChecked />);
    const toggle = screen.getByRole('checkbox');
    expect(toggle).toBeChecked();
  });


  it('renders disabled and checked toggle', () => {
    renderWithTheme(<Switch disabled defaultChecked />);
    const toggle = screen.getByRole('checkbox');
    expect(toggle).toBeDisabled();
    expect(toggle).toBeChecked();
  });

});
