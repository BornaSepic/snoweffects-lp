'use client'

import React, { useEffect, useRef, useState, type FC } from 'react'
import { Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper/types'
import 'swiper/css'
import style from './style.module.scss'
import { ArrowLeft } from '../../icons/arrow-left'
import { ArrowRight } from '../../icons/arrow-right'
import clsx from 'clsx'
import { Cta } from '../../elements/cta'
import Image from 'next/image'
import { SnowflakeIcon } from '../../icons/snowflake'

export type Props = {
  id: string
  title: React.ReactNode
  subtitle: string
  products: Array<{
    id: string
    url: string
    image: {
      src: string
      width: number
      height: number
      alt: string
    }
    compareAtPrice: string | null
    price: string
    title: string
    description: string
    badge: string | null
    priceBadge: string | null
    features: string[]
    categories: string[]
    ctaLabel: string
  }>
}

export const FeaturedProducts: FC<Props> = ({
  id,
  title,
  subtitle,
  products
}) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null
  )
  const swiperRef = useRef<SwiperType | null>(null)

  const [hasNextSlide, setHasNextSlide] = useState(true)
  const [hasPrevSlide, setHasPrevSlide] = useState(false)

  const uniqueCategories = products.reduce((acc: string[], product) => {
    product.categories.forEach((category) => {
      if (!acc.includes(category)) {
        acc.push(category)
      }
    })
    return acc
  }, [])

  const selectedOrDefaultCategory =
    selectedCategory ?? uniqueCategories[0] ?? ''

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(0)
      setHasNextSlide(!swiperRef.current.isEnd)
      setHasPrevSlide(!swiperRef.current.isBeginning)
    }
  }, [selectedCategory])

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '')
      const category = uniqueCategories.find(cat => cat.toLowerCase().includes(hash))
      if (category) {
        setSelectedCategory(category)
      }
    })

    return () => {
      window.removeEventListener('hashchange', () => {})
    }
  }, [uniqueCategories])

  return (
    <section className={style.FeaturedProducts__wrapper}>
      <div id="products"></div>
      <div id="kits"></div>
      <div className={style.FeaturedProducts} id={id}>
        <div className={style.FeaturedProducts__header}>
          <div className={style.FeaturedProducts__header__content}>
            <h2 className={style.FeaturedProducts__header__title}>{title}</h2>
            <p className={style.FeaturedProducts__header__subtitle}>
              {subtitle}
            </p>
          </div>
          <div className={style.FeaturedProducts__header__controls}>
            {uniqueCategories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category ? null : category
                  )
                }
                className={clsx(
                  style.FeaturedProducts__header__controls__button,
                  selectedOrDefaultCategory === category &&
                    style['FeaturedProducts__header__controls__button--active']
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className={style.FeaturedProducts__content}>
          <Swiper
            modules={[Scrollbar]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
              setHasNextSlide(!swiper.isEnd)
              setHasPrevSlide(!swiper.isBeginning)
            }}
            onSlideChange={(swiper) => {
              setHasNextSlide(!swiper.isEnd)
              setHasPrevSlide(!swiper.isBeginning)
            }}
            scrollbar={{
              el: `#${id} .${style.FeaturedProducts__controls__scrollbar}`,
              draggable: true,
              hide: false
            }}
            spaceBetween={12}
            slidesPerView={1.2}
            breakpoints={{
              860: {
                slidesPerView: 2.2
              },
              1400: {
                slidesPerView: 4
              }
            }}
          >
            {products.map((product, index) => {
              if (!product.categories.includes(selectedOrDefaultCategory)) {
                return null
              }

              return (
                <SwiperSlide key={index}>
                  <article className={style.FeaturedProducts__product}>
                    <a
                      href={product.url}
                      className={
                        style.FeaturedProducts__product__image__container
                      }
                    >
                      <Image
                        src={product.image.src}
                        alt={product.image.alt}
                        width={product.image.width}
                        height={product.image.height}
                        className={style.FeaturedProducts__product__image}
                      />
                      {product.badge && (
                        <span
                          className={style.FeaturedProducts__product__badge}
                        >
                          {product.badge}
                        </span>
                      )}
                    </a>

                    <div
                      className={
                        style.FeaturedProducts__product__content__wrapper
                      }
                    >
                      <div className={style.FeaturedProducts__product__content}>
                        <div>
                          <h3
                            className={style.FeaturedProducts__product__title}
                          >
                            {product.title}
                          </h3>
                          <div
                            className={
                              style.FeaturedProducts__product__price__container
                            }
                          >
                            {product.compareAtPrice && (
                              <span
                                className={
                                  style.FeaturedProducts__product__compareAt
                                }
                              >
                                {product.compareAtPrice}
                              </span>
                            )}
                            <span
                              className={style.FeaturedProducts__product__price}
                            >
                              {product.price}
                            </span>
                            {product.priceBadge && (
                              <span
                                className={
                                  style.FeaturedProducts__product__priceBadge
                                }
                              >
                                {product.priceBadge}
                              </span>
                            )}
                          </div>
                          {product.description && <p className={style.FeaturedProducts__product__description}>{product.description}</p>}
                        </div>
                        {product.features.length > 0 && (
                          <ul
                            className={
                              style.FeaturedProducts__product__features
                            }
                          >
                            <li>INCLUDES:</li>
                            {product.features.map((feature, idx) => (
                              <li key={idx}>
                                <SnowflakeIcon color={'green'} />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div className={style.FeaturedProducts__product__cta}>
                        <Cta link={product.url} label={product.ctaLabel} />
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
        <div
          className={clsx(
            style.FeaturedProducts__controls,
            !hasNextSlide &&
              !hasPrevSlide &&
              style['FeaturedProducts__controls--disabled']
          )}
        >
          <div className={style.FeaturedProducts__controls__scrollbar__wrapper}>
            <div className={style.FeaturedProducts__controls__scrollbar}></div>
          </div>
          <div className={style.FeaturedProducts__controls__buttons}>
            <button
              className={style.FeaturedProducts__button}
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ArrowLeft />
            </button>
            <button
              className={style.FeaturedProducts__button}
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
