import type { FC } from 'react'
import style from './style.module.scss'
import { Phone } from '../../icons/phone'
import { HeaderLogo } from '../../icons/header-logo'
import { Cta } from '../../elements/cta'
import Image from 'next/image'
import { SnowEffect } from '../../elements/snow-effect'
import { HeroWrapper } from './wrapper'

export type Props = {
  title: React.ReactNode
  subtitle: string
  phoneCta: {
    label: React.ReactNode | string
    desktopLabel: React.ReactNode | string
    href: string
  }
  ctas: Array<{ label: string; desktopLabel?: string; href: string }>
  desktopImage: {
    src: string
    alt: string
    width: number
    height: number
  }
  mobileImage: {
    src: string
    alt: string
    width: number
    height: number
  }
}

export const Hero: FC<Props> = ({
  title,
  subtitle,
  phoneCta,
  ctas,
  desktopImage,
  mobileImage
}) => {
  return (
    <HeroWrapper>
      <div className={style.Hero}>
        <div className={style.Hero__background}>
          <div className={style.Hero__background__desktop}>
            <Image
              src={desktopImage.src}
              alt={desktopImage.alt}
              width={desktopImage.width}
              height={desktopImage.height}
              priority
            />
          </div>

          <div className={style.Hero__background__mobile}>
            <Image
              src={mobileImage.src}
              alt={mobileImage.alt}
              width={mobileImage.width}
              height={mobileImage.height}
              priority
            />
          </div>
        </div>
        <SnowEffect />

        <div className={style.Hero__header}>
          <a href="https://www.snoweffects.com/">
            <HeaderLogo />
          </a>
          <div>
            <a className={style.Hero__header__cta__mobile} href={phoneCta.href}>
              <Phone />
              <span>{phoneCta.label}</span>
            </a>
            <a
              className={style.Hero__header__cta__desktop}
              href={phoneCta.href}
            >
              <span>{phoneCta.desktopLabel}</span>
            </a>
          </div>
        </div>

        <div className={style.Hero__content}>
          <div>
            <h1>{subtitle}</h1>
            <h2>{title}</h2>
          </div>
          <div className={style.Hero__content__ctas}>
            {ctas.map((cta) => {
              const mobileLabel = cta.label
              const desktopLabel = cta.desktopLabel ?? cta.label
              return (
                <Cta
                  key={cta.href + cta.label}
                  link={cta.href}
                  mode={'primary'}
                  label={
                    <>
                      <span className={'hide-desktop'}>{mobileLabel}</span>
                      <span className={'hide-mobile'}>{desktopLabel}</span>
                    </>
                  }
                />
              )
            })}
          </div>
        </div>
      </div>
    </HeroWrapper>
  )
}
