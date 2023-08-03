/*
 *
 * LoadProducts actions
 *
 */
import { ADD_TO_CART, ADD_TO_COMPARE, ADD_TO_WISHLIST, CLOSE_MSG_BAR, DEFAULT_ACTION, NOTIFY_ME_REQUEST, QUICKVIEW, RECENT, REMOVE_FROM_CART, REMOVE_FROM_WISHLIST, SKUURL, PRODUCT_BRAND_LIST_FILTER } from './constants';
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
export function addToComapre(skuCode) {
  console.log('actiomn..', skuCode);
  return {
    type: ADD_TO_COMPARE,
    skuCode
  };
}
export function removeFromCart(SkuId, SKUFilterPriceId) {
  return {
    type: REMOVE_FROM_CART, payload: { SkuId, SKUFilterPriceId }
  };
}
export function addTowishlist(SkuId, SKUFilterPriceId) {
  return {
    type: ADD_TO_WISHLIST,
    SkuId,
    SKUFilterPriceId,
  };
}
export function removeFromWishlist(SkuId, SKUFilterPriceId) {
  return {
    type: REMOVE_FROM_WISHLIST,
    SkuId,
    SKUFilterPriceId
  };
}
export function closeMsgBar() {
  return {
    type: CLOSE_MSG_BAR
  };
}
export function notifyMeAction(skuDetailId) {
  return {
    type: NOTIFY_ME_REQUEST,
    skuDetailId
  };
}
export function enablequickreviw(popup, PageUrl) {
  console.log('QUICKVIEWd', PageUrl);
  return {
    type: QUICKVIEW,
    popup, PageUrl
  };
}
export function getskuUrl(skuurl) {
  console.log('rectent action', skuurl);
  return {
    type: SKUURL,
    skuurl,
  };
}
export function getrecent(skuId) {
  console.log('rectent action', skuId);
  return {
    type: RECENT,
    skuId,
  };
}
export function getbrandListfilter(valueString, valuepackString, fieldString, valuediscountstring, caturl, min, max, sortby) {
  console.log('getbrandListfilter action', min, max, sortby);
  return {
    type: PRODUCT_BRAND_LIST_FILTER,
    valueString,
    valuepackString,
    fieldString,
    valuediscountstring,
    caturl,
    min, max, sortby
  };
}