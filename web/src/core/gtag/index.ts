import { isClientSide } from '../next/is-client-side'

type CustomWindow = {
  gtag?: (...args: (string | number | undefined | boolean | object)[]) => void
} & Window

declare let window: CustomWindow

export const pageview = (url: string): void => {
  if (isClientSide() && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID, {
      page_path: url
    })
  }
}

export const trackEvent = ({
  action,
  params
}: { action: string; params?: object }): void => {
  if (isClientSide() && window.gtag) {
    window.gtag('event', action, params)
  }
}
