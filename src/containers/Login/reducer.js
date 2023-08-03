/* eslint-disable no-unused-expressions */
/*
 *
 * Login reducer
 *
 */
import produce from 'immer';
import { CHANGE_USERNAME, CHANGE_USERNAME_SUCCESS, CLOSE_MSG_BAR, DEFAULT_ACTION, DIRECT_MSG, ENABLE_LOGIN_VIEW, LOGIN_WITH_OTP, LOGIN_WITH_OTP_FAILURE, LOGIN_WITH_OTP_SUCCESS, RESPONCE_MSG, SAVE_LOGIN_DATA, SEND_OTP_FAILURE, SEND_OTP_REQUEST, SEND_OTP_SUCCESS, SEND_OTP_SUCCESS_PSWD, USER_SUCCESS_REGISTRATION_USING_GMAIL, GET_CUST_ID_BY_EMAIL_SUCCESS, NEW_PASSWORD_ACTION_REACT } from './constants';
export const initialState = {
  username: '',
  error: '',
  isError: false,
  isSuccess: false,
  enableview: '',
  passwordview: false,
  customerlogindata: '',
  isUserAuthenticated: false,
  sendOtpResponse: '',
  addToCartMsg: '',
  IsMsgBar: false,
  datalogin: [],
  sendOTPDataPswd: {},
  userRegistrationUsingGmailLoginResponse: '',
  getCustIdByGmailLogin: {},
  getNewPasswordResponse: ''
};
/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case CHANGE_USERNAME:
        draft.username = action.username
        break;
      case SEND_OTP_REQUEST:
        draft.enableview = action.enableview
        break;
      case SEND_OTP_SUCCESS:
        draft.enableview = action.enableview
        break;
      case SEND_OTP_FAILURE:
        draft.error = action.error
        break;
      case ENABLE_LOGIN_VIEW:
        draft.passwordview = action.passwordview
        break;
      case LOGIN_WITH_OTP:
        break;
      case LOGIN_WITH_OTP_SUCCESS:
        // draft.IsMsgBar = true
        draft.customerlogindata = action.verifyOTPResp
        console.log("checkloginval..", window.btoa(action.verifyOTPResp.Email))
        if (action.verifyOTPResp) {
          action.verifyOTPResp.Phone ?
            localStorage.setItem('LoingID', window.btoa(action.verifyOTPResp.Phone)) :
            localStorage.setItem('LoingID', window.btoa(action.verifyOTPResp.Email))
        }
        break;
      case LOGIN_WITH_OTP_FAILURE:
        draft.error = action.error
        break;
      case CHANGE_USERNAME_SUCCESS:
        draft.sendOtpResponse = action.sendOtpResponse
        break;
      case RESPONCE_MSG:
        draft.IsMsgBar = true
        draft.addToCartMsg = action.sendOtpResponse.Message
        break
      case DIRECT_MSG:
        draft.IsMsgBar = true
        draft.addToCartMsg = action.msg
        draft.sendOtpResponse = ''
        break
      case CLOSE_MSG_BAR:
        draft.IsMsgBar = false
        break
      case SAVE_LOGIN_DATA:
        draft.datalogin = action.data
        break
      case SEND_OTP_SUCCESS_PSWD:
        draft.IsMsgBar = true
        draft.sendOTPDataPswd = action.sendOTPDataPswd
        break;
      case USER_SUCCESS_REGISTRATION_USING_GMAIL:
        draft.userRegistrationUsingGmailLoginResponse = action.userDetailsData
        break
      case GET_CUST_ID_BY_EMAIL_SUCCESS:
        draft.getCustIdByGmailLogin = action.getCustIdUsingGmailIdResponse
        break
      case NEW_PASSWORD_ACTION_REACT:
        draft.getNewPasswordResponse = action.NewPasswordResponseForReact
    }
  });
export default loginReducer;
