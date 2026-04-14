/**
 * NextAuth Type Extensions
 * 
 * Extends NextAuth types to include custom user properties.
 */

import 'next-auth';
import { AccessLevel } from './auth';

declare module 'next-auth' {
  /**
   * Extended User interface with custom properties
   */
  interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    roles: string[];
    accessLevel: AccessLevel;
  }

  /**
   * Extended Session interface
   */
  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  /**
   * Extended JWT interface
   */
  interface JWT {
    id: string;
    name: string;
    email: string;
    picture: string;
    roles: string[];
    accessLevel: AccessLevel;
  }
}
