import type { FC } from 'react'
import style from './style.module.scss'
import { SnowflakeIcon } from '../../icons/snowflake'
import { FeaturedVideoPlayer } from './video'
import { SnowEffect } from '../../elements/snow-effect'

export type Props = {
  title: React.ReactNode
  subtitle: string
  video: {
    src: string
  }
  mobileVideo: {
    src: string
  }
  valueProps: Array<{ title: string; description: string }>
}

export const FeaturedVideo: FC<Props> = async ({
  title,
  subtitle,
  video,
  mobileVideo,
  valueProps
}) => {
  return (
    <section className={style.FeaturedVideo__wrapper}>
      <div className={style.FeaturedVideo}>
        <FeaturedVideoPlayer mobileVideo={mobileVideo} video={video} />
        <SnowEffect color={'white'} />
        <div className={style.FeaturedVideo__header}>
          <h1>{subtitle}</h1>
          <h2>{title}</h2>
        </div>
      </div>
      <div className={style.FeaturedVideo__content}>
        <ul className={style.FeaturedVideo__content__valueProps}>
          {valueProps.map((valueProp) => {
            return (
              <li key={valueProp.title}>
                <SnowflakeIcon color={'brown'} />{' '}
                <div>
                  <h3>
                    <span>{valueProp.title}</span>
                  </h3>
                  <p>{valueProp.description}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
