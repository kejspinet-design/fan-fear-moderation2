/**
 * Authentication and User Types
 * 
 * Defines types for Discord OAuth authentication, user sessions,
 * and role-based access control.
 */

/**
 * Access levels for role-based access control
 */
export enum AccessLevel {
  RULE_EDITOR = 'rule_editor',
  DISCORD_MODERATOR = 'discord_moderator',
  TWITCH_MODERATOR = 'twitch_moderator',
  RESTRICTED = 'restricted',
  NO_ACCESS = 'no_access'
}

/**
 * User model representing an authenticated Discord user
 */
export interface User {
  /** Discord user ID */
  id: string;
  /** Discord username */
  name: string;
  /** Discord email */
  email: string;
  /** Discord avatar URL */
  image: string;
  /** Array of Discord role IDs */
  roles: string[];
  /** Computed access level based on roles */
  accessLevel: AccessLevel;
  /** Account creation timestamp */
  createdAt: Date;
  /** Last login timestamp */
  lastLogin: Date;
}

/**
 * Session model for authenticated users
 */
export interface Session {
  /** User information */
  user: User;
  /** Session expiration timestamp (ISO 8601) */
  expires: string;
  /** Discord access token */
  accessToken: string;
  /** Discord refresh token (optional) */
  refreshToken?: string;
}

/**
 * Discord OAuth profile data
 */
export interface DiscordProfile {
  /** Discord user ID */
  id: string;
  /** Discord username */
  username: string;
  /** Discord discriminator (legacy) */
  discriminator?: string;
  /** Discord email */
  email: string;
  /** Discord avatar hash */
  avatar: string;
  /** Array of Discord role IDs */
  roles?: string[];
}
