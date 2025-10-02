/**
 * @description Freeze body scrolling when offcanvas drawers are open
 */
export const freeze = () => {
  const body = document.querySelector('body')

  if (!body) {
    return
  }

  body.classList.add('is-frozen')
}

/**
 * @description Unfreeze body scrolling after offcanvas drawers are closed
 */
export const thaw = () => {
  const body = document.querySelector('body')

  if (!body) {
    return
  }

  body.classList.remove('is-frozen')
}
