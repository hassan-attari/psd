import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Chip } from '@mui/material';
import { theme } from '../theme/theme';

const renderWithTheme = (component: React.ReactNode) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('Status Chip', () => {
  it('renders primary status chip correctly', () => {
    renderWithTheme(<Chip label="Primary Status" color="primary" />);
    const chip = screen.getByText('Primary Status');
    expect(chip).toBeInTheDocument();
    expect(chip).toHaveClass('MuiChip-colorPrimary');
  });

  it('renders secondary status chip correctly', () => {
    renderWithTheme(<Chip label="Secondary Status" color="secondary" />);
    const chip = screen.getByText('Secondary Status');
    expect(chip).toBeInTheDocument();
    expect(chip).toHaveClass('MuiChip-colorSecondary');
  });

  it('renders error status chip correctly', () => {
    renderWithTheme(<Chip label="Error Status" color="error" />);
    const chip = screen.getByText('Error Status');
    expect(chip).toBeInTheDocument();
    expect(chip).toHaveClass('MuiChip-colorError');
  });

  it('renders warning status chip correctly', () => {
    renderWithTheme(<Chip label="Warning Status" color="warning" />);
    const chip = screen.getByText('Warning Status');
    expect(chip).toBeInTheDocument();
    expect(chip).toHaveClass('MuiChip-colorWarning');
  });

  it('renders success status chip correctly', () => {
    renderWithTheme(<Chip label="Success Status" color="success" />);
    const chip = screen.getByText('Success Status');
    expect(chip).toBeInTheDocument();
    expect(chip).toHaveClass('MuiChip-colorSuccess');
  });

  it('renders default status chip correctly', () => {
    renderWithTheme(<Chip label="Default Status" color="default" />);
    const chip = screen.getByText('Default Status');
    expect(chip).toBeInTheDocument();
    expect(chip).toHaveClass('MuiChip-colorDefault');
  });

  it('applies custom label correctly', () => {
    const customLabel = 'Custom Status Label';
    renderWithTheme(<Chip label={customLabel} color="primary" />);
    const chip = screen.getByText(customLabel);
    expect(chip).toBeInTheDocument();
  });
}); 