/*
 *
 * Cart reducer
 *
 */
import produce from 'immer';
// import { getCommonCartSuccessAction } from '../HomePage/actions';
import { CART_AMOUNT, CLOSE_MSG_BAR, LOAD_SAVE_CARD, REMOVE_FROM_CART, RESPONCE_MSG, SAVE_CART_NAME, SHOPPING_CART_DETAILS } from './constants';
export const initialState = {
  cartAllData: [],
  shoppingcartDetails: [],
  savecartpopup: false,
  addToCartMsg: '',
  IsMsgBar: false,
  cartamount: ''
};
/* eslint-disable default-case, no-param-reassign */
const cartReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      // case CART_GET_COMMON_CART_SUCCESS:
      //   draft.cartAllData = action.cartAllData
      //   break;
      case REMOVE_FROM_CART:
        break;
      case LOAD_SAVE_CARD:
        draft.savecartpopup = action.popup
        break;
      case SAVE_CART_NAME:
        // draft.savecartpopup = action.popup
        break;
      case SHOPPING_CART_DETAILS:
        draft.shoppingcartDetails = action.shoppingcartDetails
        break;
      case CLOSE_MSG_BAR:
        draft.IsMsgBar = false
        break;
      case RESPONCE_MSG:
        draft.IsMsgBar = true
        draft.addToCartMsg = 'Cart saved successfully'
        draft.savecartpopup = false
        break
      case CART_AMOUNT:
        // draft = { ...draft }
        draft.cartamount = action.amount
        break
    }
  });
export default cartReducer;
