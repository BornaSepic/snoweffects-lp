/**
 * Let Typescript evaluate the types in the function, but don't run the function
 */
export const doNotRun = <F extends () => unknown>(x: F): F => {
  if (typeof x === 'function') {
    return x
  }
  return x
}
