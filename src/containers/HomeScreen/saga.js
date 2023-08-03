import { call, put, takeEvery } from 'redux-saga/effects';
import CustomsAPI from '../MainPage/api/homeServices';
import mycartAPI from '../MainPage/api/mycartAPI';
import ProductDetailAPI from '../MainPage/api/productdetail';
import ReorderAPI from '../MainPage/api/Reorder';
// import ReorderAPI from '../MainPage/api/Reorder';
import { BANNER_SUCCESS, BILLBOARDLIST_SUCCESS, CATEGORY_SUCCESS, DEALOFDAY_SUCCESS, DEFAULT_ACTION, FOOTERCONTENT_SUCCESS, FOOTERSTATIC_SUCCESS, FTR_SUCCESS, GET_REORDER_PRODUCT_SUCCESS, SHOPBY_BRAND_SUCCESS, SHOPPING_CART_DETAILS, TOPSELLINGDB_SUCCESS, WISHLIST_PAGED_SUCCESS, RECENTLY_VIEWED_SUCCESS } from './constants';
// Individual exports for testing
// const initialWidth = () => {
//   const count = window.innerWidth / 251
//   return floor(count) + 4
// }
function* gethomedata() {
  try {
    // yield startLoadin('data', 'Dealoftheday')
    const data = yield call(CustomsAPI.getBillBoard)
    yield put({ type: BILLBOARDLIST_SUCCESS, data });
    const Banners = yield call(CustomsAPI.getBanners)
    yield put({ type: BANNER_SUCCESS, Banners });
    const Dealoftheday = yield call(CustomsAPI.getDealofdayWithPage, 1, 4)
    yield put({ type: DEALOFDAY_SUCCESS, Dealoftheday });
    const getTopsellingdb = yield call(CustomsAPI.getTopsellingdb, 1, 100)
    yield put({ type: TOPSELLINGDB_SUCCESS, getTopsellingdb })
    const category = yield call(CustomsAPI.getShopbycategory)
    yield put({ type: CATEGORY_SUCCESS, category });
    const shoppingcartDetails = yield call(mycartAPI.getShoppingcartDetails)
    // console.log("saga shoppingcartDetails=", shoppingcartDetails);
    yield put({ type: SHOPPING_CART_DETAILS, shoppingcartDetails });
    // if (getTopsellingdb.Data.length === 0) {
    //   getTopsellingdb = yield call(CustomsAPI.getTopsellingAI, 1, 9)
    //   yield put({ type: TOPSELLINGDB_SUCCESS, getTopsellingdb })
    // }
    // above commented changes made for detect loc product listing
    // yield put({ type: DEFAULT_ACTION_SUCCESS, reorderdata });
    // const gooleapirespo = yield call(LocationApi.GoogleApi)
    // yield put({ type: GET_GOOGLELOCATION_SUCCESS, gooleapirespo });
    // const wishlistcpount = yield call(CustomsAPI.getwishlist)
    // yield put({ type: GET_WISHLIST_COUNT_SUCCESS, wishlistcpount });
    // // yield initialWidth()
    // const clientdata = yield call(CustomsAPI.getClientid)
    // yield put({ type: GET_CLIENTID_SUCCESS, clientdata });
    // const recommendeddata = yield call(ProductDetailAPI.getrecomended, 1, 9)
    // const megaMenuResp = yield call(CustomsAPI.getMegamainmenu)
    // yield put({ type: RECOMMENDED_SUCCESS, recommendeddata });
    const recentdata = yield call(ProductDetailAPI.getrecentlyviewd, localStorage.getItem('skuproduct1'), 1, 9) // action.skuId 
    yield put({ type: RECENTLY_VIEWED_SUCCESS, recentdata });
    const shopbybrand = yield call(CustomsAPI.getBrandList, 1, 9)
    // console.log('bran', shopbybrand);
    yield put({ type: SHOPBY_BRAND_SUCCESS, shopbybrand });
    const Ftrstaticweb = yield call(CustomsAPI.getFooterstaticwebsection)
    const wishlistp = yield call(CustomsAPI.getwhishlistpaged, 1, 9)
    yield put({ type: WISHLIST_PAGED_SUCCESS, wishlistp })
    yield put({ type: FOOTERSTATIC_SUCCESS, Ftrstaticweb });
    const Footerqacontent = yield call(CustomsAPI.getFooterstaticparamqacontent)
    // console.log('s', Footerqacontent);
    yield put({ type: FOOTERCONTENT_SUCCESS, Footerqacontent });
    const Ftr = yield call(CustomsAPI.getFooter)
    yield put({ type: FTR_SUCCESS, Ftr });
    const reorderdata = sessionStorage.getItem('CustGUID') === null ? null : yield call(ReorderAPI.productReorder, 1, 9)
    // if (reorderdata.Message) {
    yield put({ type: GET_REORDER_PRODUCT_SUCCESS, reorderdata });
    // }
  } catch (err) {
    // yield put({ type: DEFAULT_ACTION_SUCCESS, err });
  }
}
export default function* homeScreenSaga() {
  yield takeEvery(DEFAULT_ACTION, gethomedata);
}
