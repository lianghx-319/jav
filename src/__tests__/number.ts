import { Jav } from '..';
import { Test } from '../types/test';

describe('number', () => {
  it('works', done => {
    Jav.schema<Test<number>>({
      v: Jav.number(),
    }).validate(
      {
        v: '1',
      },
      errors => {
        expect(errors?.length).toBe(1);
        expect(errors?.[0].message).toBe('v is not a number');
        done();
      },
    );
  });

  it('works for no-required', done => {
    Jav.schema<Test<number>>({
      v: Jav.number(),
    }).validate(
      {
        v: undefined,
      },
      errors => {
        expect(errors).toBeFalsy();
        done();
      },
    );
  });

  it('works for no-required in case of empty string', done => {
    Jav.schema<Test<number>>({
      v: Jav.number().required(false),
    }).validate(
      {
        v: '',
      },
      errors => {
        expect(errors).toBeFalsy();
        done();
      },
    );
  });

  it('works for required', done => {
    Jav.schema<Test<number>>({
      v: Jav.number().required(),
    }).validate(
      {
        v: undefined,
      },
      errors => {
        expect(errors?.length).toBe(1);
        expect(errors?.[0].message).toBe('v is required');
        done();
      },
    );
  });

  it('transform does not change value', done => {
    const value = {
      v: '1',
    };
    Jav.schema<Test<string>>({
      v: Jav.number().transform(Number),
    }).validate(value, errors => {
      expect(value.v).toBe('1');
      expect(errors).toBeFalsy();
      done();
    });
  });
});
