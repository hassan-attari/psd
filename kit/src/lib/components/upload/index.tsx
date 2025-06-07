import React, { useState, useRef, ChangeEvent } from 'react';
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Stack,
  LinearProgress,
} from '@mui/material';
import { CloudUpload, Close, Delete } from '@mui/icons-material';
import {
  StyledPaper,
  StyledUploadAreaContent,
  StyledProgressContainer,
  StyledProgressText,
  StyledDialog,
  StyledDialogContent,
  StyledDialogActions,
  StyledDialogTitle,
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
  const [isComplete, setIsComplete] = useState(false);
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
      setFile(droppedFiles[0]);
    }
  };

  const simulateProgress = async () => {
    setIsUploading(true);
    setUploadProgress(0);
    setIsComplete(false);

    // Simulate progress in steps
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise((resolve) => setTimeout(resolve, 30));
      setUploadProgress(progress);
    }

    setIsUploading(false);
    setIsComplete(true);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isUploading) return;

    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      if (selectedFile.size > maxSize) {
        alert(`File is too large. Maximum size is ${maxSize / 1048576}MB.`);
        return;
      }

      setFile(selectedFile);
      simulateProgress(); // Start progress simulation immediately
    }
  };

  const triggerFileInput = () => {
    if (isUploading) return;
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadProgress(0);
    setIsComplete(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClose = () => {
    if (isUploading) return;
    setFile(null);
    setUploadProgress(0);
    setIsComplete(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onClose();
  };

  return (
    <StyledDialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <StyledDialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography className="text-lg-medium">{title}</Typography>
          <IconButton onClick={handleClose} disabled={isUploading}>
            <Close />
          </IconButton>
        </Stack>
      </StyledDialogTitle>
      <StyledDialogContent>
        <StyledUploadAreaContent>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept={accept !== '*' ? accept : undefined}
            hidden
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
              color={isDragging ? 'primary' : 'secondary'}
            />
            <Typography variant="body1" width={'100%'}>
              {isDragging ? (
                'Drop the file here'
              ) : file ? (
                file.name
              ) : (
                <>
                  Drag and drop here or{' '}
                  <Typography component="span" color="secondary">
                    choose a file
                  </Typography>{' '}
                  to upload
                </>
              )}
            </Typography>
            {file && (
              <Typography variant="body2" color="text.secondary">
                {(file.size / 1048576).toFixed(2)}MB
              </Typography>
            )}
          </StyledPaper>

          {(isUploading || isComplete) && (
            <StyledProgressContainer>
              <LinearProgress
                variant="determinate"
                value={uploadProgress}
                color={'secondary'}
                sx={{ height: 8, borderRadius: 4 }}
              />
              <StyledProgressText variant="body2" color="text.secondary">
                {isComplete
                  ? 'File ready for upload!'
                  : `${uploadProgress}% loading...`}
              </StyledProgressText>
            </StyledProgressContainer>
          )}
        </StyledUploadAreaContent>
      </StyledDialogContent>
      <StyledDialogActions>
        {file && !isUploading && (
          <IconButton onClick={handleRemoveFile}>
            <Delete color="error" />
          </IconButton>
        )}
        <Button onClick={handleClose} variant="outlined" disabled={isUploading}>
          Cancel
        </Button>
        <Button
          onClick={triggerFileInput}
          disabled={isUploading}
          variant="contained"
          color={'primary'}
        >
          {'Upload File'}
        </Button>
      </StyledDialogActions>
    </StyledDialog>
  );
};

export default FileUploadModal;
