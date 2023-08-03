import { call, put, takeEvery } from 'redux-saga/effects';
import CustomsAPI from '../MainPage/api/homeServices';
import RegisterAPI from '../MainPage/api/register';
// import history from '../../utils/history';
import { CHANGE_USERNAME, CHANGE_USERNAME_SUCCESS, FORGOT_PASSWORD, LOGIN_WITH_OTP, LOGIN_WITH_OTP_SUCCESS, LOGIN_WITH_PASSWORD, RESPONCE_MSG, NEW_PASSWORD, NEW_PASSWORD_FOR_REACT, NEW_PASSWORD_ACTION_REACT, SEND_OTP_REQUEST_PSWD, SEND_OTP_SUCCESS_PSWD, USER_REGISTRATION_USING_GMAIL, USER_SUCCESS_REGISTRATION_USING_GMAIL, GET_CUST_ID_BY_EMAIL, GET_CUST_ID_BY_EMAIL_SUCCESS } from './constants';
function* loginPasswordSaga(action) {
  const verifyOTPResp = yield call(CustomsAPI.verifyPassword, action.uname, action.password)
  yield put({ type: LOGIN_WITH_OTP_SUCCESS, verifyOTPResp })
}
function* forgotPasswordSaga(action) {
  console.log('gshg', action);
  const emailResponse = yield call(CustomsAPI.forgotpasswordApi, action.id)
  console.log("emailResponse", emailResponse);
  // if(emailResponse.MessageTypeID===3){
  //   alert('Email Send successfully')
  // }
  // else if(emailResponse.MessageTypeID===8){
  //   alert('SMS has been sent successfully')
  // }
  // yield put({ type: FORGOT_PASSWORD_SUCCESS, sendOtpResponse })
  yield put({ type: RESPONCE_MSG, emailResponse })
}
function* newPasswordSaga(action) {
  console.log('newPasswordSaga', action);
  const NewPasswordResponse = yield call(CustomsAPI.NewPasswordForReact, action.token, action.username, action.newpassword, action.confirmpassword, action.isFirstTimePasswordChange)
  console.log("NewPasswordResponse", NewPasswordResponse);
  // yield put({ type: FORGOT_PASSWORD_SUCCESS, sendOtpResponse })
  //  if( NewPasswordResponse.MessageTypeID==2 )
  //  {
  //   history.push('/login/form')
  //  }
  yield put({ type: RESPONCE_MSG, NewPasswordResponse })
}
function* sendOtpRequestFunc(action) {
  const sendOtpResponse = yield call(CustomsAPI.sendOtpLoginApi, action.username)
  yield put({ type: RESPONCE_MSG, sendOtpResponse })
  yield put({ type: CHANGE_USERNAME_SUCCESS, sendOtpResponse })
}
function* loginOtprepos(action) {
  const verifyOTPResp = yield call(CustomsAPI.verifyOTP, action.uname, action.OTP)
  yield put({ type: LOGIN_WITH_OTP_SUCCESS, verifyOTPResp })
}
function* newPasswordSagaForReact(action) {
  console.log('newPasswordForReactSaga', action);
  const NewPasswordResponseForReact = yield call(CustomsAPI.NewPasswordApi, action.token, action.username, action.newPassword, action.cnfPassword, action.IsPasswordChangedForFirstTime)
  // yield put({ type: FORGOT_PASSWORD_SUCCESS, sendOtpResponse })
  yield put({ type: NEW_PASSWORD_ACTION_REACT, NewPasswordResponseForReact })
}
function* getReposPswd(action) {
  console.log('sendOtppswdsaga', action.id);
  if (action.id) {
    const sendOTPDataPswd = yield call(CustomsAPI.sendOtpRegistrationApi, action.id)
    yield put({ type: SEND_OTP_SUCCESS_PSWD, sendOTPDataPswd });
    console.log('sendOTPDataPswd', sendOTPDataPswd);
  }
  // }
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
export default function* loginSaga() {
  // yield takeLatest(SEND_OTP_REQUEST, loginRepos);
  yield takeEvery(LOGIN_WITH_OTP, loginOtprepos);
  yield takeEvery(LOGIN_WITH_PASSWORD, loginPasswordSaga);
  yield takeEvery(CHANGE_USERNAME, sendOtpRequestFunc);
  yield takeEvery(FORGOT_PASSWORD, forgotPasswordSaga);
  yield takeEvery(NEW_PASSWORD, newPasswordSaga);
  yield takeEvery(NEW_PASSWORD_FOR_REACT, newPasswordSagaForReact);
  yield takeEvery(SEND_OTP_REQUEST_PSWD, getReposPswd);
  yield takeEvery(USER_REGISTRATION_USING_GMAIL, userRegistrationUsingGmail)
  yield takeEvery(GET_CUST_ID_BY_EMAIL, getCustIdUsingGmailId)
}