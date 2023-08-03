/* eslint-disable prefer-destructuring */
/*
 *
 * ViewCart reducer
 *
 */
import produce from 'immer';
import { CLOSE_MSG_BAR, DEFAULT_ACTION, GET_CART_ALL_DATA_SUCCESS, GET_COUPON_LIST, GET_COUPON_LIST_SUCCESS, REMOVE_FROM_CART_SUCCESS, RESPONCE_MSG, APPLY_COUPON_SUCCESS } from './constants';
export const initialState = {
  cartAllData: [],
  couponList: [],
  removeCartMsg: '',
  addToCartMsg: '',
  IsMsgBar: false,
  loading: false,
  couponsuccess: []
};
/* eslint-disable default-case, no-param-reassign */
const viewCartReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    console.log(action);
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case GET_CART_ALL_DATA_SUCCESS:
        draft.cartAllData = action.cartAllData
        break;
      case REMOVE_FROM_CART_SUCCESS:
        draft.removeCartMsg = action.removeApiData
        break;
      case GET_COUPON_LIST:
        draft.loading = true
        break;
      case GET_COUPON_LIST_SUCCESS:
        draft.loading = false
        draft.couponList = action.couponList
        break;
      case RESPONCE_MSG:
        // draft.IsMsgBar = true
        draft.addToCartMsg = action.apiData
        break
      case CLOSE_MSG_BAR:
        draft.IsMsgBar = false
        break
      case APPLY_COUPON_SUCCESS:
        // draft.IsMsgBar = true
        console.log("applycouponSuccess..", action.applycouponSuccess)
        draft.couponsuccess = action.applycouponSuccess
        break
    }
  });
export default viewCartReducer;
