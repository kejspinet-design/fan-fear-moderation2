/**
 * Authentication Provider Component
 * 
 * Wraps the application with NextAuth SessionProvider to provide
 * authentication context throughout the component tree.
 * 
 * **Validates: Requirements 1.4**
 */

'use client';

import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

interface AuthProviderProps {
  children: React.ReactNode;
  session: Session | null;
}

/**
 * AuthProvider component that wraps the app with NextAuth session context
 * 
 * @param children - Child components to wrap
 * @param session - Initial session data (optional)
 */
export function AuthProvider({ children, session }: AuthProviderProps) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}