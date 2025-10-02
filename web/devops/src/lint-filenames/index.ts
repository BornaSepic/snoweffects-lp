import process from 'node:process'
import { initLogger } from '../core/logger/index.js'
import { parseFilePath } from './parse-file-path.js'

const logger = initLogger().child({ name: 'lint-filenames' })

export const run = async (): Promise<void> => {
  const [, , , ...filePaths] = process.argv

  const failedPaths = filePaths.flatMap((actual) => {
    const expected = parseFilePath(actual)

    if (actual === expected) {
      return []
    }

    return [{ actual, expected }]
  })

  if (failedPaths.length === 0) {
    logger.trace('Filenames match convention')
    return
  }

  failedPaths.forEach(({ actual, expected }) => {
    logger.error(
      {
        actual,
        expected
      },
      "Filename does't match convention: %s",
      actual
    )
  })

  process.exit(1)
}

run().catch((err: unknown) => {
  logger.error({ error: err })
  process.exit(1)
})
