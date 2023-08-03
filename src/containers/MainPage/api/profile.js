import Constants from '../../App/constants';
import { httpRequest } from './apiServices';
import { ConstantsValues } from './homeServices';
function updatationprofile(title, firstname, lastname, emailvalue, mobile, company, offerrecieve) {
  const isemailverify = emailvalue !== null
  const isphoneverify = mobile !== null
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.UpdateProfile}customerGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&title=${title}&email=${emailvalue}&isEmailVerified=${isemailverify}&fname=${firstname}&lname=${lastname}&company=${company}&mobile=${mobile}&phone=${mobile}&isPhoneVerified=${isphoneverify}&newsLetterSubscribed=${'false'}&taxid=${''}&receiveOffers=${offerrecieve}`;
  return httpRequest(url, 'POST',);
}
function updatationprofileWithoutEmail(title, firstname, lastname, mobile, company, offerrecieve) {
  const isemailverify = true
  const isphoneverify = mobile !== null
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.UpdateProfile}customerGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&title=${title}&isEmailVerified=${isemailverify}&fname=${firstname}&lname=${lastname}&company=${company}&mobile=${mobile}&phone=${mobile}&isPhoneVerified=${isphoneverify}&newsLetterSubscribed=${'false'}&taxid=${''}&receiveOffers=${offerrecieve}`;
  return httpRequest(url, 'POST',);
}
function updatationprofileWithoutMobile(title, firstname, lastname, emailvalue, company, offerrecieve) {
  const isemailverify = emailvalue !== null
  const isphoneverify = false
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.UpdateProfile}customerGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&title=${title}&email=${emailvalue}&isEmailVerified=${isemailverify}&fname=${firstname}&lname=${lastname}&company=${company}&isPhoneVerified=${isphoneverify}&newsLetterSubscribed=${'false'}&taxid=${''}&receiveOffers=${offerrecieve}`;
  return httpRequest(url, 'POST',);
}
function sendUpdateProfileEmail(emailValue, firstname) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.sendUpdateProfileEmail}clientId=1&emailid=${emailValue}&firstname=${firstname}`;
  return httpRequest(url, 'POST');
}
function getSmsTemplate(id) {
  console.log('getSmsTemplate-')
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.getSmsTemplate}Id=${id}`;
  return httpRequest(url, 'GET');
}
function sendSMS(mobNo, message,) {
  const sender = ''
  const clientId = 1
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.sendSMS}numbers=${mobNo}&message=${message}&sender=${sender}&clientId=${clientId}`;
  return httpRequest(url, 'POST');
}
function generateandsendphoneemailchangeotp(email, phone) {
  const usernameforgenerate = (email === null) ? phone : email
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.generateandsendphoneemailchangeotp}username=${usernameforgenerate}&customerGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&ClientId=${ConstantsValues.ClientId}`
  return httpRequest(url, 'POST',);
}
function verifyemailphoneotp(guid, otp) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.verifyphoneemailchangeotp}OTPGUID=${guid}&customerGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&ClientId=${ConstantsValues.ClientId}&OTP=${otp}`;
  return httpRequest(url, 'POST',);
}
const ProfileAPI = {
  updatationprofile,
  updatationprofileWithoutEmail,
  updatationprofileWithoutMobile,
  generateandsendphoneemailchangeotp,
  verifyemailphoneotp,
  sendUpdateProfileEmail,
  getSmsTemplate,
  sendSMS
}
export default ProfileAPI;