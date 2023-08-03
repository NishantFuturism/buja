// import { take, call, put, select } from 'redux-saga/effects';
import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_COMMON_CART_SUCCESS } from '../HomePage/constants';
import mycartAPI from '../MainPage/api/mycartAPI';
import SaveCartAPI from '../MainPage/api/savecart';
import { ADD_TO_CART, ADD_TO_CART_SUCCESS, REMOVE_FROM_CART, SAVE_CART_NAME, SHOPPING_CART_DETAILS, RESPONCE_MSG } from './constants';
function* AddToCartAPI(action) {
  const updateCartData = yield call(mycartAPI.updatecart, null, action.payload.qty, action.payload.SkuId, action.payload.SKUFilterPriceId)
  const cartAllData = yield call(mycartAPI.getCartCommon)
  yield put({ type: GET_COMMON_CART_SUCCESS, cartAllData });
  // yield put({ type: CART_GET_COMMON_CART_SUCCESS, cartAllData });
  yield put({ type: ADD_TO_CART_SUCCESS, updateCartData });
  const shoppingcartDetails = yield call(mycartAPI.getShoppingcartDetails, action.payload.SkuId, action.payload.SKUFilterPriceId)
  yield put({ type: SHOPPING_CART_DETAILS, shoppingcartDetails });
}
function* RemoveFromCartAPI(action) {
  const recievedMsg = yield call(mycartAPI.RemoveCartItem, action.payload.SkuId, action.payload.SKUFilterPriceId)
  yield put({ type: RESPONCE_MSG, recievedMsg });
  const cartAllData = yield call(mycartAPI.getCartCommon)
  yield put({ type: GET_COMMON_CART_SUCCESS, cartAllData });
  const shoppingcartDetails = yield call(mycartAPI.getShoppingcartDetails, action.payload.SkuId, action.payload.SKUFilterPriceId)
  yield put({ type: SHOPPING_CART_DETAILS, shoppingcartDetails });
}
function* Cartnamesave(action) {
  const cartName = yield call(SaveCartAPI.addsavecart, action.cartname)
  yield put({ type: RESPONCE_MSG, cartName });
}
// Individual exports for testing
export default function* cartSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(ADD_TO_CART, AddToCartAPI);
  yield takeEvery(REMOVE_FROM_CART, RemoveFromCartAPI);
  yield takeEvery(SAVE_CART_NAME, Cartnamesave);
}
