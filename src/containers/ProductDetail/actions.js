/*
 *
 * Product actions
 *
 */
import { DEFAULT_ACTION, GET_CUSTOMER_REVIEW_FAILURE, GET_OTHER_SELLER, GET_SKU_PRODUCTDETAIL, GET_SKU_PRODUCTDETAIL_FAILURE, GET_SKU_PRODUCTDETAIL_SUCCESS } from './constants';
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function getskuProductdetail(skuurl) {
  console.log('actiooooo',skuurl);
  return {
    type: GET_SKU_PRODUCTDETAIL,
    skuurl
  }
}
export function getskuProductdetailsuccess() {
  return {
    type: GET_SKU_PRODUCTDETAIL_SUCCESS
  }
}
export function getskuProductdetailfailure() {
  return {
    type: GET_SKU_PRODUCTDETAIL_FAILURE
  }
}
export function getotherseller() {
  return {
    type: GET_OTHER_SELLER
  }
}
export function getreviw() {
  return {
    type: GET_CUSTOMER_REVIEW_FAILURE
  }
}
