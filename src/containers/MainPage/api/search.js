import Constants from '../../App/constants';
import { httpRequest } from './apiServices';
import { ConstantsValues } from './homeServices';
function getAIautosuggestlist(todoserach) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.AIAutosuggestion}clientId=${ConstantsValues.ClientId}&pincode=${ConstantsValues.pincode}&q=${todoserach}`;
  return httpRequest(url, 'POST',);
}
function getDBautosuggestlist(todoserach) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.DBAutosuggestion}clientId=${ConstantsValues.ClientId}&LanguageId=${ConstantsValues.languageId}&pincode=${localStorage.getItem('pincodevalue') && localStorage.getItem('pincodevalue') !== "" ? localStorage.getItem('pincodevalue') : ConstantsValues.pincode}&q=${todoserach}`;
  return httpRequest(url, 'GET',);
}
function getsearchlist(NAME, Id, Fordfildid, staticfilterid, min, max, sortby) {
  // const url = `${Constants.urls.baseUrl}${Constants.endPoints.skusearchlist}clientId=${ConstantsValues.ClientId}&CatUrl=${NAME}&LanguageId=${ConstantsValues.languageId}&currencyCode=${'2'}&CustGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&CartGUID=${(localStorage.getItem('CartGUID') === null || localStorage.getItem('CartGUID') === undefined) ? ConstantsValues.defaultCartGUID : window.atob(localStorage.getItem('CartGUID'))}&minPrice=&maxPrice=&filterval=&applicationids=&industriesids=&pageNo=&limit=${'40'}&sortby=&IsFeatured=&pincode=&requestfrom=&formfieldId=&IsAIAPIDown=&requestfrom=`;
  let url
  if (Id === "" && Fordfildid === "") {
    url = `${Constants.urls.baseUrl}${Constants.endPoints.skusearchlist}CurrencyCode=${ConstantsValues.currencyCode}&IsFeatured=0&clientId=${ConstantsValues.ClientId}&custGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&fixedShippingDurationId=0&languageId=${ConstantsValues.languageId}&limit=1000&sortby=${sortby}&pageNo=1&cartGuid=${(localStorage.getItem('CartGUID') === null || localStorage.getItem('CartGUID') === undefined) ? ConstantsValues.defaultCartGUID : window.atob(localStorage.getItem('CartGUID'))}&catUrl=${NAME}&formfieldId=${Fordfildid}&filterval=${Id}&staticfilterid=${staticfilterid}&maxPrice=${max}&minPrice=${min}&pincode=${ConstantsValues.pincode}`
  }
  else if ((Id !== "" && Fordfildid !== "") && staticfilterid !== "") {
    url = `${Constants.urls.baseUrl}${Constants.endPoints.skusearchlist}CurrencyCode=${ConstantsValues.currencyCode}&IsFeatured=0&clientId=${ConstantsValues.ClientId}&custGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&fixedShippingDurationId=0&languageId=${ConstantsValues.languageId}&limit=1000&sortby=${sortby}&pageNo=1&cartGuid=${(localStorage.getItem('CartGUID') === null || localStorage.getItem('CartGUID') === undefined) ? ConstantsValues.defaultCartGUID : window.atob(localStorage.getItem('CartGUID'))}&catUrl=${NAME}&formfieldId=${Fordfildid}&filterval=${Id}&staticfilterid=${staticfilterid}&maxPrice=${max}&minPrice=${min}&pincode=${ConstantsValues.pincode}`
  }
  else {
    url = `${Constants.urls.baseUrl}${Constants.endPoints.skusearchlist}CurrencyCode=${ConstantsValues.currencyCode}&IsFeatured=0&clientId=${ConstantsValues.ClientId}&custGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&fixedShippingDurationId=0&languageId=${ConstantsValues.languageId}&limit=1000&sortby=${sortby}&pageNo=1&cartGuid=${(localStorage.getItem('CartGUID') === null || localStorage.getItem('CartGUID') === undefined) ? ConstantsValues.defaultCartGUID : window.atob(localStorage.getItem('CartGUID'))}&catUrl=${NAME}&formfieldId=${Fordfildid}&filterval=${Id}&maxPrice=${max}&minPrice=${min}&pincode=${ConstantsValues.pincode}`
  }
  // const url = `${Constants.urls.baseUrl}${Constants.endPoints.skusearchlist}CurrencyCode=${ConstantsValues.currencyCode}&cartGuid=${(localStorage.getItem('CartGUID') === null || localStorage.getItem('CartGUID') === undefined) ? ConstantsValues.defaultCartGUID : window.atob(localStorage.getItem('CartGUID'))}&catUrl=${NAME}&clientId=1&custGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&fixedShippingDurationId=0&languageId=2&limit=40`;
  return httpRequest(url, 'GET',);
}
const SearchAPI = {
  getAIautosuggestlist,
  getDBautosuggestlist,
  getsearchlist
}
export default SearchAPI;
