import test from 'ava'
import { truncate } from './truncate'

test('Truncate String utility given input with no spaces', async function (t) {
  t.is(truncate('ABCDEF', 3), 'ABC…')
  t.is(truncate('ABC', 3), 'ABC')
  t.is(truncate('AB', 3), 'AB')
  t.is(truncate('A', 3), 'A')
  t.is(truncate('', 3), '')
})

test('Truncate String utility given input with word boundaries', async function (t) {
  t.is(truncate('ABCD EF', 3), 'ABC…')
  t.is(truncate('ABCD EF', 4), 'ABCD…')
})

test('Truncate String utility given custom indicator', async function (t) {
  t.is(truncate('ABCDEF', 3, '---'), 'ABC---')
  t.is(truncate('ABC', 3, '---'), 'ABC')
  t.is(truncate('AB', 3, '---'), 'AB')
})

test('Truncate String utility given empty indicator', async function (t) {
  t.is(truncate('ABCDEF', 3, ''), 'ABC')
  t.is(truncate('ABC', 3, ''), 'ABC')
  t.is(truncate('AB', 3, ''), 'AB')
})
