import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from '.';
import { theme } from '../theme/theme';

describe('Header Component', () => {
  const mockTitle = 'Suggestions';

  test('renders header with correct title', () => {
    render(<Header title={mockTitle} />);

    const titleElement = screen.getByText(mockTitle);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(mockTitle);
  });

  test('renders all icon buttons', () => {
    render(<Header title={mockTitle} />);

    const accountButton = screen.getByLabelText('account of current user');
    const settingsButton = screen.getByLabelText('settings');
    const notificationsButton = screen.getByLabelText(
      'account of current user'
    );

    expect(accountButton).toBeInTheDocument();
    expect(settingsButton).toBeInTheDocument();
    expect(notificationsButton).toBeInTheDocument();
  });

  test('renders correct icons', () => {
    render(<Header title={mockTitle} />);

    const accountIcon = screen.getByTestId('AccountCircleIcon');
    const settingsIcon = screen.getByTestId('SettingsIcon');
    const notificationsIcon = screen.getByTestId('NotificationsNoneIcon');

    expect(accountIcon).toBeInTheDocument();
    expect(settingsIcon).toBeInTheDocument();
    expect(notificationsIcon).toBeInTheDocument();
  });

  test('applies correct theme color', () => {
    render(<Header title={mockTitle} />);

    const headerElement = screen.getByRole('banner');
    expect(headerElement).toHaveStyle(`color: ${theme.palette.primary.main}`);
  });
});
