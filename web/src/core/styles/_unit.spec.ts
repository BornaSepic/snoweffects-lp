import { exec as cbExec } from 'child_process'
import Path from 'path'
import { promisify } from 'util'
import test from 'ava'

const exec = promisify(cbExec)

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

test('Unit Sass Module', async (t) => {
  const specPath = Path.resolve(__dirname, './_unit.spec.scss')
  const { stdout: actual, stderr } = await exec(`sass ${specPath}`)

  const warning = stderr.trim()

  if (warning) {
    t.log(warning)
  }

  t.is(actual.trim(), expected.trim())
})
