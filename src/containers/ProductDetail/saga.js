import { call, put, takeEvery } from 'redux-saga/effects';
import ProductDetailAPI from '../MainPage/api/productdetail';
import mycartAPI from "../MainPage/api/mycartAPI";
import { GET_CUSTOMER_REVIEW, GET_CUSTOMER_REVIEW_SUCCESS, GET_OTHER_SELLER, GET_SKU_PRODUCTDETAIL, GET_SKU_PRODUCTDETAIL_SUCCESS, SHOPPING_CART_DETAILS_BUYPRODUCT } from './constants';
// Individual exports for testing
export default function* productSaga() {
  yield takeEvery(GET_SKU_PRODUCTDETAIL, getrepos)
  yield takeEvery(GET_CUSTOMER_REVIEW, getreview)
  yield takeEvery(GET_OTHER_SELLER, othersellerlist)
}
function* getrepos(action) {
  console.log('hshsh', action.skuurl);
  try {
    const skudetaildata = yield call(ProductDetailAPI.getSkuv, action.skuurl)
    console.log("skudetaildata", skudetaildata);
    yield put({ type: GET_SKU_PRODUCTDETAIL_SUCCESS, skudetaildata });
    const shoppingcartDetails = yield call(mycartAPI.getShoppingcartDetails);
    console.log('Saga Buyprod=', shoppingcartDetails);
    yield put({ type: SHOPPING_CART_DETAILS_BUYPRODUCT, shoppingcartDetails });
  } catch (err) {
    yield put();
  }
}
function* getreview(action) {
  try {
    const reviewdata = yield call(ProductDetailAPI.getCustomerreview, action.skuUrl)
    yield put({ type: GET_CUSTOMER_REVIEW_SUCCESS, reviewdata });
  } catch (err) {
    yield put();
  }
}
function* othersellerlist(action) {
  console.log('otherselkller', action);
  // try {
  //   const reviewdata = yield call(ProductDetailAPI.getCustomerreview, action.skuUrl)
  //   yield put({ type: GET_CUSTOMER_REVIEW_SUCCESS, reviewdata });
  // } catch (err) {
  //   yield put();
  // }
}