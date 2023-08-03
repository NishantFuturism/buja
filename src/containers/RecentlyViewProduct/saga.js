import { call, put, takeEvery } from 'redux-saga/effects';
import ProductDetailAPI from '../MainPage/api/productdetail';
import { GET_RECENTLYVIEWED_PRODUCTS, SHOPPING_CART_DETAILS_RECENT } from './constants';
import mycartAPI from "../MainPage/api/mycartAPI";
export default function* recentlyViewProductSaga() {
  yield takeEvery(GET_RECENTLYVIEWED_PRODUCTS, getrepos)
}
function* getrepos(action) {
  console.log('action saga', action);
  try {
    const skudetaildata = yield call(ProductDetailAPI.getrecentlyviewd, localStorage.getItem('skuproduct1'), 1, 9)
    console.log('saga recent recentdata', skudetaildata);
    yield put({ type: GET_RECENTLYVIEWED_PRODUCTS, skudetaildata });
    const shoppingcartDetails = yield call(mycartAPI.getShoppingcartDetails);
    console.log('Saga Top=', shoppingcartDetails);
    yield put({ type: SHOPPING_CART_DETAILS_RECENT, shoppingcartDetails });
  } catch (err) {
    yield put();
  }
}