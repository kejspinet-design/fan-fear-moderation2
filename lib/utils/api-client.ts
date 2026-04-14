/**
 * API Client Utilities
 * 
 * Provides utilities for making API requests with error handling,
 * retry logic, and type safety.
 * 
 * **Validates: Requirements 10.5**
 */

import { ApiErrorResponse } from '@/types/api';

/**
 * API request options
 */
interface ApiRequestOptions extends RequestInit {
  retries?: number;
  retryDelay?: number;
}

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public response?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Makes an API request with error handling and retry logic
 * 
 * @param url - API endpoint URL
 * @param options - Request options including retries
 * @returns Parsed response data
 * @throws ApiError on failure
 */
export async function apiRequest<T>(
  url: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const {
    retries = 3,
    retryDelay = 1000,
    ...fetchOptions
  } = options;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers: {
          'Content-Type': 'application/json',
          ...fetchOptions.headers,
        },
      });

      // Parse response
      const data = await response.json();

      // Check for error response
      if (!response.ok) {
        const errorData = data as ApiErrorResponse;
        throw new ApiError(
          errorData.message || `Request failed with status ${response.status}`,
          errorData.statusCode || response.status,
          data
        );
      }

      return data as T;
    } catch (error) {
      lastError = error as Error;

      // Don't retry on client errors (4xx) or if it's the last attempt
      if (
        error instanceof ApiError &&
        (error.statusCode >= 400 && error.statusCode < 500)
      ) {
        throw error;
      }

      if (attempt < retries) {
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)));
        continue;
      }

      // Last attempt failed
      throw error;
    }
  }

  // Should never reach here, but TypeScript needs it
  throw lastError || new Error('Request failed');
}

/**
 * GET request helper
 */
export async function apiGet<T>(url: string, options?: ApiRequestOptions): Promise<T> {
  return apiRequest<T>(url, { ...options, method: 'GET' });
}

/**
 * POST request helper
 */
export async function apiPost<T>(
  url: string,
  body: any,
  options?: ApiRequestOptions
): Promise<T> {
  return apiRequest<T>(url, {
    ...options,
    method: 'POST',
    body: JSON.stringify(body),
  });
}

/**
 * PUT request helper
 */
export async function apiPut<T>(
  url: string,
  body: any,
  options?: ApiRequestOptions
): Promise<T> {
  return apiRequest<T>(url, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

/**
 * DELETE request helper
 */
export async function apiDelete<T>(
  url: string,
  options?: ApiRequestOptions
): Promise<T> {
  return apiRequest<T>(url, { ...options, method: 'DELETE' });
}

/**
 * Formats error message for display to user
 * 
 * @param error - Error object
 * @returns User-friendly error message
 */
export function formatErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Произошла неизвестная ошибка';
}

/**
 * Checks if error is a network error
 * 
 * @param error - Error object
 * @returns True if network error
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return true;
  }

  if (error instanceof ApiError && error.statusCode === 0) {
    return true;
  }

  return false;
}
