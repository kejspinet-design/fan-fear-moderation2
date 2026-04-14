/**
 * Access Denied Page
 * 
 * Displays animated access denied message for restricted users.
 * 
 * **Validates: Requirements 2.4, 2.6, 9.3**
 */

'use client';

import { signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import { MainLayout } from '@/components/layout/MainLayout';
import { ACCESS_DENIED_MESSAGE } from '@/lib/utils/constants';

export default function AccessDeniedPage() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <MainLayout user={null}>
      <div className="min-h-[80vh] flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          duration: 0.6,
          ease: "easeOut"
        }}
        className="glass-strong p-8 rounded-2xl max-w-md text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            delay: 0.3,
            duration: 0.5,
            type: "spring",
            stiffness: 200
          }}
          className="w-16 h-16 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center"
        >
          <svg
            className="w-8 h-8 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 0.5,
            duration: 0.5
          }}
          className="text-3xl font-bold text-white mb-4"
        >
          Доступ запрещён
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 0.7,
            duration: 0.5
          }}
          className="text-lg text-white/90 leading-relaxed mb-6"
        >
          {ACCESS_DENIED_MESSAGE}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 0.9,
            duration: 0.5
          }}
          className="flex flex-col gap-3"
        >
          <motion.button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 hover:border-red-400/50 
                     text-red-300 hover:text-red-200 rounded-lg font-semibold transition-all duration-300
                     backdrop-blur-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Выйти из аккаунта
          </motion.button>

          <motion.button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 glass hover:glass-hover text-white/80 hover:text-white 
                     rounded-lg font-medium transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            На главную
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            delay: 1.2,
            duration: 0.5
          }}
          className="mt-6 pt-4 border-t border-white/20"
        >
          <p className="text-white/60 text-sm">
            Если у вас есть вопросы, обратитесь к администрации
          </p>
        </motion.div>
      </motion.div>
    </div>
    </MainLayout>
  );
}
