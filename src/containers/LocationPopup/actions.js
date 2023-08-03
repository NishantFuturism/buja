/* eslint-disable import/named */
/*
 *
 * LocationPopup actions
 *
 */
import { CHECK_SERVICE_AVALABILITY, CLOSE_MSG_BAR, DEFAULT_ACTION, DETECT_MY_LOCATION, LOCATIONNAME_PINCODE, ONCHANGE_LOCATIONT } from './constants';
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function changed(input, atosuggestdadta,) {
  console.log('location change', input, atosuggestdadta);
  return {
    type: ONCHANGE_LOCATIONT,
    input,
    atosuggestdadta,
  };
}
export function detectCurrentlocation(lat, lng, atosuggestdadta) {
  console.log('detect location', lat, lng, atosuggestdadta);
  return {
    type: DETECT_MY_LOCATION,
    lat,
    lng,
    atosuggestdadta
  };
}
export function checkserviceavailability(selectelistvalue, ID, atosuggestdadta) {
  console.log('dd',);
  return {
    type: CHECK_SERVICE_AVALABILITY,
    selectelistvalue,
    ID,
    atosuggestdadta
  }
}
export function closeMsgBar() {
  return {
    type: CLOSE_MSG_BAR
  };
}
export function getlocationtitle(locationname, pincode, flag) {
  console.log('locationanme', locationname, pincode, flag);
  return {
    type: LOCATIONNAME_PINCODE,
    locationname,
    pincode,
    flag,
  };
}
