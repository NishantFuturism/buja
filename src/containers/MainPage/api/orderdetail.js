import Constants from '../../App/constants';
import { httpRequest } from './apiServices';
import { ConstantsValues } from './homeServices';
function getmyorder(ordernumber) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.myorder}custGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&clientId=${ConstantsValues.ClientId}&CurrencyCode=${ConstantsValues.currencyCode}&ordernum=${ordernumber}`;
  return httpRequest(url, 'GET',);
}
function getorderlisting() {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.orderlisting}custGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&clientId=${ConstantsValues.ClientId}&CurrencyCode=${ConstantsValues.currencyCode}&ordernum=`;
  return httpRequest(url, 'GET',);
}
function Savefeedbackdeliveryreview(action) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.Savefeedbackdeliveryreview}`;
  return httpRequest(url, 'POST', action);
}
function getorderdetailsfeedbackitems(databody) {
  console.log("chkd..", databody)
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.GetFeedbackDetailsOrderAndItem}`;
  return httpRequest(url, 'POST', databody);
}
function CheckReviewIsGivenOrNot(givendata) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.CheckReviewIsGivenOrNot}`;
  return httpRequest(url, 'POST', givendata);
}
function GetAllReviewFromCustomerForProduct(skuid) {
  console.log("skuidorderchke..", skuid)
  const databody = {
    OrderNumber: "",
    FeedbackreviewId: 1,
    FeedbackTypeId: 1,
    OrderItemId: skuid,
    Rating: null,
    Pros: "",
    Cons: "",
    Comment: "",
    IsApprovedByAdmin: null,
    FeedbackDate: ""
  }
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.GetAllReviewFromCustomerForProduct}`;
  return httpRequest(url, 'POST', databody);
}
function SaveFeedbackFromPDP(orderdatapdp) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.SaveFeedbackFromPDP}`;
  return httpRequest(url, 'POST', orderdatapdp);
}
function ordercanceled(databody) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.cancelorder}`;
  return httpRequest(url, 'POST', databody);
}
function orderReturn(databody) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.refundorder}`;
  return httpRequest(url, 'POST', databody);
}
function Saveorderreviewfeedback(productdata) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.Savefeedbackorderreview}`;
  return httpRequest(url, 'POST', productdata);
}
function cancelreasonlist() {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.OrderCancelStatusList}`;
  return httpRequest(url, 'GET',);
}
function recentorders() {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.recentorders}custGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&CurrencyCode=${ConstantsValues.currencyCode}&clientId=${ConstantsValues.ClientId}&count=5`;
  return httpRequest(url, 'GET',);
}
const OrderdetailAPI = {
  getmyorder,
  getorderlisting,
  Savefeedbackdeliveryreview,
  getorderdetailsfeedbackitems,
  CheckReviewIsGivenOrNot,
  GetAllReviewFromCustomerForProduct,
  SaveFeedbackFromPDP,
  ordercanceled,
  Saveorderreviewfeedback,
  cancelreasonlist,
  recentorders,
  orderReturn
}
export default OrderdetailAPI;