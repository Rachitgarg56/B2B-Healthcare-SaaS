import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';

export const typeConfig = {
  info: { 
    icon: <Info size={14} />, 
    bg: 'bg-primary-50', 
    text: 'text-primary-600', 
    border: 'border-primary-200', 
    dot: 'bg-primary-500' 
  },
  success: { 
    icon: <CheckCircle size={14} />, 
    bg: 'bg-success-100', 
    text: 'text-success-600', 
    border: 'border-success-200', 
    dot: 'bg-success-500' 
  },
  warning: { 
    icon: <AlertTriangle size={14} />, 
    bg: 'bg-warning-50', 
    text: 'text-warning-600', 
    border: 'border-warning-200', 
    dot: 'bg-warning-500' 
  },
  error: { 
    icon: <AlertCircle size={14} />, 
    bg: 'bg-danger-50', 
    text: 'text-danger-600', 
    border: 'border-danger-200', 
    dot: 'bg-danger-500' 
  },
};

export function safeDistance(ts: string) {
  try { 
    return formatDistanceToNow(parseISO(ts), { addSuffix: true }); 
  } catch { 
    return 'recently'; 
  }
}
