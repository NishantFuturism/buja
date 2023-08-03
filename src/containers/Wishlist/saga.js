import { call, put, takeEvery } from 'redux-saga/effects';
import CustomsAPI from '../MainPage/api/homeServices';
import { GET_WISHLIST, GET_WISHLIST_SUCCESS, RESPONCE_MSG } from './constants';
// Individual exports for testing
function* getwishlistrepo() {
  try {
    const wishlistdata = yield call(CustomsAPI.getwishlist)
    console.log("saga getwishlistdata=", wishlistdata);
    yield put({ type: GET_WISHLIST_SUCCESS, wishlistdata });
    yield put({ type: RESPONCE_MSG, wishlistdata });
  } catch (err) {
    yield put();
  }
}
export default function* wishlistSaga() {
  yield takeEvery(GET_WISHLIST, getwishlistrepo);
}
