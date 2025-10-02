import type { Logger, LoggerOptions } from 'pino'
import pino from 'pino'
import pretty, { colorizerFactory } from 'pino-pretty'

export type { Level, Logger } from 'pino'

export type LoggerFactoryOptions = {
  mode: 'development' | 'production' | 'test'
}

export type MakeLogger = (options: LoggerFactoryOptions) => pino.Logger

const colorizer = colorizerFactory(true)

export const _makeLogger: MakeLogger = function makeLogger({
  mode = 'development'
}) {
  const enabled = mode !== 'test'

  const base: LoggerOptions['base'] = {}

  const options: LoggerOptions = {
    base,
    enabled,
    level: 'trace',
    name: 'devops'
  }

  const stream = pretty({
    colorize: true,
    sync: true,
    messageFormat: (log, messageKey) => {
      const message = log[messageKey]
      if (typeof message !== 'string') {
        return ''
      }

      return log.level === 10 ? `${colorizer.greyMessage(message)}` : message
    }
  })

  return pino(options, stream)
}

let logger: Logger | null = null

export const initLogger = function (): Logger {
  logger =
    logger ??
    _makeLogger({
      mode: 'development'
    })

  return logger
}
