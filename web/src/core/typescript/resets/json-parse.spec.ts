import { type Assert, type Equal } from 'asserttt'
import test from 'ava'
import type { JSONValue } from '../json-value'

test(`JSON.parse should return unknown type in Typescript`, async (t) => {
  // @ts-expect-error Safety measure in case someone tries to introduce JSON.parse<T> generic
  JSON.parse<string>('{}')

  const result = JSON.parse('{ "handle": "my-product" }')

  t.deepEqual(result, { handle: 'my-product' })

  type _ = [Assert<Equal<typeof result, JSONValue>>]
})
