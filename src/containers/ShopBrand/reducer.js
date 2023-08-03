/*
 *
 * ShopBrand reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, NEXT_PAGE_SUCCESS, SHOPPING_CART_DETAILS_HOME } from './constants';
export const initialState = {
  dealData: [],
  name: '',
  qty: 0,
  addToCartMsg: '',
  IsMsgBar: false,
  DealofthdayData: [],
  shoppingDetailsHome: [],
};
/* eslint-disable default-case, no-param-reassign */
const shopBrandReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case NEXT_PAGE_SUCCESS:
        // console.log("action.dealOfTheDayData.Data", action.dealOfTheDayData.Data);
        draft.dealData = action.dealOfTheDayData.Data
        break
      case SHOPPING_CART_DETAILS_HOME:
        // console.log("reduceraction deal=", action.shoppingcartDetails)
        draft.shoppingDetailsHome = action.shoppingcartDetails
        break
    }
  });
export default shopBrandReducer;
