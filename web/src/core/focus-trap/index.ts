import * as focusTrap from 'focus-trap'

export type FocusTrap = {
  element: HTMLElement
  instance: focusTrap.FocusTrap
  pause: () => void
  unpause: () => void
}

export const createFocusTrap = (
  element: HTMLElement,
  callback?: () => void
): FocusTrap => {
  const focusTrapInstance: focusTrap.FocusTrap = focusTrap.createFocusTrap(
    element,
    {
      checkCanFocusTrap: (trapContainers) => {
        const results = trapContainers.map((trapContainer) => {
          return new Promise((resolve) => {
            const interval = setInterval(() => {
              if (getComputedStyle(trapContainer).visibility !== 'hidden') {
                resolve(true)
                clearInterval(interval)
              }
            }, 100)
          })
        })
        // Return a promise that resolves when all the trap containers are able to receive focus
        return Promise.all(results).then(() => {
          if (callback) {
            callback()
          }
        })
      }
    }
  )

  focusTrapInstance.pause()

  return {
    element,
    instance: focusTrapInstance,
    pause: () => {
      focusTrapInstance.pause()
    },
    unpause: () => {
      focusTrapInstance.activate()
      focusTrapInstance.unpause()
    }
  }
}
