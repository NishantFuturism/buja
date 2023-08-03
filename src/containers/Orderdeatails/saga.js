/* eslint-disable no-unused-vars */
import { call, put, takeEvery } from 'redux-saga/effects';
import OrderdetailAPI from '../MainPage/api/orderdetail';
import {
  CANCEL_ORDER_LIST_REASONS, CONFIRM_CANCEL_ORDER, CONFIRM_CANCEL_ORDER_SUCCESS, DETAILS_ITEM, DETAILS_ITEM_SUCCESS, MAKE_PAYMENT, SAVE_FEEDBACK_DELIVERY, SAVE_DATA_FEEDBACK, SAVE_ORDER_REVIEW, SAVE_DATA_ORDER_REVIEW, FEEDBACK_REVIEW,
  ORDER_REVIEW_DATA, REVIEW_GIVEN, ORDER_CHECK_REVIEW_GIVEN
} from './constants';
export default function* orderdeatailsSaga() {
  yield takeEvery(MAKE_PAYMENT, makecodepaymentcard)
  yield takeEvery(DETAILS_ITEM, getdetailsitem)
  yield takeEvery(CONFIRM_CANCEL_ORDER, ordercancel)
  yield takeEvery(CANCEL_ORDER_LIST_REASONS, cancellistorder)
  yield takeEvery(SAVE_FEEDBACK_DELIVERY, savedfeedback)
  yield takeEvery(SAVE_ORDER_REVIEW, savetheorderreview)
  yield takeEvery(FEEDBACK_REVIEW, reviewsave)
  yield takeEvery(REVIEW_GIVEN, givenreview)
}
function* makecodepaymentcard(action) {
  console.log({ action });
}
function* getdetailsitem(action) {
  // try {
  //   const detaildata = yield call(OrderdetailAPI.getorderdetailsfeedbackitems, action.databody)
  //   yield put({ type: DETAILS_ITEM_SUCCESS, detaildata });
  // } catch (err) {
  //   console.log(err);
  //   // yield put(err);
  // }
}
function* ordercancel(action) {
  try {
    const cancel = yield call(OrderdetailAPI.ordercanceled, action.databody)
    // alert(cancel)
    yield put({ type: CONFIRM_CANCEL_ORDER_SUCCESS, cancel });
  } catch (err) {
    console.log(err);
    // yield put(err);
  }
}
function* cancellistorder(action) {
  try {
    const cancelreasonlist = yield call(OrderdetailAPI.cancelreasonlist,)
    yield put({ type: DETAILS_ITEM_SUCCESS, cancelreasonlist });
  } catch (err) {
    console.log(err);
    // yield put(err);
  }
}
function* savedfeedback(action) {
  const savefeedbackinfo = yield call(OrderdetailAPI.Savefeedbackdeliveryreview, action.feedbackdata)
  yield put({ type: SAVE_DATA_FEEDBACK, savefeedbackinfo });
}
function* savetheorderreview(action) {
  console.log("scheorder..", action.orderdatapdp)
  const saveinfo = yield call(OrderdetailAPI.SaveFeedbackFromPDP, action.orderdatapdp)
  yield put({ type: SAVE_DATA_ORDER_REVIEW, saveinfo });
  console.log("saveinfo..", saveinfo)
}
function* reviewsave(action) {
  const reviewfeedback = yield call(OrderdetailAPI.Saveorderreviewfeedback, action.productdata)
  yield put({ type: ORDER_REVIEW_DATA, reviewfeedback });
  console.log("sagareviewfeedback..", reviewfeedback)
}
function* givenreview(action) {
  const datacheck = yield call(OrderdetailAPI.CheckReviewIsGivenOrNot, action.givendata)
  yield put({ type: ORDER_CHECK_REVIEW_GIVEN, datacheck });
}