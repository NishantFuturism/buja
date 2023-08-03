/* eslint-disable no-return-assign */
import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_COMMON_CART_SUCCESS, SHOPPING_CART_DETAILS } from '../HomePage/constants';
// import { TOPSELLINGDB_SUCCESS } from '../HomeScreen/constants';
import CustomsAPI from '../MainPage/api/homeServices';
import mycartAPI from "../MainPage/api/mycartAPI";
import { ADD_TO_CART, ADD_TO_CART_SUCCESS, NEXT_PAGE, NEXT_PAGE_SUCCESS, DEFAULT_ACTION, DEFAULT_ACTION_SUCCESS, SHOPPING_CART_DETAILS_HOME } from './constants';
// const stateDataDealDay = useSelector(state => state.dealdayProduct)
// console.log('stateDataDealDay', stateDataDealDay);
function* AddToCartAPI(action) {
  try {
    const updateCartData = yield call(mycartAPI.updatecart, null, action.payload.qty, action.payload.SkuId, action.payload.SKUFilterPriceId)
    const cartAllData = yield call(mycartAPI.getCartCommon)
    const shoppingcartDetails = yield call(mycartAPI.getShoppingcartDetails)
    yield put({ type: GET_COMMON_CART_SUCCESS, cartAllData });
    yield put({ type: ADD_TO_CART_SUCCESS, updateCartData });
    yield put({ type: SHOPPING_CART_DETAILS, shoppingcartDetails });
  } catch (err) {
    console.log(err);
    yield put(err);
  }
}
function* NextBtnAPI(action) {
  try {
    const dealOfTheDayData = yield call(CustomsAPI.getTopsellingdb, action.pageNum, 9)
    // const cartAllData = yield call(mycartAPI.getCartCommon)
    // const shoppingcartDetails = yield call(mycartAPI.getShoppingcartDetails)
    // console.log('dealOfTheDayData', dealOfTheDayData.Data, action.alldata);
    // dealOfTheDayData.Data.forEach(element => {
    //   console.log('elemen', element.SkuId);
    //   const bool = action.alldata.indexOf(itm => itm.SkuId === element.SkuId)
    //   if (bool !== (-1)) {
    //     console.log('bool if', bool);
    //   } else {
    //     console.log('bool else', bool);
    //   }
    // });
    yield put({ type: NEXT_PAGE_SUCCESS, dealOfTheDayData });
    const shoppingcartDetails = yield call(mycartAPI.getShoppingcartDetails);
    console.log('Saga Top=', shoppingcartDetails);
    yield put({ type: SHOPPING_CART_DETAILS_HOME, shoppingcartDetails });
    // yield put({ type: ADD_TO_CART_SUCCESS, updateCartData });
    // yield put({ type: SHOPPING_CART_DETAILS, shoppingcartDetails });
  } catch (err) {
    console.log(err);
    yield put(err);
  }
}
function* getopsellingdata() {
  const getTopsellingdb = yield call(CustomsAPI.getTopsellingdb, 1, 9)
  console.log('topselling', getTopsellingdb);
  localStorage.setItem('getTopsellingdb', JSON.stringify(getTopsellingdb))
  yield put({ type: DEFAULT_ACTION_SUCCESS, getTopsellingdb });
}
export default function* ToppSelling() {
  yield takeEvery(ADD_TO_CART, AddToCartAPI);
  yield takeEvery(NEXT_PAGE, NextBtnAPI);
  yield takeEvery(DEFAULT_ACTION, getopsellingdata);
}
