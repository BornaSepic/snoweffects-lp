import type { FC } from 'react'
import { initDatoSdk } from '../core/dato/sdk'
import type { DehydratedState } from '../core/query/prefetch'
import { WEBSITE_NAME } from '../core/seo'
import { Home } from '../views/home'

export type Props = {
  dehydratedState: DehydratedState
}

export const generateMetadata = async () => {
  
}

const Page: FC<Props> = async () => {
  const sdk = initDatoSdk()

  const data = await sdk.getHomepage()

  return (
    <>
      <Home data={data} />
    </>
  )
}

export default Page
