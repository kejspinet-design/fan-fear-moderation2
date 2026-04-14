/**
 * Cyber Landing Page
 * 
 * Gaming/Cyberpunk styled landing page with glitch effects
 */

'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { LoginButton } from '@/components/auth/LoginButton';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push('/dashboard');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center z-content">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-cyan-400 font-bold">Загрузка...</p>
        </motion.div>
      </main>
    );
  }

  if (status === 'authenticated') {
    return null; // Redirecting...
  }

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

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
        >
          <div className="p-4 rounded-xl" style={{ background: 'rgba(0, 217, 255, 0.1)' }}>
            <svg className="w-8 h-8 text-cyan-400 mx-auto mb-2 icon-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <p className="text-white/90 font-semibold">Безопасность</p>
          </div>
          <div className="p-4 rounded-xl" style={{ background: 'rgba(157, 78, 221, 0.1)' }}>
            <svg className="w-8 h-8 text-purple-400 mx-auto mb-2 icon-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <p className="text-white/90 font-semibold">Быстрый доступ</p>
          </div>
          <div className="p-4 rounded-xl" style={{ background: 'rgba(255, 0, 110, 0.1)' }}>
            <svg className="w-8 h-8 text-pink-400 mx-auto mb-2 icon-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-white/90 font-semibold">Для модераторов</p>
          </div>
        </motion.div>
        
        {/* Login Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center"
        >
          <LoginButton />
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-sm text-white/50 font-medium"
        >
          Войдите через Discord для доступа к правилам модерации
        </motion.p>
      </motion.div>
    </main>
  );
}
