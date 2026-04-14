/**
 * Responsive Container Component
 * 
 * Provides responsive layout container with breakpoint support.
 * 
 * **Validates: Requirements 12.1, 12.2, 12.3, 12.4, 12.5**
 */

'use client';

import { BREAKPOINTS } from '@/lib/utils/constants';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
  className?: string;
}

/**
 * ResponsiveContainer component for adaptive layouts
 * 
 * @param children - Content to wrap
 * @param breakpoint - Target breakpoint behavior
 * @param className - Additional CSS classes
 */
export function ResponsiveContainer({ 
  children, 
  breakpoint = 'desktop',
  className = ''
}: ResponsiveContainerProps) {
  const getContainerClasses = () => {
    const baseClasses = 'w-full mx-auto px-4 sm:px-6 lg:px-8';
    
    switch (breakpoint) {
      case 'mobile':
        return `${baseClasses} max-w-sm`;
      case 'tablet':
        return `${baseClasses} max-w-4xl`;
      case 'desktop':
      default:
        return `${baseClasses} max-w-7xl`;
    }
  };

  return (
    <div className={`${getContainerClasses()} ${className}`}>
      {children}
    </div>
  );
}