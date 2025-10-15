'use client'

import { type FC } from 'react'
import 'swiper/css'
import { useMediaQuery } from '../../../core/viewport/use-media-query'
import { LogoCarouselMobile } from './mobile'
import { LogoCarouselDesktop } from './desktop'

export const LogoCarousel: FC = () => {
  const isDesktop = useMediaQuery('(min-width: 1180px)')

  if (!isDesktop) {
    return <LogoCarouselMobile />
  }

  return <LogoCarouselDesktop />
}
