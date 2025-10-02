import process from 'node:process'
import { initLogger } from '../core/logger/index.js'
import { parseFolderPath } from './parse-folder-path.js'

const logger = initLogger().child({ name: 'lint-folder-names' })

export const run = async (): Promise<void> => {
  const [, , , ...folderPaths] = process.argv

  const failedFolderPaths = folderPaths.flatMap((actual) => {
    const expected = parseFolderPath(actual)

    if (actual === expected) {
      return []
    }

    return [{ actual, expected }]
  })

  if (failedFolderPaths.length === 0) {
    logger.info('Folder names match convention')
    return
  }

  failedFolderPaths.forEach(({ actual, expected }) => {
    logger.error(
      {
        actual,
        expected
      },
      'Folder names do not match convention: %s',
      actual
    )
  })

  process.exit(1)
}

run().catch((err: unknown) => {
  logger.error({ error: err })
  process.exit(1)
})
