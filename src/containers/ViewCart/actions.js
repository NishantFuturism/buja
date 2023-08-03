/*
 *
 * ViewCart actions
 *
 */
import { ADD_TO_CART, APPLY_COUPON, APPLY_COUPON_SUCCESS, CLOSE_MSG_BAR, DEFAULT_ACTION, GET_CART_ALL_DATA, GET_CART_ALL_DATA_SUCCESS, GET_COUPON_LIST, GET_COUPON_LIST_SUCCESS, REMOVE_COUPON, REMOVE_COUPON_SUCCESS, REMOVE_FROM_CART, RESPONCE_MSG } from './constants';
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function getCartData() {
  return {
    type: GET_CART_ALL_DATA
  };
}
export function getCartDataSuccess() {
  return {
    type: GET_CART_ALL_DATA_SUCCESS
  };
}
export function addToCart(qty, SkuId, SKUFilterPriceId) {
  return {
    type: ADD_TO_CART, payload: { qty, SkuId, SKUFilterPriceId }
  };
}
export function removeFromCart(SkuId, CGuid) {
  return {
    type: REMOVE_FROM_CART, payload: { SkuId, CGuid }
  };
}
/** COUPON ACTIONS */
export function getCouponList(clientId, custGUID) {
  return {
    type: GET_COUPON_LIST, payload: { clientId, custGUID }
  };
}
export function getCouponListSuccess() {
  return {
    type: GET_COUPON_LIST_SUCCESS
  };
}
export function applyCoupon(couponCode) {
  console.log("actioncouponCode..", couponCode)
  return {
    type: APPLY_COUPON, payload: { couponCode }
  };
}
export function applyCouponSuccess() {
  return {
    type: APPLY_COUPON_SUCCESS
  };
}
export function removeCoupon(couponcode) {
  return {
    type: REMOVE_COUPON, payload: { couponcode }
  };
}
export function removeCouponSuccess() {
  return {
    type: REMOVE_COUPON_SUCCESS
  };
}
export function OpenMsgBar(sendOtpResponse) {
  return {
    type: RESPONCE_MSG, sendOtpResponse
  };
}
export function closeMsgBar() {
  return {
    type: CLOSE_MSG_BAR
  };
}