/**
 * Rule Content Types
 * 
 * Defines types for moderation rules content,
 * including hierarchical structure and metadata.
 */

/**
 * Metadata for rule content tracking
 */
export interface RuleMetadata {
  /** Creation timestamp */
  createdAt: Date;
  /** Last update timestamp */
  updatedAt: Date;
  /** User ID who last updated the content */
  updatedBy: string;
}

/**
 * Rule content model with simple structure
 */
export interface RuleContent {
  /** Unique identifier */
  id: string;
  /** Rule number (e.g., "6.1", "6.2", "В.1") */
  number: string;
  /** Rule title */
  title: string;
  /** Rule text content */
  text: string;
  /** Penalty/removal conditions (can be null) */
  penalty: string | null;
}

/**
 * Rule section with title and rules
 */
export interface RuleSection {
  /** Section unique identifier */
  id: string;
  /** Section title */
  title: string;
  /** Optional section description */
  description?: string;
  /** Array of rules in this section */
  rules: RuleContent[];
}

/**
 * Discord rules storage structure
 */
export interface DiscordRulesStorage {
  /** Storage format version */
  version: string;
  /** Last modification timestamp */
  lastModified: string;
  /** Array of rule sections */
  sections: RuleSection[];
}

/**
 * Twitch rules storage structure
 */
export interface TwitchRulesStorage {
  /** Storage format version */
  version: string;
  /** Last modification timestamp */
  lastModified: string;
  /** Array of rule sections */
  sections: RuleSection[];
}
