// import { take, call, put, select } from 'redux-saga/effects';
import { call, put, takeEvery } from 'redux-saga/effects';
import Cookies from 'universal-cookie';
import { GET_COMMON_CART_SUCCESS } from '../HomePage/constants';
import mycartAPI from '../MainPage/api/mycartAPI';
////import history from '../../utils/history';
import { useRouter } from 'next/router';
import { ADD_TO_CART, ADD_TO_CART_SUCCESS, NOTIFY_ME_REQUEST, NOTIFY_ME_REQUEST_SUCCESS, REMOVE_FROM_CART, RESPONCE_MSG, SHOPPING_CART_DETAILS } from './constants';
function* AddToCartAPI(action) {
  console.log('bbb', action);
  try {
    const updateCartData = yield call(mycartAPI.updatecart, null, action.payload.qty, action.payload.SkuId, action.payload.SKUFilterPriceId)
    const cartAllData = yield call(mycartAPI.getCartCommon)
    const shoppingcartDetails = yield call(mycartAPI.getShoppingcartDetails)
    yield put({ type: GET_COMMON_CART_SUCCESS, cartAllData });
    yield put({ type: ADD_TO_CART_SUCCESS, updateCartData });
    yield put({ type: SHOPPING_CART_DETAILS, shoppingcartDetails });
  } catch (err) {
    console.log(err);
    yield put(err);
  }
}
function* RemoveFromCartAPI(action) {
  const recievedMsg = yield call(mycartAPI.RemoveCartItem, action.payload.SkuId, action.payload.SKUFilterPriceId)
  yield put({ type: RESPONCE_MSG, recievedMsg });
  const cartAllData = yield call(mycartAPI.getCartCommon)
  yield put({ type: GET_COMMON_CART_SUCCESS, cartAllData });
  const shoppingcartDetails = yield call(mycartAPI.getShoppingcartDetails)
  yield put({ type: SHOPPING_CART_DETAILS, shoppingcartDetails });
}
// Individual exports for testing
export default function* addToCartSaga() {
  yield takeEvery(ADD_TO_CART, AddToCartAPI);
  yield takeEvery(REMOVE_FROM_CART, RemoveFromCartAPI);
  yield takeEvery(NOTIFY_ME_REQUEST, NotifyMeSaga);
  // See example in containers/HomePage/saga.js
}
function* NotifyMeSaga(action) {
  const router = useRouter();
  console.log("saga notify");
  const notifyMeResp = yield call(mycartAPI.NotifyMeAPI, action.skuDetailId, action.skuPriceId)
  console.log('notifyMeResp', notifyMeResp, action.skuPriceId);
  yield put({ type: NOTIFY_ME_REQUEST_SUCCESS, notifyMeResp });
  if (notifyMeResp === false) {
    const cookies = new Cookies();
    cookies.set('notifySkuDetailID', action.skuDetailId);
    console.log(cookies.get('notifySkuDetailID'));
    router.push('/login')
  }
  // mycartAPI.NotifyMeAPI
  // NotifyMeAPI
}