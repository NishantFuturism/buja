// import request from 'utils/request';
// import { SUBMIT_FORM } from './constants';
/**
 * Github repos request/response handler
 */
import { call, put, takeEvery } from 'redux-saga/effects';
import mycartAPI from "../MainPage/api/mycartAPI";
import { GET_COMMON_CART, GET_COMMON_CART_SUCCESS } from './constants';
function* getCommonCartSaga() {
  try {
    const cartAllData = yield call(mycartAPI.getCartCommon)
    yield put({ type: GET_COMMON_CART_SUCCESS, cartAllData });
  } catch (err) {
    yield put();
  }
}
export default function* githubData() {
  yield takeEvery(GET_COMMON_CART, getCommonCartSaga);
}
