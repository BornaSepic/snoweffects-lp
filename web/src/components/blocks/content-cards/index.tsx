import { type FC } from 'react'
import style from './style.module.scss'
import Image from 'next/image'
import { Cta } from '../../elements/cta'
import { SnowflakeIcon } from '../../icons/snowflake'
import clsx from 'clsx'
import { SnowEffect } from '../../elements/snow-effect'

export type Props = {
  title: React.ReactNode
  subtitle?: React.ReactNode
  description: string
  contentAligment?: 'left' | 'center' | 'right'
  cta?: { label: string; href: string }
  contentTitle?: string
  contentItems?: Array<{
    label: string | React.ReactNode
  }>
  cards: Array<{
    title: string
    ctaLabel?: string
    ctaLink?: string
    image: {
      src: string
      alt: string
      width: number
      height: number,
      objectPosition?: 'center' | 'top' | 'bottom' | 'left' | 'right'
    }
  }>
  showSnowEffect?: boolean
}

export const ContentCards: FC<Props> = async ({
  title,
  subtitle,
  description,
  contentAligment = 'left',
  cta,
  contentTitle,
  contentItems,
  cards,
  showSnowEffect = false
}) => {
  return (
    <section className={style.ContentCards__wrapper}>
      {showSnowEffect ? <SnowEffect color={'black'} /> : null}
      <div className={style.ContentCards}>
        <div
          className={clsx(
            style.ContentCards__content,
            contentAligment === 'center'
              ? style['ContentCards__content--center']
              : contentAligment === 'right'
                ? null
                : null
          )}
        >
          <div className={style.ContentCards__content__left}>
            {subtitle && (
              <p className={style.ContentCards__content__subtitle}>
                {subtitle}
              </p>
            )}
            <h2 className={style.ContentCards__content__title}>{title}</h2>
            <p className={style.ContentCards__content__description}>
              {description}
            </p>
          </div>

          {contentTitle ? (
            <div className={style.ContentCards__content__right}>
              <div>
                <h3 className={style.ContentCards__content__right__title}>
                  {contentTitle}
                </h3>
                {contentItems ? (
                  <ul className={style.ContentCards__content__right__list}>
                    {contentItems.map((item, index) => (
                      <li
                        key={index}
                        className={
                          style.ContentCards__content__right__list__item
                        }
                      >
                        <SnowflakeIcon />
                        <span>{item.label}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
              {cta && (
                <Cta link={cta.href} mode={'primary'} label={cta.label} />
              )}
            </div>
          ) : null}
        </div>
        <div className={style.ContentCards__cards}>
          {cards.map((card, index) => (
            <div key={index} className={style.ContentCards__card}>
              <div className={style.ContentCards__card__image}>
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  width={card.image.width}
                  height={card.image.height}
                  style={{ objectFit: 'cover', objectPosition: card.image.objectPosition ?? 'center' }}
                />
              </div>
              <div className={style.ContentCards__card__content}>
                <h4 className={style.ContentCards__card__content__title}>
                  {card.title}
                </h4>
                {card.ctaLabel && card.ctaLink ? (
                  <Cta
                    link={card.ctaLink}
                    mode={'primary'}
                    label={card.ctaLabel}
                  />
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
