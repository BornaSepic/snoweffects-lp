import Path from 'node:path'
import { parseCircular, parseDependencyTree, prettyCircular } from 'dpdm'
import { AppError } from './core/errors/app-error.js'
import { initLogger } from './core/logger/index.js'
import { workdir } from './core/process/workdir.js'

const logger = initLogger().child({ name: 'circular-deps' })

const run = async () => {
  const [, , filepath] = process.argv

  if (filepath == null) {
    throw new AppError('Module filepath is required')
  }

  logger.trace('Analyzing %s', filepath)

  const tree = await parseDependencyTree([filepath], {
    context: workdir,
    skipDynamicImports: false,
    tsconfig: Path.resolve(workdir, 'tsconfig.json')
  })

  const circular = parseCircular(tree)

  if (circular.length) {
    const details = prettyCircular(circular)
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length)

    logger.error('Circular dependencies detected in %s', filepath)
    details.forEach((line) => {
      logger.error(line)
    })
    throw new AppError('Circular dependencies detected', { filepath })
  }

  logger.trace('Finished analyzing %s', filepath)
}

run().catch((err: unknown) => {
  if (err instanceof AppError) {
    process.exit(1)
  }

  logger.fatal({ error: err })
  process.exit(1)
})
