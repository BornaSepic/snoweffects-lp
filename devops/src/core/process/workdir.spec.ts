import test from 'ava'
import { workdir } from './workdir.js'

test('WORKDIR helper', async function (t) {
  if (!process.env.WORKDIR) {
    throw new Error('WORKDIR environment variable not set')
  }

  t.is(workdir, process.env.WORKDIR)
})
