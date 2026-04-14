/**
 * Global Loading Component
 * 
 * Displays loading state during page transitions and data fetching.
 * 
 * **Validates: Requirements 5.1, 5.2, 9.4**
 */

'use client';

import { motion } from 'framer-motion';

/**
 * Global loading component with animated spinner
 */
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-purple-950 to-dark-purple-900">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <motion.div
          className="w-16 h-16 mx-auto mb-4 border-4 border-purple-500/30 border-t-purple-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white/80 text-lg"
        >
          Загрузка...
        </motion.p>
      </motion.div>
    </div>
  );
}
