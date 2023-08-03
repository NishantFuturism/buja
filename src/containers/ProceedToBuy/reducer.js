/*
 *
 * ProceedToBuy reducer
 *
 */
import produce from 'immer';
import { ONCHANGE_LOCATION_SUCCESS } from '../LocationPopup/constants';
import { CAPTURE_RAZORPAY, CAPTURE_RAZORPAY_SUCCESS, CREATE_ORDER_ID, CREATE_ORDER_ID_SUCCESS, DEFAULT_ACTION, GET_WALLETBALANCE, GET_WALLETBALANCE_SUCCESS, INITIATE_TRANSACTION, INITIATE_TRANSACTION_SUCCESS, PAYMENTMETHOD, PLACE_ORDER_CREDIT_CARD, PLACE_ORDER_CREDIT_CARD_SUCCESS, SELECT_DEFAULT_ADDRESS, SELECT_DEFAULT_ADDRESS_SUCCESS, SLOT_DATE, TRANSACTON_ID_SUCCESS, UPDATE_DELIVERY_SLOTS, UPDATE_DELIVERY_SLOTS_SUCCESS, VALUES_ADDRESS_PAGE } from './constants';
export const initialState = {
  Transaction_id: '',
  Order_id: '',
  options: '',
  CustomerAddressId: '',
  WalletBalance: '',
  ordernumber: '',
  paymentsuccess: [],
  predictlist: [],
  DeliverySlotDate: '',
  InstructionForDeliverySlot: '',
  slotid: '',
  total: '',
  fromtime: '',
  totime: '',
  FromTime: '',
  capturerazorpay: '',
  paymentmethod: '',
  Defaultaddress: ''
};
/* eslint-disable default-case, no-param-reassign */
const proceedToBuyReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        // console.log('action transaction', action);
        break;
      case INITIATE_TRANSACTION:
        break;
      case INITIATE_TRANSACTION_SUCCESS:
        console.log('action transaction', action);
        // draft.Transaction_id = action.transactionID
        draft.Order_id = action.orderID
        break;
      case TRANSACTON_ID_SUCCESS:
        console.log('action transaction', action);
        draft.Transaction_id = action.transactionID
        break;
      case CREATE_ORDER_ID:
        break;
      case CREATE_ORDER_ID_SUCCESS:
        console.log('action transaction success', action);
        draft.options = action.databody
        break;
      case CAPTURE_RAZORPAY:
        console.log('CAPTURE_RAZORPAY', action);
        // draft.options = action.databody
        break;
      case CAPTURE_RAZORPAY_SUCCESS:
        console.log('CAPTURE_RAZORPAY SUCCESS', action);
        draft.paymentsuccess = action.credit
        draft.ordernumber = action.credit.OrderId
        break;
      case UPDATE_DELIVERY_SLOTS:
        console.log('UPDATE_DELIVERY_SLOTS ', action);
        break;
      case UPDATE_DELIVERY_SLOTS_SUCCESS:
        console.log('UPDATE_DELIVERY_SLOTS SUCCESS', action);
        break;
      case PLACE_ORDER_CREDIT_CARD:
        console.log('PLACE_ORDER_CREDIT_CARD ', action);
        break;
      case PLACE_ORDER_CREDIT_CARD_SUCCESS:
        console.log('PLACE_ORDER_CREDIT_CARD SUCCESS', action);
        break;
      case SELECT_DEFAULT_ADDRESS:
        console.log('SELECT_DEFAULT_ADDRESSss', action);
        draft.CustomerAddressId = action.customeraddressId
        break;
      case GET_WALLETBALANCE:
        console.log('GET_WALLETBALANCE', action);
        break;
      case GET_WALLETBALANCE_SUCCESS:
        console.log('GET_WALLETBALANCE_SUCCESS', action);
        draft.WalletBalance = action.customerwalletbalance[0].WalletBalance
        break;
      case ONCHANGE_LOCATION_SUCCESS:
        draft.predictlist = action.predictions
        break;
      case PAYMENTMETHOD:
        console.log('sgghsg', action);
        draft.paymentmethod = action.paymentmethod
        break;
      case SLOT_DATE:
        console.log('sjsj', action);
        draft.totime = action.totime
        draft.fromtime = action.fromtime
        break;
      case SELECT_DEFAULT_ADDRESS_SUCCESS:
        console.log('aa', action);
        draft.Defaultaddress = action.defultaddress
        break;
      case VALUES_ADDRESS_PAGE:
        console.log('VALUES_ADDRESS_PAGE', action);
        draft.total = action.total
        draft.DeliverySlotDate = action.DeliverySlotDate
        draft.slotid = action.slotid
        draft.InstructionForDeliverySlot = action.InstructionForDeliverySlot
        draft.customeraddressId = action.customerid
        break;
    }
  });
export default proceedToBuyReducer;
