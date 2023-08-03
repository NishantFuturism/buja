// import produce from 'immer';
import registerOrignalReducer from '../reducer';
// import { someAction } from '../actions';
/* eslint-disable default-case, no-param-reassign */
describe('registerOrignalReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      // default state params here
    };
  });
  it('returns the initial state', () => {
    const expectedResult = state;
    expect(registerOrignalReducer(undefined, {})).toEqual(expectedResult);
  });
  /**
   * Example state change comparison
   *
   * it('should handle the someAction action correctly', () => {
   *   const expectedResult = produce(state, draft => {
   *     draft.loading = true;
   *     draft.error = false;
   *     draft.userData.nested = false;
   *   });
   *
   *   expect(appReducer(state, someAction())).toEqual(expectedResult);
   * });
   */
});
