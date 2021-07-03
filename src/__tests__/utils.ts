import { assertNotExists } from '../utils'

describe('assertNotExists', () => {
  it('should return true', () => {
    const a = undefined
    expect(assertNotExists(a)).toBeUndefined()
    const b = null
    expect(assertNotExists(b)).toBeUndefined()
  })

  it('should throw default message', () => {
    expect(() => assertNotExists(1)).toThrow('Value does exist')
  })

  it('should throw custom error message', () => {
    expect(() => assertNotExists(1, 'haha')).toThrow('haha')
  })
})
