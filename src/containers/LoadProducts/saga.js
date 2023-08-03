// import { take, call, put, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { call, put, takeEvery } from 'redux-saga/effects';
// import Cookies from 'universal-cookie';
import { GET_COMMON_CART_SUCCESS, ADD_TO_WISHLIST_SUCCESS_HOME } from '../HomePage/constants';
import CustomsAPI from '../MainPage/api/homeServices';
import mycartAPI from '../MainPage/api/mycartAPI';
import ProductDetailAPI from '../MainPage/api/productdetail';
// import { useCookies } from "react-cookie";
import { ADD_TO_CART, ADD_TO_CART_SUCCESS, ADD_TO_COMPARE, ADD_TO_WISHLIST, ADD_TO_WISHLIST_SUCCESS, REMOVE_FROM_CART, RESPONCE_MSG, SHOPPING_CART_DETAILS, PRODUCT_COMPARE_SUCCESS, RECENT, RECENT_SUCCESS, QUICKVIEW, QUICKVIEW_SUCCESS } from './constants';
function* AddToCartAPI(action) {
  try {
    const updateCartData = yield call(mycartAPI.updatecart, null, action.payload.qty, action.payload.SkuId, action.payload.SKUFilterPriceId)
    const cartAllData = yield call(mycartAPI.getCartCommon)
    const shoppingcartDetails = yield call(mycartAPI.getShoppingcartDetails, action.payload.SkuId, action.payload.SKUFilterPriceId)
    yield put({ type: GET_COMMON_CART_SUCCESS, cartAllData });
    yield put({ type: ADD_TO_CART_SUCCESS, updateCartData });
    yield put({ type: SHOPPING_CART_DETAILS, shoppingcartDetails });
  } catch (err) {
    yield put(err);
  }
}
function* AddToCompare(action) {
  // const cookies = new Cookies();
  try {
    // console.log("sagacompare..", action.skuCode)
    const updateCompare = yield call(CustomsAPI.getproductcompare, action.skuCode)
    localStorage.setItem('Comapredata', JSON.stringify(updateCompare))
    // console.log("updateCompare..", updateCompare)
    if (updateCompare.length <= 2) {
      // toast("Product added to compare list successfully", {
      //   position: toast.POSITION.TOP_RIGHT
      // })
    } else {
      // toast('You have reached your maximum limit to compare items', {
      //   position: toast.POSITION.TOP_RIGHT
      // })
    }
    yield put({ type: PRODUCT_COMPARE_SUCCESS, updateCompare });
    // const cartAllData = yield call(mycartAPI.getCartCommon)
    // const shoppingcartDetails = yield call(mycartAPI.getShoppingcartDetails, action.payload.SkuId, action.payload.SKUFilterPriceId)
    // yield put({ type: GET_COMMON_CART_SUCCESS, cartAllData });
    // yield put({ type: ADD_TO_CART_SUCCESS, updateCartData });
    // yield put({ type: SHOPPING_CART_DETAILS, shoppingcartDetails });
  } catch (err) {
    yield put(err);
  }
}
function* RemoveFromCartAPI(action) {
  const recievedMsg = yield call(mycartAPI.RemoveCartItem, action.payload.SkuId, action.payload.SKUFilterPriceId)
  yield put({ type: RESPONCE_MSG, recievedMsg });
  const cartAllData = yield call(mycartAPI.getCartCommon)
  yield put({ type: GET_COMMON_CART_SUCCESS, cartAllData });
  const shoppingcartDetails = yield call(mycartAPI.getShoppingcartDetails,)
  yield put({ type: SHOPPING_CART_DETAILS, shoppingcartDetails });
}
function* AddToWishlist(action) {
  const recievedMsg = yield call(CustomsAPI.addwishlist, action.SkuId, action.SKUFilterPriceId)
  // console.log("recievedMsg", recievedMsg);
  if (recievedMsg === 'Wishlist item already exist') {
    toast('Wishlist item already exist')
  }
  if (recievedMsg === 'Item Added in Wishlist') {
    toast('Item Added in Wishlist')
  }
  yield put({ type: RESPONCE_MSG, recievedMsg });
  const updateWishlistData = yield call(CustomsAPI.getwishlist)
  yield put({ type: ADD_TO_WISHLIST_SUCCESS, updateWishlistData });
  localStorage.setItem('length', updateWishlistData.length)
  yield put({ type: ADD_TO_WISHLIST_SUCCESS_HOME, updateWishlistData });
}
function* getreview(action) {
  // console.log('QUICKVIEWj', action);
  // const recievedMsg = yield call(CustomsAP, action.SkuId, action.SKUFilterPriceId)
  const skudetaildata = yield call(ProductDetailAPI.getSkuv, action.PageUrl)
  // console.log('hghh', skudetaildata);
  yield put({ type: QUICKVIEW_SUCCESS, skudetaildata });
}
// yield put({ type: RESPONCE_MSG, recievedMsg });
// const updateWishlistData = yield call(CustomsAPI.getwishlist)
// yield put({ type: ADD_TO_WISHLIST_SUCCESS, updateWishlistData });
// localStorage.setItem('length', updateWishlistData.length)
// y
// function* NotifyMeSaga(action) {
//   console.log("saga notify gfgf");
//   const notifyMeResp = yield call(mycartAPI.NotifyMeAPI, action.skuDetailId)
//   console.log('notifyMeResp', notifyMeResp);
//   yield put({ type: NOTIFY_ME_SUCCESS, notifyMeResp });
//   // alert('nottified')
//   // mycartAPI.NotifyMeAPI
//   // NotifyMeAPI
// }
function* recentproduct(action) {
  // console.log("loadproduct recenet action", action);
  const recentdata = yield call(ProductDetailAPI.getrecentlyviewd, action.skuId, 1, 9)
  // console.log('recentdata', recentdata);
  localStorage.setItem('Recentdata', JSON.stringify(recentdata))
  yield put({ type: RECENT_SUCCESS, recentdata });
  // setCookie('recentdata',skudetaildata, { path: '/' });
  // mycartAPI.NotifyMeAPI
  // NotifyMeAPI
}
// Individual exports for testing
export default function* loadProductsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(ADD_TO_CART, AddToCartAPI);
  yield takeEvery(ADD_TO_COMPARE, AddToCompare);
  yield takeEvery(ADD_TO_WISHLIST, AddToWishlist)
  yield takeEvery(REMOVE_FROM_CART, RemoveFromCartAPI);
  // yield takeEvery(NOTIFY_ME_REQUEST, NotifyMeSaga);
  yield takeEvery(QUICKVIEW, getreview);
  yield takeEvery(RECENT, recentproduct);
}
