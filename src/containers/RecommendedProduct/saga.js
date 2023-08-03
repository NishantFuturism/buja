import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_COMMON_CART_SUCCESS, SHOPPING_CART_DETAILS } from '../HomePage/constants';
import mycartAPI from "../MainPage/api/mycartAPI";
import ProductDetailAPI from '../MainPage/api/productdetail';
import { ADD_TO_CART, ADD_TO_CART_SUCCESS, NEXT_PAGE, NEXT_PAGE_SUCCESS, SHOPPING_CART_DETAILS_HOME } from './constants';
// Individual exports for testing
export default function* recommendedProductSaga() {
  yield takeEvery(ADD_TO_CART, AddToCartAPI);
  yield takeEvery(NEXT_PAGE, NextBtnAPI);
}
// function* getrepos(action) {
//   console.log('action saga', action);
//   try {
//     const recomendedproductdata = yield call(ProductDetailAPI.getrecomended)
//     yield put({ type: GET_RECOMENDED_PRODUCTS_SUCCESS, recomendedproductdata });
//   } catch (err) {
//     yield put();
//   }
// }
function* AddToCartAPI(action) {
  const updateCartData = yield call(mycartAPI.updatecart, null, action.payload.qty, action.payload.SkuId, action.payload.SKUFilterPriceId)
  const cartAllData = yield call(mycartAPI.getCartCommon)
  const shoppingcartDetails = yield call(mycartAPI.getShoppingcartDetails)
  yield put({ type: GET_COMMON_CART_SUCCESS, cartAllData });
  yield put({ type: ADD_TO_CART_SUCCESS, updateCartData });
  yield put({ type: SHOPPING_CART_DETAILS, shoppingcartDetails });
}
function* NextBtnAPI(action) {
  const dealOfTheDayData = yield call(ProductDetailAPI.getrecomended, action.pageNum, 9)
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
}