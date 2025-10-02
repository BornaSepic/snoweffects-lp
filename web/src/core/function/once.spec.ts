import test from 'ava'
import td from 'testdouble'
import { once } from './once'

test('given wrapped function', async (t) => {
  const _initCart = td.function<() => { id: string }>()

  td.when(_initCart()).thenReturn(
    { id: 'cart1' },
    { id: 'cart2' },
    { id: 'cart3' }
  )

  const initCart = once(_initCart)

  const cart1 = initCart()
  const cart2 = initCart()
  const cart3 = initCart()

  t.is(cart1, cart2)
  t.is(cart1, cart3)
  t.is(cart2, cart3)

  const stats = td.explain(_initCart)

  t.is(stats.callCount, 1, 'should call the wrapped function once')
})
