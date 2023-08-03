/*
 *
 * ProceedToBuy actions
 *
 */
import { CHECK_SERVICE_AVALABILITY, DETECT_MY_LOCATION, ONCHANGE_LOCATION } from '../LocationPopup/constants';
import { CAPTURE_RAZORPAY, CUSTOMER_ADDRESS, DEFAULT_ACTION, DEFAULT_ADDRESS, GET_WALLETBALANCE, GET_WALLETBALANCE_SUCCESS, INITIATE_TRANSACTION, PAYMENTMETHOD, PLACE_ORDER_CREDIT_CARD, SELECT_DEFAULT_ADDRESS, SLOT_DATE, UPDATE_ADDRESS, UPDATE_DELIVERY_SLOTS, UPDATE_DELIVERY_SLOTS_SUCCESS, VALUES_ADDRESS_PAGE, VERIFY } from './constants';
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function updateaAddress(data) {
  return {
    type: UPDATE_ADDRESS,
    data
  };
}
export function customeraddress(addressdata) {
  return {
    type: CUSTOMER_ADDRESS,
    addressdata,
  };
}
export function defaultaddress(defaultaddressdata) {
  return {
    type: DEFAULT_ADDRESS,
    defaultaddressdata,
  };
}
export function getinitTtansaction(currentdate, amount, paymentmode) {
  return {
    type: INITIATE_TRANSACTION,
    currentdate,
    amount,
    paymentmode
  }
}
export function captureRazorpay(databody, Transactionid, paymentType, CustomerAddressId, DeliverySlotDate, DeliverySlotID, InstructionForDeliverySlot, amount) {
  return {
    type: CAPTURE_RAZORPAY,
    databody,
    Transactionid,
    paymentType,
    CustomerAddressId, DeliverySlotDate, DeliverySlotID, InstructionForDeliverySlot,
    amount
  }
}
export function placeordercreditcard(Transactionid) {
  return {
    type: PLACE_ORDER_CREDIT_CARD,
    Transactionid
  }
}
export function updateDeliveryslottime(OrderId, DeliverySlotDate, DeliverySlotID, InstructionForDeliverySlot) {
  return {
    type: UPDATE_DELIVERY_SLOTS,
    OrderId, DeliverySlotDate, DeliverySlotID, InstructionForDeliverySlot,
  }
}
export function updateDeliveryslottimesuccess() {
  return {
    type: UPDATE_DELIVERY_SLOTS_SUCCESS,
  }
}
export function selectdefaultaddress(customeraddressId) {
  return {
    type: SELECT_DEFAULT_ADDRESS,
    customeraddressId
  }
}
export function getcustomerwalletbalance() {
  return {
    type: GET_WALLETBALANCE,
  }
}
export function getcustomerwalletbalancesuccess() {
  return {
    type: GET_WALLETBALANCE_SUCCESS,
  }
}
export function onChangelocattion(input, atosuggestdadta,) {
  return {
    type: ONCHANGE_LOCATION,
    input,
    atosuggestdadta,
  };
}
export function detectCurrentlocation(lat, lng, atosuggestdadta) {
  return {
    type: DETECT_MY_LOCATION,
    lat,
    lng,
    atosuggestdadta
  };
}
export function checkserviceavailability(selectelistvalue, ID, atosuggestdadta) {
  return {
    type: CHECK_SERVICE_AVALABILITY,
    selectelistvalue,
    ID,
    atosuggestdadta
  }
}
export function getaddresspagevalue(customerid, slotid, DeliverySlotDate, total, InstructionForDeliverySlot) {
  return {
    type: VALUES_ADDRESS_PAGE,
    customerid,
    slotid,
    DeliverySlotDate,
    total,
    InstructionForDeliverySlot
  }
}
export function slotdtae(fromtime, totime) {
  return {
    type: SLOT_DATE,
    fromtime,
    totime,
  }
}
export function getverify() {
  return {
    type: VERIFY,
  }
}
export function getpaymentmethod(paymentmethod) {
  return {
    type: PAYMENTMETHOD,
    paymentmethod
  }
}
