/* eslint-disable prefer-destructuring */
/*
 *
 * WishlistPaged reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, CLOSE_MSG_BAR, ADD_TO_CART_SUCCESS, RESPONCE_MSG, NEXT_PAGE_SUCCESS, SHOPPING_CART_DETAILS } from './constants';
export const initialState = {
  dealData: [],
  name: '',
  qty: 0,
  addToCartMsg: '',
  IsMsgBar: false,
  shoppingDetails: [],
  DealofthdayData: []
};
/* eslint-disable default-case, no-param-reassign */
const wishlistPagedReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
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
        draft.dealData = action.dealOfTheDayData
        break
      case SHOPPING_CART_DETAILS:
        draft.shoppingDetails = action.shoppingcartDetails
        break
    }
  });
export default wishlistPagedReducer;
