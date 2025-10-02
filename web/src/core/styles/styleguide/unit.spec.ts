import test from 'ava'

const expected = `
.element {
  width: 20rem;
  margin: 0 0.625rem 0 1rem;
  font-size: 1rem;
  font-size: 0.0625rem;
  font-size: 1.5rem;
  line-height: 1rem;
}

.element {
  line-height: 1;
}
`

test('given usage examples', async (t) => {
  const { execa } = await import('execa9')
  const { stdout: actual, stderr } = await execa(
    'sass',
    ['./_unit.spec.scss'],
    {
      cwd: __dirname,
      lines: true
    }
  )

  stderr.forEach((line) => {
    t.log(line)
  })

  t.is(actual.join('\n').trim(), expected.trim())
})
