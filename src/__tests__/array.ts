import { Jav } from '..';
import { Test as T } from '../types/test';

type Test = T<any[]>;

describe('array', () => {
  it('works for type', done => {
    Jav.schema<Test>({
      v: Jav.array(),
    }).validate(
      {
        v: '',
      },
      errors => {
        expect(errors?.length).toBe(1);
        expect(errors?.[0].message).toBe('v is not an array');
        done();
      },
    );
  });

  it('works for type and required', done => {
    Jav.schema<Test>({
      v: Jav.array().required(),
    }).validate(
      {
        v: '',
      },
      errors => {
        expect(errors?.length).toBe(1);
        expect(errors?.[0].message).toBe('v is not an array');
        done();
      },
    );
  });

  it('works for none require', done => {
    Jav.schema<Test>({
      v: Jav.array(),
    }).validate(
      {
        v: [],
      },
      errors => {
        expect(errors).toBe(null);
        done();
      },
    );
  });

  it('works for empty array', done => {
    Jav.schema<Test>({
      v: Jav.array().required(),
    }).validate(
      {
        v: [],
      },
      errors => {
        expect(errors?.length).toBe(1);
        expect(errors?.[0].message).toBe('v is required');
        done();
      },
    );
  });

  it('works for undefined array', done => {
    Jav.schema<Test>({
      v: Jav.array().required(),
    }).validate(
      {
        v: undefined,
      },
      {},
      errors => {
        expect(errors?.length).toBe(1);
        expect(errors?.[0].message).toBe('v is required');
        done();
      },
    );
  });

  it('works for null array', done => {
    Jav.schema<Test>({
      v: Jav.array().required(),
    }).validate(
      {
        v: null,
      },
      {},
      errors => {
        expect(errors?.length).toBe(1);
        expect(errors?.[0].message).toBe('v is required');
        done();
      },
    );
  });

  it('works for none empty', done => {
    Jav.schema<Test>({
      v: Jav.array().required().message('haha'),
    }).validate(
      {
        v: [1],
      },
      {},
      errors => {
        expect(errors).toBe(null);
        done();
      },
    );
  });

  it('works for empty array with min', done => {
    Jav.schema<Test>({
      v: Jav.array().min(1).max(3),
    }).validate(
      {
        v: [],
      },
      errors => {
        expect(errors?.length).toBe(1);
        expect(errors?.[0].message).toBe('v must be between 1 and 3 in length');
        done();
      },
    );
  });

  it('works for empty array with max', done => {
    Jav.schema<Test>({
      v: Jav.array().min(1).max(3),
    }).validate(
      {
        v: [1, 2, 3, 4],
      },
      errors => {
        expect(errors?.length).toBe(1);
        expect(errors?.[0].message).toBe('v must be between 1 and 3 in length');
        done();
      },
    );
  });
});
