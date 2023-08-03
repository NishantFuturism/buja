/*
 *
 * Trackorder actions
 *
 */
import { DEFAULT_ACTION, GET_DETAILS_ITEM, TRACK_ORDER } from './constants';
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function trackorder(databody) {
  return {
    type: TRACK_ORDER,
    databody
  };
}
export function getdetailsItem(databody) {
  return {
    type: GET_DETAILS_ITEM,
    databody
  };
}