import React, { useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import { X, AlertTriangle } from 'lucide-react';
import { Button } from './Button';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'primary';
  isLoading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  isLoading = false,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Focus trap and escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      // Simple focus trap: focus the cancel button by default for safety
      const cancelButton = dialogRef.current?.querySelector('button[data-cancel="true"]') as HTMLButtonElement;
      cancelButton?.focus();
    }

    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-surface-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Dialog */}
      <div 
        ref={dialogRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-description"
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 overflow-hidden animate-in fade-in zoom-in duration-200"
      >
        <div className="flex items-start gap-4">
          <div className={clsx(
            'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center',
            variant === 'danger' ? 'bg-danger-50 text-danger-600' : 'bg-primary-50 text-primary-600'
          )}>
            <AlertTriangle size={20} />
          </div>
          
          <div className="flex-1">
            <h3 id="confirm-title" className="text-lg font-display font-bold text-surface-900 mb-1">
              {title}
            </h3>
            <p id="confirm-description" className="text-sm text-surface-500 leading-relaxed">
              {description}
            </p>
          </div>

          <button 
            onClick={onClose}
            className="text-surface-400 hover:text-surface-600 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-8 flex items-center justify-end gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            disabled={isLoading}
            data-cancel="true"
          >
            {cancelLabel}
          </Button>
          <Button 
            variant={variant} 
            size="sm" 
            onClick={onConfirm}
            loading={isLoading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
