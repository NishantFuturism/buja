/*
 *
 * HomeScreen reducer
 *
 */
import produce from 'immer';
import { BANNER_SUCCESS, BILLBOARDLIST_SUCCESS, CATEGORY_SUCCESS, DEALOFDAY_SUCCESS, DEFAULT_ACTION, DEFAULT_ACTION_FAILURE, FOOTERCONTENT_SUCCESS, FOOTERSTATIC_SUCCESS, FTR_SUCCESS, GET_CLIENTID_SUCCESS, GET_GOOGLELOCATION_SUCCESS, GET_REORDER_PRODUCT_SUCCESS, GET_WISHLIST_COUNT_SUCCESS, MEGA_MENU_SUCCESS, RECENTLY_VIEWED_SUCCESS, RECOMMENDED_SUCCESS, RELATED_SUCCESS, RESGESTER_RESPONSE, SHOPBY_BRAND_SUCCESS, SHOPPING_CART_DETAILS, TOPSELLINGDB_SUCCESS, WISHLIST_PAGED_SUCCESS } from './constants';
export const initialState = {
  shoppingCartDetails: [],
  BillBoardList: [],
  DealofthdayData: [],
  Banners: [],
  Ftrstaticweb: '',
  Footerqacontent: '',
  category: [],
  Ftr: {},
  Topsellingdb: [],
  clientdata: [],
  gooleapirespo: [],
  wishlistcpount: [],
  megaMenuResp: [],
  shopbybrand: [],
  reorderdata: [],
  loading: false,
  regesterdata: [],
  regesterflag: '',
  apifailuremsg: '',
  recommendeddata: [],
  wishlistpagedata: [],
  recentdataviewd: [],
  related: []
};
/* eslint-disable default-case, no-param-reassign */
const homeScreenReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        draft.loading = true
        draft = { ...draft }
        break;
      case DEFAULT_ACTION_FAILURE:
        draft.apifailuremsg = action.err
        break;
      case GET_CLIENTID_SUCCESS:
        draft.clientdata = action.clientdata
        break;
      case SHOPPING_CART_DETAILS:
        // draft = { ...draft, shoppingCartDetails: action.shoppingcartDetails }
        draft.shoppingCartDetails = action.shoppingcartDetails
        break;
      case GET_GOOGLELOCATION_SUCCESS:
        draft.gooleapirespo = action.gooleapirespo
        break;
      case GET_WISHLIST_COUNT_SUCCESS:
        draft.wishlistcpount = action.wishlistcpount
        break;
      case BILLBOARDLIST_SUCCESS:
        draft.BillBoardList = action.data
        break;
      case DEALOFDAY_SUCCESS:
        draft.loading = false
        draft.DealofthdayData = action.Dealoftheday
        break;
      case BANNER_SUCCESS:
        draft.Banners = action.Banners
        break;
      case CATEGORY_SUCCESS:
        draft.category = action.category
        break;
      case SHOPBY_BRAND_SUCCESS:
        draft.shopbybrand = action.shopbybrand
        break;
      case FOOTERSTATIC_SUCCESS:
        draft.Ftrstaticweb = action.Ftrstaticweb
        break;
      case FOOTERCONTENT_SUCCESS:
        draft.Footerqacontent = action.Footerqacontent
        break;
      case FTR_SUCCESS:
        draft.Ftr = action.Ftr
        break;
      case TOPSELLINGDB_SUCCESS:
        draft.loading = false
        draft.Topsellingdb = action.getTopsellingdb
        // state.Topsellingdb = action.getTopsellingdb
        break;
      case MEGA_MENU_SUCCESS:
        draft.megaMenuResp = action.megaMenuResp
        break;
      case RESGESTER_RESPONSE:
        draft.regesterflag = action.flag
        draft.regesterdata = action.data
        break;
      case GET_REORDER_PRODUCT_SUCCESS:
        draft.loading = false
        draft.reoderlist = action.reorderdata
        break;
      case RECOMMENDED_SUCCESS:
        draft.loading = false
        draft.recommendeddata = action.recommendeddata
        break;
      case WISHLIST_PAGED_SUCCESS:
        draft.loading = false
        draft.wishlistpagedata = action.wishlistp
        break;
      case RECENTLY_VIEWED_SUCCESS:
        draft.loading = false
        draft.recentdataviewd = [...draft.recentdataviewd, ...action.recentdata.Data]
        break;
      case RELATED_SUCCESS:
        draft.loading = false
        draft.related = action.recentdata
        break;
    }
  });
export default homeScreenReducer;
