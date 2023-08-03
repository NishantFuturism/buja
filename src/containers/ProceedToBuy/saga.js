/* eslint-disable eqeqeq */
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { requestlocation } from '../../utils/request';
import Constants from '../App/constants';
import { CHECK_SERVICE_AVALABILITY, DETECT_MY_LOCATION, ONCHANGE_LOCATIONT, ONCHANGE_LOCATION_SUCCESS } from '../LocationPopup/constants';
import CheckoutAPI from '../MainPage/api/checkout';
import { ConstantsValues } from '../MainPage/api/homeServices';
import PaymentAPI from '../MainPage/api/payment';
import { CAPTURE_RAZORPAY, CAPTURE_RAZORPAY_SUCCESS, GET_WALLETBALANCE, GET_WALLETBALANCE_SUCCESS, INITIATE_TRANSACTION, INITIATE_TRANSACTION_SUCCESS, PLACE_ORDER_CREDIT_CARD, SELECT_DEFAULT_ADDRESS, SELECT_DEFAULT_ADDRESS_SUCCESS, TRANSACTON_ID_SUCCESS, UPDATE_DELIVERY_SLOTS } from './constants';
export default function* proceedToBuySaga() {
  yield takeLatest(ONCHANGE_LOCATIONT, getrepos)
  yield takeEvery(DETECT_MY_LOCATION, getcuurentlocation)
  yield takeEvery(INITIATE_TRANSACTION, paymentmode)
  yield takeEvery(CAPTURE_RAZORPAY, placeorder)
  yield takeEvery(PLACE_ORDER_CREDIT_CARD, creditcardpay)
  yield takeEvery(UPDATE_DELIVERY_SLOTS, updtatimeslot)
  yield takeEvery(SELECT_DEFAULT_ADDRESS, selectaddress)
  yield takeEvery(GET_WALLETBALANCE, customerwallet)
  yield takeEvery(CHECK_SERVICE_AVALABILITY, getavailability)
}
function* getcuurentlocation(action) {
  console.log({ action });
  const getyourplace = yield call(requestlocation, `${Constants.endPoints.geocode}key=${action.atosuggestdadta.GooglePlacesApiKey}&latlng=${action.lat},${action.lng}&sensor=${true}`, 'GET')
  console.log({ getyourplace });
  const address = getyourplace.results[0].address_components.filter(x => x.types[1] === 'sublocality')
  const pincode = getyourplace.results[0].address_components.filter(x => x.types[0] === 'postal_code')
  const city = getyourplace.results[0].address_components.filter(x => x.types[0] === 'locality')
  const state = getyourplace.results[0].address_components.filter(x => x.types[0] === 'administrative_area_level_1')
  const area = getyourplace.results[0].address_components.filter(x => x.types[1] === 'sublocality')
  console.log({ address, pincode, city });
  const checkserviceavailability = yield call(requestlocation, `${Constants.endPoints.checkserviceavailability}setsession=true&address=${address[0].long_name}&area=${area[0].long_name}&city=${city[0].long_name}&lat=${action.lat}&lng=${action.lng}&pincode=${pincode[0].long_name}&placeid=${getyourplace.results[0].place_id}&state=${state[0].long_name}`
    , 'GET')
  console.log({ checkserviceavailability });
  alert(`delivery location ${checkserviceavailability} `,)
}
function* getrepos(action) {
  console.log({ action });
  const { GooglePlacesApiKey } = action.atosuggestdadta
  const repos = yield call(requestlocation, `${Constants.endPoints.autocomplete}?key=${GooglePlacesApiKey}&input=${action.input}&components=country:in`, 'GET')
  const { predictions } = repos
  console.log({ predictions });
  yield put({ type: ONCHANGE_LOCATION_SUCCESS, predictions })
}
function* getavailability(action) {
  console.log({ action });
  const placedetails = yield call(requestlocation, `${Constants.endPoints.placedetails}key=${action.atosuggestdadta.GooglePlacesApiKey}&place_id=${action.ID}&components=country:in`, 'GET')
  console.log({ placedetails });
  console.log(placedetails.result.geometry.location.lat);
  const getyourplaceauto = yield call(requestlocation, `${Constants.endPoints.geocode}key=${action.atosuggestdadta.GooglePlacesApiKey}&latlng=${placedetails.result.geometry.location.lat},${placedetails.result.geometry.location.lng}&sensor=${true}`, 'GET')
  console.log({ getyourplaceauto });
  const address = getyourplaceauto.results[0].address_components.filter(x => x.types[1] === 'sublocality')
  const pincode = getyourplaceauto.results[0].address_components.filter(x => x.types[0] === 'postal_code')
  const city = getyourplaceauto.results[0].address_components.filter(x => x.types[0] === 'locality')
  const state = getyourplaceauto.results[0].address_components.filter(x => x.types[0] === 'administrative_area_level_1')
  const area = getyourplaceauto.results[0].address_components.filter(x => x.types[1] === 'sublocality')
  console.log({ address, pincode, city });
  const checkserviceavailability = yield call(requestlocation, `${Constants.endPoints.checkserviceavailability}setsession=true&address=${address[0].long_name}&area=${area[0].long_name}&city=${city[0].long_name}&lat=${placedetails.result.geometry.location.lat}&lng=${placedetails.result.geometry.location.lng}&pincode=${pincode[0].long_name}&placeid=${getyourplaceauto.results[0].place_id}&state=${state[0].long_name}`
    , 'GET')
  console.log({ checkserviceavailability });
  alert(`delivery location ${checkserviceavailability} `,)
  if (checkserviceavailability === 'NotAvailable') {
    alert('We are currently operational in Pune (selected locations). We are working on it and hang tight, we will serve you very soon!')
  }
}
function* paymentmode(action) {
  console.log('action initate', action);
  try {
    const transactionID = yield call(PaymentAPI.initiatetransaction, action.paymentmode)
    localStorage.setItem('transactionid', transactionID)
    console.log({ transactionID });
    yield put({ type: TRANSACTON_ID_SUCCESS, transactionID });
    const orderID = yield call(PaymentAPI.createOrderid, {
      currency: ConstantsValues.currencyCode,
      amount: action.amount * 100,
      // test details
      key: 'rzp_test_VCsnPXPPhGYPJC',
      secret: 'P23u4yFZujPDoFaOr64e70fC',
      // live details
      // key: 'rzp_live_a2drmSnqSRpolp',
      // secret: 'MRYJDKpRs4fiT1oSxzi0M9NC',
      orderId: "",
      paymentId: "",
      signature: "",
      date: action.currentdate,
      TransactionGuid: transactionID,
      errors: "",
      message: "",
      status: "",
      description: "",
      PaymentMethod: action.paymentmode
    })
    yield localStorage.setItem('orderID', orderID)
    console.log({ orderID });
    yield put({ type: INITIATE_TRANSACTION_SUCCESS, orderID });
    // yield put({ type: CREATE_ORDER_ID_SUCCESS, databody });
  } catch (err) {
    yield put();
  }
}
function* placeorder(action) {
  console.log('action placeorderhhhhh', action);
  try {
    const capturerazorpay = yield call(PaymentAPI.captutreRazorpay, action.databody)
    console.log({ capturerazorpay });
    if (capturerazorpay == 'success') {
      console.log('gg');
      const credit = yield call(PaymentAPI.placeordercreditcard, localStorage.getItem('transactionid'),
        action.paymentType, action.CustomerAddressId)
      console.log({ credit });
      yield put({ type: CAPTURE_RAZORPAY_SUCCESS, credit });
      const verifysignatiure = yield call(PaymentAPI.razorpayVerifysignature, action.databody)
      console.log({ verifysignatiure });
      const slot = {
        "OrderNumber": credit.OrderId,
        "DeliverySlotDate": action.DeliverySlotDate,
        "DeliverySlotTimeId": action.DeliverySlotID,
        "InstructionForDeliverySlot": action.InstructionForDeliverySlot
      }
      const updateslot = yield call(PaymentAPI.updateDeliveryslotTime, slot)
      console.log({ updateslot });
      // history.push('/product/checkout/order/paymentsuccess', { pamentsuccess: credit, totalamount: action.amount })
    }
  } catch (err) {
    // yield put();
  }
}
function* updtatimeslot(action) {
  console.log('action time slot', action);
  try {
    const timeslot = yield call(PaymentAPI.updateDeliveryslotTime, action.OrderId, action.DeliverySlotDate, action.DeliverySlotID, action.InstructionForDeliverySlot)
    console.log({ timeslot });
  } catch (err) {
    yield put();
  }
}
function* creditcardpay(action) {
  console.log('action time creditcardpay', action);
  try {
    const credit = yield call(PaymentAPI.placeordercreditcard, action.transactionid, action.orderid)
    console.log({ credit });
  } catch (err) {
    yield put();
  }
}
function* selectaddress(action) {
  console.log('action defultaddress', action);
  try {
    const defultaddress = yield call(CheckoutAPI.getdefaultaddress, action.customeraddressId)
    console.log({ defultaddress });
    yield put({ type: SELECT_DEFAULT_ADDRESS_SUCCESS, defultaddress });
  } catch (err) {
    // yield put();
  }
}
function* customerwallet(action) {
  console.log('action defultaddress', action);
  try {
    const customerwalletbalance = yield call(PaymentAPI.getcustomerwalletbalance,)
    console.log({ customerwalletbalance });
    yield put({ type: GET_WALLETBALANCE_SUCCESS, customerwalletbalance });
  } catch (err) {
    // yield put();
  }
}