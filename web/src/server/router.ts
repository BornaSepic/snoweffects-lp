import { router } from './trpc'

export const layoutRouter = router({})

export const serviceRouter = router({})

export const publicRouter = router({
  layout: layoutRouter,
  services: serviceRouter
})

export const appRouter = router({ public: publicRouter })

export type AppRouter = typeof appRouter
