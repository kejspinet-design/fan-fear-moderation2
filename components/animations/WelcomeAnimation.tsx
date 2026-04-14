/**
 * Welcome Animation Component
 * 
 * Displays a beautiful welcome animation after successful authentication.
 * Uses Framer Motion for fade-in and scale animations.
 * 
 * **Validates: Requirements 1.3, 9.1, 9.4, 9.5**
 */

'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { ANIMATION_DURATIONS } from '@/lib/utils/constants';

interface WelcomeAnimationProps {
  userName: string;
  onComplete: () => void;
}

/**
 * WelcomeAnimation component for greeting authenticated users
 * 
 * @param userName - Name of the authenticated user
 * @param onComplete - Callback when animation completes
 */
export function WelcomeAnimation({ userName, onComplete }: WelcomeAnimationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, (ANIMATION_DURATIONS.WELCOME + 1) * 1000); // Add 1 second for display

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-dark-purple-950/90 backdrop-blur-sm z-50"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: ANIMATION_DURATIONS.WELCOME,
            ease: "easeOut" 
          }}
          className="glass-strong p-8 rounded-2xl max-w-md mx-4"
        >
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              delay: 0.2, 
              duration: 0.5 
            }}
            className="text-4xl font-bold text-white mb-4"
          >
            Добро пожаловать!
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              delay: 0.4, 
              duration: 0.5 
            }}
            className="text-xl text-white/90 mb-6"
          >
            {userName}
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ 
              delay: 0.6, 
              duration: 0.8,
              ease: "easeInOut"
            }}
            className="h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 rounded-full"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              delay: 1.2, 
              duration: 0.3 
            }}
            className="mt-4 text-white/70 text-sm"
          >
            Загружаем ваш профиль...
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}