/*
 *
 * Wishlist actions
 *
 */
import { DEFAULT_ACTION, GET_WISHLIST, GET_WISHLIST_SUCCESS, RESPONCE_MSG } from './constants';
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function getWishlist() {
  return {
    type: GET_WISHLIST,
  };
}
export function getWishlistsuccess() {
  return {
    type: GET_WISHLIST_SUCCESS,
  };
}
export function removewishlist(msg) {
  console.log('messs', msg);
  return {
    type: RESPONCE_MSG,
    msg
  };
}
