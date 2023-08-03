/* eslint-disable no-unused-vars */
import { call, put, takeEvery } from 'redux-saga/effects';
import ContactdetailAPI from '../MainPage/api/contactdetail';
import { SAVE_CONTACT, CONTACT_S_DATA } from "./constants";
export default function* contactdeatailsSaga() {
  yield takeEvery(SAVE_CONTACT, contactdata)
}
function* contactdata(action) {
  console.log("sagacontact..", action.savecdata)
  const contactinfo = yield call(ContactdetailAPI.savecontatinformation, action.savecdata)
  yield put({ type: CONTACT_S_DATA, contactinfo });
}