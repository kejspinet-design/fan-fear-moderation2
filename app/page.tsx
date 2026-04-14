/**
 * Cyber Landing Page
 * 
 * Gaming/Cyberpunk styled landing page with glitch effects
 */

'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Автоматически перенаправляем на dashboard
    router.push('/dashboard');
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 z-content">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="cyber-card p-12 max-w-3xl text-center"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden border-4 border-cyan-400/50 shadow-2xl shadow-cyan-500/50 animate-float">
            <img
              src="/logo.jpg"
              alt="Fan-Fear Logo"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Title with Glitch Effect */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-6xl md:text-7xl font-black mb-4 glitch-text"
          data-text="Fan-Fear"
        >
          Fan-Fear
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <p className="text-2xl md:text-3xl font-bold text-cyan-400 mb-2 tracking-wide uppercase">
            Moderation System
          </p>
          <p className="text-lg text-white/70 font-medium">
            Система правил модерации для фан-сообщества
          </p>
        </motion.div>

        {/* Loading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center"
        >
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-sm text-white/50 font-medium"
        >
          Перенаправление на правила модерации...
        </motion.p>
      </motion.div>
    </main>
  );
}