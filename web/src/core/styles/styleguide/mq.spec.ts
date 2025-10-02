import test from 'ava'

const expected = `
@media (width >= 30em) {
  .element {
    color: red;
  }
}
@media (width >= 48em) {
  .element {
    color: green;
  }
}
@media (width >= 80em) {
  .element {
    color: blue;
  }
}
@media (width < 30em) {
  .element {
    color: cyan;
  }
}
@media (width < 48em) {
  .element {
    color: magenta;
  }
}
@media (width < 80em) {
  .element {
    color: yellow;
  }
}
`

test('given media query breakpoints', async (t) => {
  const { execa } = await import('execa9')
  const { stdout: actual, stderr } = await execa('sass', ['./_mq.spec.scss'], {
    cwd: __dirname,
    lines: true
  })

  stderr.forEach((line) => {
    t.log(line)
  })

  t.is(actual.join('\n').trim(), expected.trim())
})
