/**
 * Content Container Component
 * 
 * Provides glassmorphism container with optional animation.
 * Used as wrapper for content sections.
 * 
 * **Validates: Requirements 5.2, 5.3, 6.1, 6.2**
 */

'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface ContentContainerProps {
  children: React.ReactNode;
  className?: string;
  animated?: boolean;
}

/**
 * ContentContainer component with glassmorphism effect
 * 
 * @param children - Content to wrap
 * @param className - Additional CSS classes
 * @param animated - Whether to show entrance animation
 */
export function ContentContainer({ 
  children, 
  className = '',
  animated = true 
}: ContentContainerProps) {
  const containerClasses = cn(
    "glass p-6 rounded-2xl shadow-xl",
    className
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={containerClasses}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
}