import type { FC } from 'react'
import style from './style.module.scss'
import { SnowflakeIcon } from '../../icons/snowflake'
import { FeaturedVideoPlayer } from './video'

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
        <FeaturedVideoPlayer
          mobileVideo={mobileVideo}
          video={video}

        />
        <div className={style.FeaturedVideo__header}>
          <h1>{subtitle}</h1>
          <h2>{title}</h2>
        </div>
      </div>
      <div className={style.FeaturedVideo__content}>
        <ul className={style.FeaturedVideo__content__valueProps}>
          {valueProps.map((valueProps) => {
            return (
              <li key={valueProps.title}>
                <h3>
                  <SnowflakeIcon color={'brown'} />{' '}
                  <span>{valueProps.title}</span>
                </h3>
                <p>{valueProps.description}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
