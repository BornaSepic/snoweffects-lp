import { DevOpsError } from '../errors/index.js'
import type { Logger } from '../logger/index.js'
import { isPresent } from '../typescript/is-present.js'
import type { SimpleGit } from './index.js'

export type AddWithCommitInput = {
  cwd: string
  git: SimpleGit
  logger: Logger
  pathspec: string
  message: string
  decorateCommitMessage?: (
    message: string
  ) => [string, string | null | undefined]
  skipDeleted?: boolean
}

export const addWithCommit = async ({
  cwd,
  git,
  logger,
  pathspec,
  message,
  decorateCommitMessage = (m) => [m, null],
  skipDeleted = false
}: AddWithCommitInput): Promise<void> => {
  if (!pathspec) {
    throw new DevOpsError('Pathspec is invalid', {
      pathspec,
      commitMessage: message,
      traceTag: '051fdb71fb574388a08ff662c82c6a1d'
    })
  }

  const { execa } = await import('execa')

  const addProcess = execa(
    'git',
    ['add', skipDeleted ? '--ignore-removal' : null, pathspec].filter(
      isPresent
    ),
    {
      cwd
    }
  )
  addProcess.stdout?.pipe(process.stdout)
  addProcess.stderr?.pipe(process.stderr)
  await addProcess

  const { staged } = await git.status()

  if (staged.length === 0) {
    logger.info({ pathspec }, 'No changes to commit: %s', message)
    return
  }

  const decoratedMessage = decorateCommitMessage(message)
    .filter(isPresent)
    .join('\n\n')
    .trim()

  logger.debug({ staged }, 'Committing: %s', message)

  const { commit, summary } = await git.commit(decoratedMessage)

  logger.info({ commit, summary }, 'Commit created: %s', message)
}
