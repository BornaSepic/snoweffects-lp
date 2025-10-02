import test from 'ava'

test('Example Test One', async (t) => {
  t.is('Hello', 'Hello')
})

test('Example Test Two', async (t) => {
  const actual = { id: 1 }
  const expected = { id: 1 }

  t.deepEqual(actual, expected, 'should check deep equality of two objects')
})
