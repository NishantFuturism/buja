import Constants from '../../App/constants';
import { httpRequest } from './apiServices';
import { ConstantsValues } from './homeServices';
function wallettransact() {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.wallettransactions}CustGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&limit=${'1000'}&pageNo=${'1'}&q=`;
  return httpRequest(url, 'POST',);
}
const WalletAPI = {
  wallettransact,
}
export default WalletAPI;
