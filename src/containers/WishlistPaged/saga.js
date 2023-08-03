import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_COMMON_CART_SUCCESS, SHOPPING_CART_DETAILS } from '../HomePage/constants';
import CustomsAPI from '../MainPage/api/homeServices';
import mycartAPI from '../MainPage/api/mycartAPI';
import { ADD_TO_CART, ADD_TO_CART_SUCCESS, NEXT_PAGE, NEXT_PAGE_SUCCESS } from './constants';
// Individual exports for testing
export default function* wishlistPagedSaga() {
  yield takeEvery(ADD_TO_CART, AddToCartAPI);
  yield takeEvery(NEXT_PAGE, NextBtnAPI);
  // yield takeEvery(DEFAULT_ACTION, dealday);
}
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
    const dealOfTheDayData = yield call(CustomsAPI.getwhishlistpaged, action.pageNum, 9)
    yield put({ type: NEXT_PAGE_SUCCESS, dealOfTheDayData });
  } catch (err) {
    console.log(err);
  }
}