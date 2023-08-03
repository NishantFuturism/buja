/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-expressions */
/*
 *
 * RegisterOrignal reducer
 *
 */
import produce from 'immer';
import { API_MSG, INTERNAL_MSG, SEND_OTP_SUCCESS, VERIFY_OTP_SUCCESS, REGISTER_USER_NAME, SAVE_REGISTER_USER_OTP, SAVE_REGISTER_DATA, CHANGE_USERNAME_SUCCESS, DIRECT_MSG, USER_REGISTER_WITH_MOBILE_OR_EMAIL_SUCCESS, USER_SUCCESS_REGISTRATION_USING_GMAIL, GET_CUST_ID_BY_EMAIL_SUCCESS } from './constants';
export const initialState = {
  OTPVerify: '',
  sendOTPData: {},
  msg: '',
  IsMsgBar: false,
  otpverfyuser: '',
  otp: '',
  sendOtpResponse: '',
  datalogin: [],
  userRegisterMobileOrEmailResponse: {},
  userRegistrationUsingGmailLoginResponse: '',
  getCustIdByGmailLogin: {}
};
/* eslint-disable default-case, no-param-reassign */
const registerOrignalReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      // case UPDATE_STATE:
      //   const key = Object.keys(action.property)[0]
      //   draft[key] = action.property[key]
      //   break;
      case VERIFY_OTP_SUCCESS:
        // draft.IsMsgBar = true
        console.log("otpvalueeee..", action.OTPVerify1)
        draft.OTPVerify = action.OTPVerify1
        if (action.OTPverify1 === 1) {
          // console.log("checkloginval..", action.OTPverify1.Email)
          action.OTPverify1.Phone ?
            localStorage.setItem('RegisterID', window.btoa(action.OTPverify1.Phone)) :
            localStorage.setItem('RegisterID', window.btoa(action.OTPverify1.Email))
        }
        // draft.msg = action.msg
        // draft.registartionform = true
        break;
      case REGISTER_USER_NAME:
        draft.IsMsgBar = true
        console.log('Cvalue', action.OTPverify);
        draft.otpverfyuser = action.OTPverify
        draft.msg = action.msg
        // draft.registartionform = true
        break;
      case SEND_OTP_SUCCESS:
        draft.IsMsgBar = true
        // draft.OTPVerify = action.OTPVerify
        draft.sendOTPData = action.sendOTPData
        // draft.msg = action.msg
        break;
      case INTERNAL_MSG:
        draft.IsMsgBar = true
        // console.log("action.msg", action.msg);
        draft.msg = action.msg
        draft.OTPVerify = undefined
        break;
      case API_MSG:
        draft.IsMsgBar = true
        draft.msg = action.msg
        draft.OTPVerify = undefined
        break;
      case SAVE_REGISTER_USER_OTP:
        console.log("value", action.otp)
        draft.otp = action.otp
        break
      case SAVE_REGISTER_DATA:
        draft.datalogin = action.data
        break
      case DIRECT_MSG:
        draft.IsMsgBar = true
        break
      case CHANGE_USERNAME_SUCCESS:
        draft.sendOtpResponse = action.sendOtpResponse
        break
      case USER_REGISTER_WITH_MOBILE_OR_EMAIL_SUCCESS:
        draft.userRegisterMobileOrEmailResponse = action.userRegistrationWithMobileOrEmailResponse
        break
      case USER_SUCCESS_REGISTRATION_USING_GMAIL:
        draft.userRegistrationUsingGmailLoginResponse = action.userDetailsData
        break
      case GET_CUST_ID_BY_EMAIL_SUCCESS:
        draft.getCustIdByGmailLogin = action.getCustIdUsingGmailIdResponse
    }
  });
export default registerOrignalReducer;
