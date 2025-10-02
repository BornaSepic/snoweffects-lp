import test from 'ava'
import { isPlainObject, isEmptyObject } from './is-plain-object.js'

const TEST_NAME_PREFIX = 'isPlainObject type guard' as const

test(`${TEST_NAME_PREFIX} given plain objects`, async function (t) {
  t.is(isPlainObject({}), true)
  t.is(isPlainObject({ message: 'Hello' }), true)
  t.is(isPlainObject({ status: 'ok', message: 'Hello' }), true)
  t.is(isPlainObject(new Object()), true)
  t.is(
    isPlainObject({ constructor: '123' }),
    true,
    'should handle constructor overrides'
  )
})

test(`${TEST_NAME_PREFIX} given arrays`, async function (t) {
  t.is(isPlainObject([]), false)
  // eslint-disable-next-line @typescript-eslint/no-array-constructor
  t.is(isPlainObject(new Array()), false)
})

test(`${TEST_NAME_PREFIX} given built-in classes`, async function (t) {
  t.is(isPlainObject(new Error('Hello')), false)
  t.is(isPlainObject(new Date('_')), false)
  t.is(isPlainObject(new Date()), false)
})

test(`${TEST_NAME_PREFIX} given custom classes`, async function (t) {
  // eslint-disable-next-line func-style, @typescript-eslint/no-empty-function
  function MyClass() {}
  MyClass.prototype.constructor = MyClass
  // @ts-expect-error the inferred `any` type is acceptable for testing
  const myClass = new MyClass()

  t.is(isPlainObject(myClass), false)

  class MyClass2 {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {}
  }
  const myClass2 = new MyClass2()

  t.is(isPlainObject(myClass2), false)

  const mySpecialObject = {}
  Object.setPrototypeOf(mySpecialObject, {
    toDate: function () {
      return new Date()
    }
  })

  t.is(isPlainObject(mySpecialObject), false)
})

test(`isEmptyObject type guard`, async function (t) {
  t.is(isEmptyObject({}), true)
  t.is(isEmptyObject({ message: 'Hello' }), false)
  t.is(isEmptyObject({ status: 'ok', message: 'Hello' }), false)
})
