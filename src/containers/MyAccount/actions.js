/*
 *
 * MyAccount actions
 *
 */
import { DASHBOARD_REORDER, DEFAULT_ACTION, GET_ALL_CUSTOMER_ORDER, GET_ALL_CUSTOMER_ORDER_SUCCESS, GET_MYORDER, GET_MYORDER_SUCCESSS, IS_FIRST_TIME, LOAD_CHECKOUT_ALERT, SAVE_CART_CHECKOUT, UPDATE_PASSWORD, WALLET_TRANSACTION, SEND_OTP, UPDATE_PROFILE, VERIFY_OTP, SET_PASSWORD, DELETEDSKUID, DELETED_FLAG, SAVE_CART_TOTAL, DELETEDADDRESSID, SEND_UPDATE_PROFILE_EMAIL } from './constants';
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function getmyorder() {
  return {
    type: GET_MYORDER,
  };
}
export function getmyordersuccess() {
  return {
    type: GET_MYORDER_SUCCESSS,
  };
}
export function getallcustomerorder() {
  return {
    type: GET_ALL_CUSTOMER_ORDER,
  };
}
export function getallcustomerordersuccess() {
  return {
    type: GET_ALL_CUSTOMER_ORDER_SUCCESS,
  };
}
export function savecartcheckout(name, flag) {
  return {
    type: SAVE_CART_CHECKOUT,
    name, flag
  };
}
export function loadsavecheckoutpopup(popup, cartname) {
  return {
    type: LOAD_CHECKOUT_ALERT,
    popup, cartname
  };
}
export function listreorder() {
  return {
    type: DASHBOARD_REORDER,
  };
}
export function gettransactwallet() {
  return {
    type: WALLET_TRANSACTION,
  };
}
export function isFirstTimeUpdateAction(id) {
  console.log("eval1..", id)
  return {
    type: IS_FIRST_TIME,
    id
  };
}
export function updatePasswordAction(username, opwd, npwd) {
  console.log("actionupdate..", username, opwd, npwd)
  return {
    type: UPDATE_PASSWORD,
    username, opwd, npwd
  };
}
export function otpsend(userid) {
  return {
    type: SEND_OTP,
    userid
  };
}
export function setpassword(username, n1passwordTxt, cnfpasswordTxt) {
  console.log("Eval..", username)
  return {
    type: SET_PASSWORD,
    username, n1passwordTxt, cnfpasswordTxt
  };
}
export function updateprofile(title, firstname, lastname, emailvalue, mobile, company, receiveOffers) {
  return {
    type: UPDATE_PROFILE,
    title, firstname, lastname, emailvalue, mobile, company, receiveOffers
  };
}
export function sendUpdateProfileEmail(email, firstName) {
  console.log('sendUpdateProfileEmail actions', email, firstName)
  return {
    type: SEND_UPDATE_PROFILE_EMAIL,
    email, firstName
  }
}
export function verifyotp(guid, otp, number) {
  return {
    type: VERIFY_OTP,
    guid, otp, number
  };
}
export function getDeleteaddressid(CustomerAddressId) {
  return {
    type: DELETEDADDRESSID,
    CustomerAddressId
  };
}
export function getDeleteSkuid(SkuId) {
  return {
    type: DELETEDSKUID,
    SkuId
  };
}
export function DeleteSkuidflag(flag) {
  console.log("action flag", flag);
  return {
    type: DELETED_FLAG,
    flag
  };
}
export function savecarttotal(totalamount) {
  console.log("action flag", totalamount);
  return {
    type: SAVE_CART_TOTAL,
    totalamount
  };
}
// export function passwordresponse(data) {
//   console.log("checkdata..", data)
//   return {
//     type: PASSWORD_RESPONSE,
//     data
//   };
// }