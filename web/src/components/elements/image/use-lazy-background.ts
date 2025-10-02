import { throttle } from '@github/mini-throttle'
import { type RefCallback, useCallback, useMemo } from 'react'
import useDimensions from 'react-cool-dimensions'
import { useInView } from 'react-intersection-observer'
import { type ImgixParams } from '../../../core/dato/base-types'
import { round } from '../../../core/math/round'
import { extendUrlSearchParams } from '../../../core/url/extend-search-params'
import { type FullImageData } from './data'

export type Input = {
  data: FullImageData | null
  imgixParams?: ImgixParams
}

export type Result = {
  ref: RefCallback<HTMLElement>
  style: {
    backgroundColor: string | undefined
    backgroundImage: string | undefined
  }
}

export const useLazyBackground = ({
  data,
  imgixParams = {}
}: Input): Result => {
  const { ref: inViewRef, inView: isInView } = useInView()
  const {
    observe: resizeRef,
    width: _width,
    height: _height
  } = useDimensions({
    onResize: useMemo(
      () =>
        throttle(() => {
          // Triggered once per every 600 milliseconds
        }, 600),
      []
    )
  })

  const ref: RefCallback<HTMLElement> = useCallback(
    (node) => {
      inViewRef(node)
      resizeRef(node)
    },
    [inViewRef, resizeRef]
  )

  if (data == null) {
    return {
      ref,
      style: {
        backgroundColor: undefined,
        backgroundImage: undefined
      }
    }
  }

  const thumbHash = data.responsiveImage?.base64 ?? undefined
  const backgroundColor =
    thumbHash != null ? undefined : (data.responsiveImage?.bgColor ?? undefined)

  if (typeof window === 'undefined') {
    return {
      ref,
      style: {
        backgroundColor,
        backgroundImage: thumbHash
      }
    }
  }

  const width: number | null =
    _width == null ? null : round(_width, -1, 'ceil') || null
  const height: number | null =
    _height == null ? null : round(_height, -1, 'ceil') || null

  if (isInView === false || width == null || height == null) {
    return {
      ref,
      style: {
        backgroundColor,
        backgroundImage: thumbHash
      }
    }
  }

  const dpr: number = window.devicePixelRatio || 1

  const mergedParams = {
    ...imgixParams,
    dpr,
    w: width,
    h: height
  } satisfies ImgixParams

  const backgroundImageUrl: URL | string =
    data.responsiveImage == null
      ? data.url
      : extendUrlSearchParams(data.responsiveImage.src, mergedParams)

  return {
    ref,
    style: {
      backgroundColor,
      backgroundImage: `url(${JSON.stringify(backgroundImageUrl)})`
    }
  }
}
