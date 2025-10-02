'use client'

// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
import {
  QueryClient,
  QueryClientProvider,
  isServer
} from '@tanstack/react-query'
import { ReactLenis } from 'lenis/react'
import { useRef } from 'react'
import { useMediaQuery } from '../core/viewport/use-media-query'

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000
      }
    }
  })
}

let browserQueryClient: QueryClient | undefined = undefined

const getQueryClient = () => {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient()
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient()
    }
    return browserQueryClient
  }
}

const LenisScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  if (isMobile) {
    return <>{children}</>
  }

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true,
        autoRaf: true,
        prevent: (node: unknown) => {
          if (node instanceof HTMLElement) {
            return node.dataset.disableLenis === 'true'
          }

          return false
        }
      }}
    >
      {children}
    </ReactLenis>
  )
}

const Providers = ({ children }: { children: React.ReactNode }) => {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export default Providers
