/**
 * Fade In Text Component
 * 
 * Provides smooth fade-in animation for text content with customizable delay.
 * 
 * **Validates: Requirements 9.2, 9.4, 9.5**
 */

'use client';

import { motion } from 'framer-motion';
import { ANIMATION_DURATIONS } from '@/lib/utils/constants';

interface FadeInTextProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

/**
 * FadeInText component for smooth text appearance animations
 * 
 * @param children - Text content to animate
 * @param delay - Delay before animation starts (in seconds)
 * @param duration - Animation duration (in seconds)
 * @param className - Additional CSS classes
 */
export function FadeInText({ 
  children, 
  delay = 0, 
  duration = ANIMATION_DURATIONS.FADE_IN,
  className = ''
}: FadeInTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}