import { createTRPCClient, httpLink, loggerLink } from '@trpc/client'
import superjson from 'superjson'
import { initLogger } from '../core/logger'
import type { AppRouter } from './router'

export const inferServerUrl = (): string => {
  if (typeof window !== 'undefined') {
    return '/api/trpc'
  }

  const hostname = process.env.NEXT_PUBLIC_VERCEL_URL

  if (!hostname) {
    throw new Error(
      'App hostname is not defined [cab74f1fae5b43669aca985c8df887a7]'
    )
  }

  const protocol: 'http' | 'https' = hostname.includes('localhost')
    ? 'http'
    : 'https'

  return `${protocol}://${hostname}/api/trpc` as const
}

const logger = initLogger().child({ name: 'trpc-client' })

const _makeApiClient = () =>
  createTRPCClient<AppRouter>({
    links: [
      loggerLink({
        enabled: (opts): boolean => {
          return process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
            ? opts.direction === 'down' && opts.result instanceof Error
            : true
        },
        logger: (opts): void => {
          if (opts.direction === 'up') {
            logger.debug(
              { type: opts.type, path: opts.path },
              'TPRC procedure started'
            )
            return
          }

          const error = opts.result instanceof Error ? opts.result : null

          if (error != null) {
            logger.error(
              {
                type: opts.type,
                path: opts.path,
                code: error.data?.code
              },
              'TRPC procedure failed: %s',
              error.data?.code
            )
          }

          logger.debug(
            { type: opts.type, path: opts.path },
            'TRPC procedure completed'
          )
        }
      }),
      httpLink({
        transformer: superjson,
        url: inferServerUrl()
      })
    ]
  })

export type ApiClient = ReturnType<typeof _makeApiClient>

let apiClient: ApiClient | null = null

export const initApiClient = (): ApiClient => {
  apiClient = apiClient ?? _makeApiClient()

  return apiClient
}
