import forEach from 'callbag-for-each'
import fromIter from 'callbag-from-iter'
import pipe from 'callbag-pipe'
import subject from 'callbag-subject'

import pullWhen from '../src'

test('works', () => {
  const actual = []
  let next

  const sampler = subject()

  pipe(
    fromIter([10, 20, 30, 40, 50]),
    pullWhen(sampler),
    forEach(data => {
      actual.push(data)
    }),
  )

  return Promise.resolve()
    .then(() => {
      expect(actual).toEqual([])
    })
    .then(() => sampler(1, 0))
    .then(() => {
      expect(actual).toEqual([10])
    })
    .then(() => sampler(1, 1))
    .then(() => sampler(1, 2))
    .then(() => {
      expect(actual).toEqual([10, 20, 30])
    })
    .then(() => sampler(1, 3))
    .then(() => {
      expect(actual).toEqual([10, 20, 30, 40])
    })
    .then(() => sampler(1, 4))
    .then(() => {
      expect(actual).toEqual([10, 20, 30, 40, 50])
    })
})
