export const isPresent = <T>(t: T | undefined | null): t is T => {
  return t !== undefined && t !== null
}

export const isDefined = <T>(t: T | undefined): t is T => {
  return t !== undefined
}

export const isNotNull = <T>(t: T | null): t is T => {
  return t !== null
}

/**
 * Type guard for numbers. Answers false to NaN.
 */
export const isNumber = (t: unknown): t is number => {
  return typeof t === 'number' && !Number.isNaN(t)
}

/**
 * Check if object has a key
 */
export const hasKey = <K extends string>(
  key: K,
  x: unknown
): x is Record<K, unknown> => typeof x === 'object' && x !== null && key in x

/**
 * Check if Element is and HTML element.
 */
export const isHTMLElement = (el: unknown): el is HTMLElement => {
  return el instanceof HTMLElement
}
