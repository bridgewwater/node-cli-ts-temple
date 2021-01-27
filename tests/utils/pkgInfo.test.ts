import { pkgInfo } from '../../src/utils/pkgInfo'

test('pkgInfo', () => {
  expect(pkgInfo).not.toBe(NaN)
})
