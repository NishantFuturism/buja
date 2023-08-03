// import { take, call, put, select } from 'redux-saga/effects';
import { call, put, takeEvery } from 'redux-saga/effects';
import mycartAPI from '../MainPage/api/mycartAPI';
import { ADD_TO_CART, APPLY_COUPON, APPLY_COUPON_SUCCESS, GET_CART_ALL_DATA, GET_CART_ALL_DATA_SUCCESS, GET_COUPON_LIST, GET_COUPON_LIST_SUCCESS, REMOVE_COUPON, REMOVE_FROM_CART, REMOVE_FROM_CART_SUCCESS, RESPONCE_MSG } from './constants';
// Individual exports for testing
function* getCommonCartSaga() {
  try {
    const cartAllData = yield call(mycartAPI.getCartCommon)
    yield put({ type: GET_CART_ALL_DATA_SUCCESS, cartAllData });
  } catch (err) {
    yield put();
  }
}
function* AddToCartAPI(action) {
  try {
    const apiData = yield call(mycartAPI.updatecart, null, action.payload.qty, action.payload.SkuId, action.payload.SKUFilterPriceId)
    const cartAllData = yield call(mycartAPI.getCartCommon)
    yield put({ type: RESPONCE_MSG, apiData })
    yield put({ type: GET_CART_ALL_DATA_SUCCESS, cartAllData });
    // yield put({ type: ADD_TO_CART_SUCCESS, apiData });
  } catch (err) {
    console.log(err);
    yield put(err);
  }
}
function* RemoveFromCartAPI(action) {
  try {
    const removeApiData = yield call(mycartAPI.RemoveCartItem, action.payload.SkuId, action.payload.CGuid)
    const cartAllData = yield call(mycartAPI.getCartCommon)
    // yield put({ type: GET_COMMON_CART_SUCCESS, cartAllData });
    yield put({ type: GET_CART_ALL_DATA_SUCCESS, cartAllData });
    yield put({ type: REMOVE_FROM_CART_SUCCESS, removeApiData });
  } catch (err) {
    console.log(err);
    yield put(err);
  }
}
function* GetCouponListAPI(action) {
  try {
    const couponList = yield call(mycartAPI.getCouponCodeList, action.payload.clientId, action.payload.custGUID)
    const cartAllData = yield call(mycartAPI.getCartCommon)
    // yield put({ type: GET_COMMON_CART_SUCCESS, cartAllData });
    yield put({ type: GET_CART_ALL_DATA_SUCCESS, cartAllData });
    yield put({ type: GET_COUPON_LIST_SUCCESS, couponList });
  } catch (err) {
    yield put(err);
  }
}
function* AppayCouponAPI(action) {
  console.log("sagacouponCode..", action.payload.couponCode)
  try {
    const applycouponSuccess = yield call(mycartAPI.applyCoupon, action.payload.couponCode)
    console.log("sagacouponsuccess==", applycouponSuccess);
    yield call(mycartAPI.updatecart, null, applycouponSuccess.cart[0].Quantity
      , applycouponSuccess.cart[0].SkuId, applycouponSuccess.cart[0].SKUFilterPriceId, applycouponSuccess.couponcode)
    const cartAllData = yield call(mycartAPI.getCartCommon)
    console.log("sagacartAllData..", cartAllData)
    yield put({ type: APPLY_COUPON_SUCCESS, applycouponSuccess });
    yield put({ type: GET_CART_ALL_DATA_SUCCESS, cartAllData });
  } catch (err) {
    console.log(err);
    // yield put(err);
  }
}
function* RemoveCouponAPI(action) {
  try {
    const removeApiData = yield call(mycartAPI.getCancelCouponCode, action.payload.couponcode)
    const cartAllData = yield call(mycartAPI.getCartCommon)
    // yield put({ type: GET_COMMON_CART_SUCCESS, cartAllData });
    yield put({ type: GET_CART_ALL_DATA_SUCCESS, cartAllData });
    yield put({ type: REMOVE_FROM_CART_SUCCESS, removeApiData });
  } catch (err) {
    console.log(err);
    yield put(err);
  }
}
export default function* viewCartSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(GET_CART_ALL_DATA, getCommonCartSaga);
  yield takeEvery(ADD_TO_CART, AddToCartAPI);
  yield takeEvery(REMOVE_FROM_CART, RemoveFromCartAPI);
  yield takeEvery(GET_COUPON_LIST, GetCouponListAPI);
  yield takeEvery(APPLY_COUPON, AppayCouponAPI);
  yield takeEvery(REMOVE_COUPON, RemoveCouponAPI);
}
// getCouponCodeList
// GET_COUPON_LIST