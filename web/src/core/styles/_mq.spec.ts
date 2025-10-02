import { exec as cbExec } from 'child_process'
import Path from 'path'
import { promisify } from 'util'
import test from 'ava'

const exec = promisify(cbExec)

const expected = `
@media print, screen and (min-width: 43em) {
  .element {
    color: red;
  }
}
@media print, screen and (min-width: 62em) {
  .element {
    color: green;
  }
}
@media print, screen and (min-width: 82em) {
  .element {
    color: blue;
  }
}
@media print, screen and (min-width: 96em) {
  .element {
    color: cyan;
  }
}
`

test('Media Query Breakpoint Sass Module', async (t) => {
  const specPath = Path.resolve(__dirname, './_mq.spec.scss')
  const { stdout: actual, stderr } = await exec(`sass ${specPath}`)

  const warning = stderr.trim()

  if (warning) {
    t.log(warning)
  }

  t.is(actual.trim(), expected.trim())
})
