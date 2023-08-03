import { createSelector } from 'reselect';
import { initialState } from './reducer';
/**
 * Direct selector to the wishlist state domain
 */
const selectWishlistDomain = state => state.wishlist || initialState;
/**
 * Other specific selectors
 */
/**
 * Default selector used by Wishlist
 */
const makeSelectWishlist = () =>
  createSelector(
    selectWishlistDomain,
    substate => substate,
  );
export default makeSelectWishlist;
export { selectWishlistDomain };
