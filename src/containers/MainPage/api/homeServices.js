/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import Constants from '../../App/constants';
import { httpRequest } from './apiServices';
const currencyCode = 'INR';
const currencySymbol = 'INR';
const defaultCustGUID = '00000000-0000-0000-0000-000000000000';
const defaultCartGUID = '00000000-0000-0000-0000-000000000000';
const SessionId = 'CfDJ8PlXllZqijtJolwhmU1uZnfpSCN0EABydOtT3JZjYadBTuE//3Im9p03yl3XW74aaanzmroV9h++IkJHZz5tYGpgWvKJ2ytPwklDvo7dxz7711pvIyvQwJcIbgMUwKtqwhhZxQbu9MyMP9Jr/rddUKE0TtYLZsDybAlfRkjeFZOG'
const pincode = '411045';
const sortby = 'MOD';
const IsgetAll = '1';
const addressid = '0'
const ClientId = 1;
const languageId = 2;
const wishlistGUID = '00000000-0000-0000-0000-000000000000'
const OrderGuid = '00000000-0000-0000-0000-000000000000'
function categoreyServices(params = {}) {
  const url =
    `${Constants.urls.baseUrl}${Constants.endPoints.categories}languageId=${ConstantsValues.languageId}&levelDepth=0`;
  return httpRequest(url, 'GET');
}
function getClientid() {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.Client}`;
  return httpRequest(url, 'GET');
}
function getMegamainmenu() {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.MegaMainMenu}ClientId=${ClientId}&languageId=${languageId}&IsForReact=1`;
  return httpRequest(url, 'GET');
}
function getBillBoard() {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.Billboard}languageId=${languageId}`;
  return httpRequest(url, 'GET');
}
function getBillBoardid() {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.Billboardid}${ClientId}languageId=${languageId}`;
  return httpRequest(url, 'GET',);
}
// function getDealofday() {
//   const url=`${Constants.urls.baseUrl}${Constants.endPoints.DealoftheDay}ClientId=${ClientId}&languageId=${languageId}&currencyCode=${currencyCode}&CustGUID=${CustGUID}&CartGUID=${CartGUID}&pincode=${pincode}&sortby=${sortby}&IsgetAll=${IsgetAll}`;
//    let url="https://productionapi.adibuja.com/api/v2/getDealOfTheDayProduct/s?clientId=1&LanguageId=2&currencyCode=INR&CustGUID=90971FEB-9C29-426E-8404-0865A4CA035A&CartGUID=2BA8ED78-2067-4CC5-B261-1F1847F1F984&pincode=411045&sortby=MOD&IsgetAll=0"
//   return httpRequest(url, 'GET');
// }
function getDealofdayWithPage(pageNum, PageSize) {
  let pinvalue = localStorage.getItem('pincodevalue') !== '' && localStorage.getItem('pincodevalue') !== null ? localStorage.getItem('pincodevalue') : '411045';
  if (pinvalue === null) {
    pinvalue = '411045'
  }
  console.log(`heyiminhomepage${pinvalue}`);
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.DealoftheDayPage}ClientId=${ClientId}&languageId=${languageId}&currencyCode=${currencyCode}&CustGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&cartGuid=${(localStorage.getItem('CartGUID') === null || localStorage.getItem('CartGUID') === undefined) ? ConstantsValues.defaultCartGUID : window.atob(localStorage.getItem('CartGUID'))}&pincode=${pinvalue}&sortby=${sortby}&IsgetAll=${IsgetAll}&PageNumber=${pageNum}&PageSize=${PageSize}`;
  return httpRequest(url, 'GET');
}
function getwhishlistpaged(pageNum, PageSize) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.WishlistcartProductListforreact}ClientId=${ClientId}&languageId=${languageId}&currencyCode=${currencyCode}&CustGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&cartGuid=${(localStorage.getItem('CartGUID') === null || localStorage.getItem('CartGUID') === undefined) ? ConstantsValues.defaultCartGUID : window.atob(localStorage.getItem('CartGUID'))}&pincode=${pincode}&sortby=${sortby}&IsgetAll=${IsgetAll}&PageNumber=${pageNum}&PageSize=${PageSize}`;
  return httpRequest(url, 'POST');
}
function getTopsellingdb(pageNum, PageSize) {
  let pinvalue = localStorage.getItem('pincodevalue') !== '' && localStorage.getItem('pincodevalue') !== null ? localStorage.getItem('pincodevalue') : '411045';
  if (pinvalue === null) {
    pinvalue = '411045'
  }
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.topsellingai}ClientId=${ClientId}&languageId=${languageId}&currencyCode=${currencyCode}&CustGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&cartGuid=${(localStorage.getItem('CartGUID') === null || localStorage.getItem('CartGUID') === undefined) ? ConstantsValues.defaultCartGUID : window.atob(localStorage.getItem('CartGUID'))}&pincode=${pinvalue}&sortby=${sortby}&IsgetAll=${IsgetAll}&PageNumber=${pageNum}&PageSize=${PageSize}`;
  return httpRequest(url, 'POST');
}
function getTopsellingAI(pageNum, PageSize) {
  let pinvalue = localStorage.getItem('pincodevalue') !== '' && localStorage.getItem('pincodevalue') !== null ? localStorage.getItem('pincodevalue') : '411045';
  if (pinvalue === null) {
    pinvalue = '411045'
  }
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.topsellingdb}ClientId=${ClientId}&languageId=${languageId}&currencyCode=${currencyCode}&CustGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&cartGuid=${(localStorage.getItem('CartGUID') === null || localStorage.getItem('CartGUID') === undefined) ? ConstantsValues.defaultCartGUID : window.atob(localStorage.getItem('CartGUID'))}&pincode=${pinvalue}&sortby=${sortby}&IsgetAll=${IsgetAll}&PageNumber=${pageNum}&PageSize=${PageSize}`;
  return httpRequest(url, 'GET');
}
// function updateCart() {
// const url=`${ Constants.urls.baseUrl }${ Constants.endPoints.updateCart }ClientId=${ ClientId }&languageId=${ languageId }&currencyCode=${ currencyCode }&CustGUID=${ CustGUID }&CartGUID=${ CartGUID }&pincode=${ pincode }&sortby=${ sortby }&IsgetAll=${ IsgetAll }&PageNumber=${ param.PageNumber }&PageSize=${ param.PageSize }`;
// const url=`${ Constants.urls.baseUrl }${ Constants.endPoints.updateCart }`
//   const data={
//     productId: 84576,
//     Qty: 2,
//     isAdd: false,
//     custCountry: 'India',
//     custcity: 'Mumbai',
//     skufilterpriceid: 2720
//   }
//   return httpRequest('url', 'POST');
// }
function getBanners() {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.banners}ClientId=${ClientId}`;
  return httpRequest(url, 'GET');
}
function getSubCategoryProductList(page, caturl, parentCatURL, min, max, Seleced) {
  console.log('finaltesting1',caturl)
  console.log('finaltesting2',parentCatURL)
  // const url=`https://productionapi.adibuja.com/api/v2/skulisting?clientId=${ConstantsValues.ClientId}&catUrl=${caturl}&languageId=2&CurrencyCode=INR&CustGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&cartGuid=${ConstantsValues.defaultCartGUID}&fixedShippingDurationId=0&pageNo=${page}&limit=8&sortby=POP&pincode=${ConstantsValues.pincode}&defaultListing=false`;
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.skulisting}clientId=${ConstantsValues.ClientId}&catUrl=${caturl}&parentCatURL=${parentCatURL}&languageId=2&CurrencyCode=INR&CustGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&cartGuid=${(localStorage.getItem('CartGUID') === null || localStorage.getItem('CartGUID') === undefined) ? ConstantsValues.defaultCartGUID : window.atob(localStorage.getItem('CartGUID'))}&fixedShippingDurationId=0&pageNo=${page}&limit=20&sortby=${Seleced}&pincode=${ConstantsValues.pincode}&defaultListing=false&minPrice=${min}&maxPrice=${max}`;
  console.log('finaltesting3',url)
  return httpRequest(url, 'GET');
}
function getShopbycategory() {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.ShopByCategory}ClientId=${ClientId}`;
  return httpRequest(url, 'GET');
}
// function getRecommendedproducts() {
//   const url = `${Constants.urls.baseUrl}${Constants.endPoints.RecommendedProducts}ClientId=${ClientId}`;
//   return httpRequest(url, 'GET');
// }
function getBrandList(PageNumber, PageSize) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.BrandList}ClientId=${ClientId}&IsgetAll=${IsgetAll}&displayAllBrands=${1}&PageNumber=${PageNumber}&PageSize=${PageSize}&sortby${'POP'}`;
  // const url = `https://productionapi.adibuja.com/api/v1/getBrandListForReact?clientId=1&IsgetAll=1&displayAllBrands=1&PageNumber=1&PageSize=9&sortby=MOD`
  return httpRequest(url, 'GET');
}
function getBrands() {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.brands}languageId=${languageId}`;
  // let url ="https://productionapi.adibuja.com/api/v1/getBrandList?clientId=1&IsgetAll=0"
  return httpRequest(url, 'GET');
}
// let and='&'
function getFooter(Description) {
  const pagename = localStorage.getItem('CustGUID') === null ? 'react-guest' : 'react-auth'
  // let url ="https://productionapi.adibuja.com/api/v1/staticwebpage?pagename=footer&cid=1&languageId=2"
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.footer}pagename=${pagename}&cid=${ClientId}&languageId=${languageId}`;
  return httpRequest(url, 'GET');
}
function getFooterr(Description) {
  const pagename = localStorage.getItem('CustGUID') === null ? 'react-guest' : 'react-auth'
  // let url ="https://productionapi.adibuja.com/api/v1/staticwebpage?pagename=footer&cid=1&languageId=2"
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.footer}pagename=${Description}&cid=${ClientId}&languageId=${languageId}`;
  return httpRequest(url, 'GET');
}
function geTopsellingai() {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.topsellingai}languageId=${languageId}`;
  return httpRequest(url, 'GET');
}
const pageurl = 'usp-icons';
// o  cnst cid=2
function getFooterstaticwebsection() {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.footerMiddle}pageurl=${'react-footer-section'}&cid=${ClientId}&languageId=${languageId}`;
  return httpRequest(url, 'GET');
}
const qacontent = 'footer-qacontent';
function getFooterstaticparamqacontent() {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.footerMiddle}pageurl=${qacontent}&cid=${ClientId}&languageId=${languageId}`;
  return httpRequest(url, 'GET');
}
function getcustomerbyphone(username) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.getcustomerbyphone}clientid=${ClientId}&phone=${username}`;
  return httpRequest(url, 'POST');
}
function getcustomerbyguid(Guid) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.getcustomerbyguid}clientid=${ClientId}&custGuid=${Guid}`;
  return httpRequest(url, 'POST');
}
function generateotpforregistration(mobile, number) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.generateotpforregistration}number=${mobile}&email=${number}&clientid=${ClientId}`;
  return httpRequest(url, 'POST');
}
function generateotpforregistration1(mobile, number) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.generateotpforregistration}number=${number}&email=${mobile}&clientid=${ClientId}`;
  return httpRequest(url, 'POST');
}
function getsmstemplate(ID) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.getsmstemplate}Id=${ID}`;
  return httpRequest(url, 'GET');
}
function sendsms(username, demo, sender, text) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.sendsms}?numbers=${username}&message=${demo}${text}&sender=${sender}&clientid=${ClientId}`;
  return httpRequest(url, 'POST');
}
function GetCustIdByEmail(username) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.GetCustIdByEmail}clientid=${ClientId}&email=${username}`;
  return httpRequest(url, 'POST');
}
function getCustIdUsingGmailId(clientid, emailId, customerType) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.GetCustIdByEmail}clientid=${clientid}&email=${emailId}&customerType=${customerType}`
  return httpRequest(url, 'POST');
}
function uiotpmail(username, resotp) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.uiotpmail}clientid=${ClientId}&emailid=${username}&otp=${resotp}`;
  return httpRequest(url, 'POST');
}
function verifyregistrationotp(CustomerRegistrationOTPGUID, otp) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.verifyregistrationotp}CustomerRegistrationOTPGUID=${CustomerRegistrationOTPGUID}&otp=${otp}&clientid=${ClientId}`;
  return httpRequest(url, 'POST');
}
function getverifiedemailphoneforregistration(CustomerRegistrationOTPGUID) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.getverifiedemailphoneforregistration}?CustomerRegistrationOTPGUID=${CustomerRegistrationOTPGUID}&clientid=${ClientId}`;
  return httpRequest(url, 'POST');
}
function generatemobileotp(username) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.generatemobileotp}number=${username}&ClientId=${ClientId}&isGuest=${false}`;
  return httpRequest(url, 'POST');
}
function verifyotpnumber(username, otp) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.verifyotpnumber}Number=${username}&ClientId=${ClientId}&otp=${otp}`;
  return httpRequest(url, 'POST');
}
function generateotp(username) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.generateotp}Email=${username}&ClientId=${ClientId}&isGuest=${false}`;
  return httpRequest(url, 'POST');
}
function verifyotp(username, otp) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.verifyotp}Email=${username}&ClientId=${ClientId}&otp=${otp}`;
  return httpRequest(url, 'POST');
}
function generateotpforregistrationnew(username) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.generateotpforregistrationnew}userName=${username}`;
  return httpRequest(url, 'POST');
}
// function getwishlist(username) {
//   const url = `${Constants.urls.baseUrl}${Constants.endPoints.wishlist}customerGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&ClientId=${ClientId}&CurrencyCode=${currencyCode}&languageId=${languageId}&wishlistGUID=${wishlistGUID}&pincode=${pincode}`;
//   return httpRequest(url, 'GET');
// }
function getwishlist() {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.wishlist}cartGUID=${(localStorage.getItem('CartGUID') === null || localStorage.getItem('CartGUID') === undefined) ? ConstantsValues.defaultCartGUID : window.atob(localStorage.getItem('CartGUID'))}&customerGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&ClientId=${ClientId}&CurrencyCode=${currencyCode}&languageId=${languageId}&wishlistGUID=${wishlistGUID}&PageNumber=${1}&PageSize=${9}&pincode=${pincode}`;
  return httpRequest(url, 'GET');
}
function addwishlist(SkuId, SKUFilterPriceId) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.wishlistadd}customerGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&wishlistGUID=${wishlistGUID}&wishlistName=yourWish&skuId=${SkuId}&skufilterPriceId=${SKUFilterPriceId}&quantity=1`;
  return httpRequest(url, 'POST');
}
function removewishlist(SkuId, WishlistGUID, SKUFilterPriceId) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.wishlistremoveitem}customerGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&wishlistGUID=${WishlistGUID}&skuId=${SkuId}&skufilterPriceId=${SKUFilterPriceId}`;
  return httpRequest(url, 'POST');
}
function sendOtpLoginApi(userID) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.sendOtpLogin}userName=${userID}&customerType=${'1'}`
  return httpRequest(url, 'POST');
}
function sendOtpRegisterApi(userID) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.sendOtpLogin}userName=${userID}&customerType=${'1'}`
  return httpRequest(url, 'POST');
}
function sendOtpRegistrationApi(userID) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.generateotpforregistrationnew}userName=${userID}`
  return httpRequest(url, 'POST');
}
function sendUserRegistrationUsingGmailApi(userDetails) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.register}userName=${userDetails}`
  return httpRequest(url, 'POST', userDetails);
}
function forgotpasswordApi(id) {
  const UserName = id
  const CType = 1
  const ClId = 1
  const obj = { UserName, CType, ClId }
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.forgotpasswordForPhone}`
  console.log("url", url);
  return httpRequest(url, 'POST', obj);
}
function NewPasswordForReact(token, username, newpassword, confirmpassword, isFirstTimePasswordChange) {
  const Token = token
  // const ClientId='1'
  const Username = username
  const NewPassword = newpassword
  const ConfirmPassword = confirmpassword
  const IsPasswordChangedForFirstTimeFlag = isFirstTimePasswordChange
  // const obj = { Token, Email,CustomerType ,NewPassword,ConfirmPassword,IsPasswordChangedForFirstTimeFlag}
  const obj = { Token, Username, NewPassword, ConfirmPassword, IsPasswordChangedForFirstTimeFlag, ClientId }
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.NewPasswordForReact}`
  console.log("url", url);
  return httpRequest(url, 'POST', obj);
}
// function NewPasswordForReactApi(token, username) {
//   // const url = `${Constants.urls.baseUrl}${Constants.endPoints.NewPasswordForReact}token=41f03dee-d3b2-4008-9d8d-bc140631f47e&Username=ankitad@futurismtechnologies.com&CustomerType=1`
//   const url = `${Constants.urls.baseUrl}${Constants.endPoints.NewPasswordForReactApi}token=${token}&Username=${username}&CustomerType=1`
//   return httpRequest(url, 'POST',);
// }
function NewPasswordApi(token, username, n1passwordTxt, cnfpasswordTxt, IsPasswordChangedForFirstTime) {
  // const url = `${Constants.urls.baseUrl}${Constants.endPoints.NewPassword}Token=${token}&UserName=${username}&NewPassword=${n1passwordTxt}&ConfirmPassword=${cnfpasswordTxt}&ClientId=1&IsPasswordChangedForFirstTimeFlag=${IsPasswordChangedForFirstTime}&CustomerType=1`
  console.log('256--', token, username, n1passwordTxt, cnfpasswordTxt, IsPasswordChangedForFirstTime)
  const obj = {
    Token: token,
    UserName: username,
    NewPassword: n1passwordTxt,
    ConfirmPassword: cnfpasswordTxt,
    ClientId: 1,
    IsPasswordChangedForFirstTimeFlag: IsPasswordChangedForFirstTime,
    CustomerType: 1
  }
  console.log('266--', obj)
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.NewPassword}`
  return httpRequest(url, 'POST', obj);
}
function verifyOTP(UserName, OTP) {
  const obj = { UserName, OTP }
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.verifyLoginOTP}`
  return httpRequest(url, 'POST', obj);
}
function verifyRegistrationOTP(customerRegistrationOTPGUID, OTP) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.verifyregistrationotp}customerRegistrationOTPGUID=${customerRegistrationOTPGUID}&otp=${OTP}&clientid=${ConstantsValues.ClientId}`
  return httpRequest(url, 'POST');
}
function verifyuserRegistrationOTP(customerRegistrationOTPGUID, OTP) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.verifyregistrationotp}customerRegistrationOTPGUID=${customerRegistrationOTPGUID}&otp=${OTP}&clientid=${ConstantsValues.ClientId}`
  return httpRequest(url, 'POST');
}
function verifyPassword(UserName, Password) {
  const CustomerType = 1
  const obj = { UserName, Password, CustomerType }
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.verifyLoginPassWord}`
  // console.log("token..", token)
  return httpRequest(url, 'POST', obj);
}
function subscribeemail(email) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.newslettersubscription}clientId=${ConstantsValues.ClientId}&emailid=${email}`
  return httpRequest(url, 'POST',);
}
function getproductcompare(skucode) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.skusfromcodes}cartId=${(localStorage.getItem('CartGUID') === null || localStorage.getItem('CartGUID') === undefined) ? ConstantsValues.defaultCartGUID : window.atob(localStorage.getItem('CartGUID'))}&custGuid=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&SkuCodes=${skucode}&CurrencyCode=INR&clientId=1&languageId=2&pincode=411045
  `
  // const url = `${Constants.urls.baseUrl}${Constants.endPoints.skusfromcodes}cartId=${(localStorage.getItem('CartGUID') === null || localStorage.getItem('CartGUID') === undefined) ? ConstantsValues.defaultCartGUID : window.atob(localStorage.getItem('CartGUID'))}&custGuid=${localStorage.getItem('CustGUID') === null ? defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}&SkuCodes=hari-pyajspring-onion&CurrencyCode=${ConstantsValues.currencyCode}&clientId=${ConstantsValues.ClientId}&languageId=${ConstantsValues.languageId}&pincode=${ConstantsValues.pincode}`
  return httpRequest(url, 'GET',);
}
function getFAQ() {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.FAQ}`;
  return httpRequest(url, 'GET');
}
function getTopTrendingProductList(pageNum, PageSize) {
  const productcategory = "";
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.GetTopTrendingProductList}pincode=${ConstantsValues.pincode}&LanguageId=${ConstantsValues.languageId}&CartGUID=${ConstantsValues.defaultCartGUID}&CustGUID=${ConstantsValues.defaultCustGUID}&clientId=${ConstantsValues.ClientId}&currencyCode=${currencyCode}&IsgetAll=${IsgetAll}&PageNumber=${pageNum}&PageSize=${PageSize}&skudetailid=${0}`;
  return httpRequest(url, 'GET');
}
function featureProduct() {
  const productcategory = "";
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.FeatureProduct}clientId=${ConstantsValues.ClientId}&LanguageId=${ConstantsValues.languageId}&currencyCode=${ConstantsValues.currencyCode}&CartGUID=${ConstantsValues.defaultCartGUID}&CustGUID=${ConstantsValues.defaultCustGUID}&pincode=${ConstantsValues.pincode}&Category=${productcategory}`;
  return httpRequest(url, 'GET');
}
function newArrivalProduct() {
  const productcategory = "";
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.NewArrivalProduct}clientId=${ConstantsValues.ClientId}&LanguageId=${ConstantsValues.languageId}&currencyCode=${ConstantsValues.currencyCode}&CartGUID=${ConstantsValues.defaultCartGUID}&CustGUID=${ConstantsValues.defaultCustGUID}&pincode=${ConstantsValues.pincode}&Category=${productcategory}`;
  return httpRequest(url, 'GET');
}
function getChatBotAIResponse(userResponse) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.GetChatBotResponse}user_response=${userResponse}&CustGUID=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}`;
  return httpRequest(url, 'GET');
}
function getRelatedCategoryList(catURL) {
  const url = `${Constants.urls.baseUrl}${Constants.endPoints.GetRelatedCategoryList}&clientId=${ConstantsValues.ClientId}&LanguageId=${ConstantsValues.languageId}&CategoryName=${catURL}`;
  return httpRequest(url, 'GET');
}
const CustomsAPI = {
  getFooterr,
  verifyPassword,
  verifyOTP,
  verifyRegistrationOTP,
  verifyuserRegistrationOTP,
  forgotpasswordApi,
  sendOtpLoginApi,
  sendOtpRegisterApi,
  sendOtpRegistrationApi,
  sendUserRegistrationUsingGmailApi,
  getCustIdUsingGmailId,
  getDealofdayWithPage,
  getSubCategoryProductList,
  categoreyServices,
  getClientid,
  getMegamainmenu,
  getBillBoard,
  getBillBoardid,
  getBanners,
  getShopbycategory,
  getBrandList,
  getBrands,
  // getRecommendedproducts,
  getFooter,
  geTopsellingai,
  getTopsellingdb,
  // getDealofday,
  getFooterstaticwebsection,
  getFooterstaticparamqacontent,
  getcustomerbyphone,
  getcustomerbyguid,
  generateotpforregistration,
  getsmstemplate,
  sendsms,
  GetCustIdByEmail,
  uiotpmail,
  verifyregistrationotp,
  getverifiedemailphoneforregistration,
  generateotpforregistration1,
  generatemobileotp,
  verifyotp,
  verifyotpnumber,
  generateotp,
  generateotpforregistrationnew,
  getwishlist,
  addwishlist,
  removewishlist,
  getproductcompare,
  subscribeemail,
  getwhishlistpaged,
  getTopsellingAI,
  NewPasswordApi,
  NewPasswordForReact,
  getFAQ,
  getTopTrendingProductList,
  featureProduct,
  newArrivalProduct,
  getChatBotAIResponse,
  getRelatedCategoryList
};
export const ConstantsValues = {
  SessionId,
  defaultCustGUID,
  defaultCartGUID,
  pincode,
  sortby,
  IsgetAll,
  ClientId,
  languageId,
  currencyCode,
  addressid,
  currencySymbol,
  OrderGuid
}
export default CustomsAPI;
