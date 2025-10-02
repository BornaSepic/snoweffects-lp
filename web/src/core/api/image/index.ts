export type ResponsiveImageInput = {
  src: string
  width: number
  aspectRatio: number
  height?: number | null
  alt?: string | null
  srcSet?: string | null
  lqip?: string | null
}

export type Input =
  | {
      __typename: 'FileField'
      format?: string
      url?: string
      responsiveImage?: ResponsiveImageInput | null
    }
  | {
      __typename: 'ImageFileField'
      responsiveImage: ResponsiveImageInput
    }

export type SvgImage = {
  type: 'svg'
  src: string
}

export type ImgixImage = {
  type: 'imgix'
  src: string
  width: number
  aspectRatio: number
  height?: number | null
  alt?: string | null
  srcSet?: string | null
  lqip?: string | null
}

export type ImageData = SvgImage | ImgixImage

export const parseImage = (input: Input | null): ImageData | null => {
  if (input == null) {
    return null
  }

  if (input.__typename === 'ImageFileField') {
    return {
      ...input.responsiveImage,
      type: 'imgix'
    }
  }

  if (input.responsiveImage != null) {
    return {
      ...input.responsiveImage,
      type: 'imgix'
    }
  }

  if (input.format === 'svg' && input.url != null && input.url.length > 0) {
    return {
      type: 'svg',
      src: input.url
    }
  }

  return null
}
