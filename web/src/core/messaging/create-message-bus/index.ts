type Unsubscribe = () => void

export type BaseMessage = { name: string }

export type MessageBus<M extends BaseMessage> = {
  readonly send: (evt: M) => void
  readonly on: <N extends M['name']>(
    eventName: N
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
    do: <H extends (evt: Extract<M, { name: N }>) => void>(
      handler: H
    ) => Unsubscribe
  }
}

export const makeMessageBus = <M extends BaseMessage>(
  log: (...args: unknown[]) => void = console.error
): MessageBus<M> => {
  type Subscription = (evt: M) => void
  const subscriptions: Subscription[] = []

  return {
    send: (evt) => {
      for (const subscription of subscriptions) {
        try {
          subscription(evt)
        } catch (err) {
          log('Message handler error:', err)
        }
      }
    },
    on: (eventName) => {
      const matchesMessage = (
        evt: M
      ): evt is Extract<M, { name: typeof eventName }> => {
        return evt.name === eventName
      }

      return {
        do: (handler) => {
          const subscription: Subscription = (evt) => {
            if (matchesMessage(evt)) {
              handler(evt)
            }
          }

          subscriptions.push(subscription)

          return () => {
            const index = subscriptions.indexOf(subscription)
            if (index !== -1) {
              subscriptions.splice(index, 1)
            }
          }
        }
      }
    }
  } as const
}
