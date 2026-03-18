import { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import './Modal.css';

export interface ModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Modal content */
  children: React.ReactNode;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Optional footer content - typically buttons right-aligned */
  footer?: React.ReactNode;
  /** Close when clicking the backdrop */
  closeOnBackdropClick?: boolean;
  /** Close when pressing Escape */
  closeOnEscape?: boolean;
  /** Optional additional class name for the modal root */
  className?: string;
}

export function Modal({
  open,
  onClose,
  title,
  children,
  size = 'md',
  footer,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  className = '',
}: ModalProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === 'Escape') onClose();
    },
    [closeOnEscape, onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, handleEscape]);

  if (!open) return null;

  return (
    <div
      className={`modal ${className}`.trim()}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        className="modal__backdrop"
        onClick={closeOnBackdropClick ? onClose : undefined}
        aria-hidden
      />
      <div className={`modal__content modal__content--${size}`}>
        <header className="modal__header">
          {title && (
            <h2 id="modal-title" className="modal__title">
              {title}
            </h2>
          )}
          <button
            type="button"
            className="modal__close"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </header>
        <div className="modal__body">{children}</div>
        {footer && <footer className="modal__footer">{footer}</footer>}
      </div>
    </div>
  );
}
