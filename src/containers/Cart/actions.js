/*
 *
 * Cart actions
 *
 */
import { ADD_TO_CART, CART_AMOUNT, CLOSE_MSG_BAR, DEFAULT_ACTION, LOAD_SAVE_CARD, REMOVE_FROM_CART, SAVE_CART_NAME } from './constants';
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function addToCart(qty, SkuId, SKUFilterPriceId) {
  return {
    type: ADD_TO_CART, payload: { qty, SkuId, SKUFilterPriceId }
  };
}
export function removeFromCart(SkuId, SKUFilterPriceId) {
  return {
    type: REMOVE_FROM_CART, payload: { SkuId, SKUFilterPriceId }
  };
}
export function savecardpopup(popup) {
  return {
    type: LOAD_SAVE_CARD,
    popup
  };
}
export function saveCartname(cartname) {
  return {
    type: SAVE_CART_NAME,
    cartname
  };
}
export function closeMsgBar() {
  return {
    type: CLOSE_MSG_BAR
  };
}
export function getcartamount(amount) {
  return {
    type: CART_AMOUNT,
    amount,
  };
}