import { type FC } from 'react'
import { Main } from '../../components/elements/main'
import { type GetHomepageQuery } from '../../core/dato/sdk/blueprint'

type Props = {
  data: GetHomepageQuery
}

export const Home: FC<Props> = ({ data }) => {
  return (
    <>
      <Main>
      </Main>
    </>
  )
}
