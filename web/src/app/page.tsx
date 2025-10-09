import type { FC } from 'react'
import type { DehydratedState } from '../core/query/prefetch'
import { Home } from '../views/home'

export type Props = {
  dehydratedState: DehydratedState
}

export const generateMetadata = async () => {

}

const Page: FC<Props> = async () => {
  return (
    <>
      <Home />
    </>
  )
}

export default Page
