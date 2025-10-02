import test from 'ava'
import { cwd } from './cwd.js'

test('CWD helper', async (t) => {
  if (!process.env.WORKDIR) {
    throw new Error('WORKDIR environment variable not set')
  }

  t.is(cwd, process.env.WORKDIR)
})
