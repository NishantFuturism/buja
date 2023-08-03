import { createSelector } from 'reselect';
import { initialState } from './reducer';
/**
 * Direct selector to the relatedProduct state domain
 */
const selectRelatedProductDomain = state =>
  state.relatedProduct || initialState;
/**
 * Other specific selectors
 */
/**
 * Default selector used by RelatedProduct
 */
const makeSelectRelatedProduct = () =>
  createSelector(
    selectRelatedProductDomain,
    substate => substate,
  );
export default makeSelectRelatedProduct;
export { selectRelatedProductDomain };
