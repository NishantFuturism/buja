import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_COMMON_CART_SUCCESS, SHOPPING_CART_DETAILS } from '../HomePage/constants';
import mycartAPI from "../MainPage/api/mycartAPI";
import ProductDetailAPI from '../MainPage/api/productdetail';
import { ADD_TO_CART, ADD_TO_CART_SUCCESS, NEXT_PAGE, NEXT_PAGE_SUCCESS, SHOPPING_CART_DETAILS_HOME } from './constants';
// Individual exports for testing
export default function* relatedProductSaga() {
  yield takeEvery(ADD_TO_CART, AddToCartAPI);
  yield takeEvery(NEXT_PAGE, NextBtnAPI);
}
function* AddToCartAPI(action) {
  const updateCartData = yield call(mycartAPI.updatecart, null, action.payload.qty, action.payload.SkuId, action.payload.SKUFilterPriceId)
  const cartAllData = yield call(mycartAPI.getCartCommon)
  const shoppingcartDetails = yield call(mycartAPI.getShoppingcartDetails)
  yield put({ type: GET_COMMON_CART_SUCCESS, cartAllData });
  yield put({ type: ADD_TO_CART_SUCCESS, updateCartData });
  yield put({ type: SHOPPING_CART_DETAILS, shoppingcartDetails });
}
function* NextBtnAPI(action) {
  console.log('action saga', action);
  const dealOfTheDayData = yield call(ProductDetailAPI.getRelatedproduct, action.pageNum, 10)
  yield put({ type: NEXT_PAGE_SUCCESS, dealOfTheDayData });
  const shoppingcartDetails = yield call(mycartAPI.getShoppingcartDetails);
  console.log("saga dealdayproduct=", shoppingcartDetails);
  yield put({ type: SHOPPING_CART_DETAILS_HOME, shoppingcartDetails });
}