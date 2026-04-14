/**
 * Discord OAuth Provider Configuration
 * 
 * Configures Discord OAuth 2.0 provider for NextAuth.js
 * with required scopes for role-based access control.
 * 
 * **Validates: Requirements 1.1, 1.2**
 */

import DiscordProvider from 'next-auth/providers/discord';

/**
 * Discord OAuth scopes required for the application
 * 
 * - identify: Basic user information (username, avatar)
 * - email: User's email address
 */
export const DISCORD_SCOPES = ['identify', 'email'].join(' ');

/**
 * Creates and configures the Discord OAuth provider
 * 
 * @returns Configured Discord provider for NextAuth
 */
export function createDiscordProvider() {
  const clientId = process.env.DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      'Discord OAuth credentials are missing. ' +
      'Please set DISCORD_CLIENT_ID and DISCORD_CLIENT_SECRET in your environment variables.'
    );
  }

  return DiscordProvider({
    clientId,
    clientSecret,
    authorization: {
      params: {
        scope: DISCORD_SCOPES,
      },
    },
  });
}
