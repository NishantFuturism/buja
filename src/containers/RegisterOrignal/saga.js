import { call, put, takeLatest } from 'redux-saga/effects';
import CustomsAPI from "../MainPage/api/homeServices";
import RegisterAPI from '../MainPage/api/register';
import { NOTIFYREGESTERD_CUSTOMER, SEND_OTP_REQUEST, SEND_OTP_SUCCESS, VERIFY_OTP, VERIFY_OTP_SUCCESS, REGISTER_USER, REGISTER_USER_NAME, CHANGE_USERNAME, CHANGE_USERNAME_SUCCESS, USER_REGISTER_WITH_MOBILE_OR_EMAIL, USER_REGISTER_WITH_MOBILE_OR_EMAIL_SUCCESS, USER_REGISTRATION_USING_GMAIL, USER_SUCCESS_REGISTRATION_USING_GMAIL, GET_CUST_ID_BY_EMAIL, GET_CUST_ID_BY_EMAIL_SUCCESS } from './constants';
/**
 * Github repos request/response handler
 */
function* getRepos(action) {
  // const pattern = new RegExp(/^[0-9\b]+$/);
  // if (!pattern.test(action.UserName)) {
  if (action.id) {
    const sendOTPData = yield call(CustomsAPI.sendOtpRegistrationApi, action.id)
    // const sendOTPData = yield call(request, `${Constants.urls.baseUrl}${Constants.endPoints.generateotpforregistrationnew}userName=${action.id}`, 'POST')
    // } else {
    //   const repos = yield call(request, `${Constants.urls.baseUrl}${Constants.endPoints.generateotpforregistrationnew}userName=${action.UserName}`, 'POST')
    // alert(repos.Message)
    // } catch (err) {
    //   console.log(err);
    yield put({ type: SEND_OTP_SUCCESS, sendOTPData });
  }
  // }
}
function* getReposverify(action) {
  const OTPVerify1 = yield call(CustomsAPI.verifyRegistrationOTP, action.CustomerGUID, action.otpvalue)
  // localStorage.setItem('otpvalid', OTPVerify1)
  console.log("OTPVerify..", OTPVerify1)
  yield put({ type: VERIFY_OTP_SUCCESS, OTPVerify1 });
  // if (OTPVerify) {
  //   const verified = yield call(request, `${Constants.urls.baseUrl}${Constants.endPoints.getverifiedemailphoneforregistration}?CustomerRegistrationOTPGUID=${action.CustomerGUID}&clientid=${ClientId}`, 'POST')
  // }
}
export default function* registerOrignalSaga() {
  yield takeLatest(SEND_OTP_REQUEST, getRepos);
  yield takeLatest(VERIFY_OTP, getReposverify);
  yield takeLatest(NOTIFYREGESTERD_CUSTOMER, notifyuser);
  yield takeLatest(REGISTER_USER, registerusername);
  yield takeLatest(CHANGE_USERNAME, changeusername);
  yield takeLatest(USER_REGISTER_WITH_MOBILE_OR_EMAIL, userregistredwithmobileoremail)
  yield takeLatest(USER_REGISTRATION_USING_GMAIL, userRegistrationUsingGmail)
  yield takeLatest(GET_CUST_ID_BY_EMAIL, getCustIdUsingGmailId)
  // yeild takeEvery()
}
function* registerusername(action) {
  console.log('CGUIDotpvalue..', action.CustomerGUID, action.otpvalue);
  const OTPverify = yield call(CustomsAPI.verifyuserRegistrationOTP, action.CustomerGUID, action.otpvalue)
  localStorage.setItem('otpvalid', OTPverify)
  console.log("OTPverifyvalueee..", OTPverify)
  yield put({ type: REGISTER_USER_NAME, OTPverify });
}
function* changeusername(action) {
  const sendOtpResponse = yield call(CustomsAPI.sendOtpRegisterApi, action.username)
  yield put({ type: CHANGE_USERNAME_SUCCESS, sendOtpResponse })
}
function* notifyuser(action) {
  // console.log('notify', { action });
  const notify = yield call(RegisterAPI.SendEmailAndSmsForRegistration, action.emailsmsbodynotify)
  console.log({ notify });
  // yield put({ type: VERIFY_OTP_SUCCESS, OTPVerify });
}
function* userregistredwithmobileoremail(action) {
  // USER_REGISTER_WITH_MOBILE_OR_EMAIL
  console.log('Register Original Saga', action)
  const userRegistrationWithMobileOrEmailResponse = yield call(RegisterAPI.SendEmailOrMobileForRegistration, action.userMobileNo, action.userEmail, action.password)
  yield put({ type: USER_REGISTER_WITH_MOBILE_OR_EMAIL_SUCCESS, userRegistrationWithMobileOrEmailResponse })
}
function* userRegistrationUsingGmail(action) {
  if (action.userDetails) {
    const userDetailsData = yield call(RegisterAPI.sendUserRegistrationUsingGmailApi, action.userDetails)
    yield put({ type: USER_SUCCESS_REGISTRATION_USING_GMAIL, userDetailsData });
  }
}
function* getCustIdUsingGmailId(action) {
  console.log('register original saga', action)
  const getCustIdUsingGmailIdResponse = yield call(CustomsAPI.getCustIdUsingGmailId, action.clientid, action.emailId, action.customerType)
  yield put({ type: GET_CUST_ID_BY_EMAIL_SUCCESS, getCustIdUsingGmailIdResponse });
}