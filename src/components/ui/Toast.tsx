import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { clsx } from 'clsx';
import { X, CheckCircle, AlertCircle, Info, LucideIcon } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const iconMap: Record<ToastType, LucideIcon> = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
};

const variantMap: Record<ToastType, string> = {
  success: 'bg-success-50 border-success-200 text-success-700',
  error: 'bg-danger-50 border-danger-200 text-danger-700',
  info: 'bg-primary-50 border-primary-200 text-primary-700',
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((message: string, type: ToastType = 'info', duration = 3000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        {toasts.map((t) => {
          const Icon = iconMap[t.type];
          return (
            <div
              key={t.id}
              role="status"
              aria-live="polite"
              className={clsx(
                'pointer-events-auto flex items-center gap-3 min-w-[300px] max-w-md p-4 rounded-xl border shadow-lg animate-in slide-in-from-right-full duration-300',
                variantMap[t.type]
              )}
            >
              <Icon size={18} className="flex-shrink-0" />
              <p className="flex-1 text-sm font-medium">{t.message}</p>
              <button
                onClick={() => removeToast(t.id)}
                className="p-1 hover:bg-black/5 rounded-lg transition-colors"
                aria-label="Dismiss"
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};
