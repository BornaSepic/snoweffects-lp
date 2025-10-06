import { type FC } from 'react'
import { Main } from '../../components/elements/main'
import { type GetHomepageQuery } from '../../core/dato/sdk/blueprint'
import { Hero } from '../../components/blocks/hero'
import { FooterCard } from '../../components/blocks/footer-card'
import { LogoCarousel } from '../../components/blocks/logo-carousel'
import { ContentCards } from '../../components/blocks/content-cards'

type Props = {
  data: GetHomepageQuery
}

export const Home: FC<Props> = ({ data }) => {
  return (
    <>
      <Main>
        <Hero />
        <ContentCards
          title={
            <>
              Real Projects from <br /> Real Customers
            </>
          }
          subtitle={'UNFORGETTABLE SCENES'}
          description={
            'From front porches to beach vow renewals, see how SnowEffects has helped create unforgettable scenes.'
          }
          contentAligment={'center'}
          cards={[
            {
              title: 'North Pole Setup',
              image: {
                src: '/images/north-pole-setup.png',
                alt: 'North Pole Setup',
                width: 400,
                height: 300
              },
              ctaLink: '#',
              ctaLabel: 'View Kit'
            },
            {
              title: 'Snow by the Poolside',
              image: {
                src: '/images/snow-by-the-poolside.png',
                alt: 'Snow by the Poolside',
                width: 400,
                height: 300
              },
              ctaLink: '#',
              ctaLabel: 'View Kit'
            },
            {
              title: 'Winter Wonderland Garden',
              image: {
                src: '/images/winter-wonderland-garden.jpg',
                alt: 'Winter Wonderland Garden',
                width: 400,
                height: 300
              },
              ctaLink: '#',
              ctaLabel: 'View Kit'
            },
            {
              title: 'Snow-Kissed Entrance',
              image: {
                src: '/images/snow-kissed-entrance.jpg',
                alt: 'Snow-Kissed Entrance',
                width: 400,
                height: 300
              },
              ctaLink: '#',
              ctaLabel: 'View Kit'
            }
          ]}
        />
        <ContentCards
          title={
            <>
              Need to Host a <br /> Bigger Event or <br /> Display?
            </>
          }
          description={
            'From large displays to theme parks and events—we’ll provide the snow and support you need, whether you’re doing it yourself or bringing in our pro team for setup and cleanup.'
          }
          contentAligment={'left'}
          contentTitle={'LET US HELP YOU WITH:'}
          contentItems={[
            { label: 'Bulk pricing' },
            { label: 'Product selection consulting' },
            { label: 'Equipment rentals and support' },
            {
              label: (
                <>
                  Buy in bulk for DIY projects, or hire our <br /> professional
                  team for setup and cleanup.
                </>
              )
            }
          ]}
          cta={{ label: 'Contact our team', href: '/' }}
          cards={[
            {
              title: 'ABC - The Bachelor "Show"',
              image: {
                src: '/images/batchelor-show-abc.png',
                alt: 'The Batchelor Show on ABC',
                width: 400,
                height: 300
              }
            },
            {
              title: 'New York City Fashion Show',
              image: {
                src: '/images/nyc-fashion-show.png',
                alt: 'New York City Fashion Show',
                width: 400,
                height: 300
              }
            },
            {
              title: 'Veuve Cliquot Event in Deauville',
              image: {
                src: '/images/veuveclicquot-event.png',
                alt: 'Veuve Cliquot Event in Deauville',
                width: 400,
                height: 300
              }
            },
            {
              title: '“A Bag of Marbles” Film',
              image: {
                src: '/images/a-bag-of-marbles-film.png',
                alt: 'A Bag of Marbles Film',
                width: 400,
                height: 300
              }
            }
          ]}
        />
        <LogoCarousel />
        <FooterCard />
      </Main>
    </>
  )
}
