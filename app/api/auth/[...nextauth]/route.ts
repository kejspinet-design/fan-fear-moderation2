/**
 * NextAuth API Route Handler
 * 
 * Handles all NextAuth authentication requests including:
 * - Sign in/out
 * - OAuth callbacks
 * - Session management
 * 
 * **Validates: Requirements 1.1, 1.4**
 */

import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth/nextauth.config';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
