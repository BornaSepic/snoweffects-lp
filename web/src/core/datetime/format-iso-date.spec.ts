import test from 'ava'
import { makeFormatIsoDate as mf } from './format-iso-date'

const TEST_NAME_PREFIX = 'ISO Date Formatter'

test(`${TEST_NAME_PREFIX} given date-only input string`, async (t) => {
  const f = mf({ countryCode: 'US', languageCode: 'EN' })

  t.is(f('2022-07-14'), '7/14/22')
})

test(`${TEST_NAME_PREFIX} given France and French`, async (t) => {
  const f = mf({ countryCode: 'FR', languageCode: 'FR' })

  t.is(f('2022-07-14'), '14/07/2022')
})
