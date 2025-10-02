/**
 * The `identity` function returns the first argument it receives.
 * It usually means either "no transformation"
 * or when used as a predicate: the truthiness of the value.
 */
export const identity = <T>(x: T): T => {
  return x
}
