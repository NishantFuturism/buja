/*
 *
 * Subcategory actions
 *
 */
import { DEFAULT_ACTION, PRODUCT_BRAND_LIST_FILTER, PRODUCT_BRAND_LIST_FILTER_SUCCESS, PRODUCT_LIST, PRODUCT_LIST_FAILURE, PRODUCT_LIST_SUCCESS, RemoveOldData } from './constants';
export function defaultAction(data) {
  return {
    type: DEFAULT_ACTION,
    data
  };
}
export function getproductlist(page, caturl, parentcatURL,min,max) {
  console.log(' caturl, parentcatURL', caturl, parentcatURL);
  return {
    type: PRODUCT_LIST,
    page,
    caturl,
    parentcatURL,
    min,
    max
  };
}
export function getproductlistsuccess(productdata) {
  return {
    type: PRODUCT_LIST_SUCCESS,
    productdata,
  };
}
export function getproductlistfailure(error) {
  return {
    type: PRODUCT_LIST_FAILURE,
    error
  };
}
export function getbrandListfilter(valueString, valuepackString, fieldString, valuediscountstring, caturl, min, max,sortby) {
  console.log('getbrandListfilter action', min, max,sortby);
  return {
    type: PRODUCT_BRAND_LIST_FILTER,
    valueString,
    valuepackString,
    fieldString,
    valuediscountstring,
    caturl,
    min, max,sortby
  };
}
export function RemovingOldData() {
  return {
    type: RemoveOldData,
  };
}
export function getbrandListfiltersuccess() {
  return {
    type: PRODUCT_BRAND_LIST_FILTER_SUCCESS,
  };
}
