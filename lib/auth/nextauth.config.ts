/**
 * NextAuth Configuration
 * 
 * Configures NextAuth.js with Discord OAuth provider,
 * session management, and role-based access control.
 * 
 * **Validates: Requirements 1.1, 1.2, 1.3, 1.4**
 */

import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { Session } from 'next-auth';
import { createDiscordProvider } from './discord-provider';
import { extractRoleIds, determineAccessLevel } from './role-utils';
import { AccessLevel } from '@/types/auth';

/**
 * Fetches guild member data including roles from Discord API
 * 
 * @param accessToken - Discord access token
 * @param userId - Discord user ID
 * @returns Guild member data with roles
 */
async function fetchGuildMemberRoles(
  accessToken: string,
  userId: string
): Promise<string[]> {
  const guildId = process.env.DISCORD_GUILD_ID;

  if (!guildId) {
    console.warn('DISCORD_GUILD_ID not set, cannot fetch guild member roles');
    return [];
  }

  try {
    const response = await fetch(
      `https://discord.com/api/v10/users/@me/guilds/${guildId}/member`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      console.error(`Failed to fetch guild member data: ${response.status} ${response.statusText}`);
      return [];
    }

    const memberData = await response.json();
    return extractRoleIds(memberData);
  } catch (error) {
    console.error('Error fetching guild member roles:', error);
    return [];
  }
}

/**
 * NextAuth configuration options
 */
export const authOptions: NextAuthOptions = {
  providers: [createDiscordProvider()],

  callbacks: {
    /**
     * JWT callback - runs when JWT is created or updated
     * 
     * Extracts role IDs from Discord profile and determines access level.
     */
    async jwt({ token, account, profile }): Promise<JWT> {
      // On initial sign in, extract roles and determine access level
      if (account && profile) {
        token.id = (profile as any).id as string;

        // Fetch guild member roles using the access token
        const roleIds = await fetchGuildMemberRoles(
          account.access_token as string,
          (profile as any).id as string
        );

        token.roles = roleIds;
        token.accessLevel = determineAccessLevel(roleIds);

        console.log(`User ${(profile as any).id} authenticated with roles:`, roleIds);
        console.log(`Access level determined:`, token.accessLevel);
      }

      return token;
    },

    /**
     * Session callback - runs when session is checked
     * 
     * Adds custom fields (roles, accessLevel) to the session object.
     */
    async session({ session, token }): Promise<Session> {
      // Add custom fields to session
      if (session.user) {
        session.user.id = token.id as string;
        session.user.roles = token.roles as string[];
        session.user.accessLevel = token.accessLevel as AccessLevel;
      }

      return session;
    },

    /**
     * Redirect callback - redirects user after sign in
     */
    async redirect({ url, baseUrl }) {
      console.log('Redirect callback - url:', url, 'baseUrl:', baseUrl);
      // If the user is signing in, redirect to dashboard
      if (url.startsWith(baseUrl)) {
        console.log('Redirecting to /dashboard');
        return '/dashboard';
      }
      console.log('Redirecting to baseUrl + /dashboard');
      return baseUrl + '/dashboard';
    },
  },

  pages: {
    signIn: '/',
    error: '/auth/error',
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,
};
