/* eslint-disable no-unused-vars */
import { takeEvery } from 'redux-saga/effects';
import Constants from '../App/constants';
import { ConstantsValues } from '../MainPage/api/homeServices';
import { SUBSCRIBE_EMAIL } from './constants';
// Individual exports for testing
export default function* newsletterSaga() {
  yield takeEvery(SUBSCRIBE_EMAIL, subscribe)
}
function* subscribe(action) {
  return fetch(`${Constants.urls.baseUrl}${Constants.endPoints.newslettersubscription}clientId=${ConstantsValues.ClientId}&emailid=${action.email}`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
    },
  })
    .then(res => res.json())
    .then(response => {
    });
}
