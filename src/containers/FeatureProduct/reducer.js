/* eslint-disable prefer-destructuring */
/*
 *
 * ReorderProduct reducer
 *
 */
import produce from 'immer';
import { SHOPPING_CART_DETAILS } from '../LoadProducts/constants';
import { ADD_TO_CART_SUCCESS, CLOSE_MSG_BAR, DEFAULT_ACTION, NEXT_PAGE_SUCCESS, RESPONCE_MSG } from './constants';
export const initialState = {
  reoderlist: [],
  dealData: [],
  name: '',
  qty: 0,
  addToCartMsg: '',
  IsMsgBar: false,
  shoppingDetails: [],
};
/* eslint-disable default-case, no-param-reassign */
const featureProductReducer = (state = initialState, action) =>
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
        console.log('s', action);
        draft.dealData = action.dealOfTheDayData.GetSku
        break
      case SHOPPING_CART_DETAILS:
        draft.shoppingDetails = action.shoppingcartDetails
        break
    }
  });
export default featureProductReducer;
