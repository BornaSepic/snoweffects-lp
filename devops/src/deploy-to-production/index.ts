import { DevOpsError } from '../core/errors/index.js'
import { initGit } from '../core/git/index.js'
import { mergeTheirs } from '../core/git/merge-theirs.js'
import { switchToBranch } from '../core/git/switch-to-branch.js'
import { initLogger } from '../core/logger/index.js'
import { makeLogErrorDetails } from '../core/logger/log-error-details.js'
import { gitdir as cwd } from '../core/process/gitdir.js'

const logger = initLogger()
const logErrorDetails = makeLogErrorDetails(logger)

const run = async function (): Promise<void> {
  logger.debug('Initializing git')
  const git = await initGit({ logger, cwd })

  logger.debug('Checking if release branch exists')
  const { branches } = await git.branch()

  if (branches['remotes/origin/release'] == null) {
    throw new DevOpsError(
      `No 'origin/release' branch found, deploy to release first`,
      {
        branches,
        traceTag: '356ed6f4e1834a8790d96dec88bba41f'
      }
    )
  }

  logger.debug('Switching to production branch')
  await switchToBranch({
    git,
    logger,
    baseBranchMode: 'fallback-to-main',
    targetBranchName: 'production',
    baseBranchName: 'origin/release'
  })

  logger.debug('Merging release branch into production')
  await mergeTheirs({
    cwd,
    logger,
    sourceBranch: 'origin/release'
  })

  logger.info('Merged release into production successfully')
}

run().catch((_err) => {
  const err = logErrorDetails(_err)

  throw err
})
