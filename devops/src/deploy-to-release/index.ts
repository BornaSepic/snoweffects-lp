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

  logger.debug('Switching to release branch')
  await switchToBranch({
    git,
    logger,
    baseBranchMode: 'fallback-to-main',
    targetBranchName: 'release',
    baseBranchName: 'origin/main'
  })

  logger.debug('Merging main branch into release')
  await mergeTheirs({
    cwd,
    logger,
    sourceBranch: 'origin/main'
  })

  logger.info('Merged main into release successfully')
}

run().catch((_err) => {
  const err = logErrorDetails(_err)

  throw err
})
