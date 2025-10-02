import test from 'ava'
import { round as f } from './round.js'

const macro = test.macro<[Parameters<typeof f>, number]>({
  exec: async (t, input, expected) => {
    const actual = f(...input)
    t.is(actual, expected)
  },
  title: (providedTitle = '', [number, precision, method]) => {
    return `given ${number} / ${precision ?? '--'} / ${
      method ?? '--'
    } ${providedTitle}`.trim()
  }
})

test(macro, [4.006], 4)
test(macro, [4.006, undefined, 'floor'], 4)
test(macro, [4.006, undefined, 'ceil'], 5)

test(macro, [4.006, 0], 4)
test(macro, [4.006, 0, 'floor'], 4)
test(macro, [4.006, 0, 'ceil'], 5)

test(macro, [4.016, 2], 4.02)
test(macro, [4.016, 2, 'floor'], 4.01)
test(macro, [4.016, 2, 'ceil'], 4.02)

test(macro, [4.1, 2], 4.1)
test(macro, [4.1, 2, 'floor'], 4.1)
test(macro, [4.1, 2, 'ceil'], 4.1)

test(macro, [0.1, -1], 0)
test(macro, [0.1, -1, 'floor'], 0)
test(macro, [0.1, -1, 'ceil'], 10)

test(macro, [4160, -2], 4200)
test(macro, [4160, -2, 'floor'], 4100)
test(macro, [4160, -2, 'ceil'], 4200)

test(macro, [4.006, NaN], 4)
test(macro, [4.006, NaN, 'floor'], 4)
test(macro, [4.006, NaN, 'ceil'], 5)

test(macro, [4.016, 2.6], 4.02)
test(macro, [4.016, 2.6, 'floor'], 4.01)
test(macro, [4.016, 2.6, 'ceil'], 4.02)

test(macro, [5e1, 2], 50)
test(macro, [5e1, 2, 'floor'], 50)
test(macro, [5e1, 2, 'ceil'], 50)

test(macro, [NaN, 2], NaN)
test(macro, [NaN, 2, 'floor'], NaN)
test(macro, [NaN, 2, 'ceil'], NaN)

test(macro, [0], 0)
test('should preserve the negative zero', macro, [-0], -0)

test(macro, [0, 1], 0)
test('should not preserve the negative zero', macro, [-0, 1], 0)

test(macro, [10.0000001, 1000], 10.0000001)
test(macro, [Number.MAX_SAFE_INTEGER, 293], Number.MAX_SAFE_INTEGER - 1)
