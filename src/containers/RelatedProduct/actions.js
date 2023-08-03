/*
 *
 * RelatedProduct actions
 *
 */
import { ADD_TO_CART, CLOSE_MSG_BAR, DEFAULT_ACTION, NEXT_PAGE } from './constants';
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function nextBtn(pageNum, pageSize, SkuDetailId) {
  console.log('nextBtn', pageNum, pageSize, SkuDetailId);
  return {
    type: NEXT_PAGE, pageNum, pageSize, SkuDetailId
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