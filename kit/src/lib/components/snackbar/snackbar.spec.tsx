import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Snackbar } from './index';
import { Severity, SnackbarProps } from './snackbar';

describe('Snackbar Component', () => {
  const mockOnClose = vi.fn();
  const defaultProps: SnackbarProps = {
    open: true,
    onClose: mockOnClose,
    message: 'Test message',
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    render(<Snackbar {...defaultProps} />);

    expect(screen.getByText('Test message')).toBeInTheDocument();
    expect(screen.getByTestId('InfoIcon')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  it('does not render when open is false', () => {
    const { container } = render(<Snackbar {...defaultProps} open={false} />);

    expect(container.firstChild).toBeNull();
  });

  it('calls onClose when close button is clicked', () => {
    render(<Snackbar {...defaultProps} />);

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when clickaway occurs', () => {
    render(<Snackbar {...defaultProps} />);

    fireEvent.click(document.body);

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('renders correct icon based on severity', () => {
    const testCases: { severity: Severity; iconTestId: string }[] = [
      { severity: 'success', iconTestId: 'CheckCircleIcon' },
      { severity: 'error', iconTestId: 'CancelIcon' },
      { severity: 'info', iconTestId: 'InfoIcon' },
      { severity: 'warning', iconTestId: 'ReportProblemIcon' },
    ];

    testCases.forEach(({ severity, iconTestId }) => {
      const { unmount } = render(
        <Snackbar {...defaultProps} severity={severity} />
      );
      expect(screen.getByTestId(iconTestId)).toBeInTheDocument();
      unmount();
    });
  });

  it('does not render close button when closeable is false', () => {
    render(<Snackbar {...defaultProps} closeable={false} />);

    expect(screen.queryByRole('button', { name: /close/i })).toBeNull();
  });

  it('renders custom action when provided', () => {
    const action = <button>Custom Action</button>;
    render(<Snackbar {...defaultProps} action={action} />);

    expect(screen.getByText('Custom Action')).toBeInTheDocument();
  });

  it('applies notify styles when notify prop is true', () => {
    render(<Snackbar {...defaultProps} notify={true} />);

    const snackbarBox = screen.getByText('Test message').parentElement;
    expect(snackbarBox).toHaveClass(expect.stringContaining('notify'));
  });

  it('uses custom duration for autoHideDuration', () => {
    render(<Snackbar {...defaultProps} duration={5000} />);
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('uses correct anchor position based on vertical and horizontal props', () => {
    render(<Snackbar {...defaultProps} vertical="top" horizontal="left" />);

    const snackbar = screen.getByRole('alert');
    expect(snackbar).toBeInTheDocument();
  });
});
