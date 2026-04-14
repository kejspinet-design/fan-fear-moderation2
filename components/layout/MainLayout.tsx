/**
 * Main Layout Component
 * 
 * Integrates Header and content area with dark purple background.
 * 
 * **Validates: Requirements 5.1, 5.2, 5.5**
 */

'use client';

import { Header } from './Header';
import { ResponsiveContainer } from './ResponsiveContainer';

interface MainLayoutProps {
  children: React.ReactNode;
  user?: {
    name: string;
    image: string;
    roles: string[];
    accessLevel?: string;
  } | null;
}

/**
 * MainLayout component providing app structure
 * 
 * @param children - Page content
 * @param user - Current user information
 */
export function MainLayout({ children, user }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-purple-950 via-dark-purple-900 to-dark-purple-800">
      <Header user={user} />
      
      <main className="relative">
        <ResponsiveContainer className="py-8">
          {children}
        </ResponsiveContainer>
      </main>

      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
}