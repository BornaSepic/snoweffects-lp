type JsonValueScalar = string | boolean | number
type JsonValue = JsonValueScalar | JsonValue[] | { [key: string]: JsonValue }
type JsonReplacer = (_: string, value: JsonValue) => JsonValue | undefined

const ESCAPE_ENTITIES = Object.freeze({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&apos;'
})

type UnescapedEntity = keyof typeof ESCAPE_ENTITIES

const ESCAPE_REGEX = new RegExp(
  `[${Object.keys(ESCAPE_ENTITIES).join('')}]`,
  'g'
)

const ESCAPE_REPLACER = (t: string): string => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return ESCAPE_ENTITIES[t as UnescapedEntity] || ''
}

// Utility: Assert never
const isNever = function isNever(_: never) {
  return _
}

/**
 * A replacer for JSON.stringify to strip JSON-LD of illegal HTML entities
 * per https://www.w3.org/TR/json-ld11/#restrictions-for-contents-of-json-ld-script-elements
 */
const safeJsonLdReplacer: JsonReplacer = (
  _: string,
  value: JsonValue
): JsonValue | undefined => {
  switch (typeof value) {
    case 'object':
      // Omit null values.
      if (value === null) {
        return undefined
      }

      return value // JSON.stringify will recursively call replacer.
    case 'number':
    case 'boolean':
    case 'bigint':
      return value // These values are not risky.
    case 'string':
      return value.replace(ESCAPE_REGEX, ESCAPE_REPLACER)
    default: {
      // We shouldn't expect other types.
      isNever(value)

      // JSON.stringify will remove this element.
      return undefined
    }
  }
}

/**
 * Strip JSON-LD of illegal HTML entities
 * per https://www.w3.org/TR/json-ld11/#restrictions-for-contents-of-json-ld-script-elements
 */
export const toJson = (jsonld: unknown): string =>
  JSON.stringify(jsonld, safeJsonLdReplacer)
