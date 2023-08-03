import { createSelector } from 'reselect';
import { initialState } from './reducer';
/**
 * Direct selector to the recommendedProduct state domain
 */
const selectRecommendedProductDomain = state =>
  state.recommendedProduct || initialState;
/**
 * Other specific selectors
 */
/**
 * Default selector used by RecommendedProduct
 */
const makeSelectRecommendedProduct = () =>
  createSelector(
    selectRecommendedProductDomain,
    substate => substate,
  );
export default makeSelectRecommendedProduct;
export { selectRecommendedProductDomain };
