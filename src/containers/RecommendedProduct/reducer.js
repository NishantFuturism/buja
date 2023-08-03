/* eslint-disable prefer-destructuring */
/*
 *
 * RecommendedProduct reducer
 *
 */
import produce from 'immer';
import { ADD_TO_CART_SUCCESS, CLOSE_MSG_BAR, NEXT_PAGE_SUCCESS, RESPONCE_MSG, SHOPPING_CART_DETAILS_HOME } from './constants';
export const initialState = {
  dealData: [],
  name: '',
  qty: 0,
  addToCartMsg: '',
  IsMsgBar: false
};
/* eslint-disable default-case, no-param-reassign */
const recommendedProductReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
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
      case SHOPPING_CART_DETAILS_HOME:
        draft.shoppingDetailsHome = action.shoppingcartDetails
        break
    }
  });
export default recommendedProductReducer;
