/**
 * Cyber Profile Display Component
 * 
 * Shows user profile with moderator badge and pulsing effects
 */

'use client';

import { signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

interface ProfileDisplayProps {
  user: {
    name: string;
    image: string;
    roles: string[];
    accessLevel?: string;
  };
  onLogout?: () => void;
}

export function ProfileDisplay({ user, onLogout }: ProfileDisplayProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleLogout = async () => {
    onLogout?.();
    await signOut({ callbackUrl: '/' });
  };

  const getAccessLevelText = (level?: string) => {
    switch (level) {
      case 'rule_editor':
        return 'Редактор правил';
      case 'discord_moderator':
        return 'Модератор Discord';
      case 'twitch_moderator':
        return 'Модератор Twitch';
      case 'restricted':
        return 'Ограниченный доступ';
      default:
        return 'Нет доступа';
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={() => setIsHovered(true)}
    >
      <motion.div
        className="flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer backdrop-blur-md"
        style={{ background: 'rgba(0, 217, 255, 0.1)', border: '1px solid rgba(0, 217, 255, 0.3)' }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-cyan-400 shadow-lg shadow-cyan-500/50">
          <Image
            src={user.image}
            alt={`${user.name} avatar`}
            fill
            className="object-cover"
          />
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-white font-bold">{user.name}</span>
          {/* Moderator Crown Icon */}
          <svg className="w-5 h-5 text-yellow-400 icon-glow animate-float" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      </motion.div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-3 w-80 rounded-2xl p-5 shadow-2xl backdrop-blur-xl"
            style={{ 
              background: 'rgba(10, 10, 15, 0.95)', 
              border: '1px solid rgba(0, 217, 255, 0.3)',
              boxShadow: '0 0 30px rgba(0, 217, 255, 0.3)',
              zIndex: 9999
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-400 shadow-lg shadow-cyan-500/50">
                <Image
                  src={user.image}
                  alt={`${user.name} avatar`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-bold text-lg">{user.name}</h3>
                  <svg className="w-5 h-5 text-yellow-400 icon-glow" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div className="mod-badge text-xs">
                  <span className="text-cyan-300 font-semibold">
                    {getAccessLevelText(user.accessLevel)}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-cyan-500/20 pt-4 space-y-3">
              {/* Discord Roles */}
              {user.roles && user.roles.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                    <span className="text-white/70 font-semibold">Discord роли:</span>
                  </div>
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                    {user.roles.map((role, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-xs font-semibold text-cyan-300 backdrop-blur-md"
                        style={{ background: 'rgba(0, 217, 255, 0.15)', border: '1px solid rgba(0, 217, 255, 0.3)' }}
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <motion.button
                onClick={handleLogout}
                className="w-full px-4 py-3 rounded-lg font-bold text-red-300 transition-all"
                style={{ 
                  background: 'rgba(255, 0, 110, 0.1)', 
                  border: '1px solid rgba(255, 0, 110, 0.3)' 
                }}
                whileHover={{ 
                  scale: 1.02,
                  background: 'rgba(255, 0, 110, 0.2)',
                  boxShadow: '0 0 20px rgba(255, 0, 110, 0.3)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                Выйти
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
