/*
 *
 * Login actions
 *
 */
import { CHANGE_USERNAME, CLOSE_MSG_BAR, DEFAULT_ACTION, DIRECT_MSG, ENABLE_LOGIN_VIEW, FORGOT_PASSWORD, LOGIN_WITH_OTP, LOGIN_WITH_OTP_FAILURE, LOGIN_WITH_OTP_SUCCESS, LOGIN_WITH_PASSWORD, RESPONCE_MSG, SAVE_LOGIN_DATA, SEND_OTP_FAILURE, SEND_OTP_REQUEST, SEND_OTP_SUCCESS, NEW_PASSWORD, NEW_PASSWORD_FOR_REACT, SEND_OTP_REQUEST_PSWD, USER_REGISTRATION_USING_GMAIL, GET_CUST_ID_BY_EMAIL } from './constants';
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function changeUsername(username) {
  return {
    type: CHANGE_USERNAME,
    username,
  };
}
export function sendOtp(enableview) {
  return {
    type: SEND_OTP_REQUEST,
    enableview
  };
}
export function sendOtpsuccess(enableview) {
  return {
    type: SEND_OTP_SUCCESS,
    enableview,
  };
}
export function sendOtpfailure(error) {
  return {
    type: SEND_OTP_FAILURE,
    error
  };
}
export function enablepasswordview(passwordview) {
  return {
    type: ENABLE_LOGIN_VIEW,
    passwordview
  };
}
export function loginwithotp(uname, OTP) {
  return {
    type: LOGIN_WITH_OTP,
    uname,
    OTP
  };
}
export function loginWithPasswordAction(uname, password) {
  return {
    type: LOGIN_WITH_PASSWORD,
    uname,
    password
  };
}
export function loginwithotpsuccess(customerlogindata) {
  return {
    type: LOGIN_WITH_OTP_SUCCESS,
    customerlogindata
  };
}
export function loginwithotpfailure(error) {
  return {
    type: LOGIN_WITH_OTP_FAILURE,
    error
  };
}
export function OpenMsgBar(sendOtpResponse) {
  return {
    type: RESPONCE_MSG, sendOtpResponse
  };
}
export function DirectMessage(msg) {
  return {
    type: DIRECT_MSG, msg
  };
}
export function closeMsgBar() {
  return {
    type: CLOSE_MSG_BAR
  };
}
export function forgotPasswordAction(id) {
  console.log('jk', id);
  return {
    type: FORGOT_PASSWORD,
    id
  };
}
export function logindata(data) {
  return {
    type: SAVE_LOGIN_DATA,
    data
  };
}
export function NewPasswordForReact(token, email, newpassword, confirmpassword, isFirstTimePasswordChange) {
  console.log('newPasswordAction', token, email, newpassword, confirmpassword, isFirstTimePasswordChange);
  return {
    type: NEW_PASSWORD,
    token, email, newpassword, confirmpassword, isFirstTimePasswordChange
  };
}
export function newPasswordapi(token, username, newPassword, cnfPassword, IsPasswordChangedForFirstTime) {
  console.log('data', token, username, newPassword, cnfPassword, IsPasswordChangedForFirstTime);
  return {
    type: NEW_PASSWORD_FOR_REACT,
    token, username, newPassword, cnfPassword, IsPasswordChangedForFirstTime
  };
}
export function sendOtpPswd(id) {
  console.log('sendOtppswd', id);
  return {
    type: SEND_OTP_REQUEST_PSWD,
    id
  };
}
export function userRegisterationUsingGmail(userDetails) {
  return {
    type: USER_REGISTRATION_USING_GMAIL,
    userDetails
  };
}
// export function passwordresponse(data) {
//   return {
//     type: PASSWORD_RESPONSE,
//     data
//   };
// }
export function getCustIdByEmail(clientid, emailId, customerType) {
  console.log('Register original action', clientid, emailId, customerType)
  return {
    type: GET_CUST_ID_BY_EMAIL,
    clientid,
    emailId,
    customerType
  };
}