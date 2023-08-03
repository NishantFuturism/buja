import { call, put, takeEvery } from 'redux-saga/effects';
import ProductDetailAPI from '../MainPage/api/productdetail';
import mycartAPI from "../MainPage/api/mycartAPI";
import { GET_OTHER_SELLER, GET_OTHER_SELLER_SUCCESSS, SHOPPING_CART_DETAILS_SALLER } from './constants';
export default function* othersellerSaga() {
  yield takeEvery(GET_OTHER_SELLER, sellerlist)
}
function* sellerlist(action) {
  try {
    const listseller = yield call(ProductDetailAPI.otherselletPDP, action.skuiddeatil, action.formfielid)
    yield put({ type: GET_OTHER_SELLER_SUCCESSS, listseller });
    const shoppingcartDetails = yield call(mycartAPI.getShoppingcartDetails);
    console.log('Saga Buyprod=', shoppingcartDetails);
    yield put({ type: SHOPPING_CART_DETAILS_SALLER, shoppingcartDetails });
  } catch (err) {
    console.log(err);
    // yield put(err);
  }
}