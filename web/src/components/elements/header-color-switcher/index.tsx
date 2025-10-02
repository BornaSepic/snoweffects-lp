'use client'
import { type FC, useEffect } from 'react'
import { gsap } from '../../../core/animation/gsap'
import { useMediaQuery } from '../../../core/viewport/use-media-query'
import {
  type HeaderColorScheme,
  useHeaderStore
} from '../../../store/header-store'

type Props = {
  id: string
  ref: React.RefObject<HTMLDivElement | null>
  colorScheme: HeaderColorScheme
  previousColorScheme?: HeaderColorScheme
}

export const HeaderColorSwitcher: FC<Props> = ({
  id,
  ref,
  colorScheme,
  previousColorScheme
}) => {
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const { setTopMask, setBottomMask } = useHeaderStore()
  useEffect(() => {
    if (isDesktop === null) {
      return
    }

    const headerContent = document.getElementById(
      isDesktop ? 'header-content-desktop' : 'header-content-mobile'
    )

    const approximateHeaderHeight = headerContent
      ? headerContent.offsetHeight
      : isDesktop
        ? 68
        : 50
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: `top-=${approximateHeaderHeight}px`,
        end: `top`,
        markers: false,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (previousColorScheme === colorScheme && colorScheme !== null) {
            return
          }

          if (self.direction === 1) {
            setBottomMask({
              colorScheme: colorScheme,
              percentage: 100 - self.progress * 100
            })
          } else {
            setTopMask({
              colorScheme: previousColorScheme || colorScheme,
              percentage: self.progress * 100
            })
          }
        }
      }
    })

    return () => {
      timeline.kill()
    }
  }, [
    colorScheme,
    previousColorScheme,
    id,
    ref,
    isDesktop,
    setBottomMask,
    setTopMask
  ])

  return <></>
}
