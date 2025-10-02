'use client'

import { throttle } from '@github/mini-throttle'
import clsx from 'clsx'
import type { FC } from 'react'
import { useMemo } from 'react'
import useDimensions from 'react-cool-dimensions'
import type { ImagePropTypes } from 'react-datocms'
import { Image as DatoImage } from 'react-datocms'
import type { ImgixParams } from '../../../core/dato/base-types'
import { round } from '../../../core/math/round'
import { extendUrlSearchParams } from '../../../core/url/extend-search-params'
import { type FullImageData, flattenImageData } from './data'
import style from './style.module.scss'

export type DatoImageOptions = Omit<ImagePropTypes, 'data'>

type CustomizationProps = {
  /** Imgix Rendering API parameters */
  transformations?: {
    type: 'imgix'
    params: ImgixParams
  }
  /** A custom class name for the measured div */
  responsiveWrapperClassName?: string
}

type ResponsiveImageProps = {
  data: FullImageData
} & DatoImageOptions &
  CustomizationProps

const ResponsiveImage: FC<ResponsiveImageProps> = ({
  data: _data,
  transformations = { type: 'imgix', params: {} },
  responsiveWrapperClassName,
  ...props
}) => {
  const data = flattenImageData(_data)

  const {
    observe,
    width: _width,
    height: _height
  } = useDimensions({
    onResize: useMemo(
      () =>
        throttle(() => {
          // Triggered once per every 500 milliseconds
        }, 500),
      []
    )
  })

  if (data.width === null || data.height === null) {
    throw new Error(
      'Image dimensions must be defined [a536f773d826411dbf4c333db4223a9f]'
    )
  }

  const aspectRatio = round(data.width / data.height, 5)
  const width: number =
    _width != null && _width > 0 ? round(_width, -1, 'ceil') : data.width
  const height: number | null =
    props.layout === 'fill' && _height != null && _height > 0
      ? round(_height, -1, 'ceil')
      : null

  const srcSet = [data.src]
    .flatMap((src) => {
      return [1, 2, 3].map((dpr) => {
        const mergedParams = {
          ...transformations.params,
          dpr,
          w: width,
          h: height
        } satisfies ImgixParams

        const url = extendUrlSearchParams(src, mergedParams)

        return `${url} ${dpr}x`
      })
    })
    .join(', ')

  return (
    <div
      className={clsx(style.wrapper, responsiveWrapperClassName, {
        [style.wrapper__fill]: props.layout === 'fill'
      })}
      ref={observe}
    >
      <DatoImage
        {...props}
        data={{
          ...data,
          aspectRatio,
          width,
          height,
          srcSet,
          // We override implicit sizes because we use a dynamic srcSet with dpr
          sizes: null
        }}
      />
    </div>
  )
}

export type ImageProps = {
  data: FullImageData
  ref?: React.Ref<HTMLDivElement>
} & DatoImageOptions &
  CustomizationProps

export const Image: FC<ImageProps> = ({ data, ref, ...params }) => {
  if (data.width === null || data.height === null) {
    throw new Error(
      'Image dimensions must be defined [a536f773d826411dbf4c333db4223a9f]'
    )
  }

  if (data.width <= 0 || data.height <= 0) {
    throw new Error(
      'Image dimensions should be positive [a536f773d826411dbf4c333db45e3a9f]'
    )
  }

  if (data.format === 'svg') {
    const aspectRatio: number = (100 / data.width) * data.height

    return (
      <div ref={ref} className={style.SvgImageWithPlaceholder}>
        <div
          className={style.SvgImageWithPlaceholder__placeholder}
          style={{
            backgroundImage: `url(${JSON.stringify(data.url)})`,
            paddingBottom:
              aspectRatio !== 1 ? `${100 / aspectRatio}%` : undefined
          }}
        />
      </div>
    )
  }

  if (data.responsiveImage == null) {
    const { responsiveImage: _, url: src, ...baseData } = data
    return (
      <DatoImage
        {...params}
        ref={ref}
        data={{ ...baseData, src, width: data.width, height: data.height }}
      />
    )
  }

  return <ResponsiveImage {...params} data={data} />
}
