import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PerPage } from './index';
import { ThemeProvider } from '@mui/material';
import { theme } from '../theme/theme';

describe('PerPage Component', () => {
  const defaultProps = {
    perPage: 10,
    perPageOptions: [10, 25, 50, 100],
    onPerPageChange: vi.fn(),
  };

  const renderWithTheme = (props = defaultProps) => {
    return render(
      <ThemeProvider theme={theme}>
        <PerPage {...props} />
      </ThemeProvider>
    );
  };

  it('renders correctly with default props', () => {
    renderWithTheme();
    expect(screen.getByText('Show per page:')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('displays all page options in the select', () => {
    renderWithTheme();
    const selectElement = screen.getByRole('button');
    fireEvent.mouseDown(selectElement);

    defaultProps.perPageOptions.forEach((option) => {
      expect(screen.getByText(option.toString())).toBeInTheDocument();
    });
  });

  it('calls onPerPageChange when a new value is selected', () => {
    renderWithTheme();
    const selectElement = screen.getByRole('button');
    fireEvent.mouseDown(selectElement);

    const newOption = screen.getByText('25');
    fireEvent.click(newOption);

    expect(defaultProps.onPerPageChange).toHaveBeenCalledWith(25);
  });

  it('shows the current perPage value', () => {
    const customProps = {
      ...defaultProps,
      perPage: 50,
    };
    renderWithTheme(customProps);
    expect(screen.getByText('50')).toBeInTheDocument();
  });
});
