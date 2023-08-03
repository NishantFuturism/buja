/* eslint-disable no-unused-expressions */
import { createSelector } from 'reselect';
import { initialState } from './reducer';
/**
 * Direct selector to the ToppSelling state domain
 */
const selectToppSellingDomain = state => {
  state.ToppSelling || initialState;
}
/**
 * Other specific selectors
 */
/**
 * Default selector used by ToppSelling
 */
const makeSelectToppSelling = () =>
  createSelector(
    selectToppSellingDomain,
    cartstate => cartstate,
  );
// console.log({ selectToppSellingDomain });
// export default makeSelectToppSelling;
// export { selectToppSellingDomain };
export {
  makeSelectToppSelling,
};
