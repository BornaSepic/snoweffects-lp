import { makeUseMessageBus } from '../create-message-bus/react'
import { initMainBus } from './'

const mainBus = initMainBus()

export const useMainBus = makeUseMessageBus(mainBus)
