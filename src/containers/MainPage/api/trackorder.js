import Constants from '../../App/constants';
import { httpRequest } from './apiServices';
function trackorederstatus(databody) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.GetTrackOrderStatus}`;
  return httpRequest(url, 'POST', databody);
}
function trackorederstatusDetailsItem(orstatusid) {
  const body = {
    "OrderNumber": window.atob(localStorage.getItem('OrderNumber')),
    "OrderStatusID": orstatusid,
    "ClientID": 1
  }
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.GetAllTrackOrderItemStatusDetail}`;
  return httpRequest(url, 'POST', body);
}
function GetAllTrackOrderStatusDetail(databody) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.GetAllTrackOrderStatusDetail}`;
  return httpRequest(url, 'POST', databody);
}
const TrackOrderAPI = {
  trackorederstatus,
  trackorederstatusDetailsItem,
  GetAllTrackOrderStatusDetail
}
export default TrackOrderAPI;