import type { CreateNextContextOptions } from '@trpc/server/adapters/next'
import type { Sdk as DatoSdk } from '../core/dato/sdk'
import { initDatoSdk } from '../core/dato/sdk'
import type { Logger } from '../core/logger'
import { initLogger } from '../core/logger'
import type { CreateHash } from '../core/security/create-hash'
import { createHash } from '../core/security/create-hash'

const logger = initLogger().child({ name: 'trpc' })

export type Context = {
  appName: string
  createHash: CreateHash
  hasResponse: boolean
  logger: Logger
  datoSdk: DatoSdk
}

export const createContext = async (
  opts?: CreateNextContextOptions
): Promise<Context> => {
  const appName = process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG || '[unset]'
  const datoSdk = initDatoSdk()

  const hasResponse = opts?.req != null

  return {
    appName,
    createHash,
    datoSdk,
    hasResponse,
    logger
  }
}
