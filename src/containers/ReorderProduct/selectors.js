import { createSelector } from 'reselect';
import { initialState } from './reducer';
/**
 * Direct selector to the reorderProduct state domain
 */
const selectReorderProductDomain = state =>
  state.reorderProduct || initialState;
/**
 * Other specific selectors
 */
/**
 * Default selector used by ReorderProduct
 */
const makeSelectReorderProduct = () =>
  createSelector(
    selectReorderProductDomain,
    substate => substate,
  );
export default makeSelectReorderProduct;
export { selectReorderProductDomain };
