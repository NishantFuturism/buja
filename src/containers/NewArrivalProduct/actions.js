/*
 *
 * ReorderProduct actions
 *
 */
import { CLOSE_MSG_BAR } from '../DealdayProductOriginal/constants';
import { ADD_TO_CART, DEFAULT_ACTION, NEXT_PAGE } from './constants';
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function nextBtn(pageNum, pageSize) {
  console.log('skk');
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
