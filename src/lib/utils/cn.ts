import { clsx, type ClassValue } from 'clsx';

/**
 * Utility for conditional class name merging
 * Performance: clsx is a lightweight alternative to classnames
 * Note: We don't use tailwind-merge here to keep bundle small
 * If conflicts become an issue, add it selectively
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
