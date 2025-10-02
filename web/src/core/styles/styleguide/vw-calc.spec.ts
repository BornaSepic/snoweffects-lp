import test from 'ava'

const expected = `
.xsmall {
  font-size: clamp(1rem, 0.2727272727rem + 3.6363636364vw, 1.25rem);
}

.xlarge {
  font-size: clamp(1.25rem, 0rem + 1.6666666667vw, 1.5rem);
}
`

test('given example usage', async (t) => {
  const { execa } = await import('execa9')
  const { stdout: actual, stderr } = await execa(
    'sass',
    ['./_vw-calc.spec.scss'],
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
