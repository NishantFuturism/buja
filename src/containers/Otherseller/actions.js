/*
 *
 * Otherseller actions
 *
 */
import { DEFAULT_ACTION, GET_OTHER_SELLER } from './constants';
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function getlistseller(skuiddeatil, formfielid) {
  return {
    type: GET_OTHER_SELLER,
    skuiddeatil, formfielid
  };
}
