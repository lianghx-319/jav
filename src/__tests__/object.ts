import { Jav } from '..'
import { Test } from '../types/test'

describe('object', () => {
  it('works for the required object with fields in case of empty string', (done) => {
    Jav.schema<Test<any>>({
      v: Jav.object<any>().required(),
    }).validate(
      {
        v: '',
      },
      (errors) => {
        expect(errors?.length).toBe(1)
        expect(errors?.[0].message).toBe('v is not an object')
        done()
      },
    )
  })
})
