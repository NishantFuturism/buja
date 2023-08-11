import { call, put, takeEvery } from 'redux-saga/effects';
import CustomsAPI from '../MainPage/api/homeServices';
import ProductlistingAPI from '../MainPage/api/productlisting';
import mycartAPI from '../MainPage/api/mycartAPI';
import { PRODUCT_BRAND_LIST_FILTER, PRODUCT_BRAND_LIST_FILTER_SUCCESS, PRODUCT_LIST, PRODUCT_LIST_SUCCESS, SHOPPING_CART_DETAILS } from './constants';
export default function* subcategorySaga() {
  yield takeEvery(PRODUCT_LIST, getrepos)
  yield takeEvery(PRODUCT_BRAND_LIST_FILTER, getbrandfilter)
}
function* getrepos(action) {
  console.log('caturl--------',action.caturl)
  if (action.caturl && action.caturl!==undefined) {
    const subCategoryProductList = yield call(CustomsAPI.getSubCategoryProductList, action.page, action.caturl, action.parentcatURL,action.min,action.max)
    yield put({ type: PRODUCT_LIST_SUCCESS, subCategoryProductList });
    const shoppingcartDetails = yield call(mycartAPI.getShoppingcartDetails)
    yield put({ type: SHOPPING_CART_DETAILS, shoppingcartDetails });
  }
}
function* getbrandfilter(action) {
  const brandlistfilterdata = yield call(ProductlistingAPI.getskuFilterlisting, action.valueString, action.valuepackString, action.fieldString, action.valuediscountstring, action.caturl, action.min, action.max, action.sortby)
  yield put({ type: PRODUCT_BRAND_LIST_FILTER_SUCCESS, brandlistfilterdata });
}
