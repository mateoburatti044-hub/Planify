
import React, { useEffect } from 'react';
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

export type ToastType = 'success' | 'error';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200';
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
  const Icon = type === 'success' ? CheckCircleIcon : XCircleIcon;

  return (
    <div 
      className={`fixed bottom-4 right-4 z-50 flex items-center p-4 border rounded-lg shadow-lg ${bgColor} animate-slide-up`}
      data-testid={`toast-${type}`}
    >
      <Icon className={`w-5 h-5 mr-3 ${type === 'success' ? 'text-green-500' : 'text-red-500'}`} />
      <p className={`text-sm font-medium ${textColor}`}>{message}</p>
      <button onClick={onClose} className="ml-4 p-1 hover:bg-black/5 rounded transition">
        <XMarkIcon className="w-4 h-4 text-gray-500" />
      </button>
    </div>
  );
};
