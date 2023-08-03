/* eslint-disable prefer-destructuring */
/*
 *
 * AddToCart reducer
 *
 */
import produce from 'immer';
import { ADD_TO_CART_SUCCESS, CLOSE_MSG_BAR, NOTIFY_ME_REQUEST_SUCCESS, RESPONCE_MSG, SHOPPING_CART_DETAILS } from './constants';
export const initialState = {
  shoppingcartDetails: [],
  addToCartMsg: '',
  IsMsgBar: false,
  updateWishlistData: [],
  notified: false
};
/* eslint-disable default-case, no-param-reassign */
const addToCartReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CLOSE_MSG_BAR:
        draft.IsMsgBar = false
        break
      case SHOPPING_CART_DETAILS:
        draft.shoppingcartDetails = action.shoppingcartDetails
        break;
      case ADD_TO_CART_SUCCESS:
        console.log("reducer addtocart=", action)
        draft.IsMsgBar = true
        draft.addToCartMsg = action.updateCartData.split('|')[1]
        break
      case RESPONCE_MSG:
        draft.IsMsgBar = true
        draft.addToCartMsg = action.recievedMsg
        break
      case NOTIFY_ME_REQUEST_SUCCESS:
        draft.IsMsgBar = true
        // draft.addToCartMsg = "Notified"
        draft.notified = action.notifyMeResp
        break
    }
  });
export default addToCartReducer;
