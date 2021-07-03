import { Jav } from '../Jav'
import { Test } from '../types/test'

describe('string', () => {
  it('works for none require', (done) => {
    Jav.schema<Test<string>>({
      v: Jav.string(),
    }).validate(
      {
        v: '',
      },
      (errors) => {
        expect(errors).toBe(null)
        done()
      },
    )
  })

  it('works for empty string', (done) => {
    Jav.schema<Test<string>>({
      v: Jav.string().required(),
    }).validate(
      {
        v: '',
      },
      (errors) => {
        expect(errors?.length).toBe(1)
        expect(errors?.[0].message).toBe('v is required')
        done()
      },
    )
  })

  it('works for undefined string', (done) => {
    Jav.schema<Test<string>>({
      v: Jav.string().required(),
    }).validate(
      {
        v: undefined,
      },
      (errors) => {
        expect(errors?.length).toBe(1)
        expect(errors?.[0].message).toBe('v is required')
        done()
      },
    )
  })

  it('works for null string', (done) => {
    Jav.schema<Test<string>>({
      v: Jav.string().required(),
    }).validate(
      {
        v: null,
      },
      (errors) => {
        expect(errors?.length).toBe(1)
        expect(errors?.[0].message).toBe('v is required')
        done()
      },
    )
  })

  it('works for message', (done) => {
    Jav.schema<Test<string>>({
      v: Jav.string().required().message('haha'),
    }).validate(
      {
        v: null,
      },
      (errors) => {
        expect(errors?.length).toBe(1)
        expect(errors?.[0].message).toBe('haha')
        done()
      },
    )
  })

  it('works for none empty', (done) => {
    Jav.schema<Test<string>>({
      v: Jav.string().required().message('haha'),
    }).validate(
      {
        v: ' ',
      },
      (errors) => {
        expect(errors).toBe(null)
        done()
      },
    )
  })

  it('works for whitespace empty', (done) => {
    Jav.schema<Test<string>>({
      v: Jav.string().required().message('haha').whitespace(),
    }).validate(
      {
        v: ' ',
      },
      (errors) => {
        expect(errors?.length).toBe(1)
        expect(errors?.[0].message).toBe('haha')
        done()
      },
    )
  })
})
