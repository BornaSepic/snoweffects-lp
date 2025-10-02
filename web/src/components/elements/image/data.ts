type BaseImageData = {
  format?: string
  url: string
  width: number | null
  height: number | null
  alt?: string | null
  title?: string | null
}

type ResponsiveImageData = {
  /** A localized image URL with imgix parameters */
  src: string
  /** A base64-encoded thumbnail to offer during image loading */
  base64?: string | null
  bgColor?: string | null
}

export type FullImageData = BaseImageData & {
  responsiveImage?: ResponsiveImageData | null
}

export const flattenImageData = (
  data: FullImageData
): Omit<BaseImageData, 'url'> & ResponsiveImageData => {
  const { responsiveImage, url, ...rest } = data

  if (responsiveImage == null) {
    return {
      ...rest,
      src: url
    }
  }

  return {
    ...rest,
    ...responsiveImage
  }
}
