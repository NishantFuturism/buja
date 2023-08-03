/*
 *
 * Orderdeatails reducer
 *
 */
import produce from 'immer';
import { CANCEL_ORDER_POPUP, CONFIRM_CANCEL_ORDER_SUCCESS, DEFAULT_ACTION, DETAILS_ITEM_SUCCESS, MAKE_PAYMENT, MAKE_PAYMENT_SUCCESS, SHOW_DELIVERY_POPUP, SAVE_DATA_FEEDBACK, SHOW_ORDER_POPUP, SAVE_DATA_ORDER_REVIEW, CANCEL_FEEDBACK, INFO_REVIEW, ORDER_REVIEW_DATA, ORDER_CHECK_REVIEW_GIVEN, RETURN_ORDER_POPUP } from './constants';
export const initialState = {
  popupcancel: '',
  returnorderpopup: '',
  returnOrderDetails: '',
  popupfeedback: '',
  productorderpop: '',
  savethedeliveryf: '',
  fdeliverymsg: '',
  adddeliveryf: '',
  savetheorderreview: '',
  feedbackorder: '',
  giventhereview: false,
  reviewdetails: '',
  itemsdata: [],
  ordercancel: false,
  cancelpopup: '',
  IsMsgbar: false
};
/* eslint-disable default-case, no-param-reassign */
const orderdeatailsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case MAKE_PAYMENT:
        break;
      case MAKE_PAYMENT_SUCCESS:
        break;
      case CANCEL_ORDER_POPUP:
        draft.popupcancel = action.cancelpopup
        break;
      case RETURN_ORDER_POPUP:
        console.log("reducer order=", action)
        draft.returnorderpopup = action.returnorderpopup
        draft.returnOrderDetails = action.itemdetails
        break;
      case SHOW_DELIVERY_POPUP:
        draft.popupfeedback = action.popupfeedb
        break;
      case DETAILS_ITEM_SUCCESS:
        // console.log("itemd..", itemd)
        // draft.itemsdata = action.detaildata
        draft.itemsdata = action.itemd
        break;
      case CONFIRM_CANCEL_ORDER_SUCCESS:
        draft.ordercancel = action.cancel
        break;
      case SHOW_ORDER_POPUP:
        console.log("chkreviewpop", action.popreview)
        draft.productorderpop = action.popreview
        break;
      case SAVE_DATA_FEEDBACK:
        draft.IsMsgbar = true
        draft.savethedeliveryf = action.savefeedbackinfo
        break;
      case SAVE_DATA_ORDER_REVIEW:
        draft.savetheorderreview = action.saveinfo
        break;
      case INFO_REVIEW:
        draft.reviewdetails = action.saveorderinfo
        break;
      case ORDER_REVIEW_DATA:
        draft.feedbackorder = action.reviewfeedback
        // console.log("reviewfeedback..", reviewfeedback)
        break;
      case ORDER_CHECK_REVIEW_GIVEN:
        draft.IsMsgbar = true
        draft.giventhereview = action.datacheck
        break
      case CANCEL_FEEDBACK:
        console.log("chkvaluecancel..", action.canceldata)
        draft.cancelpopup = action.canceldata
        break;
    }
  });
export default orderdeatailsReducer;