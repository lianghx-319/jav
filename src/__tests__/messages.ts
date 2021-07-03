import { Jav, ValidateMessages } from '..'
import { Test } from '../types/test'

describe('messages', () => {
  const messages: ValidateMessages = {
    required(f) {
      return `${f} required!`
    },
  }
  it('can call messages', (done) => {
    const schema = Jav.schema<{ v: string; v2: any[] }>({
      v: Jav.required(),
      v2: Jav.array(),
    })
    schema.messages(messages)
    schema.validate(
      {
        v: '',
        v2: '1',
      },
      (errors) => {
        expect(errors?.length).toBe(2)
        expect(errors?.[0].message).toBe('v required!')
        expect(errors?.[1].message).toBe('v2 is not an array')
        expect(Object.keys(messages).length).toBe(1)
        done()
      },
    )
  })

  it('can use options.messages', (done) => {
    const schema = Jav.schema<{ v: string; v2: any[] }>({
      v: Jav.required(),
      v2: Jav.array(),
    })
    schema.validate(
      {
        v: '',
        v2: '1',
      },
      {
        messages,
      },
      (errors) => {
        expect(errors?.length).toBe(2)
        expect(errors?.[0].message).toBe('v required!')
        expect(errors?.[1].message).toBe('v2 is not an array')
        expect(Object.keys(messages).length).toBe(1)
        done()
      },
    )
  })

  it('messages with parameters', (done) => {
    const messages: ValidateMessages = {
      required: 'Field %s required!',
    }
    const schema = Jav.schema<Test<any>>({
      v: Jav.required(),
    })
    schema.messages(messages)
    schema.validate(
      {
        v: '',
      },
      (errors) => {
        expect(errors).toBeTruthy()
        expect(errors?.length).toBe(1)
        expect(errors?.[0].message).toBe('Field v required!')
        expect(Object.keys(messages).length).toBe(1)
        done()
      },
    )
  })

  it('messages can be without parameters', (done) => {
    const messages: ValidateMessages = {
      required: 'required!',
    }
    const schema = Jav.schema<Test<any>>({
      v: Jav.required(),
    })
    schema.messages(messages)
    schema.validate(
      {
        v: '',
      },
      (errors) => {
        expect(errors).toBeTruthy()
        expect(errors?.length).toBe(1)
        expect(errors?.[0].message).toBe('required!')
        expect(Object.keys(messages).length).toBe(1)
        expect(messages.required).toBe('required!')
        done()
      },
    )
  })

  it('message can be object', (done) => {
    const atom = {}
    const messages: ValidateMessages = {
      // @ts-expect-error
      required: atom,
    }
    const schema = Jav.schema<Test<any>>({
      v: Jav.required(),
    })
    schema.validate(
      {
        v: '',
      },
      {
        messages,
      },
      (errors) => {
        expect(errors).toBeTruthy()
        expect(errors?.length).toBe(1)
        expect(errors?.[0].message).toBe(atom)
        expect(Object.keys(messages).length).toBe(1)
        expect(messages.required).toBe(atom)
        done()
      },
    )
  })

  it('message can be a function', (done) => {
    const message = 'this is a function'

    const schema = Jav.schema<Test<any>>({
      // @ts-expect-error
      v: Jav.required().message(() => message),
    })
    schema.validate(
      {
        v: '', // provide empty value, this will trigger the message.
      },
      (errors) => {
        expect(errors).toBeTruthy()
        expect(errors?.length).toBe(1)
        expect(errors?.[0].message).toBe(message)
        done()
      },
    )
  })
})
