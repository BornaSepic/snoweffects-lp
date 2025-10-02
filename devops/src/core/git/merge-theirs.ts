import Path from 'node:path'
import type { Logger } from '../logger/index.js'

export type MergeTheirsInput = {
  cwd: string
  logger: Logger
  message?: string
  sourceBranch: string
}

/**
 * The content of our (current) branch is going to be identical to their branch after the merge
 * even if our branch is ahead
 *
 * See:
 * https://devblogs.microsoft.com/oldnewthing/20200928-00/
 * https://stackoverflow.com/questions/173919/is-there-a-theirs-version-of-git-merge-s-ours/27338013#27338013
 */
export const mergeTheirs = async (input: MergeTheirsInput): Promise<void> => {
  const { execa } = await import('execa')

  const { cwd, logger, sourceBranch: theirBranch } = input

  const mergeMessage =
    input.message || `Merge ${theirBranch.replace(/^origin\//, '')}`

  logger.debug('Merging changes from %s', theirBranch)

  const mergeProcess = execa(
    Path.resolve(__dirname, './merge-theirs.sh'),
    [theirBranch, mergeMessage.trim()],
    {
      cwd
    }
  )
  mergeProcess.stdout?.pipe(process.stdout)
  mergeProcess.stderr?.pipe(process.stderr)
  await mergeProcess

  logger.info('Merged changes from %s', theirBranch)
}
