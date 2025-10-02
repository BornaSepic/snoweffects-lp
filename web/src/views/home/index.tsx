import { type FC } from 'react'
import { Main } from '../../components/elements/main'
import { type GetHomepageQuery } from '../../core/dato/sdk/blueprint'
import { Hero } from '../../components/blocks/hero'
import { FooterCard } from '../../components/blocks/footer-card'
import { LogoCarousel } from '../../components/blocks/logo-carousel'

type Props = {
  data: GetHomepageQuery
}

export const Home: FC<Props> = ({ data }) => {
  return (
    <>
      <Main>
        <Hero />
        <LogoCarousel />
        <FooterCard />
      </Main>
    </>
  )
}
