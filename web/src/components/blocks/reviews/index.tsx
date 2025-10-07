'use client'

import { useRef, type FC } from 'react'
import { Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper/types'
import 'swiper/css'
import style from './style.module.scss'
import { ArrowLeft } from '../../icons/arrow-left'
import { ArrowRight } from '../../icons/arrow-right'
import clsx from 'clsx'

export type Props = {
  id: string
  reviews: Array<{
    content: string
    author: string
    note?: string
  }>
}

export const Reviews: FC<Props> = ({ id, reviews }) => {
  const swiperRef = useRef<SwiperType | null>(null)

  return (
    <section className={style.Reviews} id={id}>
      <div className={style.Reviews__content}>
        <button
          className={clsx(style.Reviews__button, 'hide-mobile')}
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <ArrowLeft />
        </button>
        <Swiper
          modules={[Scrollbar]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
          scrollbar={{
            el: `#${id} .${style.Reviews__controls__scrollbar}`,
            draggable: true,
            hide: false
          }}
          loop={true}
          spaceBetween={32}
          slidesPerView={1}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className={style.Reviews__review}>
                <p className={style.Reviews__review__content}>
                  "{review.content}"
                </p>
                <div className={style.Reviews__review__content__footer}>
                  <p className={style.Reviews__review__content__author}>
                    {review.author}
                  </p>
                  {review.note && (
                    <p className={style.Reviews__review__content__note}>
                      {review.note}
                    </p>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          className={clsx(style.Reviews__button, 'hide-mobile')}
          onClick={() => swiperRef.current?.slideNext()}
        >
          <ArrowRight />
        </button>
      </div>
      <div className={clsx(style.Reviews__controls, 'hide-desktop')}>
        <div className={style.Reviews__controls__scrollbar__wrapper}>
          <div className={style.Reviews__controls__scrollbar}></div>
        </div>
        <div className={style.Reviews__controls__buttons}>
          <button
            className={style.Reviews__button}
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ArrowLeft />
          </button>
          <button
            className={style.Reviews__button}
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </section>
  )
}
