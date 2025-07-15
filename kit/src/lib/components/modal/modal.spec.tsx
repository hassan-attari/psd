import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Modal } from './index';
import { theme } from '../theme/theme';
import '@testing-library/jest-dom';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('Modal Component', () => {
  const defaultProps = {
    open: true,
    title: 'Test Title',
    onClose: () => {
      /* Mock function for testing */
    },
    onAccept: () => {
      /* Mock function for testing */
    },
    children: <p>Test Content</p>,
  };

  it('renders with success type and correct elements', () => {
    renderWithTheme(<Modal {...defaultProps} type="success" />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByLabelText('Check circle')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Accept' })).toBeInTheDocument();
  });

  it('renders with attention type', () => {
    renderWithTheme(<Modal {...defaultProps} type="attention" />);
    expect(screen.getByLabelText('Error')).toBeInTheDocument();
  });

  it('renders with warning type', () => {
    renderWithTheme(<Modal {...defaultProps} type="warning" />);
    expect(screen.getByLabelText('Cancel')).toBeInTheDocument();
  });

  it('renders custom children content', () => {
    const customContent = (
      <div>
        <p>This is custom content</p>
      </div>
    );
    renderWithTheme(
      <Modal {...defaultProps} type="success">
        {customContent}
      </Modal>
    );
    expect(screen.getByText('This is custom content')).toBeInTheDocument();
  });

  it('IconWrapper has disableRipple prop', () => {
    renderWithTheme(<Modal {...defaultProps} type="success" />);
    const iconButton = screen.getByRole('button', {
      name: /circle|error|cancel/i,
    });
    expect(iconButton).toHaveAttribute('tabindex', '-1');
  });
});
