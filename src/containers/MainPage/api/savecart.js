import Constants from '../../App/constants';
import { httpRequest } from './apiServices';
import { ConstantsValues } from './homeServices';
function savecartlisting() {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.savcartlisting}custGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&CurrencyCode=${ConstantsValues.currencyCode}&pincode=411045`;
  return httpRequest(url, 'GET',);
}
function savecartItemlisting(listname) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.viewsavecart}CustGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&listname=${listname}&CurrencyCode=${ConstantsValues.currencyCode}&pincode=411045`;
  return httpRequest(url, 'GET',);
}
function removesavecartlist(listname) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.removesavecartlist}CustGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&ListName=${listname}`;
  return httpRequest(url, 'POST',);
}
function removesavecartlistitem(listname, SkuId) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.removesavecartlistitem}CustGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&ListName=${listname}&skuId=${SkuId}&skufilterpriceid=`;
  return httpRequest(url, 'POST',);
}
function addsavecart(name) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.savecustomercart}CustGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&ListName=${name}`;
  return httpRequest(url, 'POST',);
}
function savecartcheckout(cartname,flag) {
  const token = localStorage.getItem('generatedtoken');
  const flagforupdate=flag
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.SavedCartCheckout}CustGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&ipAddress=192.168.17.50&sessionId=${token}&country=India&city=pune&CartName=${cartname}&CurrencyCode=${ConstantsValues.currencyCode}&flags=${flagforupdate}&clientId=${ConstantsValues.ClientId}&cartGUID=${(localStorage.getItem('CartGUID') === null || localStorage.getItem('CartGUID') === undefined) ? ConstantsValues.defaultCartGUID : window.atob(localStorage.getItem('CartGUID'))}&IsRFQ=false&pincode=${ConstantsValues.pincode} `;
  return httpRequest(url, 'POST',);
}
function savedcartProductList() {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.SavedcartProductList}CustGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&CurrencyCode=${ConstantsValues.currencyCode}&clientId=${ConstantsValues.ClientId}&cartGUID=${(localStorage.getItem('CartGUID') === null || localStorage.getItem('CartGUID') === undefined) ? ConstantsValues.defaultCartGUID : window.atob(localStorage.getItem('CartGUID'))}&pincode=${ConstantsValues.pincode}&LanguageId=${ConstantsValues.languageId}  `;
  return httpRequest(url, 'POST',);
}
const SaveCartAPI = {
  savecartlisting,
  savecartItemlisting,
  removesavecartlist,
  removesavecartlistitem,
  addsavecart,
  savecartcheckout,
  savedcartProductList
}
export default SaveCartAPI;
// IsRFQ = false & flags=true & CartName=fed % 20feed & CurrencyCode=INR & CustGUID=ea6abe12 - 9c64 - 4c68 - 99f6 - e4691d4957ab & cartGUID=36ab7759 - e175 - 4145 - b7d4 - 9db5815855e2 & city=pune & clientId=1 & country=India & ipAddress=192.168.7.40 & pincode=411045 & sessionId=0B1569B4 - B319 - 46A0 - B442 - B5442914744C