import test from 'ava'
import { toJson } from './to-json'

const TEST_NAME_PREFIX = 'JSON-LD to JSON'

test(`${TEST_NAME_PREFIX} given restricted HTML character sequences`, async (t) => {
  t.is(
    toJson({
      '@context': 'http://schema.org/',
      '@type': 'WebPageElement',
      name: 'Encoding Issues',
      description:
        'Issues list such as unescaped </script>, ampersand &, or -->'
    }),
    JSON.stringify({
      '@context': 'http://schema.org/',
      '@type': 'WebPageElement',
      name: 'Encoding Issues',
      description:
        'Issues list such as unescaped &lt;/script&gt;, ampersand &amp;, or --&gt;'
    })
  )
})
