'use client'

import { useCallback, useEffect, useMemo, useRef, type FC } from 'react'
import Image from 'next/image'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper/types'
import 'swiper/css'
import style from './style.module.scss'
import { gsap } from '../../../core/animation/gsap'
import clsx from 'clsx'

export const LogoCarousel: FC = () => {
  const DATA = {
    title: <>Trusted by Leading Brands & Experiences</>,
    logos: [
      {
        src: '/images/black-yak-logo.png',
        alt: 'Black Yak Logo',
        width: 224,
        height: 48
      },
      {
        src: '/images/aloha-logo.png',
        alt: 'Aloha Logo',
        width: 143,
        height: 40
      },
      {
        src: '/images/broadmoor-logo.png',
        alt: 'Broadmoor Logo',
        width: 216,
        height: 40
      },
      {
        src: '/images/lgu-logo.png',
        alt: 'LGU Logo',
        width: 145,
        height: 40
      },
      {
        src: '/images/merrell-logo.png',
        alt: 'Merrell Logo',
        width: 256,
        height: 40
      },
      {
        src: '/images/ny-logo.png',
        alt: 'NY Logo',
        width: 60,
        height: 80
      }
    ]
  }

  const duplicatedLogos = useMemo(() => {
    return [...DATA.logos, ...DATA.logos]
  }, [DATA.logos])

  const rightSlidesRef = useRef<HTMLDivElement[]>([])
  const leftSlidesRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    rightSlidesRef.current.forEach((slide) => {
      gsap.fromTo(
        slide,
        {
          xPercent: -100
        },
        {
          xPercent: 0,
          repeat: -1,
          duration: rightSlidesRef.current.length * 20,
          ease: 'none'
        }
      )
    })

    leftSlidesRef.current.forEach((slide) => {
      gsap.fromTo(
        slide,
        {
          xPercent: 0
        },
        {
          xPercent: -100,
          repeat: -1,
          duration: leftSlidesRef.current.length * 20,
          ease: 'none'
        }
      )
    })
  }, [])

  return (
    <section className={style.LogoCarousel}>
      <div className={style.LogoCarousel__content}>
        <h2>{DATA.title}</h2>

        <div className={style.LogoCarousel__logos__container}>
          <div className={style.LogoCarousel__logos__wrapper}>
            {[duplicatedLogos, duplicatedLogos].map((logos, index) => {
              return (
                <div
                  key={`logo-wrapper-right-${index}`}
                  className={style.LogoCarousel__logos}
                  ref={(el) => {
                    if (el) {
                      rightSlidesRef.current[index] = el
                    }
                  }}
                >
                  {logos.map((logo, logoIndex) => (
                    <div
                      className={style.LogoCarousel__logo}
                      key={`logo-right-${logoIndex}`}
                      style={{
                        maxWidth: logo.width ? `${logo.width}px` : '150px',
                        height: 'auto',
                        aspectRatio:
                          logo.width && logo.height
                            ? `${logo.width} / ${logo.height}`
                            : 'auto'
                      }}
                    >
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={logo.width || 150}
                        height={logo.height || 75}
                        style={{
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
          <div
            className={clsx(
              style.LogoCarousel__logos__wrapper,
              style['LogoCarousel__logos__wrapper--reverse']
            )}
          >
            {[duplicatedLogos, duplicatedLogos].map((logos, index) => {
              return (
                <div
                  key={`logo-wrapper-left-${index}`}
                  className={style.LogoCarousel__logos}
                  ref={(el) => {
                    if (el) {
                      leftSlidesRef.current[index] = el
                    }
                  }}
                >
                  {logos.map((logo, logoIndex) => (
                    <div
                      className={style.LogoCarousel__logo}
                      key={`logo-left-${logoIndex}`}
                      style={{
                        maxWidth: logo.width ? `${logo.width}px` : '150px',
                        height: 'auto',
                        aspectRatio:
                          logo.width && logo.height
                            ? `${logo.width} / ${logo.height}`
                            : 'auto'
                      }}
                    >
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={logo.width || 150}
                        height={logo.height || 75}
                        style={{
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
