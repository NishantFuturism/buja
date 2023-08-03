/* eslint-disable prefer-destructuring */
/*
 *
 * RecentlyViewProduct reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, GET_RECENTLYVIEWED_PRODUCTS, GET_RECENTLYVIEWED_PRODUCTS_FAILURE, GET_RECENTLYVIEWED_PRODUCTS_SUCCESS, CLOSE_MSG_BAR, ADD_TO_CART_SUCCESS, RESPONCE_MSG, SHOPPING_CART_DETAILS, NEXT_PAGE_SUCCESS, SHOPPING_CART_DETAILS_RECENT } from './constants';
export const initialState = {
  dealData: [],
  name: '',
  qty: 0,
  addToCartMsg: '',
  IsMsgBar: false,
  shoppingDetails: [],
  shoppingDetailsRecent: [],
  DealofthdayData: [],
  Viewed: []
};
/* eslint-disable default-case, no-param-reassign */
// const Viewed = [];
const recentlyViewProductReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        draft.loading = true
        draft = { ...draft }
        break;
      case GET_RECENTLYVIEWED_PRODUCTS:
        // draft.IsMsgBar = true
        // console.log('recentlty reducer skudetaildata', action);
        // draft.Viewed = action.skudetaildata
        // draft.Viewed = action.skudetaildata
        // if (action.skudetaildata !== undefined) {
        // draft.Viewed = [...draft.Viewed, ...action.skudetaildata]
        // }
        // if (draft.Viewed.indexOf(action.skuid) === -1) {
        //   draft.Viewed.push(action.skuid)
        // }
        break;
      case GET_RECENTLYVIEWED_PRODUCTS_SUCCESS:
        break;
      case GET_RECENTLYVIEWED_PRODUCTS_FAILURE:
        break;
      case CLOSE_MSG_BAR:
        draft.IsMsgBar = false
        break
      case ADD_TO_CART_SUCCESS:
        draft.IsMsgBar = true
        draft.addToCartMsg = action.updateCartData.split('|')[1]
        break
      case RESPONCE_MSG:
        draft.IsMsgBar = true
        draft.addToCartMsg = action.recievedMsg
        break
      case NEXT_PAGE_SUCCESS:
        draft.dealData = action.dealOfTheDayData.Data
        break
      case SHOPPING_CART_DETAILS:
        draft.shoppingDetails = action.shoppingcartDetails
        break
      case SHOPPING_CART_DETAILS_RECENT:
        draft.shoppingDetailsRecent = action.shoppingcartDetails
        break
    }
  });
export default recentlyViewProductReducer;
