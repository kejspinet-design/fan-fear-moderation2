/**
 * Floating Navigation Panel
 * 
 * Sticky navigation panel for quick access to rule sections
 */

'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface FloatingNavProps {
  hasDiscordRules: boolean;
  hasDiscordWarnings: boolean;
  hasTwitchRules: boolean;
  hasTwitchWarnings: boolean;
}

export function FloatingNav({ 
  hasDiscordRules, 
  hasDiscordWarnings, 
  hasTwitchRules, 
  hasTwitchWarnings 
}: FloatingNavProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navItems = [
    {
      id: 'discord-rules',
      label: 'Discord Правила',
      icon: '🎮',
      color: 'cyan',
      show: hasDiscordRules
    },
    {
      id: 'discord-warnings',
      label: 'Discord Выговоры',
      icon: '⚠️',
      color: 'yellow',
      show: hasDiscordWarnings
    },
    {
      id: 'twitch-rules',
      label: 'Twitch Правила',
      icon: '📺',
      color: 'purple',
      show: hasTwitchRules
    },
    {
      id: 'twitch-warnings',
      label: 'Twitch Выговоры',
      icon: '⚠️',
      color: 'yellow',
      show: hasTwitchWarnings
    }
  ].filter(item => item.show);

  if (navItems.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50"
    >
      <div className="relative">
        {/* Toggle Button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-12 h-12 rounded-full backdrop-blur-xl border-2 border-cyan-400/50 flex items-center justify-center shadow-lg shadow-cyan-500/30"
          style={{ background: 'rgba(10, 10, 15, 0.9)' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.div>
        </motion.button>

        {/* Navigation Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20, scale: 0.8 }}
          animate={{ 
            opacity: isExpanded ? 1 : 0,
            x: isExpanded ? -60 : 20,
            scale: isExpanded ? 1 : 0.8
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute right-0 top-0 min-w-[200px]"
          style={{ pointerEvents: isExpanded ? 'auto' : 'none' }}
        >
          <div 
            className="backdrop-blur-xl border border-cyan-400/30 rounded-xl p-4 shadow-2xl shadow-cyan-500/20"
            style={{ background: 'rgba(10, 10, 15, 0.95)' }}
          >
            <h3 className="text-sm font-bold text-cyan-400 mb-3 text-center uppercase tracking-wider">
              Навигация
            </h3>
            
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full p-3 rounded-lg text-left transition-all duration-200 border border-transparent hover:border-${item.color}-400/50 group`}
                  style={{ 
                    background: `rgba(${
                      item.color === 'cyan' ? '0, 217, 255' :
                      item.color === 'purple' ? '157, 78, 221' :
                      item.color === 'yellow' ? '255, 193, 7' : '0, 217, 255'
                    }, 0.1)` 
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <div>
                      <p className={`text-sm font-semibold text-${item.color}-400 group-hover:text-${item.color}-300`}>
                        {item.label}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Close hint */}
            <p className="text-xs text-white/40 text-center mt-3">
              Нажмите снова чтобы скрыть
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}