/**
 * Class Name Utility
 * 
 * Utility function for concatenating CSS class names.
 */

/**
 * Concatenates class names, filtering out falsy values
 * 
 * @param classes - Class names to concatenate
 * @returns Concatenated class string
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
