import { createSelector } from 'reselect';
import { initialState } from './reducer';
/**
 * Direct selector to the wishlistPaged state domain
 */
const selectWishlistPagedDomain = state => state.wishlistPaged || initialState;
/**
 * Other specific selectors
 */
/**
 * Default selector used by WishlistPaged
 */
const makeSelectWishlistPaged = () =>
  createSelector(
    selectWishlistPagedDomain,
    substate => substate,
  );
export default makeSelectWishlistPaged;
export { selectWishlistPagedDomain };
