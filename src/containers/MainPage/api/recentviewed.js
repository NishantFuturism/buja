import Constants from '../../App/constants';
import { httpRequest } from './apiServices';
import { ConstantsValues } from './homeServices';
function getviewedproduct(skuid) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.recentlyview}cartId=${(localStorage.getItem('CartGUID') === null || localStorage.getItem('CartGUID') === undefined) ? ConstantsValues.defaultCartGUID : window.atob(localStorage.getItem('CartGUID'))}&custGuid=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&skuIds=${skuid}&languageId=${ConstantsValues.languageId}&clientId=${ConstantsValues.ClientId}&CurrencyCode=${ConstantsValues.currencyCode}&fixedShippingDurationId=${0}&pincode=${ConstantsValues.pincode}`;
  return httpRequest(url, 'GET');
}
const LocationApi = {
  getviewedproduct
}
export default LocationApi