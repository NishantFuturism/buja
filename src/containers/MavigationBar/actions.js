/*
 *
 * MavigationBar actions
 *
 */
import { DEFAULT_ACTION, GET_AI_AUTOSUGGESTION, GET_DB_AUTOSUGGESTION, GET_SERACH_PRODUCTS, OPEN_MY_CART, FILTERMOB_ICON, HOMECART_ICON } from './constants';
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function isOpenMyCartAction(isOpen) {
  return {
    type: OPEN_MY_CART,
    isOpen
  };
}
export function mobilefilterIcon(isActive) {
  console.log("action...", isActive)
  return {
    type: FILTERMOB_ICON,
    isActive
  };
}
export function homepagecartIcon(carticon) {
  console.log("actioncart...", carticon)
  return {
    type: HOMECART_ICON,
    carticon
  };
}
export function aiAutosuggestionlist(searchtext) {
  return {
    type: GET_AI_AUTOSUGGESTION,
    searchtext
  };
}
export function dbAutosuggestionlist(searchtext) {
  console.log('suhh', searchtext);
  return {
    type: GET_DB_AUTOSUGGESTION,
    searchtext
  };
}
export function getproducts(skuname, id, formid, staticfilterid, min, max, sortby) {
  return {
    type: GET_SERACH_PRODUCTS,
    skuname, id, formid, staticfilterid, min, max, sortby
  };
}