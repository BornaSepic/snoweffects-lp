import { once } from '../../function/once'
import { makeMessageBus } from '../create-message-bus'
import { type ShowForm } from './messages/show-form.js'

export type MainBusMessage = ShowForm

export const initMainBus = once(() => {
  return makeMessageBus<MainBusMessage>()
})
