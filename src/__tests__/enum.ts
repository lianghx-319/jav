import { Jav } from '..';
import { Test } from '../types/test';

describe('enum', () => {
  it('run validation on `false`', done => {
    Jav.schema<Test>({
      v: Jav.enum([true]),
    }).validate(
      {
        v: false,
      },
      errors => {
        expect(errors?.length).toBe(1);
        expect(errors?.[0].message).toBe('v must be one of true');
        done();
      },
    );
  });
});
