import test from 'ava'

const expected = `
/* prettier-ignore */
.element {
  width: clamp(9.375rem, 8.3443271768rem + 4.3975373791vw, 12.5rem);
  height: clamp(2.5rem, 2.3350923483rem + 0.7036059807vw, 3.25rem);
}
@media screen and (min-width: 90em) {
  .element {
    width: clamp(11.25rem, 10.5921052632rem + 2.8070175439vw, 17.1875rem);
  }
}
`

test('given usage examples', async (t) => {
  const { execa } = await import('execa9')
  const { stdout: actual, stderr } = await execa(
    'sass',
    ['./_vw-calc-v3.spec.scss'],
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
