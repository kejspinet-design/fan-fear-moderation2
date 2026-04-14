/**
 * API Response Types
 * 
 * Defines types for API endpoint requests and responses.
 */

import { RuleContent, RuleSection } from './rules';

/**
 * Standard API error response
 */
export interface ApiErrorResponse {
  /** Error flag */
  error: true;
  /** Error message */
  message: string;
  /** HTTP status code */
  statusCode: number;
  /** Additional error details (optional) */
  details?: unknown;
}

/**
 * Standard API success response
 */
export interface ApiSuccessResponse<T = unknown> {
  /** Success flag */
  success: true;
  /** Response data */
  data: T;
  /** Optional message */
  message?: string;
}

/**
 * Generic API response type
 */
export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * Rules GET endpoint response
 */
export interface RulesGetResponse {
  /** Array of rule sections */
  sections?: RuleSection[];
  /** Array of rule content (legacy) */
  rules?: RuleContent[];
  /** Last modification timestamp */
  lastModified: string;
}

/**
 * Rules PUT endpoint request body
 */
export interface RulesPutRequest {
  /** Updated rule content */
  rules: RuleContent[];
}

/**
 * Rules PUT endpoint response
 */
export interface RulesPutResponse {
  /** Success flag */
  success: boolean;
  /** Response message */
  message: string;
  /** Path to created backup file */
  backup: string;
}

/**
 * Session GET endpoint response
 */
export interface SessionResponse {
  /** User information */
  user: {
    name: string;
    email: string;
    image: string;
    roles: string[];
  };
  /** Session expiration timestamp */
  expires: string;
}
