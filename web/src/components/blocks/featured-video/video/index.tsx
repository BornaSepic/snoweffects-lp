'use client'

import { useState, type FC } from 'react'
import style from '../style.module.scss'
import { VideoPlayer } from '../../../elements/video-player'
import { PauseIcon } from '../../../icons/pause'
import { PlayIcon } from '../../../icons/play'
import { useMediaQuery } from '../../../../core/viewport/use-media-query'

export type Props = {
  video: {
    src: string
  }
  mobileVideo: {
    src: string
  }
}

export const FeaturedVideoPlayer: FC<Props> = ({ video, mobileVideo }) => {
  const isDesktop = useMediaQuery('(min-width: 1180px)')

  return (
    <>
      {/* <button
        onClick={() => setIsPlaying(!isPlaying)}
        className={style.FeaturedVideo__controls}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button> */}
      <div className={style.FeaturedVideo__background}>
        {isDesktop && (
          <div className={style.FeaturedVideo__background__desktop}>
            <VideoPlayer
              containerClassName={
                style.FeaturedVideo__background__video__container
              }
              content={{
                url: video.src,
                height: 720,
                width: 1280,
                thumbnailUrl: ''
              }}
            />
          </div>
        )}

        {isDesktop === false && (
          <div className={style.FeaturedVideo__background__mobile}>
            <VideoPlayer
              containerClassName={
                style.FeaturedVideo__background__video__container
              }
              content={{
                url: mobileVideo.src,
                height: 720,
                width: 1280,
                thumbnailUrl: ''
              }}
            />
          </div>
        )}
      </div>
    </>
  )
}
