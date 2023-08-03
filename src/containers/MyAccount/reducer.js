/* eslint-disable no-duplicate-case */
/*
 *
 * MyAccount reducer
 *
 */
import produce from 'immer';
import { DASHBOARD_REORDER_SUCCESS, DEFAULT_ACTION, GET_ALL_CUSTOMER_ORDER, GET_ALL_CUSTOMER_ORDER_SUCCESS, GET_MYORDER, GET_MYORDER_SUCCESSS, IS_FIRST_TIME_SUCCESS, LOAD_CHECKOUT_ALERT, SAVE_CART_CHECKOUT_SUCCESS, UPDATE_PASSWORD_SUCCESS, SEND_OTP_SUCCESS, VERIFY_OTP_SUCCESS, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE, DELETEDSKUID, DELETED_FLAG, SAVE_CART_TOTAL, SAVE_PASSWPORD, DELETEDADDRESSID } from './constants';
export const initialState = {
  checkoutpopup: '',
  namecart: '',
  savecart: false,
  isFirstTime: 'false',
  updatestatus: {},
  IsMsgBar: false,
  sendotpdata: [],
  verfied: false,
  profilemsg: '',
  ismsg: false,
  deletedSkuId: '',
  deletedaddId: '',
  flag: false,
  data: '',
  totalamount: '',
  spassword: ''
};
/* eslint-disable default-case, no-param-reassign */
const myAccountReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case GET_MYORDER:
        break;
      case GET_MYORDER_SUCCESSS:
        break;
      case GET_ALL_CUSTOMER_ORDER:
        break;
      case GET_ALL_CUSTOMER_ORDER_SUCCESS:
        break;
      case IS_FIRST_TIME_SUCCESS:
        console.log("checkval..", action.firstTimevalue)
        draft.isFirstTime = action.firstTimevalue
        // draft.updatestatus = action.updateStatus
        break;
      case SAVE_PASSWPORD:
        draft.IsMsgBar = true
        console.log("checksavepassword..", action.savePsassword)
        draft.spassword = action.savePassword
        break;
      case LOAD_CHECKOUT_ALERT:
        draft.checkoutpopup = action.popup
        draft.namecart = action.cartname
        break;
      case SAVE_CART_CHECKOUT_SUCCESS:
        // draft.IsMsgBar = true
        draft.checkoutpopup = action.checkoutdata
        // draft.savecart = true
        break;
      case DASHBOARD_REORDER_SUCCESS:
        break;
      case UPDATE_PASSWORD_SUCCESS:
        console.log("reducerupdate..", action.updateStatus)
        draft.updatestatus = action.updateStatus
        break;
      case SEND_OTP_SUCCESS:
        draft.sendotpdata = action.sendOtpResponse
        break;
      case VERIFY_OTP_SUCCESS:
        draft.IsMsgBar = true;
        draft.verfied = action.verify
        break;
      case UPDATE_PROFILE:
        draft.ismsg = false
        break;
      case UPDATE_PROFILE_SUCCESS:
        draft.ismsg = true
        draft.profilemsg = action.updateprofile
        break;
      case DELETEDADDRESSID:
        draft.IsMsgBar = true
        draft.deletedaddId = action.CustomerAddressId
        // draft.msg = 'Address deleted successfully'
        break;
      case DELETEDSKUID:
        draft.IsMsgBar = true
        draft.deletedSkuId = action.SkuId
        // draft.msg = 'Address deleted successfully'
        break;
      case DELETED_FLAG:
        console.log('vjkhkv', action);
        draft.flag = action.flag
        break;
      case SAVE_CART_TOTAL:
        console.log('vjkhkv', action);
        draft.totalamount = action.totalamount
        break;
      // cas:
      //   console.log("alldata..", action.data)
      //   draft.data = action.data
      //   break
    }
  });
export default myAccountReducer; 
