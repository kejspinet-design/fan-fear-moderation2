/**
 * Cyber Rule Card Component
 * 
 * Gaming/Cyberpunk styled rule card with animated gradient border
 */

'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CyberRuleCardProps {
  title: string;
  icon: ReactNode;
  rules: string[];
  color: 'blue' | 'purple';
}

export function CyberRuleCard({ title, icon, rules, color }: CyberRuleCardProps) {
  const colorClasses = {
    blue: {
      gradient: 'from-cyan-500 to-blue-600',
      shadow: 'shadow-cyan-500/30',
      iconBg: 'bg-cyan-500/20',
      iconColor: 'text-cyan-400'
    },
    purple: {
      gradient: 'from-purple-500 to-pink-600',
      shadow: 'shadow-purple-500/30',
      iconBg: 'bg-purple-500/20',
      iconColor: 'text-purple-400'
    }
  };

  const colors = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="cyber-card h-full"
    >
      {/* Header with Icon */}
      <div className="flex items-center gap-4 mb-6">
        <div className={`w-16 h-16 rounded-xl ${colors.iconBg} flex items-center justify-center ${colors.shadow} shadow-lg animate-float`}>
          <div className={`${colors.iconColor} icon-glow`}>
            {icon}
          </div>
        </div>
        <div>
          <h3 className={`text-2xl font-black tracking-wide bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
            {title}
          </h3>
          <p className="text-sm text-white/60 font-semibold uppercase tracking-wider">
            Правила модерации
          </p>
        </div>
      </div>

      {/* Rules List */}
      <div className={`space-y-3 ${rules.length > 8 ? 'md:columns-2 md:gap-4' : ''}`}>
        {rules.map((rule, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="rule-item break-inside-avoid mb-3"
          >
            {/* Shield/Lightning Icon */}
            <div className="flex-shrink-0 mt-1">
              <svg className="w-5 h-5 text-cyan-400 icon-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <p className="text-white/90 font-medium leading-relaxed text-sm">
              {rule}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Footer Badge */}
      <div className="mt-6 pt-4 border-t border-cyan-500/20">
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/60">Правил: <span className="text-cyan-400 font-bold">{rules.length}</span></span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-green-400 font-semibold">Активно</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
