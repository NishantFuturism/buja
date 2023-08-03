/*
 *
 * Orderdeatails actions
 *
 */
import { GET_OTHER_SELLER } from '../Otherseller/constants';
import { CANCEL_ORDER_LIST_REASONS, CANCEL_ORDER_POPUP, CONFIRM_CANCEL_ORDER, CONFIRM_CANCEL_ORDER_SUCCESS, DEFAULT_ACTION, DETAILS_ITEM, GET_FEEDBACK_DEATAILS_ORDERITEM, MAKE_PAYMENT, SUBMIT_DELIVERY_FEEDBACK, SUBMIT_ORDER_FEEDBACK, SHOW_DELIVERY_POPUP, SAVE_FEEDBACK_DELIVERY, SHOW_ORDER_POPUP, SAVE_ORDER_REVIEW, CANCEL_FEEDBACK, FEEDBACK_REVIEW, REVIEW_GIVEN, RETURN_ORDER_POPUP } from './constants';
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function makepayment() {
  return {
    type: MAKE_PAYMENT,
  };
}
export function ordercancelpopup(cancelpopup) {
  return {
    type: CANCEL_ORDER_POPUP,
    cancelpopup
  };
}
export function orderreturnpopup(returnorderpopup, itemdetails) {
  return {
    type: RETURN_ORDER_POPUP,
    returnorderpopup,
    itemdetails
  };
}
export function deliverypopup(popupfeedb) {
  return {
    type: SHOW_DELIVERY_POPUP,
    popupfeedb
  }
}
export function orderpopup(popreview) {
  return {
    type: SHOW_ORDER_POPUP,
    popreview
  }
}
export function deliveryfeedback(databody, checkdata) {
  return {
    type: SUBMIT_DELIVERY_FEEDBACK,
    databody,
    checkdata
  };
}
export function getitems(databody) {
  return {
    type: DETAILS_ITEM,
    databody
  };
}
export function confirmcanelorder(databody) {
  return {
    type: CONFIRM_CANCEL_ORDER,
    databody
  };
}
export function confirmcanelordersuccess() {
  return {
    type: CONFIRM_CANCEL_ORDER_SUCCESS,
  };
}
export function submitordereviefeedback(databody, checkdata) {
  return {
    type: SUBMIT_ORDER_FEEDBACK,
    databody,
    checkdata
  };
}
export function getreviewitemdeatils(databody) {
  return {
    type: GET_FEEDBACK_DEATAILS_ORDERITEM,
    databody
  };
}
export function getothersellerlist(databody) {
  return {
    type: GET_OTHER_SELLER,
    databody
  };
}
export function getordercancelreasonlist() {
  return {
    type: CANCEL_ORDER_LIST_REASONS,
  };
}
export function savedeliveryfeedback(feedbackdata) {
  return {
    type: SAVE_FEEDBACK_DELIVERY,
    feedbackdata
  };
}
export function orderreviewformpdp(orderdatapdp) {
  return {
    type: SAVE_ORDER_REVIEW,
    orderdatapdp
  };
}
export function savefeedbackorderreview(productdata) {
  return {
    type: FEEDBACK_REVIEW,
    productdata
  };
}
export function CheckReview(givendata) {
  return {
    type: REVIEW_GIVEN,
    givendata
  };
}
export function cancelfeedbackdelivery(canceldata) {
  return {
    type: CANCEL_FEEDBACK,
    canceldata
  };
}
