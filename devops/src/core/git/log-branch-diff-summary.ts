import type { Logger } from '../logger/index.js'
import { MINUTE_IN_MS } from '../time/constants.js'

export type LogBranchDiffSummaryInput = {
  cwd: string
  logger: Logger
  theirBranchName: string
}

export const logBranchDiffSummary = async ({
  cwd,
  logger,
  theirBranchName
}: LogBranchDiffSummaryInput) => {
  const { execa } = await import('execa')

  const { stdout: _summary } = await execa(
    'git',
    ['diff', '--compact-summary', theirBranchName],
    { cwd, timeout: 5 * MINUTE_IN_MS }
  )

  const details = _summary.split('\n').filter((line) => line.length)

  logger.info(
    { details },
    'Difference with %s: %s',
    theirBranchName,
    details.at(-1)
  )
}
