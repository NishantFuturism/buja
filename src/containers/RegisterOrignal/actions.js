/*
 *
 * RegisterOrignal actions
 *
 */
import { API_MSG, INTERNAL_MSG, NOTIFYREGESTERD_CUSTOMER, SEND_OTP_REQUEST, UPDATE_STATE, VERIFY_OTP, SAVE_REGISTER_DATA, REGISTER_USER, SAVE_REGISTER_USER_OTP, REGISTER_USER_NAME, CHANGE_USERNAME, DIRECT_MSG, USER_REGISTER_WITH_MOBILE_OR_EMAIL, USER_REGISTRATION_USING_GMAIL, GET_CUST_ID_BY_EMAIL } from './constants';
export function setInternalMsg(msg) {
  return {
    type: INTERNAL_MSG,
    msg
  };
}
export function setAPIMsg(msg) {
  return {
    type: API_MSG,
    msg
  };
}
export function sendOtp(id) {
  console.log('sendOtp', id);
  return {
    type: SEND_OTP_REQUEST,
    id
  };
}
export function getCustIdByEmail(clientid, emailId, customerType) {
  console.log('Register original action', clientid, emailId, customerType)
  return {
    type: GET_CUST_ID_BY_EMAIL,
    clientid,
    emailId,
    customerType
  };
}
export function userRegisterationUsingGmail(userDetails) {
  return {
    type: USER_REGISTRATION_USING_GMAIL,
    userDetails
  };
}
// export function registerRequest(OTP) {
//   return {
//     type: REGISTER_REQUEST,
//     OTP
//   };
// }
export function verifyOtpAction(CustomerGUID, otpvalue) {
  console.log('CustomerGUID, otpvalue', CustomerGUID, otpvalue);
  return {
    type: VERIFY_OTP,
    CustomerGUID,
    otpvalue
  };
}
export function newUserRegistrationWithMobileOrEmail(userMobileNo, userEmail, password) {
  console.log('Register Original actions', userMobileNo, userEmail, password)
  return {
    type: USER_REGISTER_WITH_MOBILE_OR_EMAIL,
    userMobileNo,
    userEmail,
    password
  }
}
export function changeState(property) {
  return {
    type: UPDATE_STATE,
    property,
  };
}
export function customernotify(emailsmsbodynotify) {
  return {
    type: NOTIFYREGESTERD_CUSTOMER,
    emailsmsbodynotify
  };
}
export function registerdata(data) {
  return {
    type: SAVE_REGISTER_DATA,
    data
  };
}
export function registeruserdata(otp) {
  console.log("value..", otp)
  return {
    type: SAVE_REGISTER_USER_OTP,
    otp
  };
}
export function registerUserNow(CustomerGUID, otpvalue) {
  console.log('GUID, otpvalue', CustomerGUID, otpvalue);
  return {
    type: REGISTER_USER,
    CustomerGUID,
    otpvalue
  };
}
export function registerwithotpsuccess(otpverfyuser) {
  return {
    type: REGISTER_USER_NAME,
    otpverfyuser
  };
}
export function changeUsername(username) {
  return {
    type: CHANGE_USERNAME,
    username,
  };
}
export function DirectMessage(msg) {
  return {
    type: DIRECT_MSG, msg
  };
}
