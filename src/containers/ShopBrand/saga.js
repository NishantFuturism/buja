import { call, put, takeEvery } from 'redux-saga/effects';
import CustomsAPI from '../MainPage/api/homeServices';
import mycartAPI from "../MainPage/api/mycartAPI";
import { NEXT_PAGE, NEXT_PAGE_SUCCESS, SHOPPING_CART_DETAILS_HOME } from './constants';
// import { NEXT_PAGE_SUCCESS } from '../BrandShop/constants';
// Individual exports for testing
export default function* shopBrandSaga() {
  yield takeEvery(NEXT_PAGE, NextBtnAPI);
}
function* NextBtnAPI(action) {
  try {
    const dealOfTheDayData = yield call(CustomsAPI.getBrandList, action.pageNum, 9)
    yield put({ type: NEXT_PAGE_SUCCESS, dealOfTheDayData });
    const shoppingcartDetails = yield call(mycartAPI.getShoppingcartDetails);
    // console.log("saga dealdayproduct=", shoppingcartDetails);
    yield put({ type: SHOPPING_CART_DETAILS_HOME, shoppingcartDetails });
  } catch (err) {
    // console.log(err);
  }
}
// function* NextBtnAPI(action) {
//   const dealOfTheDayData = yield call(CustomsAPI.getBrandList, action.pageNum, 9)
//   // const cartAllData = yield call(mycartAPI.getCartCommon)
//   // const shoppingcartDetails = yield call(mycartAPI.getShoppingcartDetails)
//   // console.log('dealOfTheDayData', dealOfTheDayData.Data, action.alldata);
//   // dealOfTheDayData.Data.forEach(element => {
//   //   console.log('elemen', element.SkuId);
//   //   const bool = action.alldata.indexOf(itm => itm.SkuId === element.SkuId)
//   //   if (bool !== (-1)) {
//   //     console.log('bool if', bool);
//   //   } else {
//   //     console.log('bool else', bool);
//   //   }
//   // });
//   yield put({ type: NEXT_PAGE_SUCCESS, dealOfTheDayData });
//   // yield put({ type: ADD_TO_CART_SUCCESS, updateCartData });
//   // yield put({ type: SHOPPING_CART_DETAILS, shoppingcartDetails });
// }