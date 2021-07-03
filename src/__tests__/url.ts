import { Jav } from '..'
import { Test } from '../types/test'

describe('url', () => {
  it('works for empty string', (done) => {
    Jav.schema<Test<string>>({
      v: Jav.url(),
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

  it('works for ip url', (done) => {
    Jav.schema<Test<string>>({
      v: Jav.url(),
    }).validate(
      {
        v: 'http://10.218.136.29/talent-tree/src/index.html',
      },
      (errors) => {
        expect(errors).toBe(null)
        done()
      },
    )
  })

  it('works for required empty string', (done) => {
    Jav.schema<Test<string>>({
      v: Jav.url().required(),
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

  it('works for type url', (done) => {
    Jav.schema<Test<string>>({
      v: Jav.url(),
    }).validate(
      {
        v: 'http://www.taobao.com',
      },
      (errors) => {
        expect(errors).toBe(null)
        done()
      },
    )
  })

  it('works for type url has query', (done) => {
    Jav.schema<Test<string>>({
      v: Jav.url(),
    }).validate(
      {
        v: 'http://www.taobao.com/abc?a=a',
      },
      (errors) => {
        expect(errors).toBe(null)
        done()
      },
    )
  })

  it('works for type url has hash', (done) => {
    Jav.schema<Test<string>>({
      v: Jav.url(),
    }).validate(
      {
        v: 'http://www.taobao.com/abc#!abc',
      },
      (errors) => {
        expect(errors).toBe(null)
        done()
      },
    )
  })

  it('works for type url has query and has', (done) => {
    Jav.schema<Test<string>>({
      v: Jav.url(),
    }).validate(
      {
        v: 'http://www.taobao.com/abc?abc=%23&b=a~c#abc',
      },
      (errors) => {
        expect(errors).toBe(null)
        done()
      },
    )
  })

  it('works for type url has multi hyphen', (done) => {
    Jav.schema<Test<string>>({
      v: Jav.url(),
    }).validate(
      {
        v: 'https://www.tao---bao.com',
      },
      (errors) => {
        expect(errors).toBe(null)
        done()
      },
    )
  })

  it('works for type not a valid url', (done) => {
    Jav.schema<Test<string>>({
      v: Jav.url(),
    }).validate(
      {
        v: 'http://www.taobao.com/abc?abc=%23&b=  a~c#abc    ',
      },
      (errors) => {
        expect(errors?.length).toBe(1)
        expect(errors?.[0].message).toBe('v is not a valid url')
        done()
      },
    )
  })

  it('support skip schema', (done) => {
    Jav.schema<Test<string>>({
      v: Jav.url(),
    }).validate(
      {
        v: '//g.cn',
      },
      (errors) => {
        expect(errors).toBe(null)
        done()
      },
    )
  })
})
