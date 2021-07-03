import { Jav } from '..';
import { Test } from '../types/test';

type Obj = Test<{ a: string; b: string }>;

interface Test1 {
  value: string;
  test: { name: string }[];
}

describe('deep', () => {
  it('deep array specific validation', done => {
    Jav.schema<Test<string[]>>({
      v: Jav.array([Jav.string(), Jav.string()]),
    }).validate(
      {
        v: [1, 'b'],
      },
      errors => {
        expect(errors?.length).toBe(1);
        expect(errors?.[0].message).toBe('v.0 is not a string');
        done();
      },
    );
  });

  it('deep object specific validation', done => {
    Jav.schema<Obj>({
      v: Jav.object<Obj['v']>({ a: Jav.string(), b: Jav.string() }),
    }).validate(
      {
        v: {
          a: 1,
          b: 'c',
        },
      },
      errors => {
        expect(errors?.length).toBe(1);
        expect(errors?.[0].message).toBe('v.a is not a string');
        done();
      },
    );
  });

  describe('defaultField', () => {
    it('deep array all values validation', done => {
      Jav.schema<Test<string[]>>({
        v: Jav.array().required().defaultField(Jav.string()),
      }).validate(
        {
          v: [1, 2, 'c'],
        },
        errors => {
          expect(errors?.length).toBe(2);
          expect(errors?.[0].message).toBe('v.0 is not a string');
          expect(errors?.[1].message).toBe('v.1 is not a string');
          done();
        },
      );
    });

    it('will merge top validation', () => {
      const obj: Test1 = {
        value: '',
        test: [
          {
            name: 'aa',
          },
        ],
      };

      Jav.schema<Test1>({
        value: Jav.string(),
        test: Jav.array()
          .required()
          .min(2)
          .message('至少两项')
          .defaultField(
            Jav.object<Test1['test'][number]>({
              name: Jav.string().required().message('name 必须有'),
            }).message('test 必须有'),
          ),
      }).validate(obj, errors => {
        expect(errors).toMatchSnapshot();
      });
    });

    it('array & required works', done => {
      const record = {
        v: [],
      };

      Jav.schema<Test<any[]>>({
        v: Jav.array().required().defaultField(Jav.string()),
      }).validate(record, errors => {
        expect(errors?.length).toBe(1);
        expect(errors?.[0].message).toBe('v is required');
        done();
      });
    });

    it('deep object all values validation', done => {
      Jav.schema<Obj>({
        v: Jav.object<Obj['v']>().required().defaultField(Jav.string()),
      }).validate(
        {
          v: {
            a: 1,
            b: 'c',
          },
        },
        errors => {
          expect(errors?.length).toBe(1);
          expect(errors?.[0].message).toBe('v.a is not a string');
          done();
        },
      );
    });
  });
});
