import { type FC } from 'react'
import style from './style.module.scss'
import Image from 'next/image'
import { Cta } from '../../elements/cta'

export const FooterCard: FC = async () => {
  const DATA = {
    title: (
      <>
        Ready to Make <i>Your Winter Scene</i>?
      </>
    ),
    description:
      'NO COLD. NO MESS. JUST MAGICAL, REALISTIC SNOW—DELIVERED TO YOUR DOOR.',
    cta: {
      label: 'Build Your Snow Scene',
      href: '#products'
    }
  }

  return (
    <section className={style.FooterCard__wrapper}>
      <div className={style.FooterCard}>
        <div className={style.FooterCard__content}>
          <Image
            src="/images/footer-card-snow.png"
            alt={'Snow Effects - Footer Card Snow'}
            width={1024}
            height={44}
            priority
            className={style.FooterCard__image}
          />
          <div>
            <h2 className={style.FooterCard__content__title}>{DATA.title}</h2>
            <p className={style.FooterCard__content__description}>
              {DATA.description}
            </p>
          </div>
          <div className={style.FooterCard__content__cta}>
            <Cta label={DATA.cta.label} link={DATA.cta.href} />
          </div>
        </div>
      </div>
    </section>
  )
}
