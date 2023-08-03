/*
 *
 * Register actions
 *
 */
import { DEFAULT_ACTION, SEND_OTP_FAILURE, SEND_OTP_REQUEST, SEND_OTP_SUCCESS, VERIFY_OTP } from './constants';
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function sendOtp(username) {
  return {
    type: SEND_OTP_REQUEST,
    username
  };
}
export function sendOtpsuccess() {
  return {
    type: SEND_OTP_SUCCESS,
  };
}
export function sendOtpfailure() {
  return {
    type: SEND_OTP_FAILURE,
  };
}
export function verifyOtpAction(CustomerGUID, otpvalue) {
  return {
    type: VERIFY_OTP,
    CustomerGUID,
    otpvalue
  };
}