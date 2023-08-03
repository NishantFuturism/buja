/* eslint-disable prefer-destructuring */
/*
 *
 * LoadProducts reducer
 *
 */
import produce from 'immer';
import { ADD_TO_CART_SUCCESS, ADD_TO_WISHLIST_SUCCESS, CLOSE_MSG_BAR, DEFAULT_ACTION, QUICKVIEW, RESPONCE_MSG, SHOPPING_CART_DETAILS, SKUURL, PRODUCT_COMPARE_SUCCESS, RECENT_SUCCESS, NOTIFY_ME_SUCCESS, QUICKVIEW_SUCCESS } from './constants';
export const initialState = {
  shoppingcartDetails: [],
  addToCartMsg: '',
  receivemsg: '',
  IsMsgBar: false,
  updateWishlistData: [],
  popup: false,
  skuurl: '',
  comaprelist: [],
  recentlist: [],
  wishlistcount: '',
  notify: false,
  Quickviewdata: [],
};
/* eslint-disable default-case, no-param-reassign */
const loadProductsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case CLOSE_MSG_BAR:
        draft.IsMsgBar = false
        draft.addToCartMsg = ''
        break
      case SHOPPING_CART_DETAILS:
        draft.shoppingcartDetails = action.shoppingcartDetails
        break;
      case ADD_TO_CART_SUCCESS:
        draft.IsMsgBar = true
        draft.addToCartMsg = action.updateCartData.split('|')[1]
        break
      case ADD_TO_WISHLIST_SUCCESS:
        draft.IsMsgBar = true
        draft.updateWishlistData = action.updateWishlistData
        draft.wishlistcount = action.updateWishlistData.length
        break
      case RESPONCE_MSG:
        console.log("chkresponsemsg..", action.recievedMsg)
        draft.IsMsgBar = true
        draft.receivemsg = action.recievedMsg
        break
      case QUICKVIEW:
        draft.popup = action.popup
        break
      case SKUURL:
        draft.skuurl = action.skuurl
        break
      case PRODUCT_COMPARE_SUCCESS:
        // console.log('upCompare..', action.updateCompare)
        draft.IsMsgBar = true
        draft.addToCartMsg = 'Product added to compare list successfully'
        draft.comaprelist = [...draft.comaprelist, ...action.updateCompare]
        // sessionStorage.setItem('sessionCompareList', JSON.stringify(...draft.comaprelist))
        // draft.comaprelist = action.updateCompare
        console.log('reucerCompare..', draft.comaprelist);
        break
      case RECENT_SUCCESS:
        draft.recentlist = action.recentdata
        break
      case NOTIFY_ME_SUCCESS:
        draft.notify = action.notifyMeResp
        break
      case QUICKVIEW_SUCCESS:
        draft.Quickviewdata = action.skudetaildata
        break
    }
  });
export default loadProductsReducer;