/*
 *
 * HomeScreen actions
 *
 */
import { BILLBOARDLIST_SUCCESS, DEFAULT_ACTION, SHOPPING_CART_DETAILS, RES_MSG, RESGESTER_RESPONSE, RECENTLY_LIST } from './constants';
export function defaultAction(id) {
  // console.log('bilboard', id);
  return {
    type: DEFAULT_ACTION,
    id
  };
}
export function getBillBoardlist() {
  return {
    type: BILLBOARDLIST_SUCCESS,
  };
}
export function copyShopingCartDetails(shoppingcartDetails) {
  return {
    type: SHOPPING_CART_DETAILS, shoppingcartDetails
  };
}
export function msgshow(msg) {
  return {
    type: RES_MSG,
    msg
  };
}
export function resgesterresponse(flag, data) {
  return {
    type: RESGESTER_RESPONSE,
    flag, data
  };
}
export function recentlylist(skuID) {
  // console.log('actiomn');
  return {
    type: RECENTLY_LIST,
    skuID
  };
}