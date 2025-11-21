'use client'

import { type FC, useCallback, useEffect, useState } from 'react'
import { useInView } from 'react-cool-inview'
import { trackEvent } from '../../../core/gtag'
import { SECOND } from '../../../core/time/ms'

type Status = 'unmounted' | 'paused' | 'playing'

export type VideoContent = {
  url: string
  width: number
  height: number
  thumbnailUrl: string | null | undefined
}

export type Props = {
  containerClassName?: string
  rootMargin?: {
    top: number
    bottom: number
  }
  unmountDelayInSeconds?: number
  disablePerformanceMode?: boolean
  content: VideoContent
  play?: boolean
  posterTime?: number
  muted?: boolean
  loop?: boolean
  posterClassName?: string
  videoClassName?: string
}

export const VideoPlayer: FC<Props> = ({
  containerClassName,
  rootMargin,
  unmountDelayInSeconds: _unmountDelay = 3,
  disablePerformanceMode = false,
  content,
  muted = true,
  videoClassName,
  loop = true
}) => {
  const [status, setStatus] = useState<Status>('unmounted')

  const top: number = rootMargin?.top ?? 100
  const bottom: number = rootMargin?.bottom ?? 50

  const { observe, inView } = useInView<HTMLDivElement>({
    rootMargin: `${top}% 0px ${bottom}% 0px`
  })

  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null)

  const videoRef = useCallback((node: HTMLVideoElement | null) => {
    setVideoEl(node)
  }, [])

  // Pause and eventually unmount the video player when it leaves the viewport
  useEffect(() => {
    if ((inView) || disablePerformanceMode === true) {
      setStatus(() => 'playing')
      return
    }

    //setStatus(() => 'paused')

    if (!inView) {
      const unmountDelay: number =
        Number.isNaN(_unmountDelay) === false && _unmountDelay >= 1
          ? _unmountDelay
          : 3

      const timeoutId = setTimeout(() => {
        setStatus(() => 'paused')
      }, unmountDelay * SECOND)

      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [_unmountDelay, inView, disablePerformanceMode])

  useEffect(() => {
    if (videoEl == null) return

    if (status === 'playing') {
      void videoEl.play().catch((error) => {
        console.error('Error attempting to play', error)
      })
    } else if (status === 'paused') {
      videoEl.pause()
      videoEl.currentTime = 0
    } else if (status === 'unmounted') {
      videoEl.pause()
      videoEl.currentTime = 0
    }
  }, [status, videoEl])

  const { width, height, url } = content

  console.log(status)

  return (
    <div className={containerClassName} ref={observe}>
      {status === 'unmounted' && disablePerformanceMode === false ? null : (
        <>
          <video
            src={url}
            className={videoClassName}
            ref={videoRef}
            loop={loop}
            muted={muted}
            width={width}
            height={height}
            playsInline
          ></video>
        </>
      )}
    </div>
  )
}
