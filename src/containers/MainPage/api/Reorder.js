import Constants from '../../App/constants';
import { httpRequest } from './apiServices';
import { ConstantsValues } from './homeServices';
function productReorder(pageNum, PageSize) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.ReorderProductList}CustGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&PageNumber=${pageNum}&PageSize=${PageSize}&LanguageId=${ConstantsValues.languageId}&clientId=${ConstantsValues.ClientId}&currencyCode=${ConstantsValues.currencyCode}`;
  return httpRequest(url, 'GET',);
}
function Reorder() {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.ReorderProductList}CustGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&PageNumber=1&PageSize=9&LanguageId=${ConstantsValues.languageId}&clientId=${ConstantsValues.ClientId}&currencyCode=${ConstantsValues.currencyCode}`;
  /*
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.Reorder}CustGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&LanguageId=${ConstantsValues.languageId}&clientId=${ConstantsValues.ClientId}&CartGUID=${(localStorage.getItem('CartGUID') === null || localStorage.getItem('CartGUID') === undefined) ? ConstantsValues.defaultCartGUID : window.atob(localStorage.getItem('CartGUID'))}&currencyCode=${ConstantsValues.currencyCode}`; */
  return httpRequest(url, 'GET',);
}
const ReorderAPI = {
  productReorder,
  Reorder
}
export default ReorderAPI;
