import type { Level, Logger, LoggerOptions, WriteFn } from 'pino'
import pino from 'pino'
import { hasKey } from '../typescript/guards'
export type { Logger } from 'pino'

const REDACT_PATHS: string[] = []

// LogDNA requires message key to be 'message'
const messageKey = 'message'

const makeBrowserWrite = (pinoLevel: Level = 'info'): WriteFn => {
  const level =
    pinoLevel === 'fatal'
      ? 'error'
      : pinoLevel === 'trace'
        ? 'debug'
        : pinoLevel

  return (line) => {
    const message: string | null =
      hasKey('message', line) && typeof line.message === 'string'
        ? line.message
        : hasKey('msg', line) && typeof line.msg === 'string'
          ? line.msg
          : null

    // eslint-disable-next-line no-console
    console[level](message, line)
  }
}

export type LoggerFactoryOptions = {
  appName?: string | null
  gitCommitSha?: string | null
  mode: 'development' | 'production' | 'test'
}

export type MakeLogger = (options: LoggerFactoryOptions) => pino.Logger

export const _makeLogger: MakeLogger = function makeLogger({
  appName,
  gitCommitSha,
  mode = 'development'
}) {
  const enabled = mode !== 'test'

  const level = mode === 'production' ? 'info' : 'trace'

  // LogDNA parses level labels only
  const formatters = {
    level(label: string) {
      return { level: label }
    }
  }

  const base: LoggerOptions['base'] = {
    appName,
    gitCommitSha
  }

  const options: LoggerOptions = {
    base,
    enabled,
    formatters,
    level,
    messageKey,
    name: 'main',
    redact: { censor: '[REDACTED]', paths: REDACT_PATHS },
    browser: {
      asObject: true,
      write: {
        debug: makeBrowserWrite('debug'),
        error: makeBrowserWrite('error'),
        fatal: makeBrowserWrite('fatal'),
        info: makeBrowserWrite('info'),
        trace: makeBrowserWrite('trace'),
        warn: makeBrowserWrite('warn')
      }
    }
  }

  return pino(options)
}

let logger: Logger | null = null

export const initLogger = (): Logger => {
  logger =
    logger ??
    _makeLogger({
      mode:
        process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
          ? 'production'
          : 'development',
      gitCommitSha: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
      appName: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG
    })

  return logger
}
