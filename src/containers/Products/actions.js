/*
 *
 * Products actions
 *
 */
import { DEFAULT_ACTION, ADD_TO_COMPARE } from './constants';
export function defaultAction(SkuCode) {
  console.log('sk', SkuCode);
  return {
    type: DEFAULT_ACTION,
    SkuCode
  };
}
export function getproductcompare(skuCode) {
  console.log('actiomn');
  return {
    type: ADD_TO_COMPARE,
    skuCode
  };
}
