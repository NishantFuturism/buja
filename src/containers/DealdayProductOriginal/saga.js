/* eslint-disable no-return-assign */
import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_COMMON_CART_SUCCESS, SHOPPING_CART_DETAILS } from '../HomePage/constants';
import CustomsAPI from '../MainPage/api/homeServices';
import mycartAPI from "../MainPage/api/mycartAPI";
import { ADD_TO_CART, ADD_TO_CART_SUCCESS, DEFAULT_ACTION_DEAL_SUCCESS, NEXT_PAGE, NEXT_PAGE_SUCCESS, SHOPPING_CART_DETAILS_HOME } from './constants';
function* AddToCartAPI(action) {
  try {
    const updateCartData = yield call(mycartAPI.updatecart, null, action.payload.qty, action.payload.SkuId, action.payload.SKUFilterPriceId)
    const cartAllData = yield call(mycartAPI.getCartCommon)
    const shoppingcartDetails = yield call(mycartAPI.getShoppingcartDetails)
    yield put({ type: GET_COMMON_CART_SUCCESS, cartAllData });
    yield put({ type: ADD_TO_CART_SUCCESS, updateCartData });
    yield put({ type: SHOPPING_CART_DETAILS, shoppingcartDetails });
  } catch (err) {
    console.log(err);
  }
}
function* NextBtnAPI(action) {
  try {
    const dealOfTheDayData = yield call(CustomsAPI.getDealofdayWithPage, action.pageNum, 9)
    const cartAllData = yield call(mycartAPI.getCartCommon)
    yield put({ type: NEXT_PAGE_SUCCESS, dealOfTheDayData });
    yield put({ type: DEFAULT_ACTION_DEAL_SUCCESS, dealOfTheDayData });
    yield put({ type: GET_COMMON_CART_SUCCESS, cartAllData });
    const shoppingcartDetails = yield call(mycartAPI.getShoppingcartDetails);
    console.log("saga dealdayproduct=", shoppingcartDetails);
    yield put({ type: SHOPPING_CART_DETAILS_HOME, shoppingcartDetails });
  } catch (err) {
    console.log(err);
  }
}
// function* NextBtnAPI(action) {
//   try {
//     const dealOfTheDayData = yield call(CustomsAPI.getDealofdayWithPage, action.pageNum, 9)
//     yield put({ type: NEXT_PAGE_SUCCESS, dealOfTheDayData });
//   } catch (err) {
//     console.log(err);
//   }
// }
export default function* deal() {
  yield takeEvery(ADD_TO_CART, AddToCartAPI);
  yield takeEvery(NEXT_PAGE, NextBtnAPI);
  // yield takeEvery(DEFAULT_ACTION, NextBtnAPI);
}
