/**
 * Application Constants
 * 
 * Defines Discord role IDs and role hierarchy configuration
 * for role-based access control.
 */

import { AccessLevel } from '@/types/auth';

/**
 * Discord Role Configuration
 * 
 * Maps access levels to Discord role IDs as specified in requirements.
 */
export const ROLE_CONFIG = {
  /** Rule Editor role IDs (Requirements 11.3) */
  RULE_EDITORS: [
    '1488988144035561644',
    '1488262589199945808',
    '1488262514881069156'
  ],
  /** Discord Moderator role ID (Requirement 11.2) */
  DISCORD_MODERATOR: '1488499982565642260',
  /** Twitch Moderator role ID (Requirement 11.1) */
  TWITCH_MODERATOR: '1489222060373708884',
  /** Restricted User role ID (Requirement 11.4) */
  RESTRICTED_USER: '1488973483323953182'
} as const;

/**
 * Role Hierarchy
 * 
 * Defines priority levels for access control.
 * Higher numbers indicate higher priority.
 * When a user has multiple roles, the highest priority level is granted.
 */
export const ROLE_HIERARCHY: Record<AccessLevel, number> = {
  [AccessLevel.RULE_EDITOR]: 4,
  [AccessLevel.DISCORD_MODERATOR]: 3,
  [AccessLevel.TWITCH_MODERATOR]: 3,
  [AccessLevel.RESTRICTED]: 1,
  [AccessLevel.NO_ACCESS]: 0
} as const;

/**
 * Access denied message for restricted users (Requirement 2.4)
 */
export const ACCESS_DENIED_MESSAGE = 
  'Доступ запрещён руководством сообщества ! Чтобы получить доступ напишите ему \'@santa2555555\'';

/**
 * Data file paths
 */
export const DATA_PATHS = {
  DISCORD_RULES: 'data/rules/discord-rules.json',
  TWITCH_RULES: 'data/rules/twitch-rules.json',
  DISCORD_WARNINGS: 'data/warnings/discord-warnings.json',
  TWITCH_WARNINGS: 'data/warnings/twitch-warnings.json',
  BACKUPS: 'data/backups'
} as const;

/**
 * Maximum number of backups to retain
 */
export const MAX_BACKUPS = 10;

/**
 * Animation durations (in seconds)
 */
export const ANIMATION_DURATIONS = {
  WELCOME: 0.6,
  FADE_IN: 0.5,
  TRANSITION: 0.3
} as const;

/**
 * Responsive breakpoints (in pixels)
 */
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024
} as const;
