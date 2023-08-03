import { call, put, takeEvery } from 'redux-saga/effects';
// import request from '../../utils/request';
// import Constants from '../App/constants';
import RegisterAPI from '../MainPage/api/register';
import { SEND_OTP_REQUEST, SEND_OTP_SUCCESS } from './constants';
// Individual exports for testing
export default function* registerSaga() {
  yield takeEvery(SEND_OTP_REQUEST, getrepos)
  // yield takeEvery(VERIFY_OTP, getReposverify);
}
function* getrepos(action) {
  console.log({ action });
  const pattern = new RegExp(/^[0-9\b]+$/);
  if (!pattern.test(action.username)) {
    const repos = yield call(RegisterAPI.sendOtprequest, action.username)
    console.log({ repos });
    yield put({ type: SEND_OTP_SUCCESS, repos });
    // alert(repos.)
  } else {
    console.log('phone');
    const repos = yield call(RegisterAPI.sendOtprequest, action.username)
    console.log({ repos });
    yield put({ type: SEND_OTP_SUCCESS, repos });
  }
}
// function* getReposverify(action) {
//   const ClientId = 1
//   const repos = yield call(request, `${Constants.urls.baseUrl}${Constants.endPoints.verifyregistrationotp}CustomerRegistrationOTPGUID=${action.CustomerGUID}&otp=${action.otpvalue}&clientid=${ClientId}`, 'POST')
//   console.log({ repos });
//   if (repos) {
//     try {
//       const verified = yield call(request, `${Constants.urls.baseUrl}${Constants.endPoints.getverifiedemailphoneforregistration}?CustomerRegistrationOTPGUID=${action.CustomerGUID}&clientid=${ClientId}`, 'POST')
//       console.log({ verified });
//       // yield put({ type: VERIFY_OTP_SUCCESS, verified });
//     } catch (err) {
//       console.log(err);
//       // yield put(verifyotpfailure(err));
//     }
//   } else {
//     // yield put({ type: VERIFY_OTP_FAILURE, repos });
//   }
// }