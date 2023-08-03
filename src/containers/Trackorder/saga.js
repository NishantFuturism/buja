import { call, put, takeEvery } from 'redux-saga/effects';
import TrackOrderAPI from '../MainPage/api/trackorder';
import { GET_DETAILS_ITEM, TRACK_ORDER, TRACK_ORDER_SUCCESS, } from './constants';
// Individual exports for testing
export default function* trackorderSaga() {
  yield takeEvery(TRACK_ORDER, ordertrack)
  yield takeEvery(GET_DETAILS_ITEM, detailitems)
}
function* ordertrack(action) {
  console.log('TRACK_ORDER', action);
  try {
    const orderstatus = yield call(TrackOrderAPI.trackorederstatus, action.databody)
    console.log({ orderstatus });
    // const details = {
    //   "OrderNumber": window.atob(localStorage.getItem('OrderNumber')),
    //   "OrderStatusID": orderstatus.,
    //   "ClientID": 1
    // }
    yield put({ type: TRACK_ORDER_SUCCESS, orderstatus });
  } catch (err) {
    // yield put();
  }
}
function* detailitems(action) {
  console.log('detailstem', action);
  // try {
  //   const orderstatusitem = yield call(TrackOrderAPI.trackorederstatus, action.databody)
  //   console.log({ orderstatusitem });
  //   yield put({ type: GET_DETAILS_ITEM_SUCCESS, orderstatusitem });
  // } catch (err) {
  // yield put();
  // }
}