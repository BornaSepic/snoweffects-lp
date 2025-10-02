import test from 'ava'
const TEST_NAME_PREFIX = 'Hash digest utility'
import { createHash as c } from './create-hash'

test(`${TEST_NAME_PREFIX} given nothing`, async (t) => {
  t.throws(
    () => {
      // @ts-expect-error For testing purposes
      c()
    },
    { message: /input is empty/i }
  )
})

test(`${TEST_NAME_PREFIX} given null`, async (t) => {
  t.throws(
    () => {
      // @ts-expect-error Testing purposes
      c(null)
    },
    { message: /input is empty/i }
  )
})

test(`${TEST_NAME_PREFIX} given empty string`, async (t) => {
  t.throws(
    () => {
      c('')
    },
    { message: /input is empty/i }
  )
})

test(`${TEST_NAME_PREFIX} given email input`, async (t) => {
  t.is(
    c('info@hello.com'),
    '950205bff73bf263c0900732a54d7c1bf8dbf063a34fdd20e345d24e1513d3db',
    'should output hex-encoded SHA256 hash'
  )
})
