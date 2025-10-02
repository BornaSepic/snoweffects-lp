import { useCallback } from 'react'
import { isClientSide } from '../next/is-client-side'

export type HubspotAction =
  | 'addIdentityListener'
  | 'addPrivacyConsentListener'
  | 'doNotTrack'
  | 'identify'
  | 'refreshPageHandlers'
  | 'revokeCookieConsent'
  | 'setContentType'
  | 'setPath'
  | 'trackEvent'
  | 'trackPageView'

type CustomWindow = {
  _hsq?: {
    push: (
      callParam:
        | [HubspotAction]
        | [HubspotAction, string | Record<string, unknown>]
    ) => void
  }
} & Window

declare let window: CustomWindow

export type HubspotTracker = {
  identify: (input: {
    email: string
    customProps?: Record<string, unknown>
  }) => void
  revokeCookieConsent: () => void
  setPath: (path: string) => void
  trackEvent: ({
    eventId,
    value
  }: {
    eventId: string
    value: number | string
  }) => void
  trackPageView: (path: string) => void
}

/**
 * Streamlines sending tracking events to Hubspot
 *
 * @see https://developers.hubspot.com/docs/reference/api/analytics-and-events/tracking-code
 */
export const useHubspotTracker = (): HubspotTracker => {
  const _hsq = isClientSide() && window._hsq ? window._hsq : null

  const setPath: HubspotTracker['setPath'] = useCallback(
    (path: string): void => {
      _hsq?.push(['setPath', path])
    },
    [_hsq]
  )

  const trackPageView: HubspotTracker['trackPageView'] = useCallback(
    (path: string): void => {
      if (_hsq == null) {
        return
      }
      // Update the path value
      _hsq.push(['setPath', path])
      // Finalize page view event
      _hsq.push(['trackPageView'])
    },
    [_hsq]
  )

  const identify: HubspotTracker['identify'] = useCallback(
    ({ email, customProps }) => {
      _hsq?.push([
        'identify',
        {
          email,
          ...customProps
        }
      ])
    },
    [_hsq]
  )

  const trackEvent: HubspotTracker['trackEvent'] = useCallback(
    ({ eventId, value }) => {
      _hsq?.push([
        'trackEvent',
        {
          id: eventId,
          value
        }
      ])
    },
    [_hsq]
  )

  const revokeCookieConsent = useCallback(() => {
    _hsq?.push(['revokeCookieConsent'])
  }, [_hsq])

  return {
    identify,
    revokeCookieConsent,
    setPath,
    trackEvent,
    trackPageView
  }
}
