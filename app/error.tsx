/**
 * Global Error Boundary
 * 
 * Catches and displays errors that occur during rendering.
 * Provides user-friendly error messages and recovery options.
 * 
 * **Validates: Requirements 10.5**
 */

'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Global error boundary component
 * 
 * @param error - Error object with message and optional digest
 * @param reset - Function to attempt recovery
 */
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to console (in production, send to error tracking service)
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-purple-950 to-dark-purple-900 p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 max-w-lg text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center"
        >
          <svg
            className="w-10 h-10 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </motion.div>

        <h1 className="text-3xl font-bold text-white mb-4">
          Что-то пошло не так
        </h1>

        <p className="text-white/80 mb-6">
          Произошла ошибка при загрузке страницы. Пожалуйста, попробуйте обновить страницу.
        </p>

        {error.message && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-300 text-sm font-mono break-words">
              {error.message}
            </p>
          </div>
        )}

        {error.digest && (
          <p className="text-white/50 text-xs mb-6">
            Код ошибки: {error.digest}
          </p>
        )}

        <div className="flex gap-4 justify-center">
          <motion.button
            onClick={reset}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Попробовать снова
          </motion.button>

          <motion.button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 text-white rounded-lg font-semibold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            На главную
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
