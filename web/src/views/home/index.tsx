import { type FC } from 'react'
import { Main } from '../../components/elements/main'
import { type GetHomepageQuery } from '../../core/dato/sdk/blueprint'
import { Hero } from '../../components/blocks/hero'

type Props = {
  data: GetHomepageQuery
}

export const Home: FC<Props> = ({ data }) => {
  return (
    <>
      <Main>
        <Hero />
      </Main>
    </>
  )
}
