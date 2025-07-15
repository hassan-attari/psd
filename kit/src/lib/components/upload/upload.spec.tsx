import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FileUploadModal } from './index';
import '@testing-library/jest-dom';

// Mock the Button component if needed
vi.mock('../button', () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

describe('FileUploadModal', () => {
  const mockOnClose = vi.fn();
  const mockOnFileUpload = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the modal when open is true', () => {
    render(
      <FileUploadModal
        open={true}
        onClose={mockOnClose}
        onFileUpload={mockOnFileUpload}
      />
    );

    expect(screen.getByText('Upload files')).toBeInTheDocument();
    expect(
      screen.getByText(/Drag and drop here or choose a file to upload/)
    ).toBeInTheDocument();
  });

  it('does not render when open is false', () => {
    const { container } = render(
      <FileUploadModal
        open={false}
        onClose={mockOnClose}
        onFileUpload={mockOnFileUpload}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('allows selecting a file via file input', async () => {
    render(
      <FileUploadModal
        open={true}
        onClose={mockOnClose}
        onFileUpload={mockOnFileUpload}
      />
    );

    const fileInput = screen.getByTestId('file-input') as HTMLInputElement;
    const file = new File(['test content'], 'test.png', { type: 'image/png' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(fileInput.files?.[0]).toBe(file);
    expect(fileInput.files).toHaveLength(1);
  });

  it('handles drag and drop', async () => {
    render(
      <FileUploadModal
        open={true}
        onClose={mockOnClose}
        onFileUpload={mockOnFileUpload}
      />
    );

    const dropZone = screen.getByText(
      /Drag and drop here or choose a file to upload/
    ).parentElement!;
    const file = new File(['test content'], 'test.png', { type: 'image/png' });

    fireEvent.dragOver(dropZone);
    expect(dropZone).toHaveClass('isDragging');

    fireEvent.drop(dropZone, {
      dataTransfer: {
        files: [file],
      },
    });

    await waitFor(() => {
      expect(screen.getByText('test.png')).toBeInTheDocument();
    });
  });

  it('shows progress when file is selected', async () => {
    render(
      <FileUploadModal
        open={true}
        onClose={mockOnClose}
        onFileUpload={mockOnFileUpload}
      />
    );

    const fileInput = screen.getByTestId('file-input');
    const file = new File(['test content'], 'test.png', { type: 'image/png' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
      expect(screen.getByText('0%')).toBeInTheDocument();
    });

    await waitFor(
      () => {
        expect(screen.getByText('100%')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it('disables upload button until all files are complete', async () => {
    render(
      <FileUploadModal
        open={true}
        onClose={mockOnClose}
        onFileUpload={mockOnFileUpload}
      />
    );

    const fileInput = screen.getByTestId('file-input');
    const file = new File(['test content'], 'test.png', { type: 'image/png' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(screen.getByText('Import file')).toBeDisabled();

    await waitFor(
      () => {
        expect(screen.getByText('Import file')).not.toBeDisabled();
      },
      { timeout: 2000 }
    );
  });

  it('calls onFileUpload with selected files when upload button is clicked', async () => {
    render(
      <FileUploadModal
        open={true}
        onClose={mockOnClose}
        onFileUpload={mockOnFileUpload}
      />
    );

    const fileInput = screen.getByTestId('file-input');
    const file = new File(['test content'], 'test.png', { type: 'image/png' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(
      () => {
        expect(screen.getByText('Import file')).not.toBeDisabled();
      },
      { timeout: 2000 }
    );

    fireEvent.click(screen.getByText('Import file'));

    expect(mockOnFileUpload).toHaveBeenCalledWith([file]);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('allows removing a file', async () => {
    render(
      <FileUploadModal
        open={true}
        onClose={mockOnClose}
        onFileUpload={mockOnFileUpload}
      />
    );

    const fileInput = screen.getByTestId('file-input');
    const file = new File(['test content'], 'test.png', { type: 'image/png' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText('test.png')).toBeInTheDocument();
    });

    const removeButtons = screen.getAllByLabelText('remove');
    fireEvent.click(removeButtons[0]);

    expect(screen.queryByText('test.png')).not.toBeInTheDocument();
  });

  it('shows error for files exceeding max size', async () => {
    render(
      <FileUploadModal
        open={true}
        onClose={mockOnClose}
        onFileUpload={mockOnFileUpload}
        maxSize={5} // Very small size for testing
      />
    );

    const fileInput = screen.getByTestId('file-input');
    const largeFile = new File(
      ['test content that is too large'],
      'large.png',
      { type: 'image/png' }
    );

    fireEvent.change(fileInput, { target: { files: [largeFile] } });

    expect(screen.queryByText('large.png')).not.toBeInTheDocument();
  });

  it('handles single file selection when multiple is false', async () => {
    render(
      <FileUploadModal
        open={true}
        onClose={mockOnClose}
        onFileUpload={mockOnFileUpload}
        multiple={false}
      />
    );

    const fileInput = screen.getByTestId('file-input');
    const file1 = new File(['test1'], 'test1.png', { type: 'image/png' });
    const file2 = new File(['test2'], 'test2.png', { type: 'image/png' });

    fireEvent.change(fileInput, { target: { files: [file1, file2] } });

    await waitFor(() => {
      expect(screen.getByText('test1.png')).toBeInTheDocument();
      expect(screen.queryByText('test2.png')).not.toBeInTheDocument();
    });
  });
});
