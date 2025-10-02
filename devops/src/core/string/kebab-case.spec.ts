import test from 'ava'
import { kebabCase as k } from './kebab-case'

test('Kebab Case Utility', async function (t) {
  t.is(k('foo-bar'), 'foo-bar')
  ;[
    'foo bar',
    'Foo bar',
    'foo Bar',
    'Foo Bar',
    'FOO BAR',
    'fooBar',
    '--foo-bar--',
    '__foo_bar__'
  ].forEach(function (s) {
    return t.is(k(s), 'foo-bar')
  })

  t.is(k('12 feet'), '12-feet')
  t.is(k('enable 6h format'), 'enable-6-h-format')
  t.is(k('enable 24H format'), 'enable-24-h-format')
  t.is(k('too legit 2 quit'), 'too-legit-2-quit')
  t.is(k('walk 500 miles'), 'walk-500-miles')
  t.is(k('xhr2 request'), 'xhr-2-request')
  ;['safe HTML', 'safeHTML'].forEach(function (string) {
    t.is(k(string), 'safe-html')
  })
  ;['escape HTML entities', 'escapeHTMLEntities'].forEach(function (string) {
    t.is(k(string), 'escape-html-entities')
  })
  ;['XMLHttpRequest', 'XmlHTTPRequest'].forEach(function (string) {
    t.is(k(string), 'xml-http-request')
  })

  const postfixes = ['d', 'll', 'm', 're', 's', 't', 've']

  ;["'", '\u2019'].forEach(function (apos) {
    const actual = postfixes.map(function (postfix) {
      return k('a b' + apos + postfix + ' c')
    })

    const expected = postfixes.map(function (postfix) {
      return 'a-b' + postfix + '-c'
    })

    t.deepEqual(actual, expected, 'should remove contraction apostrophes')
  })
  ;['\xd7', '\xf7'].forEach(function (mathOperator: string) {
    t.is(k(mathOperator), '', 'should remove Latin mathematical operators')
  })
})
