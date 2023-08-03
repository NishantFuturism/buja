import Constants from '../../App/constants';
import { httpRequest } from './apiServices';
import { ConstantsValues } from './homeServices';
// testing details
const RAZOR_PAY_KEY = "rzp_test_VCsnPXPPhGYPJC"
const RAZOR_PAY_SECRET = "P23u4yFZujPDoFaOr64e70fC"
// live details 
// const RAZOR_PAY_KEY = "rzp_live_a2drmSnqSRpolp"
// const RAZOR_PAY_SECRET = "MRYJDKpRs4fiT1oSxzi0M9NC"
function initiatetransaction(paymentmode) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.initiatetransaction}CustGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&cartGuid=${(localStorage.getItem('CartGUID') === null || localStorage.getItem('CartGUID') === undefined) ? ConstantsValues.defaultCartGUID : window.atob(localStorage.getItem('CartGUID'))}&OrderGuid=${ConstantsValues.OrderGuid}&PayModeTypes=${paymentmode}`;
  return httpRequest(url, 'POST');
}
function createOrderid(databody) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.RazorPaycreateorder}`;
  return httpRequest(url, 'POST', databody);
}
function captutreRazorpay(databody) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.captureRazorPayorder}`;
  return httpRequest(url, 'POST', databody);
}
function razorpayVerifysignature(databody) {
  console.log(databody);
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.RazorPayverifysigniture}`;
  return httpRequest(url, 'POST', databody);
}
function placeordercreditcard(Transactionid, paymentType, CustomerAddressId) {
  const orderPlacedForm = 'Reactweb'
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.creditcard}cartId=${(localStorage.getItem('CartGUID') === null || localStorage.getItem('CartGUID') === undefined) ? ConstantsValues.defaultCartGUID : window.atob(localStorage.getItem('CartGUID'))}&transaction=${Transactionid}&customer=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&authLoginId=${PaymentKey.RAZOR_PAY_KEY}&transactionKey=${PaymentKey.RAZOR_PAY_SECRET}&clientId=${ConstantsValues.ClientId}&cardNumber=&expiration=&cardCode=&orderComment=&orderPlacedForm=${orderPlacedForm}&CurrencyCode=INR&billingAddress=${CustomerAddressId}&shippingAddress=${CustomerAddressId}&isDevelopment=false&fixedShippingDurationId=1&paymentmode=${paymentType}&carttype=&storeCard=false&SavedCardId=&RefOrderId=`
  return httpRequest(url, 'POST',);
}
function getcustomerwalletbalance() {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.customerdetail}clientid=${ConstantsValues.ClientId}&guid=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}`;
  return httpRequest(url, 'GET',);
}
function updateDeliveryslotTime(OrderId, DeliverySlotDate, DeliverySlotID, InstructionForDeliverySlot) {
  // const url = `${Constants.urls.baseUrl}${Constants.endPoints.UpdateDeliveryDateAndSlotTime}`;
  const EmailId = localStorage.getItem('Email') !== '' && localStorage.getItem('Email') !== undefined ? localStorage.getItem('Email') : null;
  const UserMobile = localStorage.getItem('UserLastPhone') !== '' && localStorage.getItem('UserLastPhone') !== undefined ? localStorage.getItem('UserLastPhone') : null;
  const firstName = localStorage.getItem('UserFirstName') !== '' && localStorage.getItem('UserFirstName') !== undefined ? localStorage.getItem('UserFirstName') : null;
  const lastName = localStorage.getItem('UserLastName') !== '' && localStorage.getItem('UserLastName') !== undefined ? localStorage.getItem('UserLastName') : null;
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.Updatedeliveryinfosendordersmsemail}currencyCode=${ConstantsValues.currencyCode}&custGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&deliverySlotDate=${DeliverySlotDate}&deliverySlotId=${DeliverySlotID}&Instructionfordelivery=${InstructionForDeliverySlot}&clientId=${ConstantsValues.ClientId}&email=${EmailId}&phone=${UserMobile}&fullName=${firstName}${lastName}&orderOrRfqNumber=${OrderId}`
  // const url = `${Constants.urls.baseUrl}${Constants.endPoints.Updatedeliveryinfosendordersmsemail}CurrencyCode=${ConstantsValues.currencyCode}&CustGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&DeliverySlotDate=${DeliverySlotDate}&DeliverySlotId=${DeliverySlotID}&Instructionfordelivery=${InstructionForDeliverySlot}&clientId=${ConstantsValues.ClientId}&emailid=${EmailId}&phone=${UserMobile}&fullName=${firstName}${lastName}&orderorrfqNumber=${OrderId}`
  console.log("url1delivery====", url);
  return httpRequest(url, 'POST',);
}
function paymentinfo(paymentid) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.payment}${paymentid}`;
  return httpRequest(url, 'GET',);
}
function paymentdetailsbyorder(ordernumber) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.paymentdetailbyorder}OrderNumber=${ordernumber}&CustomerGuid=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&CurrencyCode=${ConstantsValues.currencyCode}`;
  return httpRequest(url, 'POST',);
}
const PaymentAPI = {
  initiatetransaction,
  createOrderid,
  captutreRazorpay,
  razorpayVerifysignature,
  placeordercreditcard,
  getcustomerwalletbalance,
  updateDeliveryslotTime,
  paymentinfo,
  paymentdetailsbyorder
}
export const PaymentKey = {
  RAZOR_PAY_KEY,
  RAZOR_PAY_SECRET
}
export default PaymentAPI;
