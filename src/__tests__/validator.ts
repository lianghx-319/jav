import { Jav } from '..'

describe('validator', () => {
  it('works', (done) => {
    Jav.schema<{ v: any; v2: any; v3: any }>({
      v: [
        Jav.validator((rule, value, callback) => {
          callback(new Error('e1'))
        }),
        Jav.validator((rule, value, callback) => {
          callback(new Error('e2'))
        }),
      ],
      v2: [
        Jav.validator((rule, value, callback) => {
          callback(new Error('e3'))
        }),
      ],
      v3: [
        Jav.validator((rule, value, callback) => {
          return false
        }),
        Jav.validator((rule, value, callback) => {
          callback(new Error('e5'))
        }),
        Jav.validator((rule, value, callback) => {
          return false
        }).message('e6'),
        Jav.validator((rule, value, callback) => {
          return true
        }),
        Jav.validator((rule, value, callback) => {
          return false
        }).message(''),
      ],
    }).validate(
      {
        v: 2,
      },
      (errors) => {
        expect(errors?.length).toBe(7)
        expect(errors?.[0].message).toBe('e1')
        expect(errors?.[1].message).toBe('e2')
        expect(errors?.[2].message).toBe('e3')
        expect(errors?.[3].message).toBe('v3 fails')
        expect(errors?.[4].message).toBe('e5')
        expect(errors?.[5].message).toBe('e6')
        expect(errors?.[6].message).toBe('')
        done()
      },
    )
  })

  it('first works', (done) => {
    Jav.schema<{ v: any; v2: any }>({
      v: [
        Jav.validator((rule, value, callback) => {
          callback(new Error('e1'))
        }),
        Jav.validator((rule, value, callback) => {
          callback(new Error('e2'))
        }),
      ],
      v2: [
        Jav.validator((rule, value, callback) => {
          callback(new Error('e3'))
        }),
      ],
    }).validate(
      {
        v: 2,
        v2: 1,
      },
      {
        first: true,
      },
      (errors) => {
        expect(errors?.length).toBe(1)
        expect(errors?.[0].message).toBe('e1')
        done()
      },
    )
  })

  describe('firstFields', () => {
    it('works for true', (done) => {
      Jav.schema<{ v: any; v2: any; v3: any }>({
        v: [
          Jav.validator((rule, value, callback) => {
            callback(new Error('e1'))
          }),
          Jav.validator((rule, value, callback) => {
            callback(new Error('e2'))
          }),
        ],
        v2: [
          Jav.validator((rule, value, callback) => {
            callback(new Error('e3'))
          }),
        ],
        v3: [
          Jav.validator((rule, value, callback) => {
            callback(new Error('e4'))
          }),
          Jav.validator((rule, value, callback) => {
            callback(new Error('e5'))
          }),
        ],
      }).validate(
        {
          v: 1,
          v2: 1,
          v3: 1,
        },
        {
          firstFields: true,
        },
        (errors) => {
          expect(errors?.length).toBe(3)
          expect(errors?.[0].message).toBe('e1')
          expect(errors?.[1].message).toBe('e3')
          expect(errors?.[2].message).toBe('e4')
          done()
        },
      )
    })

    it('works for array', (done) => {
      Jav.schema<{ v: any; v2: any; v3: any }>({
        v: [
          Jav.validator((rule, value, callback) => {
            callback(new Error('e1'))
          }),
          Jav.validator((rule, value, callback) => {
            callback(new Error('e2'))
          }),
        ],
        v2: [
          Jav.validator((rule, value, callback) => {
            callback(new Error('e3'))
          }),
        ],
        v3: [
          Jav.validator((rule, value, callback) => {
            callback(new Error('e4'))
          }),
          Jav.validator((rule, value, callback) => {
            callback(new Error('e5'))
          }),
        ],
      }).validate(
        {
          v: 1,
          v2: 1,
          v3: 1,
        },
        {
          firstFields: ['v'],
        },
        (errors) => {
          expect(errors?.length).toBe(4)
          expect(errors?.[0].message).toBe('e1')
          expect(errors?.[1].message).toBe('e3')
          expect(errors?.[2].message).toBe('e4')
          expect(errors?.[3].message).toBe('e5')
          done()
        },
      )
    })
  })

  describe('promise api', () => {
    it('works', (done) => {
      Jav.schema<{ v: any; v2: any; v3: any }>({
        v: [
          Jav.validator((rule, value, callback) => {
            callback(new Error('e1'))
          }),
          Jav.validator((rule, value, callback) => {
            callback(new Error('e2'))
          }),
        ],
        v2: [
          Jav.validator((rule, value, callback) => {
            callback(new Error('e3'))
          }),
        ],
        v3: [
          Jav.validator((rule, value, callback) => {
            return false
          }),
          Jav.validator((rule, value, callback) => {
            callback(new Error('e5'))
          }),
          Jav.validator((rule, value, callback) => {
            return false
          }).message('e6'),
          Jav.validator((rule, value, callback) => {
            return true
          }),
        ],
      })
        .validate({
          v: 2,
        })
        .catch(({ errors }) => {
          expect(errors.length).toBe(6)
          expect(errors?.[0].message).toBe('e1')
          expect(errors?.[1].message).toBe('e2')
          expect(errors?.[2].message).toBe('e3')
          expect(errors?.[3].message).toBe('v3 fails')
          expect(errors?.[4].message).toBe('e5')
          expect(errors?.[5].message).toBe('e6')
          done()
        })
    })

    it('first works', (done) => {
      Jav.schema<{ v: any; v2: any }>({
        v: [
          Jav.validator((rule, value, callback) => {
            callback(new Error('e1'))
          }),
          Jav.validator((rule, value, callback) => {
            callback(new Error('e2'))
          }),
        ],
        v2: [
          Jav.validator((rule, value, callback) => {
            callback(new Error('e3'))
          }),
        ],
      })
        .validate(
          {
            v: 2,
            v2: 1,
          },
          {
            first: true,
          },
          () => {},
        )
        .catch(({ errors }) => {
          expect(errors.length).toBe(1)
          expect(errors[0].message).toBe('e1')
          done()
        })
    })

    describe('firstFields', () => {
      it('works for true', (done) => {
        Jav.schema<{ v: any; v2: any; v3: any }>({
          v: [
            Jav.validator((rule, value, callback) => {
              callback(new Error('e1'))
            }),
            Jav.validator((rule, value, callback) => {
              callback(new Error('e2'))
            }),
          ],
          v2: [
            Jav.validator((rule, value, callback) => {
              callback(new Error('e3'))
            }),
          ],
          v3: [
            Jav.validator((rule, value, callback) => {
              callback(new Error('e4'))
            }),
            Jav.validator((rule, value, callback) => {
              callback(new Error('e5'))
            }),
          ],
        })
          .validate(
            {
              v: 1,
              v2: 1,
              v3: 1,
            },
            {
              firstFields: true,
            },
            () => {},
          )
          .catch(({ errors }) => {
            expect(errors.length).toBe(3)
            expect(errors?.[0].message).toBe('e1')
            expect(errors?.[1].message).toBe('e3')
            expect(errors?.[2].message).toBe('e4')
            done()
          })
      })

      it('works for array', (done) => {
        Jav.schema<{ v: any; v2: any; v3: any }>({
          v: [
            Jav.validator((rule, value, callback) => {
              callback(new Error('e1'))
            }),
            Jav.validator((rule, value, callback) => {
              callback(new Error('e2'))
            }),
          ],
          v2: [
            Jav.validator((rule, value, callback) => {
              callback(new Error('e3'))
            }),
          ],
          v3: [
            Jav.validator((rule, value, callback) => {
              callback(new Error('e4'))
            }),
            Jav.validator((rule, value, callback) => {
              callback(new Error('e5'))
            }),
          ],
        })
          .validate(
            {
              v: 1,
              v2: 1,
              v3: 1,
            },
            {
              firstFields: ['v'],
            },
            () => {},
          )
          .catch(({ errors }) => {
            expect(errors.length).toBe(4)
            expect(errors?.[0].message).toBe('e1')
            expect(errors?.[1].message).toBe('e3')
            expect(errors?.[2].message).toBe('e4')
            expect(errors?.[3].message).toBe('e5')
            done()
          })
      })

      it('works for no rules fields', (done) => {
        Jav.schema<{ v: any; v2: any }>({
          v: [],
          v2: [],
        })
          .validate({
            v: 2,
            v2: 1,
          })
          .then((source) => {
            expect(source).toMatchObject({ v: 2, v2: 1 })
            done()
          })
      })
    })
  })
})
