/*
 *
 * SearchProduct actions
 *
 */
import { DEFAULT_ACTION, SHOPPING_CART_DETAILS_SEARCH } from './constants';
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function getSearchProductlist() {
  return {
    type: SHOPPING_CART_DETAILS_SEARCH,
  };
}
