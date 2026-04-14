/**
 * Cyber Header Component
 * 
 * Gaming/Cyberpunk styled header with glitch effects
 */

'use client';

import { motion } from 'framer-motion';
import { ProfileDisplay } from '@/components/auth/ProfileDisplay';

interface HeaderProps {
  user?: {
    name: string;
    image: string;
    roles: string[];
    accessLevel?: string;
  } | null;
}

export function Header({ user }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-content backdrop-blur-xl border-b border-cyan-500/20 sticky top-0 z-50"
      style={{ background: 'rgba(10, 10, 15, 0.8)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Title */}
          <motion.div
            className="flex items-center gap-4"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/30 animate-float">
              <img
                src="/logo.jpg"
                alt="Fan-Fear Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 
                className="text-2xl font-black glitch-text"
                data-text="Fan-Fear"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Fan-Fear
              </h1>
              <p className="text-sm text-cyan-400/80 font-semibold tracking-wider uppercase">
                Moderation
              </p>
            </div>
          </motion.div>

          {/* Center Title */}
          <div className="hidden md:block">
            <h2 className="text-xl font-bold text-white/90 tracking-wide uppercase">
              Правила модерации
            </h2>
          </div>

          {/* Right side - empty */}
          <div className="w-14"></div>
        </div>
      </div>
    </motion.header>
  );
}
