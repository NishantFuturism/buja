import { ADD_TO_CART, NOTIFY_ME_REQUEST, REMOVE_FROM_CART } from './constants';
/*
 *
 * AddToCart actions
 *
 */
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
export function notifyMeAction(skuDetailId,skuPriceId) {
  console.log("action.skuPriceId",skuPriceId);
  return {
    type: NOTIFY_ME_REQUEST,
    skuDetailId,skuPriceId 
  };
}