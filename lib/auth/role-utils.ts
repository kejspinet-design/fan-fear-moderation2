/**
 * Role Utility Functions
 * 
 * Provides utilities for extracting, validating, and determining
 * access levels based on Discord role IDs.
 */

import { AccessLevel } from '@/types/auth';
import { ROLE_CONFIG, ROLE_HIERARCHY } from '@/lib/utils/constants';

/**
 * Extracts role IDs from Discord OAuth response
 * 
 * Handles various Discord response formats and structures.
 * 
 * @param discordResponse - Discord OAuth response object
 * @returns Array of role ID strings
 * 
 * **Validates: Requirements 1.2, 11.5**
 */
export function extractRoleIds(discordResponse: any): string[] {
  // Handle null or undefined response
  if (!discordResponse) {
    return [];
  }

  // Check for roles array directly on response
  if (Array.isArray(discordResponse.roles)) {
    return discordResponse.roles.map(String);
  }

  // Check for roles in nested structure (e.g., profile.roles)
  if (discordResponse.profile && Array.isArray(discordResponse.profile.roles)) {
    return discordResponse.profile.roles.map(String);
  }

  // Check for guild member data structure
  if (discordResponse.guild_member && Array.isArray(discordResponse.guild_member.roles)) {
    return discordResponse.guild_member.roles.map(String);
  }

  // Check for roles as object with role IDs as keys
  if (discordResponse.roles && typeof discordResponse.roles === 'object' && !Array.isArray(discordResponse.roles)) {
    return Object.keys(discordResponse.roles);
  }

  // Return empty array if no roles found
  return [];
}

/**
 * Determines the highest access level for a user based on their Discord role IDs
 * 
 * When a user has multiple qualifying roles, grants the access level with
 * the highest priority according to ROLE_HIERARCHY.
 * 
 * @param roleIds - Array of Discord role ID strings
 * @returns The highest AccessLevel the user qualifies for
 * 
 * **Validates: Requirements 2.5, 11.5**
 */
export function determineAccessLevel(roleIds: string[]): AccessLevel {
  // Handle empty or invalid input
  if (!roleIds || !Array.isArray(roleIds) || roleIds.length === 0) {
    return AccessLevel.NO_ACCESS;
  }

  // Convert all role IDs to strings for comparison
  const normalizedRoleIds = roleIds.map(String);

  // Check for Rule Editor roles (highest priority)
  const hasRuleEditorRole = ROLE_CONFIG.RULE_EDITORS.some(
    editorRoleId => normalizedRoleIds.includes(editorRoleId)
  );
  if (hasRuleEditorRole) {
    return AccessLevel.RULE_EDITOR;
  }

  // Check for Discord Moderator role
  if (normalizedRoleIds.includes(ROLE_CONFIG.DISCORD_MODERATOR)) {
    return AccessLevel.DISCORD_MODERATOR;
  }

  // Check for Twitch Moderator role
  if (normalizedRoleIds.includes(ROLE_CONFIG.TWITCH_MODERATOR)) {
    return AccessLevel.TWITCH_MODERATOR;
  }

  // Check for Restricted User role
  if (normalizedRoleIds.includes(ROLE_CONFIG.RESTRICTED_USER)) {
    return AccessLevel.RESTRICTED;
  }

  // No matching roles found
  return AccessLevel.NO_ACCESS;
}

/**
 * Validation result for role IDs
 */
export interface RoleValidationResult {
  /** Array of valid role IDs that match configuration */
  valid: string[];
  /** Array of invalid role IDs that don't match configuration */
  invalid: string[];
  /** Whether all provided role IDs are valid */
  allValid: boolean;
}

/**
 * Validates role IDs against the configured role list
 * 
 * Checks which role IDs match the configured roles and which don't.
 * 
 * @param roleIds - Array of Discord role ID strings to validate
 * @returns RoleValidationResult with valid and invalid role IDs
 * 
 * **Validates: Requirements 11.5**
 */
export function validateRoleIds(roleIds: string[]): RoleValidationResult {
  // Handle empty or invalid input
  if (!roleIds || !Array.isArray(roleIds)) {
    return {
      valid: [],
      invalid: [],
      allValid: true // Empty array is considered valid
    };
  }

  // Build a set of all configured role IDs for efficient lookup
  const configuredRoleIds = new Set<string>([
    ...ROLE_CONFIG.RULE_EDITORS,
    ROLE_CONFIG.DISCORD_MODERATOR,
    ROLE_CONFIG.TWITCH_MODERATOR,
    ROLE_CONFIG.RESTRICTED_USER
  ]);

  // Normalize and categorize role IDs
  const normalizedRoleIds = roleIds.map(String);
  const valid: string[] = [];
  const invalid: string[] = [];

  for (const roleId of normalizedRoleIds) {
    if (configuredRoleIds.has(roleId)) {
      valid.push(roleId);
    } else {
      invalid.push(roleId);
    }
  }

  return {
    valid,
    invalid,
    allValid: invalid.length === 0
  };
}

/**
 * Checks if a user has a specific access level or higher
 * 
 * @param userAccessLevel - The user's current access level
 * @param requiredAccessLevel - The required access level
 * @returns True if user has required level or higher
 */
export function hasAccessLevel(
  userAccessLevel: AccessLevel,
  requiredAccessLevel: AccessLevel
): boolean {
  const userPriority = ROLE_HIERARCHY[userAccessLevel] ?? 0;
  const requiredPriority = ROLE_HIERARCHY[requiredAccessLevel] ?? 0;
  return userPriority >= requiredPriority;
}
