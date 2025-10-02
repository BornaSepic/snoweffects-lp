import type { DehydratedState } from '@tanstack/react-query'
import { QueryClient, dehydrate } from '@tanstack/react-query'

export type { DehydratedState } from '@tanstack/react-query'

export type PrefetchResult = {
  dehydratedState: DehydratedState
}

export const prefetchQueries = async (
  performClientOperations: (client: QueryClient) => Promise<void>
): Promise<PrefetchResult> => {
  const client = new QueryClient()

  await performClientOperations(client)

  const dehydratedState = dehydrate(client, {
    shouldDehydrateMutation: () => false,
    shouldDehydrateQuery: () => true
  })

  return {
    dehydratedState
  }
}
