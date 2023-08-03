import Constants from '../../App/constants';
import { httpRequest } from './apiServices';
function GoogleApi() {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.GoogleApi}`;
  return httpRequest(url, 'GET',);
}
const LocationApi = {
  GoogleApi
}
export default LocationApi