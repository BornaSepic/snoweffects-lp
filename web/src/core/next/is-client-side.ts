/**
 * Checks if the code is running on the client side (browser) by verifying window object existence
 *
 * @returns {boolean} Returns true if code is running in browser environment, false otherwise
 *
 * @example
 * ```typescript
 * if (isClientSide()) {
 *   // Execute browser-specific code
 * }
 * ```
 */
export const isClientSide = (): boolean => {
  return typeof window !== 'undefined'
}
