// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Reject = (reason?: any) => void

export type Resolve<T> = (value: T | PromiseLike<T>) => void
