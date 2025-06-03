import React, { useState, useRef, useCallback, ChangeEvent } from 'react';
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Stack,
} from '@mui/material';
import { CloudUpload, Close, Delete } from '@mui/icons-material';
import {
  StyledPaper,
  StyledUploadAreaContent,
  StyledProgressContainer,
  StyledProgressText,
} from './upload.styles';

interface FileUploadModalProps {
  open: boolean;
  onClose: () => void;
  onFileUpload: (file: File) => Promise<void> | void;
  accept?: string;
  maxSize?: number;
  title?: string;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({
  open,
  onClose,
  onFileUpload,
  accept = '*',
  maxSize = 10485760, // 10MB default
  title = 'Upload file',
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (isUploading) return;

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFileSelection(droppedFiles[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isUploading) return;
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleFileSelection = (selectedFile: File) => {
    if (selectedFile.size > maxSize) {
      alert(`File is too large. Maximum size is ${maxSize / 1048576}MB.`);
      return;
    }
    setFile(selectedFile);
  };

  const triggerFileInput = () => {
    if (isUploading) return;
    fileInputRef.current?.click();
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + 10;
      });
    }, 300);

    try {
      await onFileUpload(file);
      setUploadProgress(100);
      setTimeout(() => {
        handleClose();
      }, 500);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      clearInterval(interval);
      setIsUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClose = () => {
    if (isUploading) return;
    setFile(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">{title}</Typography>
          <IconButton onClick={handleClose} disabled={isUploading}>
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <StyledUploadAreaContent>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept={accept !== '*' ? accept : undefined}
            style={{ display: 'none' }}
            disabled={isUploading}
          />

          <StyledPaper
            isDragging={isDragging}
            isUploading={isUploading}
            onClick={triggerFileInput}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <CloudUpload
              fontSize="large"
              color={isDragging ? 'primary' : 'action'}
            />
            <Typography variant="body1" sx={{ mt: 1 }}>
              {isDragging
                ? 'Drop the file here'
                : file
                ? file.name
                : 'Drag and drop here or choose a file to upload'}
            </Typography>
            {file && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {(file.size / 1048576).toFixed(2)}MB
              </Typography>
            )}
          </StyledPaper>

          {isUploading && (
            <StyledProgressContainer>
              <StyledProgressText variant="body2" color="text.secondary">
                {uploadProgress}% uploaded
              </StyledProgressText>
            </StyledProgressContainer>
          )}
        </StyledUploadAreaContent>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          disabled={isUploading}
          sx={{ minWidth: 100 }}
        >
          Cancel
        </Button>
        {file && !isUploading && (
          <IconButton onClick={handleRemoveFile} sx={{ mr: 'auto' }}>
            <Delete color="error" />
          </IconButton>
        )}
        <Button
          onClick={handleUpload}
          disabled={!file || isUploading}
          variant="contained"
          sx={{ minWidth: 100 }}
        >
          {isUploading ? 'Uploading...' : 'Import file'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FileUploadModal;
