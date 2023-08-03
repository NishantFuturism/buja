import Constants from '../../App/constants';
import { httpRequest } from './apiServices';
function savecontatinformation(action) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.savecontatinformation}`;
  return httpRequest(url, 'POST', action);
}
const ContactdetailAPI = {
  savecontatinformation
}
export default ContactdetailAPI;