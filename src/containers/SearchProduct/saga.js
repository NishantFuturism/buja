// import { take, call, put, select } from 'redux-saga/effects';
// Individual exports for testing
import { call, put, takeEvery } from 'redux-saga/effects';
import mycartAPI from '../MainPage/api/mycartAPI';
import { SHOPPING_CART_DETAILS_SEARCH, } from './constants';
export default function* searchProductSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(SHOPPING_CART_DETAILS_SEARCH, getSearchDetails)
}
function* getSearchDetails(action) {
  console.log("action=", action);
  const shoppingcartDetails = yield call(mycartAPI.getShoppingcartDetails)
  console.log("saga search shoppingcartDetails=", shoppingcartDetails);
  yield put({ type: SHOPPING_CART_DETAILS_SEARCH, shoppingcartDetails });
}