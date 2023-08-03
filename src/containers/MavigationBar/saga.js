import { call, put, takeEvery } from 'redux-saga/effects';
import SearchAPI from '../MainPage/api/search';
import { GET_DB_AUTOSUGGESTION, GET_DB_AUTOSUGGESTION_SUCCESS, GET_SERACH_PRODUCTS, GET_SERACH_PRODUCTS_SUCCESS } from './constants';
// Individual exports for testing
export default function* mavigationBarSaga() {
  yield takeEvery(GET_DB_AUTOSUGGESTION, getserchautosuggestlist)
  yield takeEvery(GET_SERACH_PRODUCTS, getlistproducts)
  // yield takeEvery(FILTERMOB_ICON, getfilterdata)
}
function* getserchautosuggestlist(action) {
  console.log("actionsearchtext..", action.searchtext)
  try {
    const searchlist = yield call(SearchAPI.getDBautosuggestlist, action.searchtext)
    yield put({ type: GET_DB_AUTOSUGGESTION_SUCCESS, searchlist });
    console.log("searchlist", searchlist)
  } catch (err) {
    // yield put();
  }
}
function* getlistproducts(action) {
  try {
    const skuproducts = yield call(SearchAPI.getsearchlist, action.skuname, action.id, action.formid, action.staticfilterid, action.min, action.max, action.sortby)
    yield put({ type: GET_SERACH_PRODUCTS_SUCCESS, skuproducts });
  } catch (err) {
    // yield put();
  }
}
// function* getfilterdata(action) {
//   console.log("saga...", action.isActive)
//   try {
//     console.log("saga...", isActive)
//     yield put({ type: GET_MOB_FILTER_DATA, isActive });
//   } catch (err) {
//     // yield put();
//   }
// }