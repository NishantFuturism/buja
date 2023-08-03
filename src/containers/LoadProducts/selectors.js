import { createSelector } from 'reselect';
import { initialState } from './reducer';
/**
 * Direct selector to the loadProducts state domain
 */
const selectLoadProductsDomain = state => state.loadProducts || initialState;
/**
 * Other specific selectors
 */
/**
 * Default selector used by LoadProducts
 */
const makeSelectLoadProducts = () =>
  createSelector(
    selectLoadProductsDomain,
    substate => substate,
  );
export default makeSelectLoadProducts;
export { selectLoadProductsDomain };
