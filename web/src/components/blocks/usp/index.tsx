import React, { type FC } from 'react'
import style from './style.module.scss'
import Image from 'next/image'

export type Props = {
  usp: Array<{
    icon: React.ReactNode
    title: string
    description: string
  }>
}

export const USP: FC<Props> = async ({ usp }) => {
  return (
    <section className={style.USP}>
      <div className={style.USP__image__container}>
        <Image
          src="/images/footer-card-snow.png"
          alt={'Snow Effects - Footer Card Snow'}
          width={1024}
          height={44}
          priority
          className={style.USP__image}
        />
      </div>
      <ul className={style.USP__content}>
        {usp.map((item, index) => (
          <li key={index}>
            <span>
              {item.icon}
            </span>
            <h3>
              {item.title}
            </h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
