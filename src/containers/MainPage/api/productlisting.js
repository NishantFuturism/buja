/* eslint-disable indent */
import Constants from '../../App/constants';
import { httpRequest } from './apiServices';
import { ConstantsValues } from './homeServices';
const pageNo = 1
const limit = 8
const levelDepth = 0
// const sortby='POP'
const IsFeatured = 0
function getProductList(page, caturl) {
  const url =
    // &languageId=${ConstantsValues.languageId}&CurrencyCode=${ConstantsValues.currencyCode}&CustGUID=${CustGUID === null ? defaultCustGUID : window.atob(CustGUID)}&cartGuid=${defaultCartGUID}&fixedShippingDurationId=${fixedShippingDurationId}&pageNo=${page}&limit=${limit}&sortby=${sortby}&defaultListing=${defaultListing}`
    `${Constants.urls.baseUrl}${Constants.endPoints.skulisting}clientId=1&catUrl=${caturl}&languageId=2&CurrencyCode=INR&CustGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&cartGuid=${(localStorage.getItem('CartGUID') === null || localStorage.getItem('CartGUID') === undefined) ? ConstantsValues.defaultCartGUID : window.atob(localStorage.getItem('CartGUID'))}&fixedShippingDurationId=0&pageNo=${page}&limit=8&sortby=POP&pincode=411045&defaultListing=false`
  return httpRequest(url, 'GET');
}
function getcategories() {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.categories}languageId=${ConstantsValues.languageId}&levelDepth=${levelDepth}`;
  return httpRequest(url, 'GET');
}
function getadvancegetskufilter(caturl, min, max) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.advancegetskufilter}clientid=${ConstantsValues.ClientId}&caturl=${caturl}&languageId=${ConstantsValues.languageId}&pincode=${ConstantsValues.pincode}&filterValueIds=yes&isFeatured=${IsFeatured}&minPrice=${min}&maxPrice=${max}&pageNo=${pageNo}&limit=${limit}`;
  return httpRequest(url, 'POST');
}
function searchadvancegetskufilter(caturl, min, max,skuids) {
  const v=skuids
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.searchadvancegetskufilter}SkudetailIds=${v}&clientid=${ConstantsValues.ClientId}&caturl=${caturl}&languageId=${ConstantsValues.languageId}&pincode=${ConstantsValues.pincode}&filterValueIds=yes&isFeatured=${IsFeatured}&minPrice=${min}&maxPrice=${max}&pageNo=${pageNo}&limit=${limit}`;
  return httpRequest(url, 'POST');
}
function getskuFilterlisting(valueString, valuepackString, fieldString, valuediscountstring, caturl, min, max,sortby) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.skuFilterlisting}defaultListing=false&CurrencyCode=${ConstantsValues.currencyCode}&IsFeatured=${IsFeatured}&brandFilterIds=${valueString}&cartGuid=${(localStorage.getItem('CartGUID') === null || localStorage.getItem('CartGUID') === undefined) ? ConstantsValues.defaultCartGUID : window.atob(localStorage.getItem('CartGUID'))}&catUrl=${caturl}&clientId=${ConstantsValues.ClientId}&custGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&filterval=${valuepackString}&fixedShippingDurationId=7&formfieldId=${fieldString}&languageid=${ConstantsValues.languageId}&limit=1000&maxPrice=${max}&minPrice=${min}&pincode=${ConstantsValues.pincode}&staticFilterIds=${valuediscountstring}&sortby=${sortby}`
  return httpRequest(url, 'GET');
}
function Getskudispplayinsubcategories( caturl) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.Getskudispplayinsubcategories}catUrl=${caturl}&clientid=${ConstantsValues.ClientId}&languageId=${ConstantsValues.languageId}`
  return httpRequest(url, 'GET');
}
const ProductlistingAPI = {
  getProductList,
  getcategories,
  getadvancegetskufilter,
  getskuFilterlisting,
  searchadvancegetskufilter,
  Getskudispplayinsubcategories
}
export default ProductlistingAPI;
