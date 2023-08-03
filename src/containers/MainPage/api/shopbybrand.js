import Constants from '../../App/constants';
import { httpRequest } from './apiServices';
import { ConstantsValues } from './homeServices';
function brandlistproduct(pageurl,sortby) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.getbrandlistproducts}clientId=${ConstantsValues.ClientId}&pincode=${ConstantsValues.pincode}&LanguageId=${ConstantsValues.languageId}&currencyCode=${ConstantsValues.currencyCode}&CustGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&CartGUID=${(localStorage.getItem('CartGUID') === null || localStorage.getItem('CartGUID') === undefined) ? ConstantsValues.defaultCartGUID : window.atob(localStorage.getItem('CartGUID'))}&ManufacturerPageURL=${pageurl}&limit=${1000}&sortby=${sortby}&IsgetAll=${1}`;
  return httpRequest(url, 'GET',);
}
const BrandAPI = {
  brandlistproduct
}
export default BrandAPI