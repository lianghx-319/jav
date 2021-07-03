import { Jav } from '..'
import { Test } from '../types/test'

const required = true

describe('required', () => {
  it('works for array required=true', (done) => {
    Jav.schema<Test<any>>({
      v: [Jav.required().message('no')],
    }).validate(
      {
        v: [],
      },
      (errors) => {
        expect(errors?.length).toBe(1)
        expect(errors?.[0].message).toBe('no')
        done()
      },
    )
  })

  it('works for array required=true & custom message', (done) => {
    // allow custom message
    Jav.schema<Test<any>>({
      v: [Jav.required().message('no')],
    }).validate(
      {
        v: [1],
      },
      (errors) => {
        expect(errors).toBeFalsy()
        done()
      },
    )
  })

  it('works for array required=false', (done) => {
    Jav.schema<Test<any>>({
      v: Jav.required(false),
    }).validate(
      {
        v: [],
      },
      (errors) => {
        expect(errors).toBeFalsy()
        done()
      },
    )
  })

  it('works for string required=true', (done) => {
    Jav.schema<Test<any>>({
      v: Jav.required(),
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

  it('works for string required=false', (done) => {
    Jav.schema<Test<any>>({
      v: Jav.required(false),
    }).validate(
      {
        v: '',
      },
      (errors) => {
        expect(errors).toBeFalsy()
        done()
      },
    )
  })

  it('works for number required=true', (done) => {
    Jav.schema<Test<any>>({
      v: Jav.required(),
    }).validate(
      {
        v: 1,
      },
      (errors) => {
        expect(errors).toBeFalsy()
        done()
      },
    )
  })

  it('works for number required=false', (done) => {
    Jav.schema<Test<any>>({
      v: Jav.required(false),
    }).validate(
      {
        v: 1,
      },
      (errors) => {
        expect(errors).toBeFalsy()
        done()
      },
    )
  })

  it('works for null required=true', (done) => {
    Jav.schema<Test<any>>({
      v: Jav.required(),
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

  it('works for null required=false', (done) => {
    Jav.schema<Test<any>>({
      v: Jav.required(false),
    }).validate(
      {
        v: null,
      },
      (errors) => {
        expect(errors).toBeFalsy()
        done()
      },
    )
  })

  it('works for undefined required=true', (done) => {
    Jav.schema<Test<any>>({
      v: Jav.required(),
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

  it('works for undefined required=false', (done) => {
    Jav.schema<Test<any>>({
      v: Jav.required(false),
    }).validate(
      {
        v: undefined,
      },
      (errors) => {
        expect(errors).toBeFalsy()
        done()
      },
    )
  })

  it('should support empty string message', (done) => {
    Jav.schema<Test<any>>({
      v: Jav.required().message(''),
    }).validate(
      {
        v: '',
      },
      (errors) => {
        expect(errors?.length).toBe(1)
        expect(errors?.[0].message).toBe('')
        done()
      },
    )
  })
})
