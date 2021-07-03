import { Jav } from '..'
import { Test } from '../types/test'

describe('unicode', () => {
  it('works for unicode U+0000 to U+FFFF ', (done) => {
    Jav.schema<Test<string>>({
      v: Jav.string().length(4),
    }).validate(
      {
        v: '吉吉吉吉',
      },
      (errors) => {
        expect(errors).toBe(null)
        done()
      },
    )
  })

  it('works for unicode gt U+FFFF ', (done) => {
    Jav.schema<Test<string>>({
      v: Jav.string().length(4),
    }).validate(
      {
        v: '𠮷𠮷𠮷𠮷',
      },
      (errors) => {
        expect(errors).toBe(null)
        done()
      },
    )
  })

  it('Rich Text Format', (done) => {
    Jav.schema<Test<string>>({
      v: Jav.string().length(2),
    }).validate(
      {
        v: '💩💩',
      },
      (errors) => {
        expect(errors).toBe(null)
        done()
      },
    )
  })
})
