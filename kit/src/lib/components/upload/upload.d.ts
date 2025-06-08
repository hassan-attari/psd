export interface FileWithProgress {
  file: File;
  id: string;
  progress: number;
}

export interface FileUploadModalProps {
  open: boolean;
  onClose: () => void;
  onFileUpload: (files: File[]) => Promise<void> | void;
  accept?: string;
  maxSize?: number;
  title?: string;
  multiple?: boolean;
}
