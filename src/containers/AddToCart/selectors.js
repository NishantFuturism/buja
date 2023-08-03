import { createSelector } from 'reselect';
import { initialState } from './reducer';
/**
 * Direct selector to the addToCart state domain
 */
const selectAddToCartDomain = state => state.addToCart || initialState;
/**
 * Other specific selectors
 */
/**
 * Default selector used by AddToCart
 */
const makeSelectAddToCart = () =>
  createSelector(
    selectAddToCartDomain,
    substate => substate,
  );
export default makeSelectAddToCart;
export { selectAddToCartDomain };
