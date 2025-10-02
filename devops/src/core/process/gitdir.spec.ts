import test from 'ava'
import { gitdir } from './gitdir.js'

test('GITDIR helper', async function (t) {
  if (!process.env.GITDIR) {
    throw new Error('GITDIR environment variable not set')
  }

  t.is(gitdir, process.env.GITDIR)
})
