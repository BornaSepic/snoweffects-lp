import fs from 'node:fs/promises'
import Path from 'node:path'
import { argv } from 'node:process'
import { transform } from 'lightningcss'
import { compileAsync } from 'sass-embedded'
import { AppError } from './core/errors/app-error.js'
import { initLogger } from './core/logger/index.js'
import { workdir } from './core/process/workdir.js'

const logger = initLogger().child({ name: 'codegen-style-typedef' })

const run = async (): Promise<void> => {
  const [, , ..._filepaths] = argv

  const filepaths = _filepaths.filter((filepath) => {
    return filepath
  })

  if (filepaths.length === 0) {
    throw new AppError('No file paths provided', { argv })
  }

  await Promise.all(
    filepaths.map(async (filepath): Promise<void> => {
      const { css } = await compileAsync(filepath, {
        sourceMap: false,
        logger: {
          debug(message, options) {
            logger.debug(options, message)
          },
          warn(message, options) {
            const level: 'warn' | 'trace' = options.deprecation
              ? 'trace'
              : 'warn'
            logger[level](options, message)
          }
        },
        loadPaths: [Path.resolve(workdir, 'src/core/styles')]
      })

      const { exports, warnings } = transform({
        filename: filepath,
        projectRoot: workdir,
        sourceMap: false,
        cssModules: {
          dashedIdents: true,
          pattern: ['[hash]', '[local]'].join('_')
        },
        minify: false,
        code: Buffer.from(css)
      })

      if (exports == null) {
        return
      }

      if (warnings.length) {
        warnings.forEach(({ loc, message, type }) => {
          logger.debug({ filepath, loc, type }, message)
        })
      }

      const stylenames = Object.keys(exports)
        .sort()
        .reduce<Record<string, string>>((acc, name) => {
          acc[name] = name
          return acc
        }, {})

      const _typedef = `
/* AUTO-GENERATED FILE. DO NOT EDIT */
export type Styles = ${JSON.stringify(stylenames, null, 2)}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles
`

      const typedef = [_typedef.trim(), '\n'].join('')

      const destinationPath = [filepath, '.d.ts'].join('')

      await fs.writeFile(destinationPath, typedef, { encoding: 'utf-8' })
    })
  )
}

run().catch(async (err: unknown) => {
  logger.error(err instanceof Error ? err.message : 'Unknown error')
  process.exit(1)
})
