/* eslint-disable no-unused-vars */
import Constants from '../../App/constants';
import { httpRequest } from './apiServices';
import { ConstantsValues } from './homeServices';
// const currencyCode='INR';
// const CustGUID='2c705476-167f-40d7-b219-41e58c10a13a';
// const CartGUID='f6011446-823b-405d-8624-32dbc921bf4d';
// const SessionId='CfDJ8PlXllZqijtJolwhmU1uZnfpSCN0EABydOtT3JZjYadBTuE//3Im9p03yl3XW74aaanzmroV9h++IkJHZz5tYGpgWvKJ2ytPwklDvo7dxz7711pvIyvQwJcIbgMUwKtqwhhZxQbu9MyMP9Jr/rddUKE0TtYLZsDybAlfRkjeFZOG'
// const pincode='411045';
// const sortby='MOD';
// const IsgetAll='1';
// const ClientId='1';
// const languageId='2';
// const addressid='1'
function updatecart(IP, qty, skuId, SKUFilterPriceId, CouponCodeapply) {
  const url =
    `${Constants.urls.baseUrl}${Constants.endPoints.updateCart}IsRFQ=false&IsAssembled=false&City=pune&Country=India&IpAddress=${IP}&SessionId=${ConstantsValues.SessionId}&clientId=${ConstantsValues.ClientId}&couponCode=${CouponCodeapply}&cartGUID=${(localStorage.getItem('CartGUID') === null || localStorage.getItem('CartGUID') === undefined) ? ConstantsValues.defaultCartGUID : window.atob(localStorage.getItem('CartGUID'))}&CustGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&qnt=${qty}&skuId=${skuId}&skufilterpriceid=${SKUFilterPriceId}&billingAddressId=&shippingMethodName=&shippingRate=&shippingAddressId=`
  // const url='https://productionapi.adibuja.com/api/v1/UpdateCart?custGUID=d94f3c17-0e78-440f-98e8-7b2bb817476e&skuId=83773&qnt=2&SessionId=CfDJ8PlXllZqijtJolwhmU1uZnfpSCN0EABydOtT3JZjYadBTuE%2F%2F3Im9p03yl3XW74aaanzmroV9h%2B%2BIkJHZz5tYGpgWvKJ2ytPwklDvo7dxz7711pvIyvQwJcIbgMUwKtqwhhZxQbu9MyMP9Jr%2FrddUKE0TtYLZsDybAlfRkjeFZOG&City=pune&Country=India&IpAddress=null&couponCode=null&clientId=1&cartGUID=2BA8ED78-2067-4CC5-B261-1F1847F1F984&IsRFQ=true&IsAssembled=false&skufilterpriceid=20'
  return httpRequest(url, 'post');
}
function RemoveCartItem(skuId, SkuFilterPriceId) {
  const url =
    `${Constants.urls.baseUrl}${Constants.endPoints.RemoveFromCart}IsRFQ=false&SkuFilterPriceId=${SkuFilterPriceId}&cartGUID=${(localStorage.getItem('CartGUID') === null || localStorage.getItem('CartGUID') === undefined) ? ConstantsValues.defaultCartGUID : window.atob(localStorage.getItem('CartGUID'))}&CustGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&skuId=${skuId}`
  return httpRequest(url, 'post');
}
function NotifyMeAPI(skuDetailId, skuPriceId) {
  const url =
    // `${Constants.urls.baseUrl}${Constants.endPoints.notify}skuDetailId=${'83774'}&CustGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&clientId=${ConstantsValues.ClientId}&skuPriceId=${'767'}`
    `${Constants.urls.baseUrl}${Constants.endPoints.notify}skuDetailId=${skuDetailId}&CustGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&clientId=${ConstantsValues.ClientId}&skuPriceId=${skuPriceId}`
  return httpRequest(url, 'post');
}
function getCartCommon() {
  const pinvalue = localStorage.getItem('pincodevalue') && localStorage.getItem('pincodevalue') !== '' ? localStorage.getItem('pincodevalue') : '411045';
  const url =
    `${Constants.urls.baseUrl}${Constants.endPoints.getCartCommon}isUserAuthenticated=${!((localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined))}&addressid=${ConstantsValues.addressid}&cartId=${(localStorage.getItem('CartGUID') === null || localStorage.getItem('CartGUID') === undefined) ? ConstantsValues.defaultCartGUID : window.atob(localStorage.getItem('CartGUID'))}&clientId=${ConstantsValues.ClientId}&currencyName=${ConstantsValues.currencyCode}&currencySymbol=${ConstantsValues.currencyCode}&CustGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&languageId=2&pincode=${pinvalue}`
  // `${ Constants.urls.baseUrl }${ Constants.endPoints.getCartCommon }CustGUID=${ (localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID')) }&cartId=${ (localStorage.getItem('CartGUID') === null || localStorage.getItem('CartGUID') === undefined) ? ConstantsValues.defaultCartGUID : window.atob(localStorage.getItem('CartGUID')) }&pincode=${ ConstantsValues.pincode }&addressid=${ ConstantsValues.addressid }&clientId=${ ConstantsValues.ClientId }&languageId=${ ConstantsValues.languageId }&currencyName=${ ConstantsValues.currencyCode }&currencySymbol=${ ConstantsValues.currencyCode }&isUserAuthenticated=true`
  return httpRequest(url, 'get');
}
function getShoppingCartList() {
  const url =
    `${Constants.urls.baseUrl}${Constants.endPoints.getShoppingCartList}CustGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}`
  return httpRequest(url, 'get');
}
function getCouponCodeList() {
  const url =
    `${Constants.urls.baseUrl}${Constants.endPoints.couponCodeList}clientId=1&CustGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}`
  return httpRequest(url, 'get');
}
function getShoppingcartDetails(skuId, SkuFilterPriceId) {
  // const url =
  //   `${ Constants.urls.baseUrl }${ Constants.endPoints.shoppingcartdetails }ShoppingCartGUID=${ (localStorage.getItem('CartGUID') === null || localStorage.getItem('CartGUID') === undefined) ? ConstantsValues.defaultCartGUID : window.atob(localStorage.getItem('CartGUID')) }&CustGUID=${ (localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID')) }&skufilterpriceid=${ SkuFilterPriceId }&SkuDetailId=${ skuId }`
  const url =
    `${Constants.urls.baseUrl}${Constants.endPoints.shoppingcartdetails}ShoppingCartGUID=${(localStorage.getItem('CartGUID') === null || localStorage.getItem('CartGUID') === undefined) ? ConstantsValues.defaultCartGUID : window.atob(localStorage.getItem('CartGUID'))}&CustGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&skufilterpriceid=${SkuFilterPriceId}&SkuDetailId=${skuId}`
  return httpRequest(url, 'get');
}
function getCancelCouponCode(CouponCode) {
  const url =
    `${Constants.urls.baseUrl}${Constants.endPoints.cancelCouponCode}CustGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&cartId=${(localStorage.getItem('CartGUID') === null || localStorage.getItem('CartGUID') === undefined) ? ConstantsValues.defaultCartGUID : window.atob(localStorage.getItem('CartGUID'))}&clientId=1&CouponCode=${CouponCode}`
  return httpRequest(url, 'get');
}
// clientId=1&custGUID=D6C47E15-45DE-4C79-83EA-4250737235F4
function applyCoupon(CouponCode) {
  const url =
    `${Constants.urls.baseUrl}${Constants.endPoints.applyCoupenCommon}isUserAuthenticated=${!((localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined))}&CouponCode=${CouponCode}&addressid=${ConstantsValues.addressid}&cartId=${(localStorage.getItem('CartGUID') === null || localStorage.getItem('CartGUID') === undefined) ? ConstantsValues.defaultCartGUID : window.atob(localStorage.getItem('CartGUID'))}&clientId=1&currencyName=${ConstantsValues.currencyCode}&currencySymbol=${ConstantsValues.currencySymbol}&CustGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&durationId=0&pincode=${ConstantsValues.pincode}`
  // `${Constants.urls.baseUrl}${Constants.endPoints.applyCoupenCommon}isUserAuthenticated=false&CouponCode=${CouponCode}&addressid=${ConstantsValues.addressid}&cartId=${(localStorage.getItem('CartGUID') === null || localStorage.getItem('CartGUID') === undefined) ? ConstantsValues.defaultCartGUID : window.atob(localStorage.getItem('CartGUID'))}&clientId=1&currencyName=${ConstantsValues.currencyCode}&currencySymbol=${ConstantsValues.currencySymbol}&CustGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&durationId=1&pincode=${ConstantsValues.pincode}`ea6abe12-9c64-4c68-99f6-e4691d4957ab
  return httpRequest(url, 'GET');
}
function removeInactiveFromCart() {
  const url =
    `${Constants.urls.baseUrl}${Constants.endPoints.GetRemoveInactiveFromCart}cartGUID=${(localStorage.getItem('CartGUID') === null || localStorage.getItem('CartGUID') === undefined) ? ConstantsValues.defaultCartGUID : window.atob(localStorage.getItem('CartGUID'))}&custGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}`
  return httpRequest(url, 'POST');
}
function getCartnew() {
  const pinvalue = localStorage.getItem('pincodevalue') && localStorage.getItem('pincodevalue') !== '' ? localStorage.getItem('pincodevalue') : '411045';
  const url =
    `${Constants.urls.baseUrl}${Constants.endPoints.GetCartnew}cartGuid=${(localStorage.getItem('CartGUID') === null || localStorage.getItem('CartGUID') === undefined) ? ConstantsValues.defaultCartGUID : window.atob(localStorage.getItem('CartGUID'))}&custGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&skufilterpriceid=0&clientId=1&fixedShippingDurationId=0&CurrencyCode=${ConstantsValues.currencyCode}&pincode=${pinvalue}`
  return httpRequest(url, 'GET');
}
const mycartAPI = {
  updatecart, getShoppingCartList, RemoveCartItem, getCartCommon, getCouponCodeList, applyCoupon, getShoppingcartDetails, getCancelCouponCode, NotifyMeAPI, removeInactiveFromCart, getCartnew
}
export default mycartAPI;