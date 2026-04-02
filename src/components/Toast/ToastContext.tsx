import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import { Toast } from './Toast';
import type { ToastVariant, ToastSize } from './Toast';

export interface ToastItem {
  id: string;
  variant: ToastVariant;
  size: ToastSize;
  shadow: boolean;
  message: string;
  showIcon?: boolean;
}

interface ToastContextValue {
  toasts: ToastItem[];
  toast: (
    message: string,
    options?: {
      variant?: ToastVariant;
      size?: ToastSize;
      shadow?: boolean;
      showIcon?: boolean;
    }
  ) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback(
    (
      message: string,
      options?: {
        variant?: ToastVariant;
        size?: ToastSize;
        shadow?: boolean;
        showIcon?: boolean;
      }
    ) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      setToasts((prev) => [
        ...prev,
        {
          id,
          message,
          variant: options?.variant ?? 'default',
          size: options?.size ?? 'sm',
          shadow: options?.shadow ?? false,
          showIcon: options?.showIcon ?? true,
        },
      ]);
      return id;
    },
    []
  );

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <div
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          alignItems: 'flex-end',
        }}
      >
        {toasts.map((t) => (
          <Toast
            key={t.id}
            variant={t.variant}
            size={t.size}
            shadow={t.shadow}
            message={t.message}
            showIcon={t.showIcon}
            onClose={() => dismiss(t.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return ctx;
}
