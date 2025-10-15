'use client'

import { use, useEffect, useRef, type FC } from 'react'
import style from '../style.module.scss'
import { gsap } from '../../../../core/animation/gsap'

export type Props = {
  children: React.ReactNode
}

export const HeroWrapper: FC<Props> = ({ children }) => {
  const sectionRef = useRef<HTMLElement | null>(null)

  // Add parrallax effect to hero background on scroll
  useEffect(() => {
    if (!sectionRef.current) return

    const handleScroll = () => {
      if (!sectionRef.current) return
      const scrollTop = window.scrollY
      const offsetTop = sectionRef.current.offsetTop
      const height = sectionRef.current.offsetHeight

      if (
        scrollTop + window.innerHeight > offsetTop &&
        scrollTop < offsetTop + height
      ) {
        const yPos = (scrollTop - offsetTop) * 0.5 // Adjust the multiplier to control the speed
        gsap.to(
          sectionRef.current,
          {
            y: yPos,
            duration: 0,
            ease: 'none',
            overwrite: 'auto'
          }
        )
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section ref={sectionRef} className={style.Hero__wrapper}>
      {children}
    </section>
  )
}
