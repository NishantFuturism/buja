/* eslint-disable no-unused-expressions */
import { createSelector } from 'reselect';
import { initialState } from './reducer';
/**
 * Direct selector to the dealdayProduct state domain
 */
const selectDealdayProductDomain = state => {
  state.dealdayProduct || initialState;
}
/**
 * Other specific selectors
 */
/**
 * Default selector used by DealdayProduct
 */
const makeSelectDealdayProduct = () =>
  createSelector(
    selectDealdayProductDomain,
    cartstate => cartstate,
  );
// console.log({ selectDealdayProductDomain });
// export default makeSelectDealdayProduct;
// export { selectDealdayProductDomain };
export {
  makeSelectDealdayProduct,
};
