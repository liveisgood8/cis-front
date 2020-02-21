import { loginRequestAction } from '../../../src/stores/auth/actions';

describe('auth actions', () => {
  it('should create action for login request', () => {
    const expectedAction = {
      type: loginRequestAction.type,
    };

    expect(loginRequestAction()).toEqual(expectedAction);
  });
});
