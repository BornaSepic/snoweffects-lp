import test from 'ava'
import { parseFilePath as p } from './parse-file-path.js'

const macro = test.macro<[string, string]>({
  exec: (t, input, expected) => {
    const actual = p(input)
    t.is(actual, expected)
  },
  title: (providedTitle = '', input) => {
    return `given ${JSON.stringify(input)} ${providedTitle}`.trim()
  }
})

test(macro, 'src/index.ts', 'src/index.ts')
test(macro, 'src/index.tsx', 'src/index.tsx')
test(macro, 'src/index.js', 'src/index.js')

test(macro, 'src/index.client.ts', 'src/index.ts')
test(macro, 'src/index.client.tsx', 'src/index.tsx')
test(macro, 'src/index.client.js', 'src/index.js')

test(macro, 'src/client.ts', 'src/client.ts')
test(macro, 'src/client.tsx', 'src/client.tsx')

test(macro, 'src/server.ts', 'src/server.ts')
test(macro, 'src/server.tsx', 'src/server.tsx')

test(macro, 'src/button.client.tsx', 'src/button.tsx')
test(macro, 'src/button.Client.tsx', 'src/button.tsx')
test(macro, 'src/button.-client.tsx', 'src/button.tsx')
test(macro, 'src/button.-client-.tsx', 'src/button.tsx')
test(macro, 'src/button._client.tsx', 'src/button.tsx')
test(macro, 'src/button._client_.tsx', 'src/button.tsx')
test(macro, 'src/Button.client.tsx', 'src/Button.tsx')

test(macro, 'src/index.client.spec.tsx', 'src/index.spec.tsx')
test(macro, 'src/index.spec.client.tsx', 'src/index.spec.tsx')

test(macro, 'src/index.server.tsx', 'src/index.tsx')
test(macro, 'src/index.server.ts', 'src/index.ts')

test(macro, '/app/src/index.tsx', '/app/src/index.tsx')
test(macro, '/app/src/index.client.tsx', '/app/src/index.tsx')

test(
  'should transform filename only',
  macro,
  'src/components/ButtonComponent/index.client.tsx',
  'src/components/ButtonComponent/index.tsx'
)
