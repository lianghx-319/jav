import { Jav } from '..';
import { Test as T } from '../types/test';

type Test = T<Date>;

describe('date', () => {
  it('required works for undefined', done => {
    Jav.schema<Test>({
      v: Jav.date().required(),
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

  it('required works for ""', done => {
    Jav.schema<Test>({
      v: Jav.date().required(),
    }).validate(
      {
        v: '',
      },
      errors => {
        expect(errors?.length).toBe(1);
        expect(errors?.[0].message).toBe('v is required');
        done();
      },
    );
  });

  it('required works for non-date type', done => {
    Jav.schema<Test>({
      v: Jav.date().required(),
    }).validate(
      {
        v: {},
      },
      errors => {
        expect(errors?.length).toBe(1);
        expect(errors?.[0].message).toBe('v is not a date');
        done();
      },
    );
  });

  it('required works for "timestamp"', done => {
    Jav.schema<Test>({
      v: Jav.date().required(),
    }).validate(
      {
        v: 1530374400000,
      },
      errors => {
        expect(errors).toBe(null);
        done();
      },
    );
  });
});
