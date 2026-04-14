/**
 * Toast Hook
 * 
 * Custom hook for managing toast notifications.
 * 
 * **Validates: Requirements 10.5**
 */

'use client';

import { useState, useCallback } from 'react';
import { ToastType } from '@/components/ui/Toast';

interface Toast {
  id: string;
  message: string;
  type?: ToastType;
}

/**
 * Hook for managing toast notifications
 * 
 * @returns Toast state and control functions
 */
export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  /**
   * Adds a new toast notification
   */
  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    return id;
  }, []);

  /**
   * Removes a toast notification by ID
   */
  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  /**
   * Shows a success toast
   */
  const success = useCallback((message: string) => {
    return addToast(message, 'success');
  }, [addToast]);

  /**
   * Shows an error toast
   */
  const error = useCallback((message: string) => {
    return addToast(message, 'error');
  }, [addToast]);

  /**
   * Shows a warning toast
   */
  const warning = useCallback((message: string) => {
    return addToast(message, 'warning');
  }, [addToast]);

  /**
   * Shows an info toast
   */
  const info = useCallback((message: string) => {
    return addToast(message, 'info');
  }, [addToast]);

  /**
   * Clears all toasts
   */
  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
    clearAll,
  };
}
