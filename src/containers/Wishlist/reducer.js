/*
 *
 * Wishlist reducer
 *
 */
import produce from 'immer';
import { CLOSE_MSG_BAR, DEFAULT_ACTION, GET_WISHLIST, GET_WISHLIST_SUCCESS, RESPONCE_MSG } from './constants';
export const initialState = {
  wishlistdata: [],
  addToCartMsg: '',
  IsMsgBar: false,
};
/* eslint-disable default-case, no-param-reassign */
const wishlistReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case GET_WISHLIST:
        draft.IsMsgBar = true
        // draft.shoppingcartDetails = action.shoppingcartDetails
        break;
      case GET_WISHLIST_SUCCESS:
        draft.IsMsgBar = true
        draft.wishlistdata = action.wishlistdata
        // draft.shoppingcartDetails = action.shoppingcartDetails
        break;
      case CLOSE_MSG_BAR:
        draft.IsMsgBar = true
        break
      case RESPONCE_MSG:
        // console.log('dvd..', action.wishlistdata);
        draft.IsMsgBar = true
        draft.addToCartMsg = action.wishlistdata
        break
    }
  });
export default wishlistReducer;
