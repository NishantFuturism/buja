import { createSelector } from 'reselect';
import { initialState } from './reducer';
/**
 * Direct selector to the recentlyViewProduct state domain
 */
const selectRecentlyViewProductDomain = state =>
  state.recentlyViewProduct || initialState;
/**
 * Other specific selectors
 */
/**
 * Default selector used by RecentlyViewProduct
 */
const makeSelectRecentlyViewProduct = () =>
  createSelector(
    selectRecentlyViewProductDomain,
    substate => substate,
  );
// console.log('nnn', makeSelectRecentlyViewProduct)
export default makeSelectRecentlyViewProduct;
export { selectRecentlyViewProductDomain };
