import { DAY_IN_SECONDS, MINUTE_IN_SECONDS } from '../time/seconds'

/**
 *  Switch between cache times based on the Vercel environment.
 */
const givenVercelEnv = ({
  production,
  preview
}: {
  production: number
  preview: number
}): number => {
  return process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? production
    : preview
}

export const API_CACHE_TIME: number = givenVercelEnv({
  production: 3 * MINUTE_IN_SECONDS,
  preview: 1 * MINUTE_IN_SECONDS
})

export const API_STALE_TIME: number = 1 * DAY_IN_SECONDS
