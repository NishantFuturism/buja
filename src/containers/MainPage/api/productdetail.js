import Constants from '../../App/constants';
import { httpRequest } from './apiServices';
import { ConstantsValues } from './homeServices';
function getSkuv(skuurl) {
  console.log('skuurl', skuurl);
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.SkuV}clientId=${ConstantsValues.ClientId}&custGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&cartGuid=${(localStorage.getItem('CartGUID') === null || localStorage.getItem('CartGUID') === undefined) ? ConstantsValues.defaultCartGUID : window.atob(localStorage.getItem('CartGUID'))}&fixedShippingDurationId=0&skuUrl=${skuurl}&languageid=${ConstantsValues.languageId}&CurrencyCode=${ConstantsValues.currencyCode}&pincode=${ConstantsValues.pincode}`;
  return httpRequest(url, 'GET');
}
function getRelatedproduct(pageNum, PageSize, SkuDetailId) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.skurelated}clientId=${ConstantsValues.ClientId}&CustGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&cartGuid=${(localStorage.getItem('CartGUID') === null || localStorage.getItem('CartGUID') === undefined) ? ConstantsValues.defaultCartGUID : window.atob(localStorage.getItem('CartGUID'))}&Skuid=${SkuDetailId}&languageId=${ConstantsValues.languageId}&CurrencyCode=${ConstantsValues.currencyCode}&PageNumber=${pageNum}&PageSize=${PageSize}`;
  return httpRequest(url, 'GET');
}
function getCustomerreview(skuUrl) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.Review}custGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&skuurl=${skuUrl}`;
  return httpRequest(url, 'GET');
}
function getrecentlyviewd(skuId,) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.recentlyview}clientId=${'1'}&custGuid=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&cartId=${(localStorage.getItem('CartGUID') === null || localStorage.getItem('CartGUID') === undefined) ? ConstantsValues.defaultCartGUID : window.atob(localStorage.getItem('CartGUID'))}&fixedShippingDurationId=0&skuIds=${skuId}&languageId=${ConstantsValues.languageId}&CurrencyCode=${ConstantsValues.currencyCode}&pincode=${ConstantsValues.pincode}&PageNumber=${1}&PageSize=${9}`;
  return httpRequest(url, 'GET');
}
function getrecomended() {
  // const url = `https://devuiapi.adibuja.com/api/v2/AIGetRecommendedProductListAllForReact?clientId=1&LanguageId=2&currencyCode=INR&CustomerId=50548&PageNumber=1&PageSize=9&pincode=411045&IsgetAll=1`
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.recommendedProductsai}ClientId=${ConstantsValues.ClientId}&languageId=${ConstantsValues.languageId}&currencyCode=${ConstantsValues.currencyCode}&CustomerId=${(localStorage.getItem('CustomerId') === null || localStorage.getItem('CustomerId') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustomerId'))}&pincode=${ConstantsValues.pincode}&sortby=${ConstantsValues.sortby}&IsgetAll=${ConstantsValues.IsgetAll}&PageNumber=1&PageSize=9 `;
  return httpRequest(url, 'POST');
}
function otherselletPDP(skuiddeatil, formfielid) {
  // const url = `${Constants.urls.baseUrl}${Constants.endPoints.getSellerPDPList}custGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&skuDetailId=${skuDetailId}&cartGuid=${(localStorage.getItem('CartGUID') === null || localStorage.getItem('CartGUID') === undefined) ? ConstantsValues.defaultCartGUID : window.atob(localStorage.getItem('CartGUID'))}&pincode=${ConstantsValues.pincode}&CurrencyCode=${ConstantsValues.currencyCode}`;
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.getSellerPDPList}CurrencyCode=${ConstantsValues.currencyCode}&formFIeldValueID=${formfielid}&skuDetailId=${skuiddeatil}&clientId=${ConstantsValues.ClientId}&cartId=${(localStorage.getItem('CartGUID') === null || localStorage.getItem('CartGUID') === undefined) ? ConstantsValues.defaultCartGUID : window.atob(localStorage.getItem('CartGUID'))}&custGuid=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&pincode=${ConstantsValues.pincode}`
  return httpRequest(url, 'GET');
}
// const url=`${ Constants.urls.baseUrl }${ Constants.endPoints.DealoftheDayPage };
const ProductDetailAPI = {
  getSkuv,
  getCustomerreview,
  getRelatedproduct,
  getrecentlyviewd,
  getrecomended,
  otherselletPDP
}
export default ProductDetailAPI;
// https://productionapi.adibuja.com/api/v2/getSellerPDPList?CurrencyCode=INR&formFIeldValueID=5&skuDetailId=83839&clientId=1&cartId=6aaa1ba3-4f43-4f1f-850b-fe4cad0a8686&custGuid=ea6abe12-9c64-4c68-99f6-e4691d4957ab&pincode=411045
// https://productionapi.adibuja.com/api/v3/getDealOfTheDayProductsWithPagination?ClientId=1&languageId=2&currencyCode=INR&CustGUID=ea6abe12-9c64-4c68-99f6-e4691d4957ab&cartGuid=394d4e4e-e9c0-43d9-9efb-cc3ece41dbc3&pincode=411045&sortby=MOD&IsgetAll=1&PageNumber=1&PageSize=9