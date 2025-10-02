import test from 'ava'
import { parseFolderPath as p } from './parse-folder-path.js'

const macro = test.macro<[string, string]>({
  exec: (t, input, expected) => {
    const actual = p(input)
    t.is(actual, expected)
  },
  title: (providedTitle = '', input) => {
    return `given ${JSON.stringify(input)} ${providedTitle}`.trim()
  }
})

test(macro, '/', '/')
test(macro, './src', 'src')
test(macro, 'src', 'src')
test(macro, '/app/src/', '/app/src/')
test(macro, '/app/src', '/app/src')
test(
  macro,
  '/app/src/components/ButtonComponent/',
  '/app/src/components/button-component/'
)

test(
  'should keep "glo2facial" keyword as is',
  macro,
  '/app/src/pages/glo2facial-nearMe/',
  '/app/src/pages/glo2facial-near-me/'
)

test(
  'should keep multiple "glo2facial" keywords as is',
  macro,
  '/app/src/pages/glo2facial-nearMe/my-glo2facial/',
  '/app/src/pages/glo2facial-near-me/my-glo2facial/'
)

test(
  macro,
  '/app/src/Test._Test/Component.spec/',
  '/app/src/test.test/component.spec/'
)

test(macro, '/app/src/Component2/', '/app/src/component-2/')

test(
  macro,
  '/app/src/pages/[productHandle]/',
  '/app/src/pages/[product_handle]/'
)

test(
  macro,
  '/app/src/app/(page)/pages/become-a-provider/sections/press-logos-section/index.tsx',
  '/app/src/app/(page)/pages/become-a-provider/sections/press-logos-section/index.tsx'
)

test(
  macro,
  '/app/src/app/(storyPage)/pages/[handle]/',
  '/app/src/app/(story_page)/pages/[handle]/'
)

test(
  macro,
  '/app/src/components/blocks/PressLogos/',
  '/app/src/components/blocks/press-logos/'
)

test(macro, '/app/src/_TeSt._Test/', '/app/src/_te-st.test/')
