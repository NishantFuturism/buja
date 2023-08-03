import { createSelector } from 'reselect';
import { initialState } from './reducer';
/**
 * Direct selector to the searchProduct state domain
 */
const selectSearchProductDomain = state => state.searchProduct || initialState;
/**
 * Other specific selectors
 */
/**
 * Default selector used by SearchProduct
 */
const makeSelectSearchProduct = () =>
  createSelector(
    selectSearchProductDomain,
    substate => substate,
  );
export default makeSelectSearchProduct;
export { selectSearchProductDomain };
