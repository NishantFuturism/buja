/*
 *
 * RecentlyViewProduct actions
 *
 */
import { ADD_TO_CART, CLOSE_MSG_BAR, DEFAULT_ACTION, GET_RECENTLYVIEWED_PRODUCTS, GET_RECENTLYVIEWED_PRODUCTS_FAILURE, GET_RECENTLYVIEWED_PRODUCTS_SUCCESS, NEXT_PAGE } from './constants';
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function getRecentlyviewedproduct(skuid) {
  console.log('rectent action', skuid);
  return {
    type: GET_RECENTLYVIEWED_PRODUCTS,
    skuid
  };
}
export function getRecentlyviewedproductsuccess() {
  return {
    type: GET_RECENTLYVIEWED_PRODUCTS_SUCCESS,
  };
}
export function getRecentlyviewedproductfailure() {
  return {
    type: GET_RECENTLYVIEWED_PRODUCTS_FAILURE,
  };
}
export function nextBtn(pageNum, pageSize) {
  return {
    type: NEXT_PAGE, pageNum, pageSize
  };
}
export function addToCart(qty, SkuId, SKUFilterPriceId) {
  return {
    type: ADD_TO_CART, payload: { qty, SkuId, SKUFilterPriceId }
  };
}
export function closeMsgBar() {
  return {
    type: CLOSE_MSG_BAR
  };
}