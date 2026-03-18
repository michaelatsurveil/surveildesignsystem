import { useCallback, useId, useState } from 'react';
import { File, X } from 'lucide-react';
import './FileUpload.css';

export type FileUploadState = 'default' | 'hover' | 'drag' | 'success' | 'error';

export interface FileUploadProps {
  /** Placeholder text when empty */
  placeholder?: string;
  /** "Browse..." button label */
  chooseLabel?: string;
  /** Accepted file types (e.g. "image/*,.pdf") */
  accept?: string;
  /** Allow multiple files */
  multiple?: boolean;
  /** Callback when files change */
  onChange?: (files: File[]) => void;
  /** Controlled files (use with onChange for controlled mode) */
  files?: File[];
  /** Disabled state */
  disabled?: boolean;
  /** Error message to display */
  error?: string;
  /** Success message to display */
  successMessage?: string;
}

export function FileUpload({
  placeholder = 'Or drop files here',
  chooseLabel = 'Browse...',
  accept,
  multiple = false,
  onChange,
  files: controlledFiles,
  disabled = false,
  error,
  successMessage,
}: FileUploadProps) {
  const [internalFiles, setInternalFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const inputId = useId();

  const files = controlledFiles ?? internalFiles;
  const setFiles = useCallback(
    (newFiles: File[]) => {
      if (controlledFiles === undefined) {
        setInternalFiles(newFiles);
      }
      onChange?.(newFiles);
    },
    [controlledFiles, onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      if (disabled) return;
      const dropped = Array.from(e.dataTransfer.files);
      setFiles(multiple ? [...files, ...dropped] : dropped);
    },
    [disabled, multiple, files, setFiles]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) setIsDragOver(true);
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = Array.from(e.target.files ?? []);
      setFiles(multiple ? [...files, ...selected] : selected);
      e.target.value = '';
    },
    [multiple, files, setFiles]
  );

  const handleRemove = useCallback(
    (index: number) => {
      setFiles(files.filter((_, i) => i !== index));
    },
    [files, setFiles]
  );

  const state: FileUploadState = error ? 'error' : successMessage && files.length > 0 ? 'success' : isDragOver ? 'drag' : 'default';

  return (
    <div className={`file-upload file-upload--${state}`}>
      <div
        className={`file-upload__dropzone ${isDragOver ? 'file-upload__dropzone--drag' : ''} ${disabled ? 'file-upload__dropzone--disabled' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          id={inputId}
          className="file-upload__input"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInputChange}
          disabled={disabled}
          tabIndex={-1}
          aria-hidden
        />
        <div className="file-upload__content">
          <label htmlFor={inputId} className="file-upload__label">
            <span className="file-upload__button">{chooseLabel}</span>
          </label>
          <span className="file-upload__placeholder">{placeholder}</span>
        </div>
      </div>

      {files.length > 0 && (
        <ul className="file-upload__list" role="list">
          {files.map((file, index) => (
            <li key={`${file.name}-${index}`} className="file-upload__item">
              <File size={16} strokeWidth={2} color="currentColor" />
              <span className="file-upload__filename">{file.name}</span>
              {!disabled && (
                <button
                  type="button"
                  className="file-upload__remove"
                  onClick={() => handleRemove(index)}
                  aria-label={`Remove ${file.name}`}
                >
                  <X size={14} strokeWidth={2} />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {error && <p className="file-upload__message file-upload__message--error">{error}</p>}
      {successMessage && files.length > 0 && !error && (
        <p className="file-upload__message file-upload__message--success">{successMessage}</p>
      )}
    </div>
  );
}
