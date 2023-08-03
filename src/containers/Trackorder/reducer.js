/*
 *
 * Trackorder reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, GET_DETAILS_ITEM_SUCCESS, TRACK_ORDER_SUCCESS } from './constants';
export const initialState = {
  orderstatus: [],
  orderitem: []
};
/* eslint-disable default-case, no-param-reassign */
const trackorderReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case TRACK_ORDER_SUCCESS:
        console.log('TRACK_ORDER_SUCCESS', action);
        draft.orderstatus = action.orderstatus
        break;
      case GET_DETAILS_ITEM_SUCCESS:
        console.log('TRACK_ORDER_SUCCESS', action);
        draft.orderitem = action.orderstatusitem
        break;
    }
  });
export default trackorderReducer;
