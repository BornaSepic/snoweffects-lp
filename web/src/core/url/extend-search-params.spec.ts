import test from 'ava'
import { extendUrlSearchParams as f } from './extend-search-params.js'

const macro = test.macro<[Parameters<typeof f>, string]>({
  exec: async (t, input, expected) => {
    const actual = f(...input).toString()
    t.is(actual, expected)
  },
  title: (providedTitle = '', [inputUrl, params]) => {
    const url = new URL(inputUrl)
    return `given ${url.searchParams} + ${JSON.stringify(
      params
    )} ${providedTitle}`.trim()
  }
})

test(
  'should preserve existing URL attributes',
  macro,
  [
    'https://www.datocms-assets.com/99008/1687438523-jacobandcocom_823058858.webp?auto=compress&monochrome=14DD53',
    { w: 100, h: 100, auto: ['enhance', 'format'] }
  ],
  'https://www.datocms-assets.com/99008/1687438523-jacobandcocom_823058858.webp?auto=enhance%252Cformat&h=100&monochrome=14DD53&w=100'
)
