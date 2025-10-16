'use client'

import React, { useRef, type FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper/types'
import 'swiper/css'
import 'swiper/css/effect-fade'
import style from './style.module.scss'
import Image from 'next/image'
import clsx from 'clsx'
import { EffectFade } from 'swiper/modules'
import { StepsVideoPlayer } from './video'

export type Props = {
  id: string
  title: React.ReactNode
  backgroundImage: {
    src: string
    width: number
    height: number
    alt: string
  }
  steps: Array<{
    id: string
    label: string
    title: React.ReactNode
    description: string
    asset:
      | {
          __typename: 'Image'
          src: string
          width: number
          height: number
          alt: string,
          objectPosition?: string
        }
      | {
          __typename: 'Video'
          src: string
        }
  }>
}

export const Steps: FC<Props> = ({ id, title, steps, backgroundImage }) => {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const contentSwiperRef = useRef<SwiperType | null>(null)
  const gallerySwiperRef = useRef<SwiperType | null>(null)

  return (
    <section className={style.Steps__wrapper} id={id}>
      <div className={style.Steps}>
        <div className={style.Steps__snow__image__container}>
          <Image
            src="/images/footer-card-snow.png"
            alt={'Snow Effects - Footer Card Snow'}
            width={1024}
            height={44}
            priority
            className={style.Steps__snow__image}
          />
        </div>
        <div className={style.Steps__background}>
          <Image
            src={backgroundImage.src}
            alt={backgroundImage.alt}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className={style.Steps__content}>
          <div className={style.Steps__content__left}>
            <div className={style.Steps__content__left__container}>
              <h2 className={style.Steps__content__left__title}>{title}</h2>

              <Swiper
                modules={[EffectFade]}
                onSwiper={(swiper) => {
                  contentSwiperRef.current = swiper
                }}
                spaceBetween={0}
                slidesPerView={1}
                effect={'fade'}
                fadeEffect={{ crossFade: true }}
                allowTouchMove={false}
              >
                {steps.map((step, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <h3 className={style.Steps__content__left__step__title}>
                        {step.title}
                      </h3>
                      <p
                        className={
                          style.Steps__content__left__step__description
                        }
                      >
                        {step.description}
                      </p>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </div>
            <div className={style.Steps__nav}>
              {steps.map((step, index) => {
                return (
                  <button
                    key={index}
                    className={clsx(
                      style.Steps__nav__button,
                      index === activeIndex && style.Steps__nav__button__active
                    )}
                    onClick={() => {
                      setActiveIndex(index)
                      contentSwiperRef.current?.slideTo(index)
                      gallerySwiperRef.current?.slideTo(index)
                    }}
                  >
                    <span>{step.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
          <div className={style.Steps__content__right}>
            <Swiper
              effect={'fade'}
              fadeEffect={{ crossFade: true }}
              modules={[EffectFade]}
              onSwiper={(swiper) => {
                gallerySwiperRef.current = swiper
              }}
              spaceBetween={0}
              slidesPerView={1}
              allowTouchMove={false}
            >
              {steps.map((step, index) => {
                return (
                  <SwiperSlide
                    key={index}
                    className={style.Steps__content__right__slide}
                  >
                    {step.asset.__typename === 'Image' ? (
                      <Image
                        className={style.Steps__content__right__slide__image}
                        src={step.asset.src}
                        width={step.asset.width}
                        height={step.asset.height}
                        alt={step.asset.alt}
                        style={{ objectFit: 'cover', objectPosition: step.asset.objectPosition ?? 'center' }}
                      />
                    ) : (
                      <StepsVideoPlayer
                        video={{ src: step.asset.src }}
                        mobileVideo={{ src: step.asset.src }}
                      />
                    )}
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  )
}
