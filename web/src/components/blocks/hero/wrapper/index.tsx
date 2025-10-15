'use client'

import { use, useEffect, useRef, type FC } from 'react'
import style from '../style.module.scss'
import { gsap } from '../../../../core/animation/gsap'

export type Props = {
  children: React.ReactNode
}

export const HeroWrapper: FC<Props> = ({ children }) => {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!sectionRef.current) {
      return
    }

    const timeline = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        pin: true,
        anticipatePin: 1,
        pinSpacing: false
      }
    })

    timeline.play()

    return () => {
      timeline.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} className={style.Hero__wrapper}>
      {children}
    </section>
  )
}
