import { type FC } from 'react'
import { Main } from '../../components/elements/main'
import { type GetHomepageQuery } from '../../core/dato/sdk/blueprint'
import { Hero } from '../../components/blocks/hero'
import { FooterCard } from '../../components/blocks/footer-card'
import { LogoCarousel } from '../../components/blocks/logo-carousel'
import { ContentCards } from '../../components/blocks/content-cards'
import { FAQ } from '../../components/blocks/faq'

type Props = {
  data: GetHomepageQuery
}

export const Home: FC<Props> = ({ data }) => {
  return (
    <>
      <Main>
        <Hero
          title={
            <>
              Bring the Magic of Snow Indoors <br />
              (and Out!)-<i>Without the Cold</i>
            </>
          }
          subtitle={'REALISTIC SNOW SCENES FOR HOLIDAYS, PARTIES, AND SEASONAL DISPLAYS'}
          phoneCta={{
            label: 'Call Us',
            desktopLabel: <>Call Us  <b>440-468-7669</b></>,
            href: 'tel:4404687669'
          }}
          ctas={[
            { label: 'Shop Snow Kits', href: '/' },
            { label: 'See Real Setups', desktopLabel: 'See Real Customer Setups', href: '/' }
          ]}
          desktopImage={{
            src: '/images/hero-desktop.jpg',
            alt: 'Hero Desktop Image',
            width: 1440,
            height: 900
          }}
          mobileImage={{
            src: '/images/hero-mobile.png',
            alt: 'Hero Mobile Image',
            width: 768,
            height: 1024
          }}
        />
        <ContentCards
          title={
            <>
              Real Projects from <br /> <i>Real Customers</i>
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
        <FAQ
          title={
            <>
              Common Questions, <br /> <i>Answered</i>
            </>
          }
          questions={[
            {
              question: 'Is it safe for kids and pets?',
              answer:
                'Absolutely! Our snow products are non-toxic and safe for children and pets when used as directed.'
            },
            {
              question: 'How much do I need?',
              answer:
                'One 22 lb bag of SnowScape covers ~75 sq ft at 1 inch thick.'
            },
            {
              question: 'Does it hold up in wind/rain?',
              answer:
                'Yes! Our snow products are designed to withstand various weather conditions, including wind and rain.'
            },
            {
              question: 'How do I clean it up?',
              answer:
                'Our snow products are easy to clean up. Simply sweep or vacuum the area, and any remaining residue can be washed away with water.'
            },
            {
              question: 'Can I use it on wood/tile/stage?',
              answer:
                'Yes! Our snow products are safe for use on various surfaces, including wood, tile, and stages.'
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
