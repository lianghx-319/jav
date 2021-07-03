import { Jav } from '..'

describe('asyncValidator', () => {
  it('works', (done) => {
    Jav.schema<{ v: any; v2: any }>({
      v: [
        Jav.asyncValidator((rule, value) => {
          return Promise.reject(new Error('e1'))
        }),
        Jav.asyncValidator((rule, value) => {
          return Promise.reject(new Error('e2'))
        }),
      ],
      v2: [
        Jav.asyncValidator((rule, value) => {
          return Promise.reject(new Error('e3'))
        }),
      ],
    }).validate(
      {
        v: 2,
      },
      (errors) => {
        expect(errors?.length).toBe(3)
        expect(errors?.[0].message).toBe('e1')
        expect(errors?.[1].message).toBe('e2')
        expect(errors?.[2].message).toBe('e3')
        done()
      },
    )
  })

  it('first works', (done) => {
    Jav.schema<{ v: any; v2: any }>({
      v: [
        Jav.asyncValidator((rule, value) => {
          return Promise.reject(new Error('e1'))
        }),
        Jav.asyncValidator((rule, value) => {
          return Promise.reject(new Error('e2'))
        }),
      ],
      v2: [
        Jav.asyncValidator((rule, value) => {
          return Promise.reject(new Error('e3'))
        }),
      ],
    }).validate(
      {
        v: 1,
        v2: 2,
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
          Jav.asyncValidator((rule, value) => {
            return Promise.reject(new Error('e1'))
          }),
          Jav.asyncValidator((rule, value) => {
            return Promise.reject(new Error('e2'))
          }),
        ],
        v2: [
          Jav.asyncValidator((rule, value) => {
            return Promise.reject(new Error('e3'))
          }),
        ],
        v3: [
          Jav.asyncValidator((rule, value) => {
            return Promise.reject(new Error('e4'))
          }),
          Jav.asyncValidator((rule, value) => {
            return Promise.reject(new Error('e5'))
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

    // FIXME why not passed
    // it("Whether to remove the 'Uncaught (in promise)' warning", (done) => {
    //   let allCorrect = true
    //   Jav.schema<Test<any>>({
    //     v: Jav.asyncValidator(async (rule, value) => {
    //       return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //           reject([new Error(rule.message)])
    //         }, 100)
    //       })
    //     }).message('async fails'),
    //   })
    //     .validate({
    //       v: 1,
    //     })
    //     .catch(({ errors }) => {
    //       allCorrect = errors?.length === 1
    //       expect(allCorrect).toBe(true)
    //       done()
    //     })
    // })
  })

  // it('works for array', (done) => {
  //   Jav.schema<{ v: any; v2: any; v3: any; v4: any }>({
  //     v: [
  //       Jav.asyncValidator(async function (rule, value) {
  //         console.log(rule)
  //         return Promise.reject(new Error('e1'))
  //       }),
  //       Jav.asyncValidator(async function (rule, value) {
  //         return Promise.reject(new Error('e2'))
  //       }),
  //     ],
  //     v2: [
  //       Jav.asyncValidator(async function (rule, value) {
  //         return Promise.reject(new Error('e3'))
  //       }),
  //     ],
  //     v3: [
  //       Jav.asyncValidator(async function (rule, value) {
  //         debugger
  //         return Promise.reject(new Error('e4'))
  //       }),
  //       Jav.asyncValidator(async function (rule, value) {
  //         return Promise.reject(new Error('e5'))
  //       }),
  //     ],
  //     v4: [
  //       Jav.asyncValidator(async function (rule, value) {
  //         return new Promise((resolve, reject) => {
  //           setTimeout(resolve, 100)
  //         })
  //       }),
  //       Jav.asyncValidator(async function () {
  //         return new Promise((resolve, reject) => {
  //           setTimeout(() => reject(new Error('e6')), 100)
  //         })
  //       }),
  //     ],
  //   }).validate(
  //     {
  //       v: 1,
  //       v2: 1,
  //       v3: 1,
  //     },
  //     {
  //       firstFields: ['v', 'v2', 'v3', 'v4'],
  //     },
  //     (errors) => {
  //       expect(errors?.length).toBe(5)
  //       expect(errors?.[0].message).toBe('e1')
  //       expect(errors?.[1].message).toBe('e3')
  //       expect(errors?.[2].message).toBe('e4')
  //       expect(errors?.[3].message).toBe('e5')
  //       expect(errors?.[4].message).toBe('e6')
  //       done()
  //     },
  //   )
  // })
})
