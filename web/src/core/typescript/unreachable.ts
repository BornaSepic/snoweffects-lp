/**
 * Marks a code block as unreachable.
 *
 * @param testValue - The value that is expected to be unreachable.
 * @param returnValue - The value to be returned when the testValue is unreachable.
 * @returns The specified returnValue.
 */
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export const unreachable = <V extends never, R>(
  testValue: V,
  returnValue: R
): R => {
  testValue satisfies never
  return returnValue
}
