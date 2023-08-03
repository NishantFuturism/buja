/*
 *
 * LocationPopup reducer
 *
 */
import produce from 'immer';
import { AVILABILYTY_MSG, DEFAULT_ACTION, DETECT_MY_LOCATION, LOCATIONNAME_PINCODE, ONCHANGE_LOCATIONT, ONCHANGE_LOCATION_SUCCESS } from './constants';
export const initialState = {
  close: false,
  input: '',
  lat: '',
  lng: '',
  atosuggestdadta: [],
  predictlist: [],
  avilabiltymsg: '',
  locationname: '',
  pincode: '',
  flag: false
};
/* eslint-disable default-case, no-param-reassign */
const locationPopupReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case ONCHANGE_LOCATIONT:
        console.log('action', action);
        // state.input = action.input
        // draft.predictlist = action.predictlist
        break;
      case DETECT_MY_LOCATION:
        // state.input = action.input
        break;
      case ONCHANGE_LOCATION_SUCCESS:
        draft.predictlist = action.predictions
        break;
      case AVILABILYTY_MSG:
        draft.avilabiltymsg = action.checkserviceavailability
        break;
      case LOCATIONNAME_PINCODE:
        draft.locationname = action.locationname
        draft.pincode = action.pincode
        draft.flag = action.flag
        break;
    }
  });
export default locationPopupReducer;
