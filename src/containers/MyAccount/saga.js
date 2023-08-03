/* eslint-disable no-unused-vars */
import { call, put, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import managePasswordAPI from '../MainPage/api/managePasswordAPI';
import OrderdetailAPI from '../MainPage/api/orderdetail';
import ProfileAPI from '../MainPage/api/profile';
import ReorderAPI from '../MainPage/api/Reorder';
import SaveCartAPI from '../MainPage/api/savecart';
import WalletAPI from '../MainPage/api/wallet';
import { DASHBOARD_REORDER, GET_MYORDER, IS_FIRST_TIME, IS_FIRST_TIME_SUCCESS, SAVE_CART_CHECKOUT, SAVE_CART_CHECKOUT_SUCCESS, UPDATE_PASSWORD, UPDATE_PASSWORD_SUCCESS, WALLET_TRANSACTION, SEND_OTP, UPDATE_PROFILE, VERIFY_OTP, SEND_OTP_SUCCESS, VERIFY_OTP_SUCCESS, UPDATE_PROFILE_SUCCESS, SET_PASSWORD, SAVE_PASSWPORD, SEND_UPDATE_PROFILE_EMAIL } from './constants';
export default function* myAccountSaga() {
  yield takeEvery(GET_MYORDER, getrepos)
  yield takeEvery(DASHBOARD_REORDER, reorder)
  yield takeEvery(WALLET_TRANSACTION, getwallettransaction)
  yield takeEvery(SAVE_CART_CHECKOUT, checkoutwithsavecart)
  yield takeEvery(IS_FIRST_TIME, isFirstTimePasswordSaga)
  // yield takeLatest(SETUP_PASSWORD, setupPasswordSaga)
  yield takeEvery(UPDATE_PASSWORD, updatePwdSaga)
  yield takeEvery(SEND_OTP, sendotp)
  yield takeEvery(VERIFY_OTP, otpverify)
  yield takeEvery(UPDATE_PROFILE, profileupdate)
  yield takeEvery(SET_PASSWORD, passwordSet)
  yield takeEvery(SEND_UPDATE_PROFILE_EMAIL, sendUpdateProfileEmail)
}
function* isFirstTimePasswordSaga(action) {
  console.log("actionid..", action.id)
  const firstTimevalue = yield call(managePasswordAPI.firsttimepasswordchange, action.id)
  console.log('isFirstTime..', firstTimevalue);
  yield put({ type: IS_FIRST_TIME_SUCCESS, firstTimevalue });
  // console.log('isFirstTime..', isFirstTime);
}
function* passwordSet(action) {
  console.log("actioneeevv..", action.username, action.n1passwordTxt, action.cnfpasswordTxt)
  const savePassword = yield call(managePasswordAPI.setupPasswordAPI, action.username, action.n1passwordTxt, action.cnfpasswordTxt)
  console.log('saveval..', savePassword);
  yield put({ type: SAVE_PASSWPORD, savePassword });
}
// function* setupPasswordSaga(action) {
//   const setPwd = yield call(managePasswordAPI.setupPasswordAPI, action.npwd, action.cpwd)
//   yield put({ type: IS_FIRST_TIME_SUCCESS, setPwd });
// }
function* updatePwdSaga(action) {
  console.log("updateval..", action.username, action.opwd, action.npwd)
  const updateStatus = yield call(managePasswordAPI.changePasswordAPI, action.username, action.opwd, action.npwd)
  yield put({ type: UPDATE_PASSWORD_SUCCESS, updateStatus });
  console.log("chkvalue..", updateStatus)
  // if (updateStatus === 1) {
  //   alert('password change successfully')
  // }
}
function* getrepos() {
  try {
    const orderdata = yield call(OrderdetailAPI.getmyorder)
    // const verifysignatiure = yield call(PaymentAPI.razorpayVerifysignature, action.databody)
    // yield put({ type: GET_WALLETBALANCE_SUCCESS, customerwalletbalance });
  } catch (err) {
    // yield put();
  }
}
function* checkoutwithsavecart(action) {
  try {
    const checkoutdata = yield call(SaveCartAPI.savecartcheckout, action.name, action.flag)
    yield put({ type: SAVE_CART_CHECKOUT_SUCCESS, checkoutdata });
  } catch (err) {
    // yield put();
  }
}
function* reorder() {
  try {
    const reorderlist = yield call(ReorderAPI.productReorder)
    // yield put({ type: SAVE_CART_CHECKOUT_SUCCESS, checkoutdata });
  } catch (err) {
    // yield put();
  }
}
function* getwallettransaction() {
  try {
    const transactions = yield call(WalletAPI.wallettransact)
    // yield put({ type: SAVE_CART_CHECKOUT_SUCCESS, checkoutdata });
  } catch (err) {
    // yield put();
  }
}
function* sendotp(action) {
  const pattern = new RegExp(/^[0-9\b]+$/)
  if (!pattern.test(action.userid)) {
    const email = action.userid
    const phone = null
    try {
      const sendOtpResponse = yield call(ProfileAPI.generateandsendphoneemailchangeotp, email, phone)
      console.log("sendOtpResponse", sendOtpResponse.Message);
      // if (sendOtpResponse.Message === 'Email Already Exist') {
      //   toast('Email ID is already registered')
      // }
      yield put({ type: SEND_OTP_SUCCESS, sendOtpResponse });
    } catch (err) {
      // yield put();
      // }
    }
  } else {
    const email = null
    const phone = action.userid
    try {
      const sendOtpResponse = yield call(ProfileAPI.generateandsendphoneemailchangeotp, email, phone)
      console.log("sendOtpResponse", sendOtpResponse.Message);
      yield put({ type: SEND_OTP_SUCCESS, sendOtpResponse });
    } catch (err) {
      // yield put();
      // }
    }
  }
}
function* profileupdate(action) {
  try {
    const updateprofile = yield call(ProfileAPI.updatationprofile, action.title, action.firstname, action.lastname, action.emailvalue, action.mobile, action.company, action.receiveOffers)
    yield put({ type: UPDATE_PROFILE_SUCCESS, updateprofile });
  } catch (err) {
    // yield put();
    // }
  }
}
function* sendUpdateProfileEmail(action) {
  try {
    const updateprofileemail = yield call(ProfileAPI.sendUpdateProfileEmail, action.email, action.firstName)
    yield put({ type: UPDATE_PROFILE_SUCCESS, updateprofileemail });
  } catch (err) {
    // yield put();
    // }
  }
}
function* otpverify(action) {
  try {
    const verify = yield call(ProfileAPI.verifyemailphoneotp, action.guid, action.otp)
    console.log("verify", verify);
    if (verify === 0) {
      localStorage.setItem('invalidOTP', 0)
      // alert('Please enter valid OTP')
      // toast('Please enter valid OTP')
    }
    yield put({ type: VERIFY_OTP_SUCCESS, verify });
  } catch (err) {
    // yield put();
    // }
  }
}
