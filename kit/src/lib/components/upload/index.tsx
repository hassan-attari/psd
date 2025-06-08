import React, { useState, useRef, useCallback, memo } from 'react';
import {
  Typography,
  IconButton,
  Stack,
  LinearProgress,
  Box,
} from '@mui/material';
import { CloudUpload, Close } from '@mui/icons-material';
import {
  StyledPaper,
  StyledUploadAreaContent,
  StyledProgressContainer,
  StyledDialog,
  StyledDialogContent,
  StyledDialogActions,
  StyledDialogTitle,
} from './upload.styles';
import { Button } from '../button';
import { FileUploadModalProps, FileWithProgress } from './upload';

export const FileUploadModal: React.FC<FileUploadModalProps> = ({
  open,
  onClose,
  onFileUpload,
  accept = '*',
  maxSize = 10485760, // 10MB default
  title = 'Upload files',
  multiple = true,
  ...rest
}) => {
  const [files, setFiles] = useState<FileWithProgress[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isUploading = files.some((f) => f.progress > 0 && f.progress < 100);
  const allUploadsComplete = files.every((f) => f.progress === 100);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      if (isUploading) return;

      const droppedFiles = Array.from(e.dataTransfer.files);
      if (!multiple && droppedFiles.length > 1) {
        handleFiles([droppedFiles[0]]);
      } else {
        handleFiles(droppedFiles);
      }
    },
    [isUploading, multiple]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isUploading) return;
      if (e.target.files) {
        const selectedFiles = Array.from(e.target.files);
        if (!multiple && selectedFiles.length > 1) {
          handleFiles([selectedFiles[0]]);
        } else {
          handleFiles(selectedFiles);
        }
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [isUploading, multiple]
  );

  const triggerFileInput = useCallback(() => {
    if (isUploading) return;
    fileInputRef.current?.click();
  }, [isUploading]);

  const handleRemoveFile = useCallback((fileId: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
  }, []);

  const handleClose = useCallback(() => {
    if (isUploading) return;
    setFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onClose();
  }, [isUploading, onClose]);

  const uploadFilesHandler = useCallback(async () => {
    if (files.length === 0) return;
    const filesToUpload = files.map((f) => f.file);
    await onFileUpload(filesToUpload);
    handleClose();
  }, [files, handleClose, onFileUpload]);

  const simulateProgress = useCallback((fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }

      setFiles((prevFiles) =>
        prevFiles.map((file) =>
          file.id === fileId ? { ...file, progress } : file
        )
      );
    }, 100);
  }, []);

  const handleFiles = useCallback(
    (incomingFiles: File[]) => {
      const validFiles = incomingFiles
        .filter((file) => file.size <= maxSize)
        .map((file) => ({
          file,
          id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          progress: 0,
        }));

      setFiles((prevFiles) => {
        if (!multiple) {
          return validFiles.slice(0, 1);
        }

        const newFiles = validFiles.filter(
          (newFile) =>
            !prevFiles.some(
              (existingFile) =>
                existingFile.file.name === newFile.file.name &&
                existingFile.file.size === newFile.file.size
            )
        );
        return [...prevFiles, ...newFiles];
      });

      validFiles.slice(0, multiple ? undefined : 1).forEach((file) => {
        simulateProgress(file.id);
      });
    },
    [maxSize, multiple, simulateProgress]
  );

  const FileList = memo(({ files }: { files: FileWithProgress[] }) => (
    <Box>
      {files.map(({ file, progress, id }) => (
        <StyledProgressContainer key={id}>
          <Stack
            justifyContent={'space-between'}
            alignItems={'center'}
            flexDirection={'row'}
            gap={'4px'}
          >
            <Stack display={'flex'} flexDirection={'column'}>
              <Typography className="text-sm-medium" noWrap>
                {file.name}
              </Typography>
              <Typography className="text-xs-medium">
                {(file.size / 1048576).toFixed(2)}MB
              </Typography>
            </Stack>
            <Box>
              <IconButton
                onClick={() => handleRemoveFile(id)}
                disabled={progress > 0 && progress < 100}
                size="small"
              >
                <Close fontSize="small" />
              </IconButton>
              {progress < 100 && (
                <Typography className="text-xs-medium">
                  {`${progress}%`}
                </Typography>
              )}
            </Box>
          </Stack>
          {progress < 100 && (
            <LinearProgress
              variant="determinate"
              value={progress}
              color={'secondary'}
            />
          )}
        </StyledProgressContainer>
      ))}
    </Box>
  ));

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
            accept={accept}
            hidden
            multiple={multiple}
            disabled={isUploading}
            data-testid="file-input"
            {...rest}
          />
          <StyledPaper
            isDragging={isDragging}
            isUploading={isUploading}
            onClick={triggerFileInput}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <CloudUpload fontSize="large" color={'secondary'} />
            <Typography variant="body1" width={'100%'}>
              Drag and drop here or{' '}
              <Typography component="span" color="secondary">
                choose a file
              </Typography>{' '}
              to upload
            </Typography>
          </StyledPaper>
          {files.length > 0 && <FileList files={files} />}
        </StyledUploadAreaContent>
      </StyledDialogContent>
      <StyledDialogActions>
        <Button onClick={handleClose} variant="outlined" disabled={isUploading}>
          Cancel
        </Button>
        <Button
          onClick={uploadFilesHandler}
          disabled={!allUploadsComplete}
          variant="contained"
        >
          Import file
        </Button>
      </StyledDialogActions>
    </StyledDialog>
  );
};
